import { readFileSync, writeFileSync } from "fs";
import path from "path";
import type { Publication } from "../lib/content/schema";
import { parseStoredCitationHtml } from "./parse-publications";

const PUBLICATIONS_PATH = path.join(process.cwd(), "content/publications.json");
const DETAILS_PATH = path.join(process.cwd(), "content/publication-details.json");

const needsRepair = (publication: Publication) =>
  Boolean(
    publication.citationHtml &&
      (!publication.journal?.trim() ||
        /DOI_LINK:/i.test(publication.pages ?? "") ||
        /^[A-ZÁÉÍÓÚÄÖÜ][A-Za-zÁÉÍÓÚäöüß\-]+,\s*[A-Z]/.test(publication.title.trim()) ||
        /^\*\*Prendini,\s*L\.\*\*/.test(publication.title.trim()))
  );

const stripMarkdown = (text: string) =>
  text.replace(/\*\*((?:[^*]|\*(?!\*))+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

const slugify = (title: string) =>
  stripMarkdown(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 55)
    .replace(/-+$/g, "");

const main = () => {
  const publications = JSON.parse(readFileSync(PUBLICATIONS_PATH, "utf8")) as Publication[];
  const details = JSON.parse(readFileSync(DETAILS_PATH, "utf8")) as Array<{
    slug: string;
    doi?: string;
    year?: number;
    title?: string;
  }>;

  const usedSlugs = new Set(details.map((detail) => detail.slug));
  let repaired = 0;

  for (const publication of publications) {
    if (!publication.citationHtml || !needsRepair(publication)) {
      continue;
    }

    const parsed = parseStoredCitationHtml(publication.citationHtml);
    publication.authors = parsed.authors;
    publication.title = parsed.title;
    publication.journal = parsed.journal;
    publication.volume = parsed.volume;
    publication.pages = parsed.pages;
    repaired += 1;

    console.log(`Repaired [${publication.year}] ${parsed.title.slice(0, 70)}`);

    const detail = details.find(
      (entry) =>
        (entry.doi && entry.doi === publication.doi) ||
        (entry.year === publication.year && entry.title === publication.title)
    );

    if (!detail) {
      continue;
    }

    const nextSlug = slugify(parsed.title);
    if (detail.slug !== nextSlug && !usedSlugs.has(nextSlug)) {
      usedSlugs.delete(detail.slug);
      console.log(`  slug: ${detail.slug} -> ${nextSlug}`);
      detail.slug = nextSlug;
      usedSlugs.add(nextSlug);
    }

    if (detail.title) {
      detail.title = publication.title;
    }
  }

  writeFileSync(PUBLICATIONS_PATH, `${JSON.stringify(publications, null, 2)}\n`, "utf8");
  writeFileSync(DETAILS_PATH, `${JSON.stringify(details, null, 2)}\n`, "utf8");
  console.log(`Repaired ${repaired} publications.`);
};

main();
