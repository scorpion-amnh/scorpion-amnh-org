"use client";

import Link from "next/link";
import { DownloadIcon } from "@/app/components/icons/DownloadIcon";
import { ExternalLinkIcon } from "@/app/components/icons/ExternalLinkIcon";
import { FileLinesIcon } from "@/app/components/icons/FileLinesIcon";
import { CorrectionTag } from "@/app/publications/CorrectionTag";
import { savePublicationsScrollPosition } from "@/lib/publications/publicationsScrollRestoration";
import { resolvePublicationPdfUrl } from "@/lib/publications/pdf";

const actionButtonClassName =
  "inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-link";

export const outlinePublicationActionClassName = `${actionButtonClassName} border border-color-link bg-white text-color-link hover:bg-sky-50`;

type PublicationAccessButtonsProps = {
  abstractHref?: string | null;
  doi?: string | null;
  pdf?: string | null;
  pdfCorrection?: boolean;
  className?: string;
};

export const PublicationAccessButtons = ({
  abstractHref,
  doi,
  pdf,
  pdfCorrection = false,
  className = "mt-2 flex flex-wrap items-center gap-3",
}: PublicationAccessButtonsProps) => {
  const pdfUrl = resolvePublicationPdfUrl(pdf);

  if (!abstractHref && !doi && !pdfUrl) {
    return null;
  }

  return (
    <div className={className}>
      {abstractHref ? (
        <Link
          href={abstractHref}
          className={outlinePublicationActionClassName}
          onClick={savePublicationsScrollPosition}
        >
          Details
          <FileLinesIcon />
        </Link>
      ) : null}
      {doi ? (
        <a href={doi} target="_blank" rel="noopener noreferrer" className={outlinePublicationActionClassName}>
          DOI
          <ExternalLinkIcon />
        </a>
      ) : null}
      {pdfUrl ? (
        <span className="inline-flex items-center gap-2">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={outlinePublicationActionClassName}>
            PDF
            <DownloadIcon />
          </a>
          {pdfCorrection ? <CorrectionTag /> : null}
        </span>
      ) : null}
    </div>
  );
};

export const CitationDoiLink = ({ doi }: { doi: string }) => (
  <a
    href={doi}
    target="_blank"
    rel="noopener noreferrer"
    className="text-inherit no-underline hover:text-color-link-hover hover:link-underline"
  >
    {doi}
  </a>
);
