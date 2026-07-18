import type { SectionTab } from "@/app/people/usePeopleNavigation";

export type PeopleSectionProps = {
  isActive: boolean;
};

export type TabbedPeopleSectionProps = PeopleSectionProps & {
  tab: SectionTab;
  onTabChange: (tab: SectionTab) => void;
};
