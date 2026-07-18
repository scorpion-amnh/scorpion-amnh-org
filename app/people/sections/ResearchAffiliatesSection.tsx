'use client';

import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function ResearchAffiliatesSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="research-affiliates" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="font-bold mt-8 lg:mt-0 mb-8">Research Affiliates</h2>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
            includeAlumni={false}
          />

          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>

          {/* Boris Zakharov */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Boris-Zakharov.jpg"
                  alt="Boris Zakharov"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Boris Zakharov</h3>
                <p className="mb-4">Research Associate, La Guardia Community College</p>
                <p className="mb-6">
                  Boris has a wide range of research experiences and interests, primary within the fields of Invertebrate Zoology, Biogeography, Evolution and System Theory approach in Biology. His Master's project in Arachnology (1979) was performed at Far East State University at city Vladivostok (Russia) and dedicated to orb-weaving spiders Family Araneidae of South East Russia. In 1989, he earned his PhD in Entomology from Novosibirsk Biological Institute and it was dedicated to horse flies and deer-flies (Insecta, Diptera, Tabanidae) of South-East Transbaikalia. Currently, Boris am working in collaboration with Vladimir Ovtcharenko on the study of the ground spiders of Australia and New Zealand and the study of invertebrate dynamics in the Black Rock Forest.
                </p>
                <div className="mt-6">
                  <h4 className="font-bold mb-3">Contact</h4>
                  <div className="space-y-1">
                    <p>Email: zakharov@amnh.org</p>
                    <p>Phone: (212) 769-5609</p>
                  </div>
                </div>
              </PeopleCardBody>
          </PeopleCard>

          {/* Vladimir Ovtsharenko */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Vladimir-Ovtsharenko.jpg"
                  alt="Vladimir Ovtsharenko"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Vladimir Ovtsharenko</h3>
                <p className="mb-4">Research Associate, Hostos Community College</p>
                <p className="mb-6">
                  Vladimir is a research associate in the Division of Invertebrate Zoology at the American Museum of Natural History (AMNH), and Curator of the Arachnological Collections at the Zoological Institute of the Russian Academy of Sciences. Dr. Ovtsharenko's research is on spider taxonomy: the science of identifying and classifying species according to their evolutionary relationships. Since the AMNH houses the largest spider collection in the world, with over a million spider specimens, and the arachnological research carried out there is among the best in the world, it is an ideal place for Vlad to work.
                </p>
                <div className="mt-6">
                  <h4 className="font-bold mb-3">Contact</h4>
                  <div className="space-y-1">
                    <p>Email: ovtshare@amnh.org</p>
                    <p>Phone: (212) 769-5618</p>
                  </div>
                </div>
              </PeopleCardBody>
          </PeopleCard>

          {/* Louis Sorkin */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Louis-Sorkin.jpg"
                  alt="Louis Sorkin"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Louis Sorkin</h3>
                <p className="mb-4">Visiting Scientist, New York Entomological Society</p>
                <p>
                  Lou began his career in arachnid studies during his graduate work at the University of Connecticut where he researched arthropod parasites of spiders. In 1978, Lou began work on spiders and other arachnids under Dr. Norman Platnick, in what was then the Department of Entomology at the AMNH. Over the years he sorted through many spider collections and labeled thousands of vials and worked with many arachnologists, some visiting and examining the museum's collection and sometimes at other institutions during his visits or on excursions from arachnology meetings. He deals with many public inquiries regarding insects and other arthropods. He has interests in entomophagy and forensic entomology (the latter includes stored products, urban, and medico-legal studies). Some of the cases and investigations have been aired online, on television and radio and in the print media. At present, some of his studies include investigations of the common bed bug, <em>Cimex lectularius</em> (Hemiptera: Cimicidae) due to the relatively recent increase in infestations of many homes, business, hotels, by this insect and for which he receives inquiries on their natural history and biology and management. He keeps a few bed bug colonies for study and for educational purposes. After 43 years of dedicated service, Lou retired from his position as Museum Specialist for the Spider Collection in early 2020. He will remain associated with the AMNH Invertebrate Zoology Division to continue with his outreach activities and the organization of the New York Entomological Society.
                </p>
              </PeopleCardBody>
          </PeopleCard>
          </div>

          <div data-tab="alumni" className={tab === 'alumni' ? 'block' : 'hidden'}>
            <p>No alumni listed yet.</p>
          </div>
        </div>
    </div>
  );
}
