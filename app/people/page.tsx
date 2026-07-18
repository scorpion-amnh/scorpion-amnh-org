import type { Metadata } from "next";
import { getPeople, getPeopleSectionOrder } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { PeopleClient } from "@/app/people/PeopleClient";

export const metadata: Metadata = createPageMetadata(
  "People | Arachnology at AMNH",
  "Members and alumni of the Scorpion Systematics Research Group at AMNH."
);

export default function PeoplePage() {
  const people = getPeople();
  const undergraduateStudentsOrder = getPeopleSectionOrder("undergraduate-students");

  return (
    <PeopleClient people={people} undergraduateStudentsOrder={undergraduateStudentsOrder} />
  );
}
