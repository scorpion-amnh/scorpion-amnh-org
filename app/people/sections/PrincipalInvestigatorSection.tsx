'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PeopleImage } from "@/app/people/PeopleImage";
import { ProfileLinksList } from "@/app/people/ProfileLinksList";
import type { PeopleSectionProps } from "@/app/people/sections/types";

const lorenzoProfileLinks = [
  { href: "/documents/PrendiniCV2020_jyaiq9.pdf", label: "Curriculum Vitae (PDF)" },
  { href: "https://www.researchgate.net/profile/Lorenzo-Prendini", label: "Research Gate" },
  {
    href: "https://www.amnh.org/explore/videos/research-and-collections/profile-lorenzo-prendini",
    label: "AMNH Meet the Scientists Video",
  },
  { href: "https://scholar.google.com/citations?user=fU0VpL0AAAAJ&hl=en&oi=ao", label: "Google Scholar" },
  { href: "https://orcid.org/0000-0001-8727-7106", label: "ORCID" },
  { href: "https://www.linkedin.com/in/lorenzo-prendini-34824218/", label: "LinkedIn" },
  { href: "https://loop.frontiersin.org/people/722676/bio", label: "Loop" },
];

export function PrincipalInvestigatorSection({ isActive }: PeopleSectionProps) {
  return (
    <div data-section="principal-investigator" className={isActive ? 'block' : 'hidden'}>
        <div id="principal-investigator">
          <h2 className="font-bold mt-8 lg:mt-0 mb-2">Principal Investigator</h2>
          <p className="text-xl mb-8">Head of the Arachnology Lab at AMNH</p>
          
          <div className="pb-8">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <PeopleImage
                  src="/images/people/Lorenzo-Prendini.jpg"
                  alt="Lorenzo Prendini"
                  width={500}
                  height={750}
                  className="w-full h-auto rounded-sm"
                />
              </div>
              
              <div className="md:col-span-3">
                <h3 className="font-bold mb-2">Lorenzo Prendini</h3>
                <div className="space-y-3 mb-4">
                  <p className="mb-0">
                    Curator of Arachnida and Myriapoda, Division of Invertebrate Zoology
                  </p>
                  <p className="text-base mt-0">
                    <ExternalLink href="https://www.amnh.org/research/staff-directory/lorenzo-prendini">
                      Lorenzo Prendini: Curator, Invertebrate Zoology, Professor RGGS | AMNH
                    </ExternalLink>
                  </p>
                  <p className="mb-0">
                    Professor of Comparative Biology, Richard Gilder Graduate School
                  </p>
                  <p className="text-base mt-0">
                    <ExternalLink href="https://www.amnh.org/research/richard-gilder-graduate-school">
                      Graduate Programs at the Museum | Richard Gilder Graduate School
                    </ExternalLink>
                  </p>
                  <p className="mb-0">
                    Principle Investigator, Institute of Comparative Genomics
                  </p>
                  <p className="text-base mt-0">
                    <ExternalLink href="https://www.amnh.org/research/institute-comparative-genomics">
                      Institute for Comparative Genomics | AMNH
                    </ExternalLink>
                  </p>
                  <p className="mb-0">
                    Chair, AMNH Scientific Publications
                  </p>
                  <p className="text-base mt-0">
                    <ExternalLink href="https://www.amnh.org/research/scientific-publications">
                      Scientific Publications | American Museum of Natural History
                    </ExternalLink>
                  </p>
                  <p className="mb-0">
                    Adjunct Professor, Ecology, Evolution and Behavior, City University of New York
                  </p>
                  <p className="text-base mt-0">
                    <ExternalLink href="https://www.gc.cuny.edu/people/lorenzo-prendini">
                      Prendini, Lorenzo | CUNY Graduate Center
                    </ExternalLink>
                  </p>
                </div>
                <ProfileLinksList links={lorenzoProfileLinks} />

                <div className="mt-8">
                  <h4 className="font-bold mb-3">Contact</h4>
                  <div className="space-y-1">
                    <p>Curator of Arachnida and Myriapoda</p>
                    <p>Division of Invertebrate Zoology</p>
                    <p>American Museum of Natural History</p>
                    <p>Central Park West at 79th Street</p>
                    <p>New York, NY 10024-5192</p>
                    <p>USA</p>
                    <p className="mt-3">Email: lorenzo@amnh.org</p>
                    <p>Phone: (212) 769-5843</p>
                    <p>Fax: (212) 769-5277</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
