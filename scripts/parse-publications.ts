import { promises as fs } from "fs";
import path from "path";

export type PublicationAuthor = { name: string; isHighlighted: boolean };

export type Publication = {
  year: number;
  authors: PublicationAuthor[];
  title: string;
  journal: string;
  volume: string | null;
  pages: string | null;
  doi: string | null;
  pdf?: string | null;
  citationHtml?: string;
};

const stripPublicationHtml = (html: string) =>
  html
    .replace(/\{' '\}/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>[\s\S]*?<\/a>/gi, (_, href) => {
      if (href.includes("doi.org") || href.includes("dx.doi.org")) {
        return ` DOI_LINK:${href} `;
      }
      return "";
    })
    .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

export { stripPublicationHtml };

const isInitialsOrSuffix = (token: string): boolean => {
  const stripped = token.replace(/\*\*/g, "").trim();
  return (
    /^[A-Z](?:\.[A-Z]\.?|-[A-Z]\.)*\.*\*?$/.test(stripped) || /^(?:Jr|Sr)\.?$/i.test(stripped)
  );
};

export const parseAuthors = (authorText: string): PublicationAuthor[] => {
  const normalized = authorText
    .replace(/,\s+and\s+/gi, ", ")
    .replace(/\s+and\s+/gi, ", ")
    .trim();

  const parts = normalized.split(/,\s*/).filter(Boolean);
  const groupedAuthors: string[] = [];
  let current = "";

  for (const part of parts) {
    if (!current) {
      current = part;
      continue;
    }

    const continuesEtAlBracket = current.includes("et al. [") && !/\]\s*$/.test(current);
    const continuesSurnameInitials =
      !current.includes(",") && /^[A-Z](?:\.[A-Z]\.?)*\.?\s*/.test(part);

    if (isInitialsOrSuffix(part) || continuesEtAlBracket || continuesSurnameInitials) {
      current += `, ${part}`;
    } else {
      groupedAuthors.push(current);
      current = part;
    }
  }

  if (current) {
    groupedAuthors.push(current);
  }

  return groupedAuthors.map((raw) => {
    const name = raw.replace(/\*\*/g, "").trim();
    return {
      name,
      isHighlighted: /\*\*/.test(raw) || /^Prendini,\s*L\.?\*?$/i.test(name),
    };
  });
};

const htmlToCitationHtml = (rawHtml: string): string =>
  rawHtml
    .replace(/\{' '\}/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\sclassName="[^"]*"/g, "")
    .replace(/\starget="[^"]*"/g, "")
    .replace(/\srel="[^"]*"/g, "")
    .replace(/\s+/g, " ")
    .trim();

const findPublicationYearIndex = (text: string, year: number): number => {
  const yearPattern = new RegExp(`\\b${year}\\b\\.\\s*`, "g");
  let match: RegExpExecArray | null;

  while ((match = yearPattern.exec(text)) !== null) {
    const before = text.slice(0, match.index).trimEnd();
    if (/\]\s*$/.test(before) || /[A-Z]\*?\.\s*$/.test(before) || /\*\*\s*$/.test(before)) {
      return match.index!;
    }
  }

  return -1;
};

const parseNonStandardCitation = (rawHtml: string, year: number, doi: string | null): Publication => {
  const text = stripPublicationHtml(rawHtml);
  const quotedTitleMatch = text.match(/"([^"]+)"/);
  const boldAuthorMatch = rawHtml.match(/<b>([^<]+)<\/b>/);
  const authorName = boldAuthorMatch?.[1].trim() ?? "Unknown";

  return {
    year,
    authors: [
      {
        name: authorName,
        isHighlighted: /\*\*/.test(text) || /^Prendini,\s*L\.?\*?$/i.test(authorName),
      },
    ],
    title: quotedTitleMatch?.[1] ?? text.slice(0, 120),
    journal: "",
    volume: null,
    pages: null,
    doi,
    citationHtml: htmlToCitationHtml(rawHtml),
  };
};

const parsePublicationParagraph = (rawHtml: string, year: number): Publication => {
  const text = stripPublicationHtml(rawHtml);
  const doiMatch = text.match(/DOI_LINK:([^\s]+)/);
  const doi = doiMatch ? doiMatch[1] : null;
  const withoutDoi = text.replace(/\s*DOI_LINK:[^\s]+\s*/g, " ").trim();

  const yearIndex = findPublicationYearIndex(withoutDoi, year);
  if (yearIndex === -1) {
    return parseNonStandardCitation(rawHtml, year, doi);
  }

  const authorPart = withoutDoi.slice(0, yearIndex).replace(/\.\s*$/, "").trim();
  const remainder = withoutDoi.slice(yearIndex + `${year}. `.length).trim();

  const authors = parseAuthors(authorPart);

  const journalBoldMatch = remainder.match(/\*\*([^*]+)\*\*\s*(.*)$/);
  let title = remainder;
  let journal = "";
  let volume: string | null = null;
  let pages: string | null = null;

  if (journalBoldMatch) {
    const beforeJournal = remainder.slice(0, journalBoldMatch.index).trim();
    title = beforeJournal.replace(/\.\s*$/, "").trim();
    journal = journalBoldMatch[1].trim();
    const afterJournal = journalBoldMatch[2].trim();

    const volumePagesMatch = afterJournal.match(/^(\d+(?:\([^)]+\))?(?:\(suppl\.\))?)\s*:\s*(.+?)\.?$/);
    if (volumePagesMatch) {
      volume = volumePagesMatch[1];
      pages = volumePagesMatch[2].replace(/\.$/, "");
    } else {
      const simpleVolumeMatch = afterJournal.match(/^(\d+(?:\([^)]+\))?)\s*(.*)$/);
      if (simpleVolumeMatch) {
        volume = simpleVolumeMatch[1] || null;
        pages = simpleVolumeMatch[2]?.replace(/^:\s*/, "").replace(/\.$/, "") || null;
      }
    }
  } else {
    title = remainder;
  }

  return { year, authors, title, journal, volume, pages, doi };
};

