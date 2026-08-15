import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { normalizeDoiAbstract, isPublicationAbstractPlaceholder } from "../lib/publications/abstract";
import { buildLocalPublicationPdfIndex, getLocalPublicationPdfPath } from "../lib/publications/localPdf.server";
import { isDirectPublicationPdfUrl } from "../lib/publications/pdf";
import type { Publication, PublicationDetail } from "../lib/content/schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLICATIONS_PATH = path.join(CONTENT_DIR, "publications.json");
const DETAILS_PATH = path.join(CONTENT_DIR, "publication-details.json");
const LOCAL_PDF_INDEX_PATH = path.join(CONTENT_DIR, "local-publication-pdfs.json");

export type SyncPublicationDetailsResult = {
  generated: number;
  total: number;
  missingBefore: number;
};

export type BackfillKeywordsResult = {
  updated: number;
  total: number;
};

type OpenAlexKeyword = { display_name: string; score: number };

const stripMarkdown = (text: string) =>
  text.replace(/\*\*((?:[^*]|\*(?!\*))+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/** Genus/species/subspecies names are the only taxa italicized per site convention, so any
 * italic span in a title or abstract can be treated as a taxon name. For binomials/trinomials,
 * emit both the full name and the bare genus, since scientists search for either. */
const extractTaxaFromItalics = (text: string): string[] => {
  const spans = [...text.matchAll(/\*([^*]+)\*/g)].map((match) => match[1].trim()).filter(Boolean);
  const taxa = new Set<string>();

  for (const span of spans) {
    const words = span.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      continue;
    }

    taxa.add(words[0]);
    if (words.length > 1) {
      taxa.add(words.join(" "));
    }
  }

  return [...taxa];
};

/** Family/superfamily/subfamily names are written in roman text (never italicized), so they
 * can be found directly via their conventional Latin suffixes. */
const extractHigherTaxaFromText = (plainText: string): string[] => {
  const matches = [...plainText.matchAll(/\b[A-Z][a-z]+(?:idae|inae|oidea|ini)\b/g)].map((match) => match[0]);
  return [...new Set(matches)];
};

/**
 * Common names overlap as substrings (e.g. "pseudoscorpion" contains "scorpion", "hooded
 * tick-spider" contains both "spider" and "tick"), so these are regex patterns with
 * boundaries/exclusions rather than plain substring hints, to avoid mistagging the order.
 */
const ORDER_HINTS: Array<[RegExp, string]> = [
  [/\bwhip spiders?\b/, "Amblypygi"],
  [/\bamblypygi\b/, "Amblypygi"],
  [/hooded tick-spiders?\b/, "Ricinulei"],
  [/\bricinulei\b/, "Ricinulei"],
  [/\bcamel spiders?\b/, "Solifugae"],
  [/\bsolifug/, "Solifugae"],
  [/(?<!tick-)(?<!whip )\bspiders?\b/, "Araneae"],
  [/\bharvestm(?:an|en)\b/, "Opiliones"],
  [/\bopilion/, "Opiliones"],
  [/\bpseudoscorpion/, "Pseudoscorpiones"],
  [/(?<!pseudo)(?<!whip )scorpion/, "Scorpiones"],
  [/\bpalpigrad/, "Palpigradi"],
  [/\bschizomid/, "Schizomida"],
  [/\bvinegaroons?\b/, "Thelyphonida"],
  [/\bwhip scorpions?\b/, "Thelyphonida"],
  [/\buropygi\b/, "Thelyphonida"],
  [/\bticks?\b(?!-spiders?)/, "Acari"],
  [/\bmites?\b/, "Acari"],
  [/\bacari\b/, "Acari"],
  [/\bodonata\b/, "Odonata"],
];

/** Research-action / nomenclatural-act terms are precisely what taxonomists search for
 * (e.g. "new species Buthidae", "phylogeny Scorpiones") - far more specific than generic
 * subject categories. Patterns are matched against lowercased title+abstract text. */
const NOMENCLATURAL_ACT_PATTERNS: Array<[RegExp, string[]]> = [
  [/\bsp\.\s*n(?:ov)?\.?\b/, ["new species", "taxonomy", "systematics"]],
  [/\bgen\.\s*n(?:ov)?\.?\b/, ["new genus", "taxonomy", "systematics"]],
  [/\bcomb\.\s*nov\.?\b/, ["new combination", "taxonomy"]],
  [/\bsyn\.\s*nov\.?\b|\bsynonym/, ["synonymy"]],
  [/redescri/, ["redescription"]],
  [/\brevision\b|\brevised\b/, ["taxonomic revision"]],
  [/checklist/, ["checklist"]],
  [/\bkey to\b|identification key/, ["identification key"]],
  [/type species/, ["type species"]],
  [/phylogen/, ["phylogeny"]],
  [/biogeograph/, ["biogeography"]],
  [/\btaxonom/, ["taxonomy"]],
  [/systematic/, ["systematics"]],
  [/envenomat/, ["envenomation"]],
  [/\bvenom/, ["venom"]],
  [/vicariance/, ["vicariance"]],
  [/cryptic species/, ["cryptic species"]],
  [/dna barcod/, ["DNA barcoding"]],
  [/mitochondrial/, ["mitochondrial DNA"]],
  [/\bendemi/, ["endemism"]],
  [/biodivers/, ["biodiversity"]],
];

const GEO_FEATURE_REGEX =
  /\b[A-Z][\p{L}'\u2019-]+(?:\s[A-Z][\p{L}'\u2019-]+){0,3}\s(?:Region|Province|Governorate|Mountains|Range|Plateau|Islands?|Desert|Peninsula|Valley|Basin)\b/gu;

