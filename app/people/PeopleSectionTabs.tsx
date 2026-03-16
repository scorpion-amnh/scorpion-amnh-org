import { Tabs } from "../components/Tabs";
import type { SectionTab } from "./usePeopleNavigation";

type PeopleSectionTabsProps = {
  value: SectionTab;
  onChange: (value: SectionTab) => void;
  includeAlumni?: boolean;
};

export const PeopleSectionTabs = ({
  value,
  onChange,
  includeAlumni = true,
}: PeopleSectionTabsProps) => {
  const options = includeAlumni
    ? [
        { value: "current" as const, label: "Current" },
        { value: "alumni" as const, label: "Alumni" },
      ]
    : [{ value: "current" as const, label: "Current" }];

  return (
    <div className="mb-6">
      <Tabs
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