/** Parse a stored citationHtml field back into structured publication fields. */
export const parseStoredCitationHtml = (
  citationHtml: string
): Pick<Publication, "authors" | "title" | "journal" | "volume" | "pages"> => {
  const text = stripPublicationHtml(citationHtml)
    .replace(/\*contributed equally\*/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (/AccessScience|McGraw-Hill/i.test(text)) {
    const authorMatch = citationHtml.match(/<b>([^<]+)<\/b>/);
    const quotedTitle = text.match(/"([^"]+)"/)?.[1];

    return {
      authors: parseAuthors(authorMatch?.[1] ?? "Prendini, L."),
      title: quotedTitle ?? "Scorpiones",
      journal: "AccessScience, McGraw-Hill",
      volume: null,
      pages: null,
    };
  }

  const splitPatterns = [
    /^(.+?)\s+\d{4}\s*\[[^\]]+\]\.\s+([\s\S]+)$/,
    /^(.+?)\s*\(\d{4}\)\.\s+([\s\S]+)$/,
    /^(.+?)\s+\d{4}\.\s+([\s\S]+)$/,
  ] as const;

  let authorPart = "";
  let remainder = "";

  for (const pattern of splitPatterns) {
    const match = text.match(pattern);
    if (match) {
      authorPart = match[1].replace(/\.\s*$/, "").trim();
      remainder = match[2].trim();
      break;
    }
  }

  if (!remainder) {
    throw new Error(`Could not parse citationHtml: ${text.slice(0, 120)}`);
  }

  const authors = parseAuthors(authorPart);
  const journalBoldMatch = remainder.match(/\*\*([^*]+)\*\*\s*(.*)$/);

  if (!journalBoldMatch) {
    return {
      authors,
      title: remainder.replace(/\.\s*$/, "").trim(),
      journal: "",
      volume: null,
      pages: null,
    };
  }

  const title = remainder.slice(0, journalBoldMatch.index).replace(/\.\s*$/, "").trim();
  const journal = journalBoldMatch[1].trim();
  const afterJournal = journalBoldMatch[2].trim();

  const volumePagesMatch = afterJournal.match(/^(\d+(?:\([^)]+\))?(?:\(suppl\.\))?)\s*:\s*(.+?)\.?$/);
  if (volumePagesMatch) {
    return {
      authors,
      title,
      journal,
      volume: volumePagesMatch[1],
      pages: volumePagesMatch[2]
        .replace(/\.$/, "")
        .replace(/\s*DOI_LINK:.*$/i, "")
        .trim(),
    };
  }

  const simpleVolumeMatch = afterJournal.match(/^(\d+(?:\([^)]+\))?)\s*(.*)$/);
  if (simpleVolumeMatch) {
    return {
      authors,
      title,
      journal,
      volume: simpleVolumeMatch[1] || null,
      pages:
        simpleVolumeMatch[2]
          ?.replace(/^:\s*/, "")
          .replace(/\.$/, "")
          .replace(/\s*DOI_LINK:.*$/i, "")
          .trim() || null,
    };
  }

  return {
    authors,
    title,
    journal,
    volume: null,
    pages: null,
  };
};

export const parsePublications = async (root = process.cwd()): Promise<Publication[]> => {
  const publicationSource =
    process.env.PUBLICATIONS_SOURCE ?? path.join(root, "scripts/sources/publications.page.tsx.txt");
  const source = await fs.readFile(publicationSource, "utf8");
  const publications: Publication[] = [];
  const sectionRegex =
    /<section className="mb-12">\s*<h2[^>]*>(\d{4})<\/h2>\s*<div className="space-y-4">([\s\S]*?)<\/div>\s*<\/section>/g;

  let sectionMatch: RegExpExecArray | null;
  while ((sectionMatch = sectionRegex.exec(source)) !== null) {
    const year = Number(sectionMatch[1]);
    const body = sectionMatch[2];
    const paragraphRegex = /<p>([\s\S]*?)<\/p>/g;
    let paragraphMatch: RegExpExecArray | null;
    while ((paragraphMatch = paragraphRegex.exec(body)) !== null) {
      publications.push(parsePublicationParagraph(paragraphMatch[1], year));
    }
  }

  return publications;
};