const REGIONS = [
  "Middle East",
  "Horn of Africa",
  "North Africa",
  "West Africa",
  "East Africa",
  "Southern Africa",
  "Central Africa",
  "Sub-Saharan Africa",
  "Southeast Asia",
  "Central Asia",
  "South Asia",
  "East Asia",
  "North America",
  "South America",
  "Central America",
  "Caribbean",
  "Neotropics",
  "Palearctic",
  "Nearctic",
  "Afrotropics",
  "Australasia",
  "Oceania",
  "Mediterranean",
  "Arabian Peninsula",
  "Iberian Peninsula",
  "Indian Subcontinent",
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
  "Canada", "Chad", "Chile", "China", "Colombia", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Lithuania", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Mauritania", "Mauritius",
  "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman",
  "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Eswatini", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Côte d'Ivoire",
];

const DEMONYM_TO_COUNTRY: Record<string, string> = {
  afghan: "Afghanistan", algerian: "Algeria", american: "United States", angolan: "Angola",
  argentine: "Argentina", argentinian: "Argentina", australian: "Australia", austrian: "Austria",
  bangladeshi: "Bangladesh", belgian: "Belgium", bolivian: "Bolivia", botswanan: "Botswana",
  brazilian: "Brazil", british: "United Kingdom", bulgarian: "Bulgaria", burmese: "Myanmar",
  cameroonian: "Cameroon", canadian: "Canada", chadian: "Chad", chilean: "Chile", chinese: "China",
  colombian: "Colombia", congolese: "Congo", croatian: "Croatia", cuban: "Cuba",
  cypriot: "Cyprus", czech: "Czech Republic", danish: "Denmark", djiboutian: "Djibouti",
  dominican: "Dominican Republic", dutch: "Netherlands", ecuadorian: "Ecuador", egyptian: "Egypt",
  emirati: "United Arab Emirates", eritrean: "Eritrea", estonian: "Estonia", ethiopian: "Ethiopia",
  fijian: "Fiji", filipino: "Philippines", finnish: "Finland", french: "France", gabonese: "Gabon",
  gambian: "Gambia", georgian: "Georgia", german: "Germany", ghanaian: "Ghana", greek: "Greece",
  guatemalan: "Guatemala", guinean: "Guinea", guyanese: "Guyana", haitian: "Haiti",
  honduran: "Honduras", hungarian: "Hungary", icelandic: "Iceland", indian: "India",
  indonesian: "Indonesia", iranian: "Iran", iraqi: "Iraq", irish: "Ireland", israeli: "Israel",
  italian: "Italy", jamaican: "Jamaica", japanese: "Japan", jordanian: "Jordan",
  kazakh: "Kazakhstan", kenyan: "Kenya", korean: "South Korea", kuwaiti: "Kuwait",
  laotian: "Laos", latvian: "Latvia", lebanese: "Lebanon", liberian: "Liberia", libyan: "Libya",
  lithuanian: "Lithuania", malagasy: "Madagascar",
  malawian: "Malawi", malaysian: "Malaysia", malian: "Mali", mauritanian: "Mauritania",
  mexican: "Mexico", moldovan: "Moldova", mongolian: "Mongolia", montenegrin: "Montenegro",
  moroccan: "Morocco", mozambican: "Mozambique", namibian: "Namibia", nepalese: "Nepal",
  nicaraguan: "Nicaragua", nigerian: "Nigeria", nigerien: "Niger", norwegian: "Norway",
  omani: "Oman", pakistani: "Pakistan", panamanian: "Panama", paraguayan: "Paraguay",
  peruvian: "Peru", philippine: "Philippines", polish: "Poland", portuguese: "Portugal",
  qatari: "Qatar", romanian: "Romania", russian: "Russia", rwandan: "Rwanda",
  salvadoran: "El Salvador", saudi: "Saudi Arabia", senegalese: "Senegal", serbian: "Serbia",
  singaporean: "Singapore", slovak: "Slovakia", slovenian: "Slovenia", somali: "Somalia",
  spanish: "Spain", sudanese: "Sudan", surinamese: "Suriname", swazi: "Eswatini",
  swedish: "Sweden", swiss: "Switzerland", syrian: "Syria", taiwanese: "Taiwan",
  tajik: "Tajikistan", tanzanian: "Tanzania", thai: "Thailand", togolese: "Togo",
  tunisian: "Tunisia", turkish: "Turkey", turkmen: "Turkmenistan", ugandan: "Uganda",
  ukrainian: "Ukraine", uruguayan: "Uruguay", uzbek: "Uzbekistan", venezuelan: "Venezuela",
  vietnamese: "Vietnam", yemeni: "Yemen", zambian: "Zambia", zimbabwean: "Zimbabwe",
};

