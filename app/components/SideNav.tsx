import { SideNavButton } from "./SideNavButton";

type SideNavSection = {
  id: string;
  label: string;
};

type SideNavProps = {
  sections: SideNavSection[];
  activeSection: string;
  onSelect: (id: string) => void;
};

export function SideNav({ sections, activeSection, onSelect }: SideNavProps) {
  return (
    <nav className="sticky top-32 xl:top-36 z-40">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <SideNavButton
              onClick={() => onSelect(section.id)}
              isActive={activeSection === section.id}
            >
              {section.label}
            </SideNavButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
