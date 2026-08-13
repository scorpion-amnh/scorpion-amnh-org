import { readFileSync } from "fs";
import path from "path";
import { z } from "zod";
import { publicationDetailSchema, type Publication, type PublicationDetail } from "@/lib/content/schema";
import { getPublications } from "@/lib/content";

const CONTENT_PATH = path.join(process.cwd(), "content/publication-details.json");

let cachedDetails: PublicationDetail[] | null = null;

const loadPublicationDetails = (): PublicationDetail[] => {
  if (cachedDetails) {
    return cachedDetails;
  }

  const parsed = JSON.parse(readFileSync(CONTENT_PATH, "utf8")) as unknown;
  const result = z.array(publicationDetailSchema).safeParse(parsed);
  if (!result.success) {
    throw new Error(`content/publication-details.json: ${result.error.message}`);
  }

  cachedDetails = result.data;
  return cachedDetails;
};

export const getPublicationDetails = () => loadPublicationDetails();

export const getPublicationDetailBySlug = (slug: string) =>
  loadPublicationDetails().find((detail) => detail.slug === slug) ?? null;

export const getPublicationDetailByDoi = (doi: string | null | undefined) => {
  if (!doi) {
    return null;
  }

  return loadPublicationDetails().find((detail) => detail.doi === doi) ?? null;
};

export const getPublicationDetailForPublication = (publication: Publication) => {
  if (publication.doi) {
    const byDoi = getPublicationDetailByDoi(publication.doi);
    if (byDoi) {
      return byDoi;
    }
  }

  return (
    loadPublicationDetails().find(
      (detail) => detail.year === publication.year && detail.title === publication.title
    ) ?? null
  );
};

export { getPublicationDetailPath } from "@/lib/publications/citation";

export const getPublicationForDetail = (detail: PublicationDetail): Publication | null => {
  if (detail.doi) {
    const byDoi = getPublications().find((publication) => publication.doi === detail.doi);
    if (byDoi) {
      return byDoi;
    }
  }

  if (detail.year !== undefined && detail.title) {
    return (
      getPublications().find(
        (publication) => publication.year === detail.year && publication.title === detail.title
      ) ?? null
    );
  }

  return null;
};

export const getPublicationDetailSlugs = () => loadPublicationDetails().map((detail) => detail.slug);
