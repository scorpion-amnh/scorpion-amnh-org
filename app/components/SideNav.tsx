import { SideNavButton } from "./SideNavButton";

type SideNavSection = {
  id: string;
  label: string;
};

type SideNavProps = {
  sections: SideNavSection[];
  activeSection: string;
  onSelect: (id: string) => void;
  className?: string;
};

export function SideNav({ sections, activeSection, onSelect, className }: SideNavProps) {
  return (
    <nav
      className={[
        "side-nav sticky w-full top-28 xl:top-36 z-40 bg-white self-start h-fit",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ul className="side-nav-scroll list-none m-0 p-0 pt-2 pr-12 lg:pr-0 flex gap-2 overflow-x-auto whitespace-nowrap pb-3 lg:pb-0 lg:block lg:space-y-2">
        {sections.map((section) => (
          <li key={section.id} className="flex-none lg:block">
            <SideNavButton
              onClick={() => onSelect(section.id)}
              isActive={activeSection === section.id}
            >
              {section.label}
            </SideNavButton>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent lg:hidden" />
    </nav>
  );
}
