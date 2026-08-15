import { existsSync, readdirSync } from "fs";
import path from "path";
import type { Publication } from "@/lib/content/schema";
import {
  buildPublicationPdfFilename,
  type LocalPublicationPdfIndex,
} from "@/lib/publications/localPdf";

const DOCUMENTS_DIR = path.join(process.cwd(), "public/documents");

let cachedDocumentFilenames: Set<string> | null = null;

export const loadDocumentFilenames = (): Set<string> => {
  if (cachedDocumentFilenames) {
    return cachedDocumentFilenames;
  }

  if (!existsSync(DOCUMENTS_DIR)) {
    cachedDocumentFilenames = new Set();
    return cachedDocumentFilenames;
  }

  cachedDocumentFilenames = new Set(
    readdirSync(DOCUMENTS_DIR).filter((filename) => filename.endsWith(".pdf"))
  );
  return cachedDocumentFilenames;
};

export const getLocalPublicationPdfPath = (
  publication: Publication,
  documentFilenames: Set<string> = loadDocumentFilenames()
): string | null => {
  const filename = buildPublicationPdfFilename(publication);

  if (!documentFilenames.has(filename)) {
    return null;
  }

  return `/documents/${filename}`;
};

export const buildLocalPublicationPdfIndex = (publications: Publication[]): LocalPublicationPdfIndex => {
  const documentFilenames = loadDocumentFilenames();
  const byDoi: Record<string, string> = {};
  const byYearTitle: Record<string, string> = {};

  for (const publication of publications) {
    const localPdf = getLocalPublicationPdfPath(publication, documentFilenames);

    if (!localPdf) {
      continue;
    }

    if (publication.doi) {
      byDoi[publication.doi] = localPdf;
    }

    byYearTitle[`${publication.year}::${publication.title}`] = localPdf;
  }

  return { byDoi, byYearTitle };
};
