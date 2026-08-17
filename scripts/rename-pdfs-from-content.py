#!/usr/bin/env python3
"""Rename newly added publication PDFs by matching them to `content/publications.json`.

Two-stage pipeline
------------------
Stage 1 - quick pass (cheap, no PDF text extraction):
  1. Content hashing to catch byte-identical duplicates (of an existing canonical
     file, or of another file in the same upload batch) instantly.
  2. Filename parsing: most uploads already carry "Author et al. YEAR Title.pdf"
     style names, which is enough to identify the publication (and disambiguate
     between same-author/same-year candidates using title-word overlap) without
     opening the PDF at all.
  3. Embedded XMP metadata: a raw byte-pattern scan for a title/date, still far
     cheaper than extracting page text.

Stage 2 - deep pass (only for files stage 1 couldn't resolve):
  Opens the PDF and reads increasing tiers of page text (2, 5, 10 pages),
  extracting title/author/year signals and fuzzy-matching them against
  publications.json (DOI match, title/author scoring, obituary/newsletter
  heuristics, embedded-metadata fallback).

Run against `public/documents/new-uploads/` (see NEW_UPLOADS_DIR below). Files
that match a publication already covered by another file (or whose name flags
them as a supplementary file, e.g. "S1 Appendix") are moved to
`public/documents/duplicates/` and recorded in `content/pdf-duplicates.json`
instead of overwriting the canonical file.

CMS safety model
-----------------
This script is meant to sit behind a CMS/upload workflow where content managers
only have write access to `public/documents/new-uploads/`, never to
`public/documents/` itself. Every operation below is additive with respect to the
canonical library:
  - A file only ever moves *out of* `new-uploads/`, into either `public/documents/`
    (a brand-new canonical filename that doesn't already exist) or
    `public/documents/duplicates/` (for manual review).
  - `public/documents/` itself is never scanned for rename candidates, and a file
    already sitting there is never renamed, overwritten, or deleted.
  - `assert_safe_to_move` re-checks both of those invariants immediately before
    every filesystem mutation and raises loudly instead of silently overwriting a
    file if either is ever violated.
  - A non-canonical file that nonetheless ends up directly in `public/documents/`
    (bypassing new-uploads/, e.g. via a permissions leak) is flagged as a warning,
    never auto-processed - see `find_stray_canonical_files`.
"""

from __future__ import annotations

import hashlib
import json
import logging
import re
import sys
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

# pypdf logs a warning (via the `logging` module, not stdout) for every malformed
# PDF object it patches around, e.g. "Multiple definitions in dictionary at byte
# ...". These are noise for our purposes and can bury the actual rename summary.
logging.getLogger("pypdf").setLevel(logging.ERROR)

ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS_DIR = ROOT / "public" / "documents"
NEW_UPLOADS_DIR = DOCUMENTS_DIR / "new-uploads"
DUPLICATES_DIR = DOCUMENTS_DIR / "duplicates"
DUPLICATES_MANIFEST = ROOT / "content" / "pdf-duplicates.json"
PUBLICATIONS_PATH = ROOT / "content/publications.json"
LOCAL_PDF_INDEX_PATH = ROOT / "content/local-publication-pdfs.json"
SEPARATOR = "--"
MAX_FILENAME_LENGTH = 255
PAGE_TIERS = (2, 5, 10)
DOI_SCAN_LENGTH = 16_000
HASH_CHUNK_SIZE = 1024 * 1024

CMS_INTEGRATION = {
    "status": "not-configured",
    "instructions": (
        "When a CMS or editorial workflow is set up, subscribe to changes in this file "
        "and alert content managers when `entries` are added. Each entry is a newly "
        "uploaded PDF that matched an existing publication but was moved to "
        "public/documents/duplicates/ because a canonical file already exists. Show "
        "the existing file path (`existingPath`) and duplicate path (`duplicatePath`), "
        "and offer manual override actions from `cmsActions`: keep the existing file, "
        "or replace it with the new upload."
    ),
}
SKIP_FILES = {
    "2020--cv--prendini.pdf",
    "2023--atlas-of-australasian-hormurid-scorpions-i-the-genus-hormurus-in-papua-new-guinea-"
    "exceptional-morphological-diversity-in-male-and-female-copulatory-structures-suggests-"
    "genital-coevolution--monod--et-al.pdf",
}

SKIP_PREFIXES = (
    "bulletin of the american museum",
    "american museum novitates",
    "copyright",
    "issn",
    "abstract",
    "introduction",
    "keywords",
    "table of contents",
    "number ",
    "department of",
    "faculty of",
    "university of",
    "the spider club news",
    "reproduced from:",
    "edited by",
    "received ",
    "accepted ",
    "editorial",
    "research article",
    "research open",
    "original article",
    "monograph",
    "the barking gecko",
    "download the monograph",
    "namibian journal of environment",
)


@dataclass
class PdfSignals:
    year: int | None
    title: str | None
    authors: list[str]


@dataclass
class FilenameHints:
    year: int | None
    authors: set[str]
    title_guess: str | None


def strip_markdown(value: str) -> str:
    value = re.sub(r"\*\*([^*]+)\*\*", r"\1", value)
    value = re.sub(r"\*([^*]+)\*", r"\1", value)
    return value


