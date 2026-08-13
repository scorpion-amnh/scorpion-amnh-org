'use client';

import { useEffect, useLayoutEffect } from "react";
import { CitationTail } from "@/app/publications/CitationTail";
import { PublicationAccessButtons } from "@/app/publications/PublicationAccessButtons";
import { CitationHtml } from "@/app/components/CitationHtml";
import { BackToTop } from "@/app/components/BackToTop";
import { formatInlineEmphasis, markdownEmphasisToHtml } from "@/app/components/InlineEmphasis";
import publicationDetails from "@/content/publication-details.json";
import type { Publication } from "@/lib/content/schema";
import { getPublicationDetailPath, sortPublicationsWithinYear } from "@/lib/publications/citation";

const publicationDetailSlugsByDoi = Object.fromEntries(
  publicationDetails
    .filter((detail) => detail.doi)
    .map((detail) => [detail.doi, detail.slug])
) as Record<string, string>;

const publicationDetailSlugsByYearTitle = Object.fromEntries(
  publicationDetails
    .filter((detail) => detail.year !== undefined && detail.title)
    .map((detail) => [`${detail.year}::${detail.title}`, detail.slug])
) as Record<string, string>;

const publicationDetailPdfByDoi = Object.fromEntries(
  publicationDetails
    .filter((detail) => detail.doi)
    .map((detail) => [detail.doi, detail.pdf ?? null])
) as Record<string, string | null>;

const publicationDetailPdfByYearTitle = Object.fromEntries(
  publicationDetails
    .filter((detail) => detail.year !== undefined && detail.title)
    .map((detail) => [`${detail.year}::${detail.title}`, detail.pdf ?? null])
) as Record<string, string | null>;

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

const getPublicationAccess = (publication: Publication) => {
  const htmlLinks = publication.citationHtml
    ? extractLinksFromHtml(publication.citationHtml)
    : { doi: undefined, pdf: undefined };
  const doi = publication.doi ?? htmlLinks.doi ?? null;
  const yearTitleKey = `${publication.year}::${publication.title}`;
  const detailSlug =
    (doi ? publicationDetailSlugsByDoi[doi] : undefined) ??
    publicationDetailSlugsByYearTitle[yearTitleKey];

  return {
    abstractHref: detailSlug ? getPublicationDetailPath(detailSlug) : null,
    doi,
    pdf:
      publication.pdf ??
      (doi ? publicationDetailPdfByDoi[doi] : publicationDetailPdfByYearTitle[yearTitleKey]) ??
      htmlLinks.pdf ??
      null,
  };
};

const formatCitation = (publication: Publication) => (
  <>
    {formatAuthors(publication.authors)} {publication.year}. {formatInlineEmphasis(publication.title)}
    <CitationTail publication={publication} />
  </>
);

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

  years.forEach((year) => {
    publicationsByYear[year] = sortPublicationsWithinYear(publicationsByYear[year]);
  });

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    document.getElementById(hash)?.scrollIntoView();
  }, []);

  useEffect(() => {
    const scrollToYearHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        return;
      }

      document.getElementById(hash)?.scrollIntoView();
    };

    window.addEventListener("hashchange", scrollToYearHash);
    return () => window.removeEventListener("hashchange", scrollToYearHash);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-bold mb-12">Scientific Publications</h1>

        {years.map((year) => (
          <section key={year} className="mb-12">
            <h2 id={String(year)} className="publications-year-heading mb-6 font-bold">
              {year}
            </h2>
            <div className="space-y-4">
              {publicationsByYear[year].map((publication, index) => {
                const access = getPublicationAccess(publication);

                return (
                  <div key={`${year}-${index}`}>
                    <p>
                      {publication.citationHtml ? (
                        <CitationHtml html={markdownEmphasisToHtml(stripHtmlLinks(publication.citationHtml))} />
                      ) : (
                        formatCitation(publication)
                      )}
                    </p>
                    <PublicationAccessButtons
                      abstractHref={access.abstractHref}
                      doi={access.doi}
                      pdf={access.pdf}
                    />
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
