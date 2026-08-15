import type { Publication } from "@/lib/content/schema";
import { stripMarkdownEmphasis } from "@/lib/publications/citation";

const MAX_FILENAME_LENGTH = 255;
const SEPARATOR = "--";

export type LocalPublicationPdfIndex = {
  byDoi: Record<string, string>;
  byYearTitle: Record<string, string>;
};

const normalizePublicationText = (value: string) =>
  stripMarkdownEmphasis(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();

export const slugifyPublicationText = (value: string) =>
  normalizePublicationText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "");

export const getPublicationAuthorSlug = (authorName: string) => {
  const normalized = normalizePublicationText(authorName.replace(/^and\s+/i, ""));

  if (normalized.includes(",")) {
    return normalized.split(",")[0]?.trim() ?? normalized;
  }

  const parts = normalized.split(/\s+/).filter(Boolean);
  return parts.at(-1) ?? normalized;
};

/** Matches `scripts/rename-pdfs-from-content.py` canonical document filenames. */
export const buildPublicationPdfFilename = (publication: Publication): string => {
  const authorSlug = slugifyPublicationText(getPublicationAuthorSlug(publication.authors[0]?.name ?? ""));
  const etAl = publication.authors.length > 1 ? `${SEPARATOR}et-al` : "";
  const suffix = `${SEPARATOR}${authorSlug}${etAl}.pdf`;
  const prefix = `${publication.year}${SEPARATOR}`;
  const maxTitleLength = MAX_FILENAME_LENGTH - prefix.length - suffix.length;
  let titleSlug = slugifyPublicationText(publication.title);

  if (titleSlug.length > maxTitleLength) {
    titleSlug = titleSlug.slice(0, maxTitleLength).replace(/-+$/, "");
  }

  return `${prefix}${titleSlug}${suffix}`;
};

export const lookupLocalPublicationPdf = (
  publication: Pick<Publication, "year" | "title" | "doi">,
  index: LocalPublicationPdfIndex
): string | null => {
  if (publication.doi && index.byDoi[publication.doi]) {
    return index.byDoi[publication.doi];
  }

  return index.byYearTitle[`${publication.year}::${publication.title}`] ?? null;
};