const OPENALEX_SCORE_THRESHOLD = 0.5;
const OPENALEX_KEYWORD_STOPLIST = new Set([
  "genus", "taxon", "fauna", "biology", "geography", "species", "animal", "organism", "population",
]);

const extractGeography = (plainText: string): string[] => {
  const found = new Set<string>();

  for (const match of plainText.matchAll(GEO_FEATURE_REGEX)) {
    found.add(match[0].replace(/^(?:The|A|An|In|Of|And|To|This|That|Its)\s+/, "").trim());
  }

  for (const region of REGIONS) {
    if (new RegExp(`\\b${escapeRegExp(region)}\\b`, "u").test(plainText)) {
      found.add(region);
    }
  }

  for (const country of COUNTRIES) {
    if (new RegExp(`\\b${escapeRegExp(country)}\\b`, "u").test(plainText)) {
      found.add(country);
    }
  }

  for (const [demonym, country] of Object.entries(DEMONYM_TO_COUNTRY)) {
    if (new RegExp(`\\b${capitalize(demonym)}\\b`).test(plainText)) {
      found.add(country);
    }
  }

  return [...found];
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
    keywords?: OpenAlexKeyword[];
    open_access?: { is_oa?: boolean };
    best_oa_location?: { pdf_url?: string | null };
  };
};

type BuildKeywordsOptions = {
  abstract?: string | null;
  subjects?: string[];
  openAlexKeywords?: OpenAlexKeyword[];
};

const MAX_KEYWORDS = 30;

/**
 * Tiered keyword strategy, ordered by how specifically it matches what scientists and
 * academics actually search for: full taxonomic backbone, then nomenclatural/research-act
 * terms, then geography, then broader topical enrichment from OpenAlex, then any publisher
 * subject categories. Journal name and publication year are deliberately excluded - they are
 * already shown as their own fields on the publication page and would only crowd out more
 * targeted search terms.
 */
