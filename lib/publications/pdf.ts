/**
 * Crossref and publisher metadata often label `/doi/pdf/` URLs as PDF links even when
 * they open an HTML landing page or paywall — the same destination as the DOI link.
 * Wiley serves open-access files at `/doi/pdfdirect/` instead.
 */
const PAYWALL_PDF_LANDING_PATTERN = /\/doi\/pdf\//i;
const WILEY_DIRECT_PDF_PATTERN = /\/doi\/pdfdirect\//i;

export const isDirectPublicationPdfUrl = (pdf: string): boolean => {
  const url = pdf.trim();
  if (!url) {
    return false;
  }

  if (WILEY_DIRECT_PDF_PATTERN.test(url)) {
    return true;
  }

  return !PAYWALL_PDF_LANDING_PATTERN.test(url);
};

export const resolvePublicationPdfUrl = (pdf: string | null | undefined): string | null => {
  if (!pdf?.trim()) {
    return null;
  }

  return isDirectPublicationPdfUrl(pdf) ? pdf.trim() : null;
};
