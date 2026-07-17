'use client';

import { PersonProfileCard } from "@/app/people/PersonProfileCard";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
import { sortPeopleBySectionOrder } from "@/lib/people/sortPeople";
import type { Person } from "@/lib/content/schema";

type UndergraduateStudentsSectionProps = TabbedPeopleSectionProps & {
  people: Person[];
  sectionOrder: string[];
};

export function UndergraduateStudentsSection({
  isActive,
  tab,
  onTabChange,
  people,
  sectionOrder,
}: UndergraduateStudentsSectionProps) {
  const peopleForTab = (activeTab: "current" | "alumni") =>
    sortPeopleBySectionOrder(
      people.filter((person) => person.tab === activeTab),
      sectionOrder
    );

  return (
    <div data-section="undergraduate-students" className={isActive ? "block" : "hidden"}>
      <div>
        <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Undergraduate Students</h2>
        <p className="text-xl text-gray-600 mb-8">
          Over the years, several undergraduate students have worked in the Arachnology Lab supported by various internships. Most have gone on to graduate school and beyond. We acknowledge and appreciate their work. If you are interested in interning in the Arachnology Lab at the AMNH please visit the{" "}
          <a
            href="https://www.amnh.org/our-research/richard-gilder-graduate-school/academics-and-research/fellowship-and-grant-opportunities/undergraduate-fellowships/reu-biology-program"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Research Experiences for Undergraduates Program.
          </a>
        </p>
        <PeopleSectionTabs value={tab} onChange={(value) => onTabChange(value)} />
        <div data-tab="current" className={tab === "current" ? "block" : "hidden"}>
          <div className="space-y-6">
            {peopleForTab("current").map((person) => (
              <PersonProfileCard key={person.id} person={person} />
            ))}
          </div>
        </div>

        <div data-tab="alumni" className={`people-compact ${tab === "alumni" ? "block" : "hidden"}`}>
          <div className="space-y-6">
            {peopleForTab("alumni").map((person) => (
              <PersonProfileCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