def normalize(value: str) -> str:
    value = strip_markdown(value)
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.replace("–", "-").replace("—", "-")
    return re.sub(r"\s+", " ", value).lower().strip()


def slugify(value: str) -> str:
    return re.sub(r"-+$", "", re.sub(r"[^a-z0-9]+", "-", normalize(value)))


def last_name(name: str) -> str:
    name = normalize(name)
    if "," in name:
        return name.split(",")[0].strip()
    parts = name.split()
    return parts[-1] if parts else name


def build_filename(publication: dict) -> str:
    year = publication["year"]
    author_slug = slugify(last_name(publication["authors"][0]["name"]))
    et_al = f"{SEPARATOR}et-al" if len(publication["authors"]) > 1 else ""
    suffix = f"{SEPARATOR}{author_slug}{et_al}.pdf"
    prefix = f"{year}{SEPARATOR}"
    max_title = MAX_FILENAME_LENGTH - len(prefix) - len(suffix)
    title_slug = slugify(publication["title"])
    if len(title_slug) > max_title:
        title_slug = title_slug[:max_title].rstrip("-")
    return f"{prefix}{title_slug}{suffix}"


def read_pages(path: Path, max_pages: int) -> list[str]:
    reader = PdfReader(str(path))
    return [(page.extract_text() or "") for page in reader.pages[:max_pages]]


def parse_filename_hints(filename: str) -> FilenameHints:
    year_match = re.search(r"(?:^|[\s.])(?:((?:19|20)\d{2})[a-z]?)(?:\s|&|$|\.|\()", filename, re.I)
    year = int(year_match.group(1)) if year_match else None

    author_part = filename[: year_match.start()] if year_match else filename
    author_part = re.sub(r"\.pdf$", "", author_part, flags=re.I).strip()
    author_part = re.sub(
        r"\s+(?:Appendix|Figure|Table|Additional File|Graphical Abstract|Accessory Publication)\b.*$",
        "",
        author_part,
        flags=re.I,
    )

    authors: set[str] = set()
    for part in re.split(r"\s+&\s+|\s+et al\.?", author_part, flags=re.I):
        part = part.strip(" .,")
        if not part:
            continue
        normalized = last_name(part)
        authors.add(normalized)
        if "-" in normalized:
            authors.add(normalized.split("-", 1)[0])

    # Some filenames are a full citation pasted verbatim - "Author. \"Title\", in
    # Journal, ..., last modified: April 7, 2006.pdf" - where the year sits at the very
    # end (often just a "last modified" date) and everything between the author and it
    # is journal/DOI/URL noise, not a usable title. A quoted title is a much stronger,
    # position-independent signal, so prefer it over the year-relative remainder.
    quoted_match = re.search(r'["\u201c]([^"\u201d]{3,200})[\u201d"]', filename)
    if quoted_match:
        title_guess = quoted_match.group(1).strip()
    elif year_match:
        remainder = re.sub(r"\.pdf$", "", filename[year_match.end() :], flags=re.I).strip(" .-")
        title_guess = remainder or None
    else:
        title_guess = None

    return FilenameHints(year=year, authors=authors, title_guess=title_guess)


def detect_supplement_label(filename: str) -> str | None:
    """Flag filenames that name a supplementary/appendix file rather than the article itself."""
    base = re.sub(r"\.pdf$", "", filename, flags=re.I)
    numbered = re.search(r"\bS(\d+)\s+Appendix\b", base, re.I)
    if numbered:
        return f"s{numbered.group(1)}"
    if re.search(r"\bAppendix\b", base, re.I):
        return "appendix"
    if re.search(r"\bSupplementary?\s*(?:Material|Information|Data|File)?\b|\bSupplemental\b", base, re.I):
        return "supplement"
    if re.search(r"\bGraphical Abstract\b", base, re.I):
        return "graphical-abstract"
    if re.search(r"\bAdditional File\b", base, re.I):
        return "additional-file"
    if re.search(r"\bAccessory Publication\b", base, re.I):
        return "accessory"
    return None


def apply_supplement_suffix(filename: str, label: str) -> str:
    stem = filename[:-4] if filename.lower().endswith(".pdf") else filename
    suffix = f"{SEPARATOR}{label}.pdf"
    if len(stem) + len(suffix) > MAX_FILENAME_LENGTH:
        stem = stem[: MAX_FILENAME_LENGTH - len(suffix)].rstrip("-")
    return f"{stem}{suffix}"


def iter_pdf_files(directory: Path):
    """List *.pdf files case-insensitively (Path.glob is case-sensitive even on
    case-insensitive filesystems, so a plain glob silently misses e.g. `FILE.PDF`)."""
    if not directory.is_dir():
        return
    for path in directory.iterdir():
        if path.is_file() and path.suffix.lower() == ".pdf":
            yield path


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(HASH_CHUNK_SIZE), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_existing_hash_index() -> dict[str, Path]:
    """Hash every canonical PDF once so new uploads can be checked in O(1)."""
    index: dict[str, Path] = {}
    for path in iter_pdf_files(DOCUMENTS_DIR):
        index[file_hash(path)] = path
    return index


