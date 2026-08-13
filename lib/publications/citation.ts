import type { Publication, PublicationAuthor } from "@/lib/content/schema";

export const PRENDINI_BIO_PATH = "/people/lorenzo-prendini";

export const getPublicationDetailPath = (slug: string) => `/publications/${slug}`;

export const getPublicationsYearHref = (year: number) => `/publications#${year}`;

export const stripMarkdownEmphasis = (text: string) =>
  text.replace(/\*\*((?:[^*]|\*(?!\*))+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

export const formatAuthorNamesPlain = (authors: PublicationAuthor[]) =>
  authors
    .map((author, index) => {
      const name = author.name.replace(/^and\s+/i, "");
      if (index === 0) {
        return name;
      }
      if (index === authors.length - 1) {
        return authors.length === 2 ? ` and ${name}` : `, and ${name}`;
      }
      return `, ${name}`;
    })
    .join("");

export const getVolumePages = (publication: Publication) => {
  if (publication.volume && publication.pages) {
    return `${publication.volume}: ${publication.pages}`;
  }

  return publication.volume ?? publication.pages ?? null;
};

export const formatPlainCitation = (publication: Publication, doi?: string | null) => {
  const title = stripMarkdownEmphasis(publication.title);
  const volumePages = getVolumePages(publication);
  const journal = publication.journal ? ` ${publication.journal}` : "";
  const volumePagesSuffix = volumePages ? ` ${volumePages}.` : ".";
  const doiSuffix = doi ? ` ${doi}` : "";

  return `${formatAuthorNamesPlain(publication.authors)} ${publication.year}. ${title}.${journal}${volumePagesSuffix}${doiSuffix}`.trim();
};

export const isPrendiniAuthor = (author: PublicationAuthor) =>
  author.isHighlighted && /prendini/i.test(author.name);

export const getAuthorLastName = (authorName: string): string => {
  const cleaned = stripMarkdownEmphasis(authorName.replace(/^and\s+/i, "").trim());
  const commaIndex = cleaned.indexOf(",");

  if (commaIndex !== -1) {
    return cleaned.slice(0, commaIndex).trim();
  }

  return cleaned.split(/\s+/)[0] ?? cleaned;
};

export const comparePublicationsByAuthor = (a: Publication, b: Publication): number => {
  const lastNameCompare = getAuthorLastName(a.authors[0]?.name ?? "").localeCompare(
    getAuthorLastName(b.authors[0]?.name ?? ""),
    undefined,
    { sensitivity: "base" }
  );

  if (lastNameCompare !== 0) {
    return lastNameCompare;
  }

  return stripMarkdownEmphasis(a.title).localeCompare(stripMarkdownEmphasis(b.title), undefined, {
    sensitivity: "base",
  });
};

export const sortPublicationsWithinYear = (publications: Publication[]): Publication[] =>
  [...publications].sort(comparePublicationsByAuthor);
