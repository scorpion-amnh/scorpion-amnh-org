import Link from "next/link";

const actionButtonClassName =
  "inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-link";

export const outlinePublicationActionClassName = `${actionButtonClassName} border border-color-link bg-white text-color-link hover:bg-sky-50`;

export const CopyIcon = () => (
  <svg
    aria-hidden="true"
    className="inline-block h-3.5 w-3.5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const FileTextIcon = () => (
  <svg
    aria-hidden="true"
    className="inline-block h-3.5 w-3.5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    aria-hidden="true"
    className="inline-block h-3.5 w-3.5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    aria-hidden="true"
    className="inline-block h-3.5 w-3.5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
    />
  </svg>
);

type PublicationAccessButtonsProps = {
  abstractHref?: string | null;
  doi?: string | null;
  pdf?: string | null;
  className?: string;
};

export const PublicationAccessButtons = ({
  abstractHref,
  doi,
  pdf,
  className = "mt-2 flex flex-wrap items-center gap-3",
}: PublicationAccessButtonsProps) => {
  if (!abstractHref && !doi && !pdf) {
    return null;
  }

  return (
    <div className={className}>
      {abstractHref ? (
        <Link href={abstractHref} className={outlinePublicationActionClassName}>
          Details
          <FileTextIcon />
        </Link>
      ) : null}
      {doi ? (
        <a href={doi} target="_blank" rel="noopener noreferrer" className={outlinePublicationActionClassName}>
          DOI
          <ExternalLinkIcon />
        </a>
      ) : null}
      {pdf ? (
        <a href={pdf} target="_blank" rel="noopener noreferrer" className={outlinePublicationActionClassName}>
          PDF
          <DownloadIcon />
        </a>
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
