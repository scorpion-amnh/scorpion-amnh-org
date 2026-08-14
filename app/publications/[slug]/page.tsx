import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/app/components/JsonLd";
import { SITE_URL } from "@/lib/metadata";
import { stripMarkdownEmphasis } from "@/lib/publications/citation";
import { hasPublicationAbstract } from "@/lib/publications/abstract";
import {
  getPublicationDetailBySlug,
  getPublicationDetailSlugs,
  getPublicationForDetail,
} from "@/lib/publications/details";
import { getPeople } from "@/lib/content";
import { buildAuthorProfileLookup } from "@/lib/publications/authorProfiles";
import { getPublicationDetailPath } from "@/lib/publications/citation";
import { PublicationDetailClient } from "./PublicationDetailClient";

type PublicationDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  getPublicationDetailSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: PublicationDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const detail = getPublicationDetailBySlug(slug);
  const publication = detail ? getPublicationForDetail(detail) : null;

  if (!detail || !publication) {
    return { title: "Publication Not Found" };
  }

  const title = stripMarkdownEmphasis(publication.title);
  const pageTitle = `${title} | Arachnology at AMNH`;
  const plainAbstract = hasPublicationAbstract(detail.abstract)
    ? stripMarkdownEmphasis(detail.abstract)
    : "";
  const description =
    plainAbstract.length > 0
      ? plainAbstract.slice(0, 300).trimEnd() + (plainAbstract.length > 300 ? "…" : "")
      : `${title}. ${publication.journal ? `${publication.journal}. ` : ""}${publication.year}.`;
  const path = getPublicationDetailPath(slug);
  const url = `${SITE_URL}${path}`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: "Arachnology at AMNH",
      type: "article",
      publishedTime: detail.datePublished,
      authors: publication.authors.map((author) => author.name.replace(/^and\s+/i, "")),
    },
    keywords: detail.keywords.map(stripMarkdownEmphasis),
  };
};

const buildScholarlyArticleJsonLd = (
  slug: string,
  detail: NonNullable<ReturnType<typeof getPublicationDetailBySlug>>,
  publication: NonNullable<ReturnType<typeof getPublicationForDetail>>
) => {
  const pageUrl = `${SITE_URL}${getPublicationDetailPath(slug)}`;
  const headline = stripMarkdownEmphasis(publication.title);

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${pageUrl}#article`,
    headline,
    ...(hasPublicationAbstract(detail.abstract)
      ? { abstract: stripMarkdownEmphasis(detail.abstract) }
      : {}),
    datePublished: detail.datePublished,
    url: pageUrl,
    ...(detail.doi ? { sameAs: detail.doi } : {}),
    author: publication.authors.map((author) => {
      const name = author.name.replace(/^and\s+/i, "");
      const isPrendini = /prendini/i.test(name);

      return {
        "@type": "Person",
        name,
        ...(isPrendini
          ? { sameAs: `${SITE_URL}/people/lorenzo-prendini` }
          : {}),
      };
    }),
    isPartOf: publication.journal
      ? {
          "@type": "Periodical",
          name: publication.journal,
        }
      : undefined,
    ...(detail.doi
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "DOI",
            value: detail.doi.replace("https://doi.org/", ""),
          },
        }
      : {}),
    keywords: detail.keywords.map(stripMarkdownEmphasis).join(", "),
    ...(detail.pdf ? { encoding: { "@type": "MediaObject", contentUrl: detail.pdf } } : {}),
  };
};

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
  const { slug } = await params;
  const detail = getPublicationDetailBySlug(slug);
  const publication = detail ? getPublicationForDetail(detail) : null;

  if (!detail || !publication) {
    notFound();
  }

  const scholarlyArticleSchema = buildScholarlyArticleJsonLd(slug, detail, publication);

  return (
    <>
      <JsonLd data={scholarlyArticleSchema} />
      <PublicationDetailClient
        publication={publication}
        detail={detail}
        authorProfileLookup={buildAuthorProfileLookup(getPeople())}
      />
    </>
  );
}
