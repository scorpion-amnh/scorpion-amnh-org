'use client';

import { PeopleGroupSection } from "@/app/people/PeopleGroupSection";
import type { LabEvolutionSectionProps } from "@/app/people/sections/types";
export function LabEvolutionSection({ isActive, labHistorySections }: LabEvolutionSectionProps) {
  return (
    <div data-section="lab-evolution" className={isActive ? 'block' : 'hidden'}>
        <div>
          {labHistorySections.map((section, index) => (
            <PeopleGroupSection
              key={`${section.year ?? "group"}-${index}`}
              year={section.year}
              subtitle={section.subtitle}
              cards={section.cards}
            />
          ))}
        </div>
    </div>
  );
}