def quick_match_from_filename(path: Path, publications: list[dict]) -> dict | None:
    """Resolve a publication purely from the filename - no PDF I/O at all."""
    hints = parse_filename_hints(path.name)
    if not hints.year or not hints.authors:
        return None

    candidates = [
        pub
        for pub in publications
        if pub["year"] == hints.year and hints.authors <= publication_author_last_names(pub)
    ]
    if not candidates:
        return None
    if len(candidates) == 1:
        return candidates[0]

    if not hints.title_guess:
        return None

    # Many filenames are literally a (possibly truncated) copy of the real title, e.g.
    # "Chelicerata (Scorpiones)" for a chapter titled "Chelicerata (Scorpiones). In: ...".
    # An exact or prefix match against the normalized title is unambiguous even when the
    # guess is too short/generic for token-overlap scoring below to work (e.g. one word).
    normalized_guess = normalize(hints.title_guess)
    prefix_matches = [
        pub for pub in candidates
        if normalize(strip_markdown(pub["title"])).startswith(normalized_guess)
    ]
    if len(prefix_matches) == 1:
        return prefix_matches[0]
    if len(prefix_matches) > 1:
        candidates = prefix_matches

    pdf_tokens = title_tokens(hints.title_guess)
    if len(pdf_tokens) < 2:
        return None

    scored = sorted(
        ((len(pdf_tokens & title_tokens(pub["title"])), pub) for pub in candidates),
        key=lambda item: item[0],
        reverse=True,
    )
    top_score = scored[0][0]
    if top_score < 2:
        return None
    if len(scored) > 1 and scored[1][0] == top_score:
        return None
    return scored[0][1]


def quick_match_from_embedded_metadata(path: Path, publications: list[dict]) -> dict | None:
    """Resolve via embedded XMP title/date - a raw byte scan, not full text extraction."""
    title, year = embedded_title_year(path)
    if not title or not year:
        return None
    signals = PdfSignals(year=year, title=title, authors=[])
    pub, score, _overlap = score_publication(signals, publications, title)
    return pub if score >= 20 else None


def quick_match(path: Path, publications: list[dict]) -> dict | None:
    """Stage 1: cheap heuristics only. Returns None if the file needs the deep pass."""
    return quick_match_from_filename(path, publications) or quick_match_from_embedded_metadata(
        path, publications
    )


def publication_author_last_names(publication: dict) -> set[str]:
    names: set[str] = set()
    for author in publication["authors"]:
        normalized = last_name(author["name"])
        names.add(normalized)
        if "-" in normalized:
            names.add(normalized.split("-", 1)[0])
    return names


def apply_filename_year(signals: PdfSignals, filename_year: int | None) -> PdfSignals:
    if not filename_year:
        return signals
    if signals.year is None or abs(signals.year - filename_year) > 2:
        return PdfSignals(year=filename_year, title=signals.title, authors=signals.authors)
    return signals


def match_from_pages(
    pages: list[str],
    path: Path,
    publications: list[dict],
    *,
    filename_year: int | None = None,
    candidate_publications: list[dict] | None = None,
) -> dict | None:
    full_text = "\n".join(pages)
    search_publications = candidate_publications or publications

    doi = parse_doi(full_text)
    if doi:
        for pub in search_publications:
            pub_doi = publication_doi(pub)
            if pub_doi and pub_doi == doi.split("#")[0]:
                return pub

    windows: list[str] = []
    for page in pages:
        if page.strip():
            windows.append(page)
    for index in range(len(pages) - 1):
        combined = pages[index] + "\n" + pages[index + 1]
        if combined.strip():
            windows.append(combined)
    if full_text.strip():
        windows.append(full_text)

    best_pub: dict | None = None
    best_score = 0
    best_overlap = 0
    for text in windows:
        signals = apply_filename_year(extract_signals(text, path), filename_year)
        pub, score, overlap = score_publication(signals, search_publications, text)
        if score > best_score or (score == best_score and overlap > best_overlap):
            best_pub, best_score, best_overlap = pub, score, overlap

        if score < 20:
            embedded_title, embedded_year = embedded_title_year(path)
            if embedded_title and embedded_year:
                embedded = PdfSignals(year=embedded_year, title=embedded_title, authors=[])
                embedded = apply_filename_year(embedded, filename_year)
                pub, score, overlap = score_publication(embedded, search_publications, text)
                if score > best_score or (score == best_score and overlap > best_overlap):
                    best_pub, best_score, best_overlap = pub, score, overlap

    return best_pub if best_score >= 20 else None


def match_from_filename_hints(path: Path, publications: list[dict]) -> dict | None:
    hints = parse_filename_hints(path.name)
    filename_year, filename_authors = hints.year, hints.authors
    if not filename_year or not filename_authors:
        return None

    candidates = [
        pub
        for pub in publications
        if pub["year"] == filename_year
        and filename_authors <= publication_author_last_names(pub)
    ]
    if not candidates:
        return None
    if len(candidates) == 1:
        return candidates[0]

    reader = PdfReader(str(path))
    total_pages = len(reader.pages)
    for tier in PAGE_TIERS:
        pages = read_pages(path, min(tier, total_pages))
        publication = match_from_pages(
            pages,
            path,
            publications,
            filename_year=filename_year,
            candidate_publications=candidates,
        )
        if publication:
            return publication

    return None


def publication_matches_filename_year(publication: dict, filename_year: int | None) -> bool:
    if not filename_year:
        return True
    return publication["year"] == filename_year


