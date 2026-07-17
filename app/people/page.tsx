import { getLabHistory } from "@/lib/content";
import type { PeopleGroupCardProps } from "./PeopleGroupCard";
import { PeopleClient } from "./PeopleClient";

export default function PeoplePage() {
  const labHistorySections = getLabHistory().map((section) => ({
    year: section.year,
    subtitle: section.subtitle,
    cards: section.cards as [PeopleGroupCardProps, ...PeopleGroupCardProps[]],
  }));

  return <PeopleClient labHistorySections={labHistorySections} />;
}
