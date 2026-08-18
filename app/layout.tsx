import type { Metadata } from "next";
import Script from "next/script";
import { Source_Sans_3 } from "next/font/google";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/app/components/Header";
import { JsonLd } from "@/app/components/JsonLd";
import {
  SITE_NAME,
  SITE_PREVIEW_IMAGE,
  SITE_TWITTER_METADATA,
  SITE_URL,
} from "@/lib/metadata";
import { Footer } from "./components/Footer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "600", "700"],
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

const siteSettings = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteSettings.defaultMetaTitle,
  description: siteSettings.defaultMetaDescription,
  openGraph: {
    title: siteSettings.defaultMetaTitle,
    description: siteSettings.defaultMetaDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [SITE_PREVIEW_IMAGE],
  },
  twitter: {
    ...SITE_TWITTER_METADATA,
    title: siteSettings.defaultMetaTitle,
    description: siteSettings.defaultMetaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#lorenzo-prendini`,
      name: "Lorenzo Prendini",
      jobTitle: "Curator of Arachnida and Myriapoda",
      worksFor: {
        "@type": ["Museum", "EducationalOrganization", "ResearchOrganization"],
        name: "American Museum of Natural History",
        url: "https://www.amnh.org",
      },
      url: `${SITE_URL}/people/lorenzo-prendini`,
      sameAs: [
        "https://www.amnh.org/research/staff-directory/lorenzo-prendini",
        "https://scholar.google.com/citations?user=fU0VpL0AAAAJ",
        "https://www.wikidata.org/wiki/Q21389242",
        "https://orcid.org/0000-0001-8727-7106",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Lorenzo Prendini Arachnology Lab",
      publisher: {
        "@id": `${SITE_URL}/#lorenzo-prendini`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navItems } = getSiteSettings();

  return (
    <html lang="en" className={sourceSans.variable}>
      <head>
        <JsonLd data={jsonLd} />
        <Script
          src="https://kit.fontawesome.com/6a8d003523.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        <Header navItems={navItems} />
        <div className="pt-[var(--header-height)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