def find_publication(path: Path, publications: list[dict]) -> dict | None:
    """Stage 2 (deep pass): tiered page-text extraction and fuzzy matching."""
    filename_year = parse_filename_hints(path.name).year
    reader = PdfReader(str(path))
    total_pages = len(reader.pages)

    for tier in PAGE_TIERS:
        pages = read_pages(path, min(tier, total_pages))
        publication = match_from_pages(pages, path, publications, filename_year=filename_year)
        if publication and publication_matches_filename_year(publication, filename_year):
            return publication

    return match_from_filename_hints(path, publications)


def embedded_title_year(path: Path) -> tuple[str | None, int | None]:
    data = path.read_bytes()
    marker = b'rdf:li xml:lang="x-default">'
    index = data.find(marker)
    if index < 0:
        return None, None
    snippet = data[index : index + 50_000].decode("utf-8", errors="ignore")
    title_match = re.search(r'rdf:li xml:lang="x-default">([^<]{15,})<', snippet, re.I)
    title = title_match.group(1).strip() if title_match else None
    if title and title.lower().startswith("abstract"):
        title = None
    year_match = re.search(r'xmp:CreateDate="(20\d{2}|19\d{2})', snippet, re.I)
    year = int(year_match.group(1)) if year_match else None
    return title, year


def parse_year(text: str) -> int | None:
    header = text[:4000]
    patterns: list[tuple[int, str]] = [
        (0, r"copyright\s*©?\s*[^0-9\n]{0,60}(20\d{2}|19\d{2})"),
        (0, r"issued\s+(?:[A-Za-z]+\s+\d{1,2},?\s+)?(20\d{2}|19\d{2})"),
        (0, r"©\s*(20\d{2}|19\d{2})\b"),
        (0, r"(?:spring|summer|fall|autumn|winter|january|february|march|april|may|june|july|"
         r"august|september|october|november|december|volumen|junio)\s+(20\d{2}|19\d{2})"),
        (0, r"(20\d{2}|19\d{2})\s+(?:concord university magazine|american arachnology)"),
        (0, r"published online:\s*(?:\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+)?(20\d{2}|19\d{2})"),
        (0, r"\(\s*(?:18|19|20)\d{2}\s*[–—-]\s*((?:18|19|20)\d{2})\s*\)"),
        (1, r"\((20\d{2}|19\d{2})\)\s*\d"),
        (1, r",\s+(20\d{2}|19\d{2})\b"),
        (2, r"\b((?:19|20)\d{2})\.\s+[A-Z]"),
        (2, r"(20\d{2}|19\d{2})\s*·"),
    ]

    best_year: int | None = None
    best_priority = 99
    best_pos = len(header)

    for priority, pattern in patterns:
        for match in re.finditer(pattern, header, re.I):
            year = int(match.group(1))
            if not 1950 <= year <= 2030:
                continue
            if priority < best_priority or (priority == best_priority and match.start() < best_pos):
                best_year, best_priority, best_pos = year, priority, match.start()

    return best_year


def skip_line(line: str) -> bool:
    lower = line.lower().strip()
    if not lower or lower.isdigit():
        return True
    if lower.startswith("©") or "issn" in lower or "doi.org" in lower or "http" in lower:
        return True
    if line.count(".") > 20:
        return True
    if re.fullmatch(r"[\d\s·…\.]+", line):
        return True
    return any(prefix in lower for prefix in SKIP_PREFIXES)


def title_heading(line: str) -> bool:
    return bool(re.search(r"\(\s*(?:18|19|20)\d{2}\s*[–—-]\s*(?:18|19|20)\d{2}\s*\)", line))


def author_line(line: str) -> list[str] | None:
    if title_heading(line):
        return None
    cleaned = re.sub(r"\s+", " ", line.strip())
    if len(cleaned) < 8 or len(cleaned) > 160:
        return None
    lower = cleaned.lower()
    if any(x in lower for x in ("university", "department", "email:", "urn:", "center for", "centre for")):
        return None
    if "(" in cleaned:
        return None
    if '"' in cleaned or "“" in cleaned:
        return None
    por_match = re.match(r"^por\s+(.+)$", cleaned, re.I)
    if por_match:
        name = normalize(por_match.group(1)).strip(" .")
        if len(name.split()) >= 2 or name.isupper():
            return [name]

    if not re.search(r",|\s+and\s+|\s+&\s+|\s+[A-Z]\.?\s+[A-Z]", cleaned):
        return None
    cleaned = normalize(cleaned)
    cleaned = re.sub(r"[\*†‡\d]+", " ", cleaned)
    parts = re.split(r",\s*|\s+and\s+|\s+&\s+", cleaned, flags=re.I)
    names = [p.strip(" .") for p in parts if len(p.strip(" .")) > 2]
    if not names or any(re.fullmatch(r"(?:18|19|20)\d{2}", p.strip()) for p in names):
        initials = re.findall(r"\b[a-z]\.?\s+[a-z]{3,}\b", cleaned)
        if len(initials) >= 2:
            names = [part.strip(" .") for part in initials]
        elif len(initials) == 1:
            names = initials
        else:
            return None
    if not any(len(n.split()) >= 2 or n.isupper() for n in names):
        return None
    return names


