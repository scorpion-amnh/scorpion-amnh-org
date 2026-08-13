#!/usr/bin/env python3
"""Update publications.json with DOI and PDF links from the client docx file."""

from __future__ import annotations

import json
import re
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCX_PATH = ROOT / "content/publications-with-links-viii-2026.docx"
PUBLICATIONS_PATH = ROOT / "content/publications.json"
SUMMARY_PATH = ROOT / "content/publications-link-update-summary.txt"

# Docx entries that are genuinely new and not yet in publications.json.
NEW_ONLY_TITLES = {
    "evolution and biogeography of the widespread dragonfly genus orthetrum",
    "all genera of the world order scorpiones",
    "erratum all genera of the world orders solifugae and thelyphonida",
}


def normalize(text: str) -> str:
    text = text.lower()
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return " ".join(text.split())


def extract_title_from_citation(citation: str) -> str:
    match = re.search(r"\b(19|20)\d{2}(?:\s*\[[^\]]+\])?\.\s+(.+)", citation)
    if not match:
        return normalize(citation)
    rest = match.group(2)
    rest = re.sub(r"\s+\[Abstract\]\s*$", "", rest, flags=re.I)
    return normalize(rest)


def classify_url(url: str | None) -> tuple[str | None, str | None]:
    if not url:
        return None, None
    lower = url.lower()
    if lower.endswith(".pdf") or "/pdf/" in lower:
        return None, url
    return url, None


def parse_docx(path: Path) -> list[dict]:
    with zipfile.ZipFile(path) as zf:
        xml = zf.read("word/document.xml")
    root = ET.fromstring(xml)

    def paragraph_text(elem: ET.Element) -> str:
        chunks: list[str] = []
        for node in elem.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t"):
            if node.text:
                chunks.append(node.text)
            if node.tail:
                chunks.append(node.tail)
        return "".join(chunks)

    entries: list[dict] = []
    current_year: int | None = None

    for paragraph in root.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
        text = paragraph_text(paragraph).strip()
        if not text:
            continue
        if re.fullmatch(r"\d{4}", text):
            current_year = int(text)
            continue

        url_match = re.search(r"(https?://\S+)$", text)
        url = url_match.group(1).rstrip(".") if url_match else None
        citation = text[: url_match.start()].strip() if url_match else text
        doi, pdf = classify_url(url)

        entries.append(
            {
                "year": current_year,
                "citation": citation,
                "doi": doi,
                "pdf": pdf,
                "title_key": extract_title_from_citation(citation),
            }
        )

    return entries


def title_overlap(a: str, b: str) -> float:
    words_a = set(a.split())
    words_b = set(b.split())
    if not words_a or not words_b:
        return 0.0
    return len(words_a & words_b) / max(len(words_a), len(words_b))


def publication_title_keys(publication: dict) -> list[str]:
    keys = [normalize(publication.get("title", ""))]
    if publication.get("citationHtml"):
        keys.append(extract_title_from_citation(
            re.sub(r"<[^>]+>", "", publication["citationHtml"])
        ))
    return [key for key in keys if key]


def match_score(entry: dict, publication: dict) -> float:
    best = 0.0
    for pub_key in publication_title_keys(publication):
        score = title_overlap(entry["title_key"], pub_key)
        if score > best:
            best = score
    return best


def update_citation_html(html: str, doi: str | None, pdf: str | None) -> str:
    updated = html
    link_url = doi or pdf
    if not link_url:
        return updated
    link_text = doi if doi else "PDF"
    if re.search(r'href="[^"]+"', updated):
        updated = re.sub(r'(<a href=")[^"]+("[^>]*>)[^<]*(</a>)', rf"\1{link_url}\2{link_text}\3", updated, count=1)
    else:
        updated = f'{updated} <a href="{link_url}">{link_text}</a>'
    return updated


def parse_authors_from_citation(citation: str) -> list[dict]:
    year_match = re.search(r"\b(19|20)\d{2}(?:\s*\[[^\]]+\])?\.\s+", citation)
    if not year_match:
        return [{"name": "Prendini, L.", "isHighlighted": True}]
    author_text = citation[: year_match.start()].strip().rstrip(".")
    author_text = author_text.replace(", and ", ", ").replace(" and ", ", ")
    parts = [part.strip() for part in author_text.split(",") if part.strip()]
    authors: list[dict] = []
    for part in parts:
        if re.match(r"^[A-Z]\.", part):
            if authors:
                authors[-1]["name"] = f"{authors[-1]['name']}, {part}"
            continue
        authors.append(
            {
                "name": part,
                "isHighlighted": "prendini" in part.lower(),
            }
        )
    return authors or [{"name": "Prendini, L.", "isHighlighted": True}]


def parse_structured_fields(citation: str, year: int, doi: str | None, pdf: str | None) -> dict:
    remainder = re.sub(r"^.+?\b" + str(year) + r"(?:\s*\[[^\]]+\])?\.\s+", "", citation, count=1)
    journal = ""
    volume = None
    pages = None
    title = remainder.strip()

    journal_match = re.search(
        r"\.\s+([^.:]+(?:Journal|Review|Reports|Letters|Entomology|Diversity|Insects|Genes|Science|Cladistics|Zootaxa|Novitates|Arachnology|MegaTaxa|Bulletin|Systematic Entomology)[^.:]*?)\s+(\d+(?:\([^)]+\))?(?:\(suppl\.\))?)\s*:\s*(.+?)\.?\s*(?:\[Abstract\])?$",
        remainder,
        flags=re.I,
    )
    if journal_match:
        title = remainder[: journal_match.start()].strip()
        journal = journal_match.group(1).strip()
        volume = journal_match.group(2).strip()
        pages = journal_match.group(3).strip().rstrip(".")

    return {
        "year": year,
        "authors": parse_authors_from_citation(citation),
        "title": title,
        "journal": journal,
        "volume": volume,
        "pages": pages,
        "doi": doi,
        "pdf": pdf,
    }


