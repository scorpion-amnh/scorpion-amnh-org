import type { Publication } from "@/lib/content/schema";
import { lookupLocalPublicationPdf, type LocalPublicationPdfIndex } from "@/lib/publications/localPdf";

/**
 * Crossref and publisher metadata often label `/doi/pdf/` URLs as PDF links even when
 * they open an HTML landing page or paywall — the same destination as the DOI link.
 * Wiley serves open-access files at `/doi/pdfdirect/` instead.
 */
const PAYWALL_PDF_LANDING_PATTERNS = [
  /\/doi\/pdf\//i,
  /research\.amnh\.org/i,
  /book\/chapter-pdf/i,
  /academic\.oup\.com\/.+\/article-pdf\//i,
];

export const isDirectPublicationPdfUrl = (pdf: string): boolean => {
  const url = pdf.trim();
  if (!url) {
    return false;
  }

  return !PAYWALL_PDF_LANDING_PATTERNS.some((pattern) => pattern.test(url));
};

export const resolvePublicationPdfUrl = (pdf: string | null | undefined): string | null => {
  if (!pdf?.trim()) {
    return null;
  }

  return isDirectPublicationPdfUrl(pdf) ? pdf.trim() : null;
};

export const resolvePublicationPdf = (
  publication: Pick<Publication, "year" | "title" | "doi"> | null | undefined,
  storedPdf: string | null | undefined,
  localIndex?: LocalPublicationPdfIndex | null
): string | null => {
  if (publication && localIndex) {
    const localFromIndex = lookupLocalPublicationPdf(publication, localIndex);

    if (localFromIndex) {
      return localFromIndex;
    }
  }

  if (storedPdf?.trim().startsWith("/documents/")) {
    return null;
  }

  return resolvePublicationPdfUrl(storedPdf);
};
