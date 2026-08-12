import type { Metadata } from "next";
import { getPeople, getPeopleSectionOrder } from "@/lib/content";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";
import { JsonLd } from "@/app/components/JsonLd";
import { PeopleClient } from "@/app/people/PeopleClient";
import { RedirectToPeopleSection } from "@/app/people/lorenzo-prendini/RedirectToPeopleSection";

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

/**
 * Renders the same markup as `/people/?section=principal-investigator&tab=current`
 * so search engines can index Lorenzo Prendini's bio under a name-specific URL.
 * Real visitors are redirected on to that interactive URL immediately after mount
 * (see RedirectToPeopleSection) — the people directory itself is unchanged.
 */
export default function LorenzoPrendiniPage() {
  const people = getPeople();
  const undergraduateStudentsOrder = getPeopleSectionOrder("undergraduate-students");

  return (
    <>
      <JsonLd data={profilePageJsonLd} />
      <RedirectToPeopleSection />
      <PeopleClient people={people} undergraduateStudentsOrder={undergraduateStudentsOrder} />
    </>
  );
}
