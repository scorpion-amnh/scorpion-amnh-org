import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/app/components/JsonLd";
import { LorenzoPrendiniProfile } from "@/app/people/LorenzoPrendiniProfile";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

const PAGE_PATH = "/people/lorenzo-prendini";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = createPageMetadata(
  "Lorenzo Prendini | Curator of Arachnida and Myriapoda | AMNH",
  "Biography and contact information for Lorenzo Prendini, Curator of Arachnida and Myriapoda in the Division of Invertebrate Zoology at the American Museum of Natural History, and head of the Arachnology Lab's Scorpion Systematics Research Group.",
  { path: PAGE_PATH }
);

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${PAGE_URL}#profile`,
  url: PAGE_URL,
  name: "Lorenzo Prendini | Curator of Arachnida and Myriapoda | AMNH",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "People", item: `${SITE_URL}/people` },
      { "@type": "ListItem", position: 2, name: "Lorenzo Prendini", item: PAGE_URL },
    ],
  },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#lorenzo-prendini`,
    name: "Lorenzo Prendini",
    jobTitle: "Curator of Arachnida and Myriapoda",
    description:
      "Curator of Arachnida and Myriapoda, Division of Invertebrate Zoology, and head of the Arachnology Lab at the American Museum of Natural History.",
    image: `${SITE_URL}/images/people/Lorenzo-Prendini.jpg`,
    url: PAGE_URL,
    worksFor: {
      "@type": ["Museum", "EducationalOrganization", "ResearchOrganization"],
      name: "American Museum of Natural History",
      url: "https://www.amnh.org",
    },
    affiliation: [
      { "@type": "CollegeOrUniversity", name: "Richard Gilder Graduate School" },
      { "@type": "CollegeOrUniversity", name: "City University of New York" },
    ],
    sameAs: [
      "https://www.amnh.org/research/staff-directory/lorenzo-prendini",
      "https://scholar.google.com/citations?user=fU0VpL0AAAAJ&hl=en&oi=ao",
      "https://www.wikidata.org/wiki/Q21389242",
      "https://orcid.org/0000-0001-8727-7106",
      "https://www.researchgate.net/profile/Lorenzo-Prendini",
      "https://www.linkedin.com/in/lorenzo-prendini-34824218/",
      "https://loop.frontiersin.org/people/722676/bio",
    ],
  },
};

export default function LorenzoPrendiniPage() {
  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={profilePageJsonLd} />
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="text-meta mb-6">
          <Link href="/people" className="text-color-link hover:text-color-link-hover underline">
            People
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>Lorenzo Prendini</span>
        </nav>

        <h1 className="font-bold mb-2">Lorenzo Prendini</h1>
        <p className="text-lead mb-8">
          Curator of Arachnida and Myriapoda, and Head of the Arachnology Lab at the American Museum of Natural History
        </p>

        <div className="pb-8">
          <LorenzoPrendiniProfile nameHeading={null} />
        </div>

        <p>
          <Link href="/people#principal-investigator" className="text-color-link hover:text-color-link-hover underline">
            View the full Arachnology Lab roster
          </Link>
        </p>
      </div>
    </div>
  );
}
