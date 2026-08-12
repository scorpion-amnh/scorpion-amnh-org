import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/app/components/Header";
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

export const metadata: Metadata = {
  title: getSiteSettings().defaultMetaTitle,
  description: getSiteSettings().defaultMetaDescription,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://scorpion-amnh.org/#lorenzo-prendini",
      name: "Lorenzo Prendini",
      jobTitle: "Curator of Arachnida and Myriapoda",
      worksFor: {
        "@type": ["Museum", "EducationalOrganization", "ResearchOrganization"],
        name: "American Museum of Natural History",
        url: "https://www.amnh.org",
      },
      url: "https://scorpion-amnh.org/",
      sameAs: [
        "https://www.amnh.org/research/staff-directory/lorenzo-prendini",
        "https://scholar.google.com/citations?user=fU0VpL0AAAAJ",
        "https://www.wikidata.org/wiki/Q21389242",
        "https://orcid.org/0000-0001-8727-7106",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://scorpion-amnh.org/#website",
      url: "https://scorpion-amnh.org/",
      name: "Lorenzo Prendini Arachnology Lab",
      publisher: {
        "@id": "https://scorpion-amnh.org/#lorenzo-prendini",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