def has_link(publication: dict) -> bool:
    if publication.get("doi") or publication.get("pdf"):
        return True
    html = publication.get("citationHtml", "")
    return bool(re.search(r'href="https?://', html))


def format_publication_label(publication: dict) -> str:
    title = publication.get("title") or "Untitled"
    journal = publication.get("journal") or ""
    if journal:
        return f"{title} — {journal}"
    return title


def main() -> None:
    publications: list[dict] = json.loads(PUBLICATIONS_PATH.read_text())
    docx_entries = parse_docx(DOCX_PATH)

    by_year: dict[int, list[tuple[int, dict]]] = {}
    for index, publication in enumerate(publications):
        by_year.setdefault(publication["year"], []).append((index, publication))

    updated: list[str] = []
    added: list[str] = []
    unmatched_docx: list[str] = []

    for entry in docx_entries:
        year = entry["year"]
        if year is None:
            unmatched_docx.append(entry["citation"])
            continue

        candidates = by_year.get(year, [])
        scored = sorted(
            ((index, publication, match_score(entry, publication)) for index, publication in candidates),
            key=lambda item: item[2],
            reverse=True,
        )

        best = scored[0] if scored else None
        if best and best[2] >= 0.45:
            index, publication, _score = best
            changes: list[str] = []

            if entry["doi"] and publication.get("doi") != entry["doi"]:
                publication["doi"] = entry["doi"]
                changes.append("DOI")
            if entry["pdf"] and publication.get("pdf") != entry["pdf"]:
                publication["pdf"] = entry["pdf"]
                changes.append("PDF")

            if publication.get("citationHtml"):
                new_html = update_citation_html(publication["citationHtml"], entry["doi"], entry["pdf"])
                if new_html != publication["citationHtml"]:
                    publication["citationHtml"] = new_html
                    changes.append("citationHtml")

            if changes:
                updated.append(f"- {format_publication_label(publication)} ({', '.join(changes)})")
            continue

        is_new = any(marker in entry["title_key"] for marker in NEW_ONLY_TITLES)
        if is_new:
            publication = parse_structured_fields(entry["citation"], year, entry["doi"], entry["pdf"])
            publications.append(publication)
            by_year.setdefault(year, []).append((len(publications) - 1, publication))
            added.append(entry["citation"])
        else:
            unmatched_docx.append(entry["citation"])

    publications.sort(key=lambda item: (-item["year"], normalize(item.get("title", ""))))

    missing_links: list[str] = []
    seen_missing: set[str] = set()
    for publication in publications:
        if has_link(publication):
            continue
        label = f"[{publication.get('year', '?')}] {format_publication_label(publication)}"
        if label in seen_missing:
            continue
        seen_missing.add(label)
        missing_links.append(f"- {label}")

    PUBLICATIONS_PATH.write_text(f"{json.dumps(publications, indent=2, ensure_ascii=False)}\n")

    summary_lines = [
        "Publications Link Update Summary",
        "================================",
        "",
        f"Source document: {DOCX_PATH.name}",
        "Date processed: August 13, 2026",
        "",
        "Overview",
        "--------",
        f"- Publications in site data after update: {len(publications)}",
        f"- Publications updated with new or changed links: {len(updated)}",
        f"- New publications added from source document: {len(added)}",
        f"- Publications still missing a DOI or PDF link: {len(missing_links)}",
        "",
    ]

    if updated:
        summary_lines.extend(["Updated publications", "--------------------", *updated, ""])
    if added:
        summary_lines.extend(["New publications added", "----------------------", *[f"- {item}" for item in added], ""])
    if unmatched_docx:
        summary_lines.extend(
            [
                "Source entries not matched to existing publications",
                "----------------------------------------------------",
                "These entries from the source document could not be matched automatically.",
                "They were not added to avoid creating duplicate listings.",
                "",
                *[f"- {item}" for item in unmatched_docx],
                "",
            ]
        )
    summary_lines.extend(
        [
            "Publications still needing a DOI or PDF link",
            "--------------------------------------------",
            "Please provide a DOI and/or PDF download link for each item below.",
            "",
            *missing_links,
            "",
            "Notes",
            "-----",
            "- DOI links from the source document have been applied wherever a confident match was found.",
            "- PDF-only links (newsletters, obituaries, etc.) are stored separately from DOI links.",
            "- Publications with complex formatted citations may still use custom HTML rendering on the site.",
        ]
    )

    SUMMARY_PATH.write_text("\n".join(summary_lines) + "\n")
    print(f"Updated {len(updated)} publications, added {len(added)}, {len(missing_links)} still missing links")
    print(f"Unmatched docx entries: {len(unmatched_docx)}")
    print(f"Wrote summary to {SUMMARY_PATH}")


if __name__ == "__main__":
    main()
