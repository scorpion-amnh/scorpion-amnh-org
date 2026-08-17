import type { Publication, PublicationDetail } from "@/lib/content/schema";
import { stripMarkdownEmphasis } from "@/lib/publications/citation";

export const CORRECTION_TOOLTIP = "Correction differs from DOI record";

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

export type PublicationDetailCorrections = {
  title: boolean;
  year: boolean;
  datePublished: boolean;
  doi: boolean;
  pdf: boolean;
};

const valuesDiffer = (left: string | null | undefined, right: string | null | undefined): boolean =>
  Boolean(left && right && left !== right);

/** Flags metadata that differs from DOI-sourced detail data but is shown from the bibliography. */
export const getPublicationDetailCorrections = (
  publication: Publication,
  detail: PublicationDetail
): PublicationDetailCorrections => {
  const resolved = resolvePublicationDetailFields(publication, detail);

  return {
    title: Boolean(
      detail.title &&
        stripMarkdownEmphasis(publication.title) !== stripMarkdownEmphasis(detail.title)
    ),
    year:
      isDatePublishedYearCorrected(publication, detail) ||
      (detail.year !== undefined && detail.year !== publication.year),
    datePublished: resolved.datePublished !== detail.datePublished,
    doi: valuesDiffer(publication.doi, detail.doi),
    pdf: valuesDiffer(publication.pdf, detail.pdf),
  };
};
