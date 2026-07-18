'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function MuseumSpecialistsSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="museum-specialists" className={isActive ? 'block' : 'hidden'}>
        <div id="museum-specialists">
          <h2 className="font-bold mt-8 lg:mt-0 mb-8">Museum Specialists</h2>

          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />

          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>
          <p className="mb-8">Current museum specialist of the Arachnology Lab at AMNH</p>
          {/* Pio Colmenares */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Pio-Colmenares.jpg"
                  alt="Pío A. Colmenares"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Pío A. Colmenares</h3>
                <p className="mb-4">Museum Specialist and Collections Manager, Arachnid and Myriapod Collections</p>
                <p className="mb-3">
                  <ExternalLink href="https://www.researchgate.net/profile/Pio_Colmenares">Research Gate</ExternalLink>
                </p>
                <p className="mb-4">
                  Pío is an arachnologist with experience in taxonomy and ecology. His main research interests are the taxonomy, systematics, ecology, conservation and biogeography of Opiliones. In addition to working with Opiliones, he also has experience in the taxonomy of other arachnid orders, such as Amblypygi, Schizomida, Solifugae, and spiders of the family Pholcidae. Pío joined the AMNH staff in 2016 and is currently in charge of the Arachnid and Myriapod Collections.
                </p>
                <p className="mb-6">
                  Pío began his studies at the University of Zulia (LUZ) in Maracaibo, Venezuela, where he received his undergraduate degree in biology in 2008. During his time as a student, he worked in the Museum of Biology at La Universidad del Zulia (MBLUZ). Upon graduating, he started working as a research assistant of the Biodiversity Unit at the Instituto Venezolano de Investigaciones Científicas (IVIC) in Caracas, Venezuela. In 2009 he studied at the National Museum of Natural History of the Smithsonian Institution in Washington, DC, where he received training in curatorial techniques and management of various natural history collections. In 2015, he defended his doctoral thesis on Amazonian Harvestmen communities at the Instituto Nacional de Pesquisas da Amazônia (INPA) in Manaus, Brazil.
                </p>
                <div className="mt-6">
                  <h4 className="font-bold mb-3">Contact</h4>
                  <div className="space-y-1">
                    <p>Division of Invertebrate Zoology</p>
                    <p>American Museum of Natural History</p>
                    <p>Central Park West at 79th Street</p>
                    <p>New York, NY 10024-5192</p>
                    <p>USA</p>
                    <p className="mt-2">Email: pcolmenares@amnh.org</p>
                    <p>Phone: (212) 769-5614</p>
                  </div>
                </div>
              </PeopleCardBody>
          </PeopleCard>
          </div>

          <div
            data-tab="alumni"
            className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}
          >
          <p className="mb-8">Former museum specialists of the Arachnology Lab at AMNH</p>

          {/* Michelle Locke */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Michelle-Locke.jpg"
                  alt="Michelle Locke"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="font-bold mb-1">Michelle Locke</h4>
                <p className="text-base mb-1">Scientific Assistant</p>
                <p className="text-meta mb-3">Technical staff from 2015 to 2016</p>
                <p>
                  Michelle Locke completed her MSc at Carleton University, in Ottawa ON. Michelle's MSc thesis was a revision of the flower fly genus <em>Dasysyrphus</em> (Diptera: Syrphidae) under the supervision of Dr. Jeff Skevington of Agriculture and Agri-Food Canada. before coming to the AMNH she worked as a contract Research Technician at the Canadian National Collection of Insects, Arachnids and Nematodes in Ottawa, ON. Her contract work focused on the Syrphidae collection, doing identifications, curation, databasing, species level conservation assessments, macro photography of specimens and work on a field guide to the Syrphidae. She came to the Division of Invertebrate Zoology, AMNH in 2014.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Pamela Horsley */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Pamela-Horsley.jpg"
                  alt="Pamela Horsley"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="font-bold mb-1">Pamela Horsley</h4>
                <p className="text-base mb-1">Scientific Assistant</p>
                <p className="text-meta mb-3">Technical staff from 2013 to 2014</p>
                <p>
                  Pamela completed her MSc in Entomology at McGill University in 2009 and her thesis research included a systematic revision of the hyper-diverse leaf litter-inhabiting genus <em>Trachyphloeomimus</em> (Curculionidae, Entiminae). In 2009, she was hired through an NSF grant as the Entomology Collection Manager at the San Diego Natural History Museum. Her research and work experience has allowed her to do field work in central and northeast Mexico, as well as the south-western United States. She is heavily involved with the Entomological Collections Network (ECN), <ExternalLink href="http://www.ecnweb.org">Entomological Collections Network</ExternalLink>, serving as president and assisting with coordination of the annual meetings.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Ofelia Delgado */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Ofelia-Delgado.jpg"
                  alt="Ofelia Delgado"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="font-bold mb-1">Ofelia Delgado</h4>
                <p className="text-base mb-1">Scientific Assistant</p>
                <p className="text-meta mb-3">Technical staff from 2010 to 2012</p>
                <p>
                  Ofelia completed her BSc in Biology at the Facultad de Ciencias, Universidad Nacional Autónoma de México (UNAM) in 2000, based on a floristic survey of tropical dry forest. After graduating, she assisted in the curation of the Section of Odonata in the Insects National Collection, Instituto de Biología, UNAM, focusing on the Odonata of Jalisco. Her experience in the field includes collecting arachnids, insects and plants in Central and Southern Mexico. After volunteering in Lorenzo Prendini's molecular lab for several years, she came to work as a Scientific Assistant in January 2010, spending much time working on solifuges and scorpions in the molecular lab.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Jeremy Huff */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Jeremy-Huff.jpg"
                  alt="Jeremy Huff"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="font-bold mb-1">Jeremy Huff</h4>
                <p className="text-base mb-1">Scientific Assistant</p>
                <p className="text-meta mb-3">Technical staff from 2007 to 2010</p>
                <p>
                  Jeremy began working as a Scientific Assistant in the Division of Invertebrate Zoology in 2007. His main research interest is the systematics of the whip scorpions (Thelyphonida). Huff has extensive field experience collecting arachnids in Belize, Cameroon, Costa Rica, Dominican Republic, French Guiana, Grand Cayman, Guatemala, Guinea-Bissau, Guyana, Malaysia, Martinique, Mexico, Senegal, South Africa and the southwestern USA. He did 10 field trips for the AMNH and has collected several thousand specimens and discovered many new species.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Randy Mercurio */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Randy-Mercurio.jpg"
                  alt="Randy Mercurio"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="font-bold mb-1">Randy Mercurio</h4>
                <p className="text-base mb-1">Scientific Assistant</p>
                <p className="text-meta mb-3">Technical staff from 2002 to 2007</p>
                <p>
                  Randy joined the Division of Invertebrate Zoology, AMNH, as a full-time employee in 2002, after completing a B.A. in Biology at New York University. He worked as Scientific Assistant to Lorenzo Prendini and managed the curation of the Arachnid and Myriapod Collections. Randy is a professional photographer and was responsible for producing many of the photographs in publications and the group's website. His other research interests include the taxonomy, natural history, ecology and biogeography of centipedes in North America, as well as their functional morphology. He has collected arachnids and myriapods in Arizona, California, Connecticut, Florida, Massachusetts, New York, Nevada, Rhode Island, and Mexico.
                </p>
              </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
    </div>
  );
}