export const buildKeywords = (publication: Publication, options: BuildKeywordsOptions = {}): string[] => {
  const { abstract, subjects = [], openAlexKeywords = [] } = options;

  const orderedKeywords: string[] = [];
  const seenKeys = new Set<string>();

  const add = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    const key = stripMarkdown(trimmed).toLowerCase();
    const existingIndex = orderedKeywords.findIndex(
      (keyword) => stripMarkdown(keyword).toLowerCase() === key
    );

    if (existingIndex === -1) {
      seenKeys.add(key);
      orderedKeywords.push(trimmed);
    } else if (trimmed.includes("*") && !orderedKeywords[existingIndex].includes("*")) {
      orderedKeywords[existingIndex] = trimmed;
    }
  };

  const rawText = `${publication.title} ${abstract ?? ""}`;
  const plainText = stripMarkdown(rawText);
  const lowerText = plainText.toLowerCase();

  add("Arachnida");
  for (const [pattern, order] of ORDER_HINTS) {
    if (pattern.test(lowerText)) {
      add(order);
    }
  }
  for (const family of extractHigherTaxaFromText(plainText)) {
    add(family);
  }
  for (const taxon of extractTaxaFromItalics(rawText)) {
    add(`*${taxon}*`);
  }

  for (const [pattern, terms] of NOMENCLATURAL_ACT_PATTERNS) {
    if (pattern.test(lowerText)) {
      for (const term of terms) {
        add(term);
      }
    }
  }

  for (const place of extractGeography(plainText)) {
    add(place);
  }

  for (const keyword of openAlexKeywords) {
    if (keyword.score < OPENALEX_SCORE_THRESHOLD) {
      continue;
    }

    const normalized = keyword.display_name?.trim();
    if (
      !normalized ||
      OPENALEX_KEYWORD_STOPLIST.has(normalized.toLowerCase()) ||
      normalized.includes("(") // OpenAlex sometimes attaches a mismatched disambiguation suffix, e.g. "Plateau (mathematics)"
    ) {
      continue;
    }

    add(normalized);
  }

  for (const subject of subjects) {
    add(subject);
  }

  return orderedKeywords.slice(0, MAX_KEYWORDS);
};

const findPdfLink = (
  crossref: Record<string, unknown> | null,
  openAlex: Awaited<ReturnType<typeof fetchOpenAlex>>,
  publication: Publication
) => {
  const localPdf = getLocalPublicationPdfPath(publication);
  if (localPdf) {
    return localPdf;
  }

  if (publication.pdf?.startsWith("/documents/")) {
    return publication.pdf;
  }

  if (
    publication.pdf &&
    isDirectPublicationPdfUrl(publication.pdf) &&
    openAlex?.open_access?.is_oa !== false
  ) {
    return publication.pdf;
  }

  const openAccessPdf = openAlex?.best_oa_location?.pdf_url;
  if (openAlex?.open_access?.is_oa && openAccessPdf && isDirectPublicationPdfUrl(openAccessPdf)) {
    return openAccessPdf;
  }

  // Crossref often lists publisher `/content/pdf/` URLs for closed-access articles even
  // though they redirect to a login/paywall page instead of serving a PDF.
  if (openAlex?.open_access?.is_oa === false) {
    return null;
  }

  const links = crossref?.link as Array<{ URL?: string }> | undefined;
  const pdfLink = links?.find((link) => /pdf/i.test(link.URL ?? ""))?.URL;

  if (pdfLink && isDirectPublicationPdfUrl(pdfLink)) {
    return pdfLink;
  }

  return null;
};