def obituary_signals(text: str) -> PdfSignals | None:
    platnick_heading = re.search(
        r"(Dr\.?\s+Norm(?:an(?:\s+I\.?)?(?:\s+Ira)?)\s+Platnick\s*"
        r"\(\s*(?:18|19|20)\d{2}\s*[–—-]\s*(?:18|19|20)\d{2}\s*\))",
        text,
        re.I,
    )
    if not platnick_heading and not re.search(r"\bin memoriam\b", text, re.I):
        return None

    platnick = re.search(
        r"(Dr\.?\s+Norm(?:an(?:\s+I\.?)?(?:\s+Ira)?)\s+Platnick|Norman\s+(?:Ira\s+)?Platnick)",
        text,
        re.I,
    )
    if not platnick:
        return None

    year = parse_year(text)
    if not year:
        return None

    if platnick_heading:
        title = re.sub(r"\s+", " ", platnick_heading.group(1)).strip()
    elif re.search(r"\bin memoriam\b", text, re.I):
        title = "In Memoriam Dr. Norm Platnick"
    else:
        title = platnick.group(1).strip()

    authors: list[str] = []
    for line in text.splitlines():
        names = author_line(line)
        if names:
            authors = names
            break
        por = re.search(r"por\s+([A-ZÁÉÍÓÚÑ][A-Za-záéíóúñ\-]+(?:\s+[A-ZÁÉÍÓÚÑ][A-Za-záéíóúñ\-]+)+)", line, re.I)
        if por:
            authors = [por.group(1)]
            break

    return PdfSignals(year=year, title=title, authors=authors)


def extract_signals(text: str, path: Path) -> PdfSignals:
    lines = [re.sub(r"\s+", " ", ln.strip()) for ln in text.splitlines() if ln.strip()]

    for line in lines[:60]:
        if title_heading(line):
            title = line.strip()
            if title.isupper():
                title = title.title()
            year = parse_year(text)
            authors: list[str] = []
            for author_candidate in lines:
                names = author_line(author_candidate)
                if names:
                    authors = names
                    break
            reader = PdfReader(str(path))
            meta = reader.metadata or {}
            if not year and meta.get("/CreationDate"):
                match = re.search(r"D:(20\d{2}|19\d{2})", str(meta["/CreationDate"]))
                if match:
                    year = int(match.group(1))
            return PdfSignals(year=year, title=title, authors=authors)

    obituary = obituary_signals(text)
    if obituary:
        return obituary

    title_parts: list[str] = []
    authors: list[str] = []
    for index, line in enumerate(lines[:60]):
        if skip_line(line):
            continue
        names = author_line(line)
        if names:
            if not authors and title_parts:
                authors = names
                break
            continue
        if title_heading(line):
            title_parts.append(line)
            continue
        if index + 1 < len(lines) and not authors:
            combined = f"{line} {lines[index + 1]}"
            names = author_line(combined)
            if names and title_parts:
                authors = names
                break
        if len(line) >= 8 and not authors:
            title_parts.append(line)

    title = " ".join(title_parts).strip() or None
    if title and title.isupper():
        title = title.title()

    year = parse_year(text)
    reader = PdfReader(str(path))
    meta = reader.metadata or {}
    meta_title = str(meta.get("/Title") or "").strip()
    if meta_title and len(meta_title) > 25 and "http" not in meta_title.lower():
        if not title or len(meta_title) > len(title):
            title = meta_title
    if not text.strip():
        embedded_title, embedded_year = embedded_title_year(path)
        title = embedded_title or title
        year = embedded_year or year
    elif not year and meta.get("/CreationDate"):
        match = re.search(r"D:(20\d{2}|19\d{2})", str(meta["/CreationDate"]))
        if match:
            year = int(match.group(1))

    return PdfSignals(year=year, title=title, authors=authors)


def title_tokens(title: str) -> set[str]:
    stop = {
        "about", "from", "with", "that", "this", "into", "species", "new", "and", "the", "for",
        "scorpiones", "scorpion", "scorpions",
    }
    # Extract word-ish runs (letters/digits, internal hyphens/apostrophes allowed) so that
    # punctuation immediately touching a word - "(Scorpiones)." vs "(Scorpiones)" - doesn't
    # prevent an otherwise-identical token from matching.
    tokens = re.findall(r"[a-z0-9](?:[a-z0-9'-]*[a-z0-9])?", normalize(title))
    return {t for t in tokens if len(t) > 3 and t not in stop}


def newsletter_titles(text: str) -> list[str]:
    titles: list[str] = []
    for match in re.finditer(r"\b([A-Z][A-Z0-9][A-Z0-9\s]{2,40}[A-Z0-9])\b", text):
        phrase = re.sub(r"\s+", " ", match.group(1)).strip()
        words = phrase.split()
        if not 2 <= len(words) <= 8:
            continue
        lower = phrase.lower()
        if any(x in lower for x in ("barking gecko", "editor", "index", "news", "greetings", "vol.")):
            continue
        titles.append(phrase.title())
    return titles


def parse_doi(text: str) -> str | None:
    match = re.search(r"10\.\d{4,9}/[^\s\"<>\]\)\\#]+", text[:DOI_SCAN_LENGTH], re.I)
    if not match:
        return None
    return match.group(0).lower().rstrip(".,;)\\")


