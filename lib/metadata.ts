import type { Metadata } from "next";

export const SITE_URL = "https://scorpion-amnh.org";

type PageMetadataOptions = {
  /** Site-relative path (e.g. "/people/lorenzo-prendini") used to set a canonical URL and OpenGraph url. */
  path?: string;
};

export const createPageMetadata = (
  title: string,
  description: string,
  options?: PageMetadataOptions
): Metadata => {
  if (!options?.path) {
    return { title, description };
  }

  const url = `${SITE_URL}${options.path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Arachnology at AMNH",
      type: "profile",
    },
  };
};
