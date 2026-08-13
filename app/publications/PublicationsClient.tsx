'use client';

import { CitationHtml } from "@/app/components/CitationHtml";
import { BackToTop } from "@/app/components/BackToTop";
import { formatInlineEmphasis, markdownEmphasisToHtml } from "@/app/components/InlineEmphasis";
import type { Publication } from "@/lib/content/schema";

type PublicationsClientProps = {
  publications: Publication[];
};

const formatAuthors = (authors: Publication["authors"]) =>
  authors.map((author, index) => {
    const name = author.name.replace(/^and\s+/i, "");
    const formattedName = author.isHighlighted ? <b key={`${name}-${index}`}>{name}</b> : name;

    if (index === 0) {
      return formattedName;
    }

    if (index === authors.length - 1) {
      return (
        <span key={`${name}-${index}`}>
          {authors.length === 2 ? " and " : ", and "}
          {formattedName}
        </span>
      );
    }

    return (
      <span key={`${name}-${index}`}>
        , {formattedName}
      </span>
    );
  });

const stripHtmlLinks = (html: string) =>
  html
    .replace(/\.\s*<a[^>]*href="[^"]*"[^>]*>[\s\S]*?<\/a>/gi, ".")
    .replace(/<a[^>]*href="[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "");

const extractLinksFromHtml = (html: string) => {
  const links = [...html.matchAll(/<a[^>]*href="(https?:\/\/[^"]*)"[^>]*>/gi)].map((match) => match[1]);
  let doi: string | undefined;
  let pdf: string | undefined;

  for (const href of links) {
    const lower = href.toLowerCase();
    if (lower.endsWith(".pdf") || lower.includes("/pdf/")) {
      pdf ??= href;
    } else {
      doi ??= href;
    }
  }

  return { doi, pdf };
};

const getPublicationLinks = (publication: Publication) => {
  const htmlLinks = publication.citationHtml
    ? extractLinksFromHtml(publication.citationHtml)
    : { doi: undefined, pdf: undefined };

  return {
    doi: publication.doi ?? htmlLinks.doi ?? null,
    pdf: publication.pdf ?? htmlLinks.pdf ?? null,
  };
};

const externalLinkLabel = (prefix: string, url: string) => `${prefix} (${url})`;

const PublicationAccessLink = ({ prefix, url }: { prefix: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-color-link hover:text-color-link-hover"
  >
    <span className="link-underline">{externalLinkLabel(prefix, url)}</span>
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
  </a>
);

const PublicationLinks = ({ doi, pdf }: { doi: string | null; pdf: string | null }) => {
  if (!doi && !pdf) {
    return null;
  }

  return (
    <div className="mt-1 space-y-1">
      {doi ? (
        <div>
          <PublicationAccessLink prefix="DOI" url={doi} />
        </div>
      ) : null}
      {pdf ? (
        <div>
          <PublicationAccessLink prefix="PDF" url={pdf} />
        </div>
      ) : null}
    </div>
  );
};

const formatCitation = (publication: Publication) => {
  const volumePages =
    publication.volume && publication.pages
      ? `${publication.volume}: ${publication.pages}`
      : publication.volume ?? publication.pages ?? null;

  return (
    <>
      {formatAuthors(publication.authors)} {publication.year}. {formatInlineEmphasis(publication.title)}
      {publication.journal ? (
        <>
          {" "}
          <b>{publication.journal}</b>
        </>
      ) : null}
      {volumePages ? <> {volumePages}.</> : null}
    </>
  );
};

export function PublicationsClient({ publications }: PublicationsClientProps) {
  const publicationsByYear = publications.reduce<Record<number, Publication[]>>(
    (groups, publication) => {
      groups[publication.year] ??= [];
      groups[publication.year].push(publication);
      return groups;
    },
    {}
  );

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-bold mb-12">Scientific Publications</h1>

        {years.map((year) => (
          <section key={year} className="mb-12">
            <h2 className="font-bold mb-6">{year}</h2>
            <div className="space-y-4">
              {publicationsByYear[year].map((publication, index) => {
                const links = getPublicationLinks(publication);

                return (
                  <div key={`${year}-${index}`}>
                    <p>
                      {publication.citationHtml ? (
                        <CitationHtml html={markdownEmphasisToHtml(stripHtmlLinks(publication.citationHtml))} />
                      ) : (
                        formatCitation(publication)
                      )}
                    </p>
                    <PublicationLinks doi={links.doi} pdf={links.pdf} />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <BackToTop />
    </div>
  );
}