def publication_doi(publication: dict) -> str | None:
    doi = publication.get("doi")
    if not doi:
        return None
    match = re.search(r"10\.\d{4,9}/[^\s\"<>]+", doi, re.I)
    return match.group(0).lower().rstrip(".") if match else None


def score_publication(
    signals: PdfSignals, publications: list[dict], text: str
) -> tuple[dict | None, int, int]:
    candidates: list[PdfSignals] = [signals]
    for title in newsletter_titles(text):
        candidates.append(PdfSignals(year=signals.year, title=title, authors=signals.authors))
    obituary = obituary_signals(text)
    if obituary:
        candidates.append(obituary)

    best: dict | None = None
    best_score = 0
    best_overlap = 0

    for candidate in candidates:
        if not candidate.title or not candidate.year:
            continue
        pdf_title = re.sub(r"\s+", " ", candidate.title).strip()
        pdf_tokens = title_tokens(pdf_title)
        if len(pdf_tokens) < 2:
            continue

        pdf_author = last_name(candidate.authors[0]) if candidate.authors else None
        for pub in publications:
            if pub["year"] not in {candidate.year, candidate.year - 1, candidate.year + 1}:
                continue
            pub_title = re.sub(r"\s+", " ", strip_markdown(pub["title"])).strip()
            pub_tokens = title_tokens(pub["title"])
            overlap = len(pdf_tokens & pub_tokens)
            if overlap < 2:
                continue
            score = overlap * 10
            if normalize(pdf_title) == normalize(pub_title):
                score += 50
            if pdf_author and pdf_author == last_name(pub["authors"][0]["name"]):
                score += 30
            if score > best_score or (score == best_score and overlap > best_overlap):
                best, best_score, best_overlap = pub, score, overlap

    return best, best_score, best_overlap


def match_publication(signals: PdfSignals, publications: list[dict], text: str, path: Path) -> dict | None:
    pub, score, _overlap = score_publication(signals, publications, text)
    if score >= 20:
        return pub

    embedded_title, embedded_year = embedded_title_year(path)
    if embedded_title and embedded_year:
        embedded = PdfSignals(year=embedded_year, title=embedded_title, authors=[])
        pub, score, _overlap = score_publication(embedded, publications, text)
        if score >= 20:
            return pub

    return None


def is_legacy(path: Path) -> bool:
    return not re.match(r"^\d{4}--", path.name)


def find_stray_canonical_files() -> list[Path]:
    """Files sitting directly in `public/documents/` that aren't canonically named.

    Content managers should only ever be able to write to `new-uploads/`; a
    non-canonical file appearing directly in `public/documents/` means something
    bypassed that boundary (a manual copy, a permissions leak, etc.). We deliberately
    never touch these - only flag them - since guessing at a rename here risks
    clobbering or misfiling a file a human placed intentionally.
    """
    return sorted(
        path
        for path in iter_pdf_files(DOCUMENTS_DIR)
        if path.name not in SKIP_FILES and is_legacy(path)
    )


def load_duplicates_manifest() -> dict:
    if DUPLICATES_MANIFEST.exists():
        manifest = json.loads(DUPLICATES_MANIFEST.read_text())
    else:
        manifest = {"entries": []}
    manifest["cmsIntegration"] = CMS_INTEGRATION
    return manifest


def record_duplicate(
    manifest: dict,
    *,
    reason: str,
    new_upload_file: str,
    duplicate_path: str,
    publication: dict | None = None,
    canonical_filename: str | None = None,
    duplicate_of_upload: str | None = None,
) -> None:
    entry: dict = {
        "detectedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "status": "pending-review",
        "reason": reason,
        "newUploadFile": new_upload_file,
        "duplicatePath": duplicate_path,
    }
    if publication:
        entry["publicationTitle"] = strip_markdown(publication["title"])
        entry["publicationYear"] = publication["year"]
    if canonical_filename:
        entry["existingPath"] = f"/documents/{canonical_filename}"
    if duplicate_of_upload:
        entry["duplicateOfUpload"] = duplicate_of_upload
    entry["cmsActions"] = {
        "keepExisting": "No action needed. The existing file at existingPath remains in place.",
        "useNewUpload": (
            "Manually move the file at duplicatePath to existingPath, then update "
            "the pdf field in content/publications.json (and publication-details.json "
            "if needed). Remove or resolve this entry."
        ),
    }
    manifest["entries"].append(entry)


def save_duplicates_manifest(manifest: dict) -> None:
    manifest["cmsIntegration"] = CMS_INTEGRATION
    DUPLICATES_MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")


def sync_local_publication_pdf_index(publications: list[dict]) -> int:
    pdf_filenames = {path.name for path in iter_pdf_files(DOCUMENTS_DIR)}
    index = {"byDoi": {}, "byYearTitle": {}}
    for publication in publications:
        filename = build_filename(publication)
        if filename not in pdf_filenames:
            continue
        local_path = f"/documents/{filename}"
        doi = publication_doi(publication)
        if doi:
            index["byDoi"][doi] = local_path
        index["byYearTitle"][f"{publication['year']}::{publication['title']}"] = local_path
    LOCAL_PDF_INDEX_PATH.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n")
    return len(index["byYearTitle"])


