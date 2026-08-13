import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { normalizeDoiAbstract } from "../lib/publications/abstract";
import type { Publication } from "../lib/content/schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLICATIONS_PATH = path.join(CONTENT_DIR, "publications.json");
const DETAILS_PATH = path.join(CONTENT_DIR, "publication-details.json");

export type PublicationDetailEntry = {
  slug: string;
  doi?: string;
  year?: number;
  title?: string;
  datePublished: string;
  pdf?: string | null;
  abstract: string;
  keywords: string[];
};

export type SyncPublicationDetailsResult = {
  generated: number;
  total: number;
  missingBefore: number;
};

const stripMarkdown = (text: string) =>
  text.replace(/\*\*((?:[^*]|\*(?!\*))+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

const extractTaxaFromTitle = (title: string) => {
  const matches = [...title.matchAll(/\*([^*]+)\*/g)].map((match) => match[1].trim());
  return matches.filter((value, index, array) => array.indexOf(value) === index);
};

const slugify = (title: string, usedSlugs: Set<string>) => {
  const base = stripMarkdown(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 55)
    .replace(/-+$/g, "");

  let slug = base || "publication";
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(slug);
  return slug;
};

const cleanAbstract = (abstract: string) =>
  abstract
    .replace(/^abstract\s*/i, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const getDoiId = (doi: string) => doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");

const formatCrossrefDate = (message: Record<string, unknown>): string | null => {
  const date =
    (message["published-print"] as { "date-parts"?: number[][] } | undefined) ??
    (message["published-online"] as { "date-parts"?: number[][] } | undefined) ??
    (message.issued as { "date-parts"?: number[][] } | undefined);
  const parts = date?.["date-parts"]?.[0];

  if (!parts?.length) {
    return null;
  }

  const [year, month = 1, day = 1] = parts;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const openAlexAbstract = (invertedIndex: Record<string, number[]> | undefined) => {
  if (!invertedIndex) {
    return null;
  }

  const words: Record<number, string> = {};
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const position of positions) {
      words[position] = word;
    }
  }

  const max = Math.max(...Object.keys(words).map(Number));
  return Array.from({ length: max + 1 }, (_, index) => words[index] ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

const fetchCrossref = async (doiId: string) => {
  const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doiId)}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { message?: Record<string, unknown> };
  return payload.message ?? null;
};

const fetchOpenAlex = async (doiId: string) => {
  const response = await fetch(`https://api.openalex.org/works/https://doi.org/${encodeURIComponent(doiId)}`);

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as {
    abstract_inverted_index?: Record<string, number[]>;
  };
};

const buildFallbackAbstract = (publication: Publication) => {
  const plainTitle = stripMarkdown(publication.title);
  const journal = publication.journal ? ` Published in ${publication.journal}.` : "";

  if (/in memoriam|in memory|tribute|platnick/i.test(plainTitle)) {
    return `A memorial tribute honoring Dr. Norman I. Platnick (1951–2020), renowned arachnologist and Curator Emeritus at the American Museum of Natural History.${journal}`;
  }

  if (/expedition|field report/i.test(plainTitle)) {
    return `A field report documenting arachnological research and observations from the expedition described in the title.${journal}`;
  }

  return `This publication presents research on ${plainTitle.charAt(0).toLowerCase()}${plainTitle.slice(1)}.${journal}`;
};

const buildKeywords = (publication: Publication, subjects: string[] = []) => {
  const keywords = new Set<string>();

  for (const taxon of extractTaxaFromTitle(publication.title)) {
    keywords.add(taxon);
  }

  if (publication.journal) {
    keywords.add(publication.journal);
  }

  keywords.add(String(publication.year));

  for (const subject of subjects) {
    if (subject.trim()) {
      keywords.add(subject.trim());
    }
  }

  const title = stripMarkdown(publication.title).toLowerCase();
  const topicHints = [
    ["scorpion", "Scorpiones"],
    ["amblypygi", "Amblypygi"],
    ["ricinulei", "Ricinulei"],
    ["solifug", "Solifugae"],
    ["spider", "Araneae"],
    ["odonata", "Odonata"],
    ["phylogen", "phylogeny"],
    ["biogeograph", "biogeography"],
    ["taxonomy", "taxonomy"],
    ["systematic", "systematics"],
  ] as const;

  for (const [hint, keyword] of topicHints) {
    if (title.includes(hint)) {
      keywords.add(keyword);
    }
  }

  if (keywords.size === 0) {
    keywords.add("Arachnida");
  }

  return [...keywords].slice(0, 12);
};

const findPdfLink = (message: Record<string, unknown> | null, publication: Publication) => {
  if (publication.pdf) {
    return publication.pdf;
  }

  const links = message?.link as Array<{ URL?: string }> | undefined;
  const pdfLink = links?.find((link) => /pdf/i.test(link.URL ?? ""))?.URL;

  return pdfLink ?? null;
};

const buildDetailEntry = async (
  publication: Publication,
  usedSlugs: Set<string>
): Promise<PublicationDetailEntry> => {
  const slug = slugify(publication.title, usedSlugs);
  let abstract: string | null = null;
  let datePublished = `${publication.year}-01-01`;
  let pdf = publication.pdf ?? null;
  let subjects: string[] = [];

  if (publication.doi) {
    const doiId = getDoiId(publication.doi);
    const crossref = await fetchCrossref(doiId);

    if (crossref?.abstract && typeof crossref.abstract === "string") {
      abstract = cleanAbstract(normalizeDoiAbstract(crossref.abstract));
    }

    const crossrefDate = formatCrossrefDate(crossref ?? {});
    if (crossrefDate) {
      datePublished = crossrefDate;
    }

    pdf = findPdfLink(crossref, publication);

    subjects = ((crossref?.subject as string[] | undefined) ?? []).filter(Boolean);

    if (!abstract) {
      const openAlex = await fetchOpenAlex(doiId);
      abstract = openAlexAbstract(openAlex?.abstract_inverted_index) ?? null;
      if (abstract) {
        abstract = cleanAbstract(abstract);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  if (!abstract) {
    abstract = buildFallbackAbstract(publication);
  }

  const entry: PublicationDetailEntry = {
    slug,
    datePublished,
    abstract,
    keywords: buildKeywords(publication, subjects),
  };

  if (pdf) {
    entry.pdf = pdf;
  }

  return entry;
};

export const getPublicationsMissingDetails = (
  publications: Publication[],
  existingDetails: PublicationDetailEntry[]
): Publication[] => {
  const doiUsageCount = publications.reduce<Map<string, number>>((counts, publication) => {
    if (publication.doi) {
      counts.set(publication.doi, (counts.get(publication.doi) ?? 0) + 1);
    }
    return counts;
  }, new Map());

  const existingDois = new Set(existingDetails.map((detail) => detail.doi).filter(Boolean));
  const existingKeys = new Set(
    existingDetails
      .filter((detail) => detail.year && detail.title)
      .map((detail) => `${detail.year}::${detail.title}`)
  );

  const hasExistingDetail = (publication: Publication) => {
    if (existingKeys.has(`${publication.year}::${publication.title}`)) {
      return true;
    }

    return Boolean(
      publication.doi &&
        doiUsageCount.get(publication.doi) === 1 &&
        existingDois.has(publication.doi)
    );
  };

  return publications.filter((publication) => !hasExistingDetail(publication));
};

/** Create detail entries for publications missing from publication-details.json. */
export const syncPublicationDetails = async (): Promise<SyncPublicationDetailsResult> => {
  const publications = JSON.parse(readFileSync(PUBLICATIONS_PATH, "utf8")) as Publication[];
  const existingDetails = JSON.parse(readFileSync(DETAILS_PATH, "utf8")) as PublicationDetailEntry[];

  const doiUsageCount = publications.reduce<Map<string, number>>((counts, publication) => {
    if (publication.doi) {
      counts.set(publication.doi, (counts.get(publication.doi) ?? 0) + 1);
    }
    return counts;
  }, new Map());

  const usedSlugs = new Set(existingDetails.map((detail) => detail.slug));
  const targetPublications = getPublicationsMissingDetails(publications, existingDetails);

  if (targetPublications.length === 0) {
    return {
      generated: 0,
      total: existingDetails.length,
      missingBefore: 0,
    };
  }

  console.log(`Generating ${targetPublications.length} publication detail entries...`);

  const generated: PublicationDetailEntry[] = [];

  for (const [index, publication] of targetPublications.entries()) {
    const entry = await buildDetailEntry(publication, usedSlugs);

    if (publication.doi && doiUsageCount.get(publication.doi) === 1) {
      entry.doi = publication.doi;
    } else {
      entry.year = publication.year;
      entry.title = publication.title;
    }

    generated.push(entry);
    console.log(`[${index + 1}/${targetPublications.length}] ${entry.slug}`);
  }

  const merged = [...existingDetails, ...generated].sort((a, b) => {
    const yearA = publications.find((publication) => publication.doi === a.doi)?.year ?? a.year ?? 0;
    const yearB = publications.find((publication) => publication.doi === b.doi)?.year ?? b.year ?? 0;

    if (yearA !== yearB) {
      return yearB - yearA;
    }

    return a.slug.localeCompare(b.slug);
  });

  writeFileSync(DETAILS_PATH, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`Wrote ${merged.length} total entries to ${DETAILS_PATH}`);

  return {
    generated: generated.length,
    total: merged.length,
    missingBefore: targetPublications.length,
  };
};

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  syncPublicationDetails().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