const buildDetailEntry = async (
  publication: Publication,
  usedSlugs: Set<string>
): Promise<PublicationDetail> => {
  const slug = slugify(publication.title, usedSlugs);
  let abstract: string | null = null;
  let datePublished = `${publication.year}-01-01`;
  let pdf = getLocalPublicationPdfPath(publication) ?? publication.pdf ?? null;
  let subjects: string[] = [];
  let openAlexKeywords: OpenAlexKeyword[] = [];

  if (publication.doi) {
    const doiId = getDoiId(publication.doi);
    const [crossref, openAlex] = await Promise.all([fetchCrossref(doiId), fetchOpenAlex(doiId)]);

    if (crossref?.abstract && typeof crossref.abstract === "string") {
      abstract = cleanAbstract(normalizeDoiAbstract(crossref.abstract));
    }

    const crossrefDate = formatCrossrefDate(crossref ?? {});
    if (crossrefDate) {
      datePublished = crossrefDate;
    }

    pdf = findPdfLink(crossref, openAlex, publication);

    subjects = ((crossref?.subject as string[] | undefined) ?? []).filter(Boolean);

    if (!abstract) {
      abstract = openAlexAbstract(openAlex?.abstract_inverted_index) ?? null;
      if (abstract) {
        abstract = cleanAbstract(abstract);
      }
    }

    openAlexKeywords = openAlex?.keywords ?? [];

    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  const entry: PublicationDetail = {
    slug,
    datePublished,
    keywords: buildKeywords(publication, { abstract, subjects, openAlexKeywords }),
  };

  if (abstract && !isPublicationAbstractPlaceholder(abstract)) {
    entry.abstract = abstract;
  }

  if (pdf) {
    entry.pdf = pdf;
  }

  return entry;
};

export const getPublicationsMissingDetails = (
  publications: Publication[],
  existingDetails: PublicationDetail[]
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

/** Map publications to local `/documents/` PDFs for runtime lookup. */
export const syncLocalPublicationPdfIndex = (): { mapped: number } => {
  const publications = JSON.parse(readFileSync(PUBLICATIONS_PATH, "utf8")) as Publication[];
  const index = buildLocalPublicationPdfIndex(publications);

  writeFileSync(LOCAL_PDF_INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${Object.keys(index.byYearTitle).length} local PDF mapping(s) to ${LOCAL_PDF_INDEX_PATH}`
  );

  return { mapped: Object.keys(index.byYearTitle).length };
};

/** Create detail entries for publications missing from publication-details.json. */
export const syncPublicationDetails = async (): Promise<SyncPublicationDetailsResult> => {
  const publications = JSON.parse(readFileSync(PUBLICATIONS_PATH, "utf8")) as Publication[];
  const existingDetails = JSON.parse(readFileSync(DETAILS_PATH, "utf8")) as PublicationDetail[];

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

  const generated: PublicationDetail[] = [];

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
  syncLocalPublicationPdfIndex();

  return {
    generated: generated.length,
    total: merged.length,
    missingBefore: targetPublications.length,
  };
};

const findPublicationForDetail = (
  detail: PublicationDetail,
  publications: Publication[]
): Publication | null => {
  if (detail.doi) {
    const byDoi = publications.find((publication) => publication.doi === detail.doi);
    if (byDoi) {
      return byDoi;
    }
  }

  if (detail.year !== undefined && detail.title) {
    return (
      publications.find(
        (publication) => publication.year === detail.year && publication.title === detail.title
      ) ?? null
    );
  }

  return null;
};

/** Merge new keywords into an existing list: never removes anything, appends genuinely new
 * terms, and upgrades a plain taxon keyword to its italicized form when the improved
 * algorithm identifies it as a genus/species name. */
const mergeKeywords = (existing: string[], additions: string[]): string[] => {
  const result = [...existing];
  const keyOf = (value: string) => stripMarkdown(value).toLowerCase();
  const indexByKey = new Map(result.map((keyword, index) => [keyOf(keyword), index]));

  for (const addition of additions) {
    const key = keyOf(addition);
    const existingIndex = indexByKey.get(key);

    if (existingIndex === undefined) {
      indexByKey.set(key, result.length);
      result.push(addition);
    } else if (addition.includes("*") && !result[existingIndex].includes("*")) {
      result[existingIndex] = addition;
    }
  }

  return result.slice(0, MAX_KEYWORDS);
};

/**
 * Re-run the tiered keyword strategy against every existing publication-details.json entry
 * (using its already-stored title/abstract, plus a fresh OpenAlex keywords lookup) and merge
 * any newly found keywords into the existing list without removing anything.
 */
export const backfillPublicationKeywords = async (): Promise<BackfillKeywordsResult> => {
  const publications = JSON.parse(readFileSync(PUBLICATIONS_PATH, "utf8")) as Publication[];
  const details = JSON.parse(readFileSync(DETAILS_PATH, "utf8")) as PublicationDetail[];

  let updated = 0;

  for (const [index, detail] of details.entries()) {
    const publication = findPublicationForDetail(detail, publications);

    if (!publication) {
      console.warn(`[${index + 1}/${details.length}] ${detail.slug}: no matching publication, skipping`);
      continue;
    }

    let openAlexKeywords: OpenAlexKeyword[] = [];

    if (detail.doi) {
      const openAlex = await fetchOpenAlex(getDoiId(detail.doi));
      openAlexKeywords = openAlex?.keywords ?? [];
      await new Promise((resolve) => setTimeout(resolve, 120));
    }

    const additions = buildKeywords(publication, {
      abstract: detail.abstract,
      subjects: [],
      openAlexKeywords,
    });

    const merged = mergeKeywords(detail.keywords, additions);

    if (merged.length !== detail.keywords.length || merged.some((kw, i) => kw !== detail.keywords[i])) {
      detail.keywords = merged;
      updated += 1;
    }

    console.log(`[${index + 1}/${details.length}] ${detail.slug}`);
  }

  writeFileSync(DETAILS_PATH, `${JSON.stringify(details, null, 2)}\n`, "utf8");
  console.log(`Backfilled keywords for ${updated}/${details.length} entries`);

  return { updated, total: details.length };
};

export type PruneKeywordsResult = {
  removed: number;
  entriesChanged: number;
  total: number;
};

const normalizeForComparison = (value: string) =>
  stripMarkdown(value)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Identifies legacy keywords that are not real search terms at all - journal names, bare
 * publication years, author names, or citation/title fragments left over from an earlier,
 * cruder version of this script. Never flags a keyword this script itself would produce
 * (e.g. italicized taxa), and is conservative about short/ambiguous matches (a publication
 * literally titled "Scorpiones" should keep that keyword).
 */
const isBadLegacyKeyword = (keyword: string, publication: Publication, journalNames: Set<string>): boolean => {
  if (keyword.startsWith("*")) {
    return false;
  }

  const plain = stripMarkdown(keyword);

  if (journalNames.has(plain)) {
    return true;
  }

  if (/^\d{4}$/.test(plain)) {
    return true;
  }

  const normalizedKeyword = normalizeForComparison(plain);

  const isAuthorName = publication.authors.some((author) => {
    const name = author.name.replace(/^and\s+/i, "");
    return plain === name || normalizedKeyword === normalizeForComparison(name);
  });
  if (isAuthorName) {
    return true;
  }

  const titleWordCount = normalizeForComparison(publication.title).split(" ").filter(Boolean).length;
  if (titleWordCount >= 4 && normalizedKeyword === normalizeForComparison(publication.title)) {
    return true;
  }

  if (plain.length > 70) {
    return true;
  }

  if (/\d{4}\s*\[\d{4}\]/.test(plain)) {
    return true;
  }

  if ((plain.match(/,/g) ?? []).length >= 2) {
    return true;
  }

  if (plain.split(/\s+/).filter(Boolean).length >= 6) {
    return true;
  }

  return false;
};

/**
 * Remove legacy keywords that are not genuine search terms (journal names, bare years,
 * author names, broken citation fragments, full title/sentence dumps). Runs across every
 * entry in publication-details.json; never removes an entry's last remaining keyword.
 */
export const pruneBadKeywords = (): PruneKeywordsResult => {
  const publications = JSON.parse(readFileSync(PUBLICATIONS_PATH, "utf8")) as Publication[];
  const details = JSON.parse(readFileSync(DETAILS_PATH, "utf8")) as PublicationDetail[];
  const journalNames = new Set(publications.map((publication) => publication.journal).filter(Boolean));

  let removed = 0;
  let entriesChanged = 0;

  for (const detail of details) {
    const publication = findPublicationForDetail(detail, publications);

    if (!publication) {
      continue;
    }

    const cleaned = detail.keywords.filter(
      (keyword) => !isBadLegacyKeyword(keyword, publication, journalNames)
    );

    if (cleaned.length === 0) {
      console.warn(`${detail.slug}: pruning would remove every keyword, skipping`);
      continue;
    }

    if (cleaned.length !== detail.keywords.length) {
      removed += detail.keywords.length - cleaned.length;
      entriesChanged += 1;
      detail.keywords = cleaned;
    }
  }

  writeFileSync(DETAILS_PATH, `${JSON.stringify(details, null, 2)}\n`, "utf8");
  console.log(`Removed ${removed} bad keyword(s) across ${entriesChanged}/${details.length} entries`);

  return { removed, entriesChanged, total: details.length };
};

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  const shouldBackfill = process.argv.includes("--backfill-keywords");
  const shouldPrune = process.argv.includes("--prune-keywords");
  const shouldSyncLocalPdfs = process.argv.includes("--sync-local-pdfs");
  const task = shouldSyncLocalPdfs
    ? Promise.resolve(syncLocalPublicationPdfIndex())
    : shouldPrune
      ? Promise.resolve(pruneBadKeywords())
      : shouldBackfill
        ? backfillPublicationKeywords()
        : syncPublicationDetails();

  task.catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
