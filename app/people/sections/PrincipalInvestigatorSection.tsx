'use client';

import { LorenzoPrendiniProfile } from "@/app/people/LorenzoPrendiniProfile";
import type { PeopleSectionProps } from "@/app/people/sections/types";

export function PrincipalInvestigatorSection({ isActive }: PeopleSectionProps) {
  return (
    <div data-section="principal-investigator" className={isActive ? 'block' : 'hidden'}>
        <div id="principal-investigator">
          <h2 className="font-bold mt-8 lg:mt-0 mb-2">Principal Investigator</h2>
          <p className="text-lead mb-8">Head of the Arachnology Lab at AMNH</p>

          <div className="pb-8">
            <LorenzoPrendiniProfile />
          </div>
        </div>
    </div>
  );
}
