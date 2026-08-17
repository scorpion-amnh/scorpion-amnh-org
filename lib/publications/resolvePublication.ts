import type { Publication, PublicationDetail } from "@/lib/content/schema";

export const getDatePublishedYear = (datePublished: string): number =>
  new Date(`${datePublished}T00:00:00`).getFullYear();

export const getDatePublishedMonthDay = (datePublished: string): { month: string; day: string } => {
  const [, month = "01", day = "01"] = datePublished.split("-");
  return { month, day };
};

/** Curated bibliography fields take precedence over API-enriched detail data. */
export const resolvePublicationDoi = (
  publication: Publication,
  detail: Pick<PublicationDetail, "doi">
): string | null => publication.doi ?? detail.doi ?? null;

export const resolvePublicationStoredPdf = (
  publication: Publication,
  detail: Pick<PublicationDetail, "pdf">
): string | null | undefined => publication.pdf ?? detail.pdf ?? null;

/**
 * Always use the curated bibliography year. When the detail year differs, keep its
 * month and day so the Published row still reflects available DOI metadata.
 */
export const resolveDatePublished = (
  publication: Publication,
  detail: Pick<PublicationDetail, "datePublished">
): string => {
  const { month, day } = getDatePublishedMonthDay(detail.datePublished);
  return `${publication.year}-${month}-${day}`;
};

export const isDatePublishedYearCorrected = (
  publication: Publication,
  detail: Pick<PublicationDetail, "datePublished">
): boolean => getDatePublishedYear(detail.datePublished) !== publication.year;

/** Structured metadata uses the same corrected publish date as the detail page. */
export const resolveDatePublishedForMetadata = (
  publication: Publication,
  detail: Pick<PublicationDetail, "datePublished">
): string => resolveDatePublished(publication, detail);

export type ResolvedPublicationDetailFields = {
  doi: string | null;
  pdf: string | null | undefined;
  datePublished: string;
  datePublishedForMetadata: string;
};

export const resolvePublicationDetailFields = (
  publication: Publication,
  detail: PublicationDetail
): ResolvedPublicationDetailFields => ({
  doi: resolvePublicationDoi(publication, detail),
  pdf: resolvePublicationStoredPdf(publication, detail),
  datePublished: resolveDatePublished(publication, detail),
  datePublishedForMetadata: resolveDatePublishedForMetadata(publication, detail),
});
