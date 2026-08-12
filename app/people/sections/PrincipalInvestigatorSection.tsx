'use client';

import Link from "next/link";
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

            <p className="mt-6">
              <Link
                href="/people/lorenzo-prendini"
                className="text-color-link hover:text-color-link-hover underline"
              >
                View Lorenzo Prendini&apos;s full biography page
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
}
