import type { PeopleGroupCardProps } from "@/app/people/PeopleGroupCard";
import type { SectionTab } from "@/app/people/usePeopleNavigation";

export type PeopleSectionProps = {
  isActive: boolean;
};

export type TabbedPeopleSectionProps = PeopleSectionProps & {
  tab: SectionTab;
  onTabChange: (tab: SectionTab) => void;
};

export type LabEvolutionSectionProps = PeopleSectionProps & {
  labHistorySections: {
    year?: string;
    subtitle?: string;
    cards: [PeopleGroupCardProps, ...PeopleGroupCardProps[]];
  }[];
};
