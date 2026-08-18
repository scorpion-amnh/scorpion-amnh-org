import type { Metadata } from "next";
import openGraphImage from "@/app/opengraph-image.png";

export const SITE_URL = "https://scorpion-amnh.org";
export const SITE_NAME = "Arachnology at AMNH";

export const SITE_PREVIEW_IMAGE = {
  url: openGraphImage.src,
  width: openGraphImage.width,
  height: openGraphImage.height,
  alt: SITE_NAME,
} as const;

export const SITE_TWITTER_METADATA = {
  card: "summary_large_image" as const,
  images: [SITE_PREVIEW_IMAGE.url],
};

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
      siteName: SITE_NAME,
      type: "profile",
      images: [SITE_PREVIEW_IMAGE],
    },
    twitter: {
      ...SITE_TWITTER_METADATA,
      title,
      description,
    },
  };
};