def assert_safe_to_move(source: Path, dest: Path) -> None:
    """Hard safety net: refuse (loudly) rather than silently overwrite/misplace a file.

    This is intentionally paranoid - it re-checks invariants that `classify_resolutions`
    and `iter_new_uploads` should already guarantee, so a future bug in this script
    fails fast instead of quietly damaging a canonical file that's in active use.
    """
    if not source.is_relative_to(NEW_UPLOADS_DIR):
        raise RuntimeError(
            f"Refusing to move {source} - this script only ever moves files out of "
            f"{NEW_UPLOADS_DIR.relative_to(ROOT)}/."
        )
    if dest.exists():
        raise RuntimeError(f"Refusing to overwrite existing file {dest}.")


def move_to_duplicates(path: Path) -> Path:
    DUPLICATES_DIR.mkdir(exist_ok=True)
    dest = DUPLICATES_DIR / path.name
    if dest.exists():
        stem, suffix = path.stem, path.suffix
        counter = 2
        while dest.exists():
            dest = DUPLICATES_DIR / f"{stem}--{counter}{suffix}"
            counter += 1
    assert_safe_to_move(path, dest)
    path.rename(dest)
    return dest


def iter_new_uploads() -> list[Path]:
    """Files this script is allowed to touch: `new-uploads/` only.

    `public/documents/` itself is never scanned for rename candidates - see
    `find_stray_canonical_files` for how files that end up there anyway are handled
    (flagged, not renamed). This is the CMS safety boundary: a content-manager role
    should only ever be granted write access to `new-uploads/`; everything this
    script does downstream is additive (new file into `public/documents/`, or a
    new-upload copy into `duplicates/`) and never overwrites or deletes a file
    that was already in the canonical library.
    """
    uploads = [
        path
        for path in iter_pdf_files(NEW_UPLOADS_DIR)
        if path.name not in SKIP_FILES
    ]
    uploads.sort(key=lambda path: (path.stat().st_mtime, path.name))
    return uploads


@dataclass
class HashDuplicate:
    path: Path
    reason: str  # "exact-duplicate-of-existing" | "exact-duplicate-of-upload"
    publication: dict | None
    canonical_filename: str | None
    duplicate_of_upload: str | None


@dataclass
class Resolution:
    path: Path
    publication: dict
    stage: str  # "quick" | "deep"


def find_hash_duplicates(
    new_files: list[Path], publications: list[dict]
) -> tuple[list[HashDuplicate], list[Path]]:
    """Stage 1a: catch byte-identical files before doing any content matching."""
    filename_to_publication = {build_filename(pub): pub for pub in publications}
    existing_hashes = build_existing_hash_index()

    seen_this_run: dict[str, Path] = {}
    hash_duplicates: list[HashDuplicate] = []
    remaining: list[Path] = []

    for path in new_files:
        digest = file_hash(path)
        if digest in existing_hashes:
            canonical = existing_hashes[digest]
            hash_duplicates.append(
                HashDuplicate(
                    path=path,
                    reason="exact-duplicate-of-existing",
                    publication=filename_to_publication.get(canonical.name),
                    canonical_filename=canonical.name,
                    duplicate_of_upload=None,
                )
            )
            continue
        if digest in seen_this_run:
            hash_duplicates.append(
                HashDuplicate(
                    path=path,
                    reason="exact-duplicate-of-upload",
                    publication=None,
                    canonical_filename=None,
                    duplicate_of_upload=seen_this_run[digest].name,
                )
            )
            continue
        seen_this_run[digest] = path
        remaining.append(path)

    return hash_duplicates, remaining


def run_quick_pass(files: list[Path], publications: list[dict]) -> tuple[list[Resolution], list[Path]]:
    resolved: list[Resolution] = []
    unresolved: list[Path] = []
    for path in files:
        publication = quick_match(path, publications)
        if publication:
            resolved.append(Resolution(path=path, publication=publication, stage="quick"))
        else:
            unresolved.append(path)
    return resolved, unresolved


def run_deep_pass(files: list[Path], publications: list[dict]) -> tuple[list[Resolution], list[Path]]:
    resolved: list[Resolution] = []
    unmatched: list[Path] = []
    for path in files:
        publication = find_publication(path, publications)
        if publication:
            resolved.append(Resolution(path=path, publication=publication, stage="deep"))
        else:
            unmatched.append(path)
    return resolved, unmatched


def classify_resolutions(
    resolutions: list[Resolution],
) -> tuple[list[tuple[Path, Path, dict, str]], list[tuple[Path, Path, dict]]]:
    """Turn (path, publication) matches into renames vs. filename-collision duplicates."""
    renames: list[tuple[Path, Path, dict, str]] = []
    collisions: list[tuple[Path, Path, dict]] = []
    claimed_targets: set[Path] = set()

    for resolution in resolutions:
        target_name = build_filename(resolution.publication)
        label = detect_supplement_label(resolution.path.name)
        if label:
            target_name = apply_supplement_suffix(target_name, label)
        target_path = DOCUMENTS_DIR / target_name

        if resolution.path.resolve() == target_path.resolve():
            continue
        if target_path.exists() or target_path in claimed_targets:
            collisions.append((resolution.path, target_path, resolution.publication))
            continue

        claimed_targets.add(target_path)
        renames.append((resolution.path, target_path, resolution.publication, resolution.stage))

    return renames, collisions


