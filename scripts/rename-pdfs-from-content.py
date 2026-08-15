#!/usr/bin/env python3
"""Rename newly added publication PDFs by reading year/title/authors from page content."""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS_DIR = ROOT / "public" / "documents"
DUPLICATES_DIR = DOCUMENTS_DIR / "duplicates"
DUPLICATES_MANIFEST = ROOT / "content" / "pdf-duplicates.json"
PUBLICATIONS_PATH = ROOT / "content/publications.json"
SEPARATOR = "--"
MAX_FILENAME_LENGTH = 255
PAGE_TIERS = (2, 5, 10)
DOI_SCAN_LENGTH = 16_000

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


def match_from_pages(pages: list[str], path: Path, publications: list[dict]) -> dict | None:
    full_text = "\n".join(pages)

    doi = parse_doi(full_text)
    if doi:
        for pub in publications:
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
        signals = extract_signals(text, path)
        pub, score, overlap = score_publication(signals, publications, text)
        if score > best_score or (score == best_score and overlap > best_overlap):
            best_pub, best_score, best_overlap = pub, score, overlap

        if score < 20:
            embedded_title, embedded_year = embedded_title_year(path)
            if embedded_title and embedded_year:
                embedded = PdfSignals(year=embedded_year, title=embedded_title, authors=[])
                pub, score, overlap = score_publication(embedded, publications, text)
                if score > best_score or (score == best_score and overlap > best_overlap):
                    best_pub, best_score, best_overlap = pub, score, overlap

    return best_pub if best_score >= 20 else None


def find_publication(path: Path, publications: list[dict]) -> dict | None:
    reader = PdfReader(str(path))
    total_pages = len(reader.pages)

    for tier in PAGE_TIERS:
        pages = read_pages(path, min(tier, total_pages))
        publication = match_from_pages(pages, path, publications)
        if publication:
            return publication

    return None


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
    stop = {"about", "from", "with", "that", "this", "into", "species", "new", "and", "the", "for"}
    return {t for t in normalize(title).split() if len(t) > 3 and t not in stop}


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
    publication: dict,
    canonical_filename: str,
    new_upload_file: str,
    duplicate_path: str,
) -> None:
    manifest["entries"].append(
        {
            "detectedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "status": "pending-review",
            "publicationTitle": strip_markdown(publication["title"]),
            "publicationYear": publication["year"],
            "existingPath": f"/documents/{canonical_filename}",
            "newUploadFile": new_upload_file,
            "duplicatePath": duplicate_path,
            "cmsActions": {
                "keepExisting": (
                    "No action needed. The existing file at existingPath remains in place."
                ),
                "useNewUpload": (
                    "Manually move the file at duplicatePath to existingPath, then update "
                    "the pdf field in content/publications.json (and publication-details.json "
                    "if needed). Remove or resolve this entry."
                ),
            },
        }
    )


def save_duplicates_manifest(manifest: dict) -> None:
    manifest["cmsIntegration"] = CMS_INTEGRATION
    DUPLICATES_MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")


def move_to_duplicates(path: Path) -> Path:
    DUPLICATES_DIR.mkdir(exist_ok=True)
    dest = DUPLICATES_DIR / path.name
    if dest.exists():
        stem, suffix = path.stem, path.suffix
        counter = 2
        while dest.exists():
            dest = DUPLICATES_DIR / f"{stem}--{counter}{suffix}"
            counter += 1
    path.rename(dest)
    return dest


def main() -> int:
    apply = "--apply" in sys.argv
    publications = json.loads(PUBLICATIONS_PATH.read_text())

    new_files = [
        path
        for path in DOCUMENTS_DIR.glob("*.pdf")
        if path.name not in SKIP_FILES and is_legacy(path)
    ]
    new_files.sort(key=lambda path: (path.stat().st_mtime, path.name))

    failed: list[str] = []
    renames: list[tuple[Path, Path, dict]] = []
    duplicates: list[tuple[Path, Path, dict]] = []

    for path in new_files:
        publication = find_publication(path, publications)
        if not publication:
            failed.append(path.name)
            continue

        target = build_filename(publication)
        target_path = DOCUMENTS_DIR / target
        if path.resolve() == target_path.resolve():
            continue

        if target_path.exists():
            duplicates.append((path, target_path, publication))
            print(f"{target}")
            print(f"  {strip_markdown(publication['title'])[:90]}")
            print(f"  ← {path.name} (duplicate of existing file; will move to duplicates/)")
            print(f"  existing: {target_path.name}")
            continue

        renames.append((path, target_path, publication))
        print(f"{target}")
        print(f"  {strip_markdown(publication['title'])[:90]}")
        print(f"  ← {path.name}")

    print(
        f"\n{len(new_files)} new file(s), {len(renames)} rename(s), "
        f"{len(duplicates)} duplicate(s), {len(failed)} unmatched"
    )
    if failed:
        print("\nUnmatched new files:")
        for name in failed:
            print(f"  - {name}")

    if not renames and not duplicates:
        print("\nNothing to do.")
        return 0

    if not apply:
        print("\nDry run. Re-run with --apply to execute.")
        if duplicates:
            print(
                f"On apply, {len(duplicates)} new file(s) will move to "
                f"{DUPLICATES_DIR.relative_to(ROOT)}/ and "
                f"{DUPLICATES_MANIFEST.relative_to(ROOT)} will be updated."
            )
        return 0

    manifest = load_duplicates_manifest()
    moved = 0

    for source, target, publication in renames:
        source.rename(target)

    for source, target, publication in duplicates:
        duplicate_dest = move_to_duplicates(source)
        moved += 1
        record_duplicate(
            manifest,
            publication=publication,
            canonical_filename=target.name,
            new_upload_file=source.name,
            duplicate_path=f"/documents/duplicates/{duplicate_dest.name}",
        )

    if moved:
        save_duplicates_manifest(manifest)

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
