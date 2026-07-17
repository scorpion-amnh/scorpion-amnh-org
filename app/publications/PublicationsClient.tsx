'use client';

import { CitationHtml } from "@/app/components/CitationHtml";
import { BackToTop } from "@/app/components/BackToTop";
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

const formatCitation = (publication: Publication) => {
  const volumePages =
    publication.volume && publication.pages
      ? `${publication.volume}: ${publication.pages}`
      : publication.volume ?? publication.pages ?? null;

  return (
    <>
      {formatAuthors(publication.authors)} {publication.year}. {publication.title}
      {publication.journal ? (
        <>
          {" "}
          <b>{publication.journal}</b>
        </>
      ) : null}
      {volumePages ? <> {volumePages}</> : null}
      {publication.doi ? (
        <>
          {" "}
          <a
            href={publication.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {publication.doi}
          </a>
        </>
      ) : null}
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
        <h1 className="text-5xl font-bold mb-12 text-gray-900">Scientific Publications</h1>

        {years.map((year) => (
          <section key={year} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{year}</h2>
            <div className="space-y-4">
              {publicationsByYear[year].map((publication, index) => (
                <p key={`${year}-${index}`}>
                  {publication.citationHtml ? (
                    <CitationHtml html={publication.citationHtml} />
                  ) : (
                    formatCitation(publication)
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <BackToTop />
    </div>
  );
}