def print_resolution_group(title: str, entries: list[tuple[Path, Path, dict, str]]) -> None:
    if not entries:
        return
    print(f"\n{title}:")
    for source, target, publication, _stage in entries:
        print(f"{target.name}")
        print(f"  {strip_markdown(publication['title'])[:90]}")
        print(f"  ← {source.name}")


def main() -> int:
    apply = "--apply" in sys.argv
    quick_only = "--quick-only" in sys.argv
    publications = json.loads(PUBLICATIONS_PATH.read_text())

    stray_files = find_stray_canonical_files()
    if stray_files:
        print(
            f"WARNING: {len(stray_files)} non-canonically-named file(s) found directly in "
            f"{DOCUMENTS_DIR.relative_to(ROOT)}/ (outside new-uploads/). These are NOT "
            "touched by this script - only files in new-uploads/ are ever renamed or "
            "moved. Move them into new-uploads/ yourself if they need processing:"
        )
        for path in stray_files:
            print(f"  - {path.name}")
        print()

    new_files = iter_new_uploads()
    hash_duplicates, candidates = find_hash_duplicates(new_files, publications)

    quick_resolutions, deep_candidates = run_quick_pass(candidates, publications)

    deep_resolutions: list[Resolution] = []
    unmatched: list[Path] = []
    if quick_only:
        unmatched = deep_candidates
    else:
        deep_resolutions, unmatched = run_deep_pass(deep_candidates, publications)

    renames, collisions = classify_resolutions(quick_resolutions + deep_resolutions)
    quick_renames = [r for r in renames if r[3] == "quick"]
    deep_renames = [r for r in renames if r[3] == "deep"]

    print_resolution_group("Quick pass matches (filename / embedded metadata only)", quick_renames)
    if not quick_only:
        print_resolution_group("Deep pass matches (PDF text extraction)", deep_renames)

    if hash_duplicates:
        print("\nExact-content duplicates (identical bytes, no parsing needed):")
        for dup in hash_duplicates:
            if dup.reason == "exact-duplicate-of-existing":
                print(f"  - {dup.path.name}  ==  existing {dup.canonical_filename}")
            else:
                print(f"  - {dup.path.name}  ==  new upload {dup.duplicate_of_upload}")

    if collisions:
        print("\nFilename-collision duplicates (matched publication already has a file):")
        for source, target, publication in collisions:
            print(f"  - {source.name} -> {target.name} ({strip_markdown(publication['title'])[:70]})")

    total_duplicates = len(hash_duplicates) + len(collisions)
    deep_resolved_count = 0 if quick_only else len(deep_resolutions)
    print(
        f"\n{len(new_files)} new file(s): "
        f"{len(quick_resolutions)} resolved by quick pass, "
        f"{deep_resolved_count}/{len(deep_candidates)} "
        f"resolved by deep pass -> {len(renames)} rename(s) "
        f"({len(quick_renames)} quick, {len(deep_renames)} deep), "
        f"{total_duplicates} duplicate(s) "
        f"({len(hash_duplicates)} exact-hash, {len(collisions)} filename-collision), "
        f"{len(unmatched)} unmatched"
    )
    if unmatched:
        label = "Skipped (quick pass only; rerun without --quick-only)" if quick_only else "Unmatched new files (need manual review)"
        print(f"\n{label}:")
        for path in unmatched:
            print(f"  - {path.name}")

    if not renames and not hash_duplicates and not collisions:
        print("\nNothing to do.")
        return 0

    if not apply:
        print("\nDry run. Re-run with --apply to execute.")
        if total_duplicates:
            print(
                f"On apply, {total_duplicates} new file(s) will move to "
                f"{DUPLICATES_DIR.relative_to(ROOT)}/ and "
                f"{DUPLICATES_MANIFEST.relative_to(ROOT)} will be updated."
            )
        return 0

    manifest = load_duplicates_manifest()
    moved = 0

    for source, target, _publication, _stage in renames:
        assert_safe_to_move(source, target)
        source.rename(target)

    for dup in hash_duplicates:
        duplicate_dest = move_to_duplicates(dup.path)
        moved += 1
        record_duplicate(
            manifest,
            reason=dup.reason,
            new_upload_file=dup.path.name,
            duplicate_path=f"/documents/duplicates/{duplicate_dest.name}",
            publication=dup.publication,
            canonical_filename=dup.canonical_filename,
            duplicate_of_upload=dup.duplicate_of_upload,
        )

    for source, target, publication in collisions:
        duplicate_dest = move_to_duplicates(source)
        moved += 1
        record_duplicate(
            manifest,
            reason="filename-collision",
            new_upload_file=source.name,
            duplicate_path=f"/documents/duplicates/{duplicate_dest.name}",
            publication=publication,
            canonical_filename=target.name,
        )

    if moved:
        save_duplicates_manifest(manifest)

    mapped = sync_local_publication_pdf_index(publications)
    print(f"Updated {LOCAL_PDF_INDEX_PATH.relative_to(ROOT)} ({mapped} local PDF mapping(s)).")

    print(f"\nDone. {len(renames)} file(s) renamed, {moved} duplicate(s) moved to "
          f"{DUPLICATES_DIR.relative_to(ROOT)}/")
    if moved:
        print(
            f"Duplicate record written to {DUPLICATES_MANIFEST.relative_to(ROOT)} "
            "(see cmsIntegration for future CMS hookup)."
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
