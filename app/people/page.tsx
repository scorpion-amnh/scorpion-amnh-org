import type { Metadata } from "next";
import { getLabHistory, getPeople, getPeopleSectionOrder } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import type { PeopleGroupCardProps } from "@/app/people/PeopleGroupCard";
import { PeopleClient } from "@/app/people/PeopleClient";

export const metadata: Metadata = createPageMetadata(
  "People | Arachnology at AMNH",
  "Members and alumni of the Scorpion Systematics Research Group at AMNH."
);

export default function PeoplePage() {
  const labHistorySections = getLabHistory().map((section) => ({
    year: section.year,
    subtitle: section.subtitle,
    cards: section.cards as [PeopleGroupCardProps, ...PeopleGroupCardProps[]],
  }));

  const people = getPeople();
  const undergraduateStudentsOrder = getPeopleSectionOrder("undergraduate-students");

  return (
    <PeopleClient
      labHistorySections={labHistorySections}
      people={people}
      undergraduateStudentsOrder={undergraduateStudentsOrder}
    />
  );
}
