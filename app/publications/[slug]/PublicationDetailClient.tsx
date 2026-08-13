"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { CitationTail } from "@/app/publications/CitationTail";
import { BackToTop } from "@/app/components/BackToTop";
import { ExternalLink } from "@/app/components/ExternalLink";
import { formatInlineEmphasis } from "@/app/components/InlineEmphasis";
import type { Publication, PublicationDetail } from "@/lib/content/schema";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import {
  formatPlainCitation,
  getVolumePages,
  isPrendiniAuthor,
  PRENDINI_BIO_PATH,
  getPublicationsYearHref,
} from "@/lib/publications/citation";

type PublicationDetailClientProps = {
  publication: Publication;
  detail: PublicationDetail;
};

const formatDetailAuthors = (authors: Publication["authors"]) =>
  authors.map((author, index) => {
    const name = author.name.replace(/^and\s+/i, "");
    const formattedName = isPrendiniAuthor(author) ? (
      <Link
        key={`${name}-${index}`}
        href={PRENDINI_BIO_PATH}
        className="font-bold text-color-link hover:text-color-link-hover link-underline"
      >
        {name}
      </Link>
    ) : author.isHighlighted ? (
      <b key={`${name}-${index}`}>{name}</b>
    ) : (
      name
    );

    if (index === 0) {
      return <span key={`${name}-${index}-wrap`}>{formattedName}</span>;
    }

    if (index === authors.length - 1) {
      return (
        <span key={`${name}-${index}-wrap`}>
          {authors.length === 2 ? " and " : ", and "}
          {formattedName}
        </span>
      );
    }

    return (
      <span key={`${name}-${index}-wrap`}>
        , {formattedName}
      </span>
    );
  });

const CopyIcon = () => (
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

const actionButtonClassName =
  "inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-link";

const outlineActionButtonClassName = `${actionButtonClassName} border border-color-link bg-white text-color-link hover:bg-sky-50`;

const primaryActionButtonClassName = `${actionButtonClassName} bg-color-link text-white hover:bg-color-link-hover`;

const formatCitationDisplay = (publication: Publication): ReactNode => (
  <>
    {formatDetailAuthors(publication.authors)} {publication.year}. {formatInlineEmphasis(publication.title)}
    <CitationTail publication={publication} />
  </>
);

export function PublicationDetailClient({
  publication,
  detail,
}: PublicationDetailClientProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const citationText = formatPlainCitation(publication, detail.doi);
  const volumePages = getVolumePages(publication);
  const pdfUrl = detail.pdf ?? publication.pdf ?? null;

  const copyCitation = () => {
    void copyTextToClipboard(citationText).then((copied) => {
      setCopyState(copied ? "copied" : "error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    });
  };

  const copyButtonLabel =
    copyState === "copied" ? "Citation copied" : copyState === "error" ? "Copy failed" : "Copy citation";

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-meta">
          <ol className="flush-list flex flex-wrap items-center gap-2">
            <li>
              <Link href="/publications" className="text-color-link hover:text-color-link-hover link-underline">
                Publications
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={getPublicationsYearHref(publication.year)}
                className="text-color-link hover:text-color-link-hover link-underline"
              >
                {publication.year}
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-200 pb-8">
          <h1 className="mb-6 font-bold">{formatInlineEmphasis(publication.title)}</h1>

          <div className="space-y-4">
            <p>
              <span className="sr-only">Authors: </span>
              {formatDetailAuthors(publication.authors)}
            </p>

            <dl className="grid gap-3 text-meta sm:grid-cols-[auto_1fr] sm:gap-x-6">
              {publication.journal ? (
                <>
                  <dt className="font-semibold text-color-primary">Journal</dt>
                  <dd>{publication.journal}</dd>
                </>
              ) : null}
              {volumePages ? (
                <>
                  <dt className="font-semibold text-color-primary">Volume and pages</dt>
                  <dd>{volumePages}</dd>
                </>
              ) : null}
              <dt className="font-semibold text-color-primary">Year</dt>
              <dd>{publication.year}</dd>
              {detail.datePublished ? (
                <>
                  <dt className="font-semibold text-color-primary">Published</dt>
                  <dd>
                    {new Date(`${detail.datePublished}T00:00:00`).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </>
              ) : null}
            </dl>

            <p className="text-meta leading-relaxed">
              {formatCitationDisplay(publication)}{" "}
              <ExternalLink href={detail.doi}>{detail.doi}</ExternalLink>
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={copyCitation}
                className={outlineActionButtonClassName}
              >
                {copyButtonLabel}
                <CopyIcon />
              </button>
              <a
                href={detail.doi}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineActionButtonClassName}
              >
                DOI
                <ExternalLinkIcon />
              </a>
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryActionButtonClassName}
                >
                  Download PDF
                  <DownloadIcon />
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 font-bold">Abstract</h2>
          <p className="text-lead">{formatInlineEmphasis(detail.abstract)}</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-bold">Keywords &amp; Taxa</h2>
          <ul className="flush-list flex flex-wrap gap-2">
            {detail.keywords.map((keyword) => (
              <li key={keyword}>
                <span className="inline-block rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-color-secondary">
                  {keyword}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <BackToTop />
    </div>
  );
}
