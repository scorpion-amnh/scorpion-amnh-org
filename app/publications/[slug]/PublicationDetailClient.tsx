"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { CitationTail } from "@/app/publications/CitationTail";
import { CitationDoiLink, CopyIcon, PublicationAccessButtons } from "@/app/publications/PublicationAccessButtons";
import { BackToTop } from "@/app/components/BackToTop";
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

const formatCitationDisplay = (publication: Publication, doi?: string | null): ReactNode => (
  <>
    {formatDetailAuthors(publication.authors)} {publication.year}. {formatInlineEmphasis(publication.title)}
    <CitationTail publication={publication} />
    {doi ? <> <CitationDoiLink doi={doi} /></> : null}
  </>
);

export function PublicationDetailClient({
  publication,
  detail,
}: PublicationDetailClientProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const citationText = formatPlainCitation(publication, detail.doi ?? null);
  const volumePages = getVolumePages(publication);
  const pdfUrl = detail.pdf ?? publication.pdf ?? null;

  const copyCitation = () => {
    void copyTextToClipboard(citationText).then((copied) => {
      setCopyState(copied ? "copied" : "error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    });
  };

  const copyCitationLabel =
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

        <header className="mb-10">
          <h1 className="mb-6 font-bold">{formatInlineEmphasis(publication.title)}</h1>

          <div className="space-y-4">
            <p>
              <span className="sr-only">Authors: </span>
              {formatDetailAuthors(publication.authors)}
            </p>

            <PublicationAccessButtons
              doi={detail.doi ?? publication.doi ?? null}
              pdf={pdfUrl}
              className="flex flex-wrap items-center gap-3 py-2"
            />

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
              <dt className="font-semibold text-color-primary">Citation</dt>
              <dd className="leading-relaxed">
                {formatCitationDisplay(publication, detail.doi ?? publication.doi ?? null)}
                <button
                  type="button"
                  onClick={copyCitation}
                  aria-label={copyCitationLabel}
                  title={copyCitationLabel}
                  className="ml-2.5 inline-flex shrink-0 cursor-pointer align-[-0.125em] text-color-link hover:text-color-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-link"
                >
                  <CopyIcon />
                </button>
              </dd>
            </dl>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-6 font-bold">Abstract</h2>
          <p className="text-lead">{formatInlineEmphasis(detail.abstract)}</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 font-bold">Keywords and Taxa</h2>
          <ul className="flush-list flex flex-wrap gap-2">
            {detail.keywords.map((keyword) => (
              <li key={keyword}>
                <span className="inline-block rounded-full bg-gray-50 px-3 py-1 text-sm text-color-secondary">
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
