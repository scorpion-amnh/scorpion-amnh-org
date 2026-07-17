'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function VolunteersSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="volunteers" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Volunteers and Field Assistants</h2>
          <p className="text-xl text-gray-600 mb-8">
            The Arachnology Lab at the AMNH has had many dedicated volunteers work with us over the years. With their help we have been able to accomplish a great deal of work. We would like to thank all of our volunteers for their invaluable assistance. If you are interested in volunteering in the Arachnology Lab at the AMNH please visit the <ExternalLink href="https://www.amnh.org/join-support/volunteer-now">Volunteer Department.</ExternalLink>
          </p>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />
          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>

          {/* Soleil Blanquera */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Soleil-Blanquera.jpg"
                  alt="Soleil Blanquera"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Soleil Blanquera</h4>
              <p className="text-sm text-gray-500 mb-2">Current Volunteer</p>
              <p className="text-gray-700">
                Soleil volunteered at the Arachnology Lab in 2025 and 2026, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Colby Sain.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Brian Sperber */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Brian-Sperber.jpg"
                  alt="Brian Sperber"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Brian Sperber</h4>
              <p className="text-sm text-gray-500 mb-2">Current Volunteer</p>
              <p className="text-gray-700">
                Brian volunteered in the Arachnida and Myriapoda from 2021, assisting Pio Colmenares with sorting, organization and curation of collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Victoria Long */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Victoria-Long.jpg"
                alt="Victoria Long"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Victoria Long</h4>
              <p className="text-sm text-gray-500 mb-2">Current Volunteer</p>
              <p className="text-gray-700">
                Victoria is a volunteer who previously worked in the Arachnology Lab as a Technician.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          </div>

          <div data-tab="alumni" className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}>

          {/* George Tsinias */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/George-Tsinias.jpg"
                alt="George Tsinias"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">George Tsinias</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                George helped with curatorial tasks, like labeling and rebottling material, in the main collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Christian Liriano */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Christian-Liriano.jpg"
                alt="Christian Liriano"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Christian Liriano</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Christian prepared material for loans in the spider collection and was interested in harvestmen.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Gerbi Carreon */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Gerbi-Carreon.jpg"
                alt="Gerbi Carreon"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Gerbi Carreon</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Gerbi performed various curatorial activities in the spider collection. He also received training to do DNA extractions and PCRs in the molecular lab.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Debbie Alwill */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Debbie-Alwill.jpg"
                alt="Debbie Alwill"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Debbie Alwill</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Debbie assisted with labeling and rebottling specimens and packing loans.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jasmine Alim */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jasmine-Alim.jpg"
                alt="Jasmine Alim"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Jasmine Alim</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Jasmine assisted in the molecular lab with DNA extractions and PCR reactions, also organizing DNA samples.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Adrian Armstrong */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Adrian Armstrong" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Adrian Armstrong</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Adrian is the Invertebrate Conservation Scientist in the provincial government Nature Conservation body in KwaZulu-Natal, South Africa. He has generously donated material to the AMNH for more than ten years.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Reginald Christiaan */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Reginald-Christiaan.jpg"
                alt="Reginald Christiaan"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Reginald Christiaan</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Reginald is a scorpion enthusiast who assisted Prendini with field collections of scorpions in South Africa.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Mark Cooper */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Mark Cooper" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Mark Cooper</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Mark is a myriapodologist who graduated with a Masters from the University of Cape Town. He accompanied Lorenzo Prendini on several expeditions to collect arachnids in South Africa.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Howard W. Fiedler */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Howard-W-Fiedler.jpg"
                alt="Howard W. Fiedler"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Howard W. Fiedler</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Howard assisted with rebottling specimens, organization of specimen and reprint collections, recording scorpion measurement data and digitizing handwritten catalogs.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Stefan Foord */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Stefan-Foord.jpg"
                alt="Stefan Foord"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Stefan Foord</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Stefan was an arachnologist and professor at the University of Venda, South Africa who generously donated material to the AMNH. RIP.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ann Garbacki */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Ann Garbacki" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Ann Garbacki</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Ann assisted with labeling of specimens and inventorying specimens.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tom Gartner */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Tom Gartner" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Tom Gartner</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Tom assisted with sorting and labeling the Arachnid and Myriapod Collections and packing and unpacking loans.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tom Sullivan */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Tom-Sullivan.jpg"
                alt="Tom Sullivan"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Tom Sullivan</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Tom assisted with sorting and labeling the Arachnid and Myriapod Collections and packing and unpacking loans.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Patrick Gildenhuys */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Patrick-Gildenhuys.jpg"
                alt="Patrick Gildenhuys"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Patrick Gildenhuys</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Patrick is a tarantula enthusiast who accompanied Lorenzo Prendini on several expeditions to collect arachnids in South Africa and neighboring countries, and has generously donated material to the AMNH.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Charles Haddad */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Charles-Haddad.jpg"
                alt="Charles Haddad"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Charles Haddad</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Charles is an arachnologist and professor at the University of the Free State, Bloemfontein, South Africa who has generously donated material to the AMNH for several years.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Peter Hawkes */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Peter Hawkes" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Peter Hawkes</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Peter is an entomologist who runs AfriBugs, an EIA in South Africa. He has generously donated material to the AMNH for several years.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Siegfried Huber */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Siegfried-Huber.jpg"
                alt="Siegfried Huber"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Siegfried Huber</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Since 2000, Siegfried has conducted expeditions to Oman, Saudi Arabia, Thailand, and New Caledonia, and elsewhere, collecting arachnids. He has generously donated specimens collected during his travels to the AMNH.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jeremy Huff */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jeremy-Huff.jpg"
                alt="Jeremy Huff"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Jeremy Huff</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Jeremy Huff is a former volunteer and a former employee.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Dawid Jacobs */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Dawid Jacobs" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Dawid Jacobs</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Dawid is an entomologist who assisted Prendini with fieldwork in South Africa and generously donated material to the AMNH for several years.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Simone Longe */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Simone-Longe.jpg"
                alt="Simone Longe"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Simone Longe</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Simone assisted in the molecular lab with DNA extractions and PCR reactions, also organizing DNA samples.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Allyson Mellone */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Allyson Mellone" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Allyson Mellone</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Allyson assisted with labeling and rebottling specimens.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Warren Savary */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Warren-Savary.jpg"
                alt="Warren Savary"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Warren Savary</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Warren Savary, a former compliance officer at the U.S. Food and Drug Administration and Field Associate of the California Academy of Sciences, served as research collaborator and webmaster for the NSF-funded REVSYS Vaejovidae grant and, from 2007-2012, as research collaborator and webmaster for the BS&I Solifugae grant. He visited the AMNH Arachnid and Myriapod Collections on several occasions to sort and identify solifuges and vaejovid scorpions.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Rick West */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Rick-West.jpg"
                alt="Rick West"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Rick West</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700 mb-2">
                Rick West, one of the world's authorities on tarantulas (Theraphosidae), has traveled to over 27 countries to study them. Rick has generously donated interesting arachnids to the AMNH for many years.
              </p>
              <p>
                <ExternalLink href="http://www.birdspiders.com">BirdSpiders.com</ExternalLink>
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Asel Zhetigenova */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Asel Zhetigenova" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Asel Zhetigenova</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Asel assisted with labeling and rebottling specimens.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Howard Bichard */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Howard Bichard" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Howard Bichard</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Howard accompanied Prendini on several expeditions to collect arachnids in South Africa.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Abigail Carlton */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Abigail Carlton" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Abigail Carlton</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Abigail assisted with sorting, rebottling, labeling, reorganizing, and databasing specimens and tissue samples in the collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ofelia Delgado */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Ofelia-Delgado.jpg"
                alt="Ofelia Delgado"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Ofelia Delgado</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Ofelia Delgado is a former volunteer and a former employee.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* David Desoeur */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/David-Desoeur.jpg"
                alt="David Desoeur"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">David Desoeur</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                David graduated with a B.Sc. in Biology from the University of Guelph and was interested in the taxonomy of Florida <em>Centruroides</em>. In 2008, he traveled to Florida and the Keys to collect <em>Centruroides</em> samples for morphology and DNA isolation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Suzanna Dodd */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Suzanna Dodd" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Suzanna Dodd</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Suzanna rebottled the type collection, part of the main collection, and assisted with labeling new acquisitions.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ian Engelbrecht */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Ian-Engelbrecht.jpg"
                alt="Ian Engelbrecht"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Ian Engelbrecht</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Ian was the Invertebrate Conservation Scientist in the provincial government Nature Conservation body in Gauteng, South Africa. He started participating in field expeditions for the AMNH in 2005 with an expedition to the Northern Cape and southern Namibia and has since undertaken numerous other trips and generously donated material to the collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carine Galvão */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Carine Galvão" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Carine Galvão</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Carine assisted with the curation of an extensive collection of scorpions extracted from pitfall traps placed across southern California by the U.S. Geological Survey (USGS), San Diego between 1996 and 2006.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tiffany Gentry */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Tiffany Gentry" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Tiffany Gentry</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Tiffany assisted with sorting, rebottling, labeling, reorganizing, and databasing specimens and tissue samples, and with sorting and filing the Arachnid and Myriapod Reprint Collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ilsa Kaim */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Ilsa-Kaim.jpg"
                alt="Ilsa Kaim"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Ilsa Kaim</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Ilsa volunteered at the AMNH for over 20 years. Between 2004-2011, she worked with the Arachnology Group to database the reprint collection in Endnote, and she also databased the type collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sergios-Orestis Kolokotronis */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Sergios-Orestis-Kolokotronis.jpg"
                alt="Sergios-Orestis Kolokotronis"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Sergios-Orestis Kolokotronis</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Sergios holds a PhD in Ecology and Evolutionary Biology from Columbia University and had a <ExternalLink href="https://research.amnh.org/users/koloko">postdoc</ExternalLink> in the AMNH Sackler Institute for Comparative Genomics and Center for Conservation Genetics, where he coordinated the DNA Barcoding Initiative for Conservation. He created and maintained the lab website from 2006 until 2008.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sulata Maity */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Sulata-Maity.jpg"
                alt="Sulata Maity"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Sulata Maity</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Sulata volunteered in the Molecular Systematics Laboratory checking DNA concentration with nanodrop.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Kari McWest */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Kari-McWest.jpg"
                alt="Kari McWest"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Kari McWest</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700 mb-2">
                Kari received his Master's from West Texas A&M University, Canyon, where he studied scorpions under David Sissom. He assisted the NSF-REVSYS Vaejovidae project with fieldwork in Mexico and the U.S.
              </p>
              <p>
                <ExternalLink href="http://angelfire.com/tx4/scorpiones">Kari's Scorpion Pages</ExternalLink>
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Randy Mercurio */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Randy-Mercurio.jpg"
                alt="Randy Mercurio"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Randy Mercurio</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Randy Mercurio is a former volunteer and former employee.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Israel Na'aman */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Israel Na'aman" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Israel Na'aman</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Israel received his Masters from the Hebrew University of Jerusalem. During a short visit to the AMNH, he digitized part of the former Lorenzo Prendini scorpion collection, now incorporated into the AMNH collections of Arachnida and Myriapoda.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Danielle Parsons */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Danielle Parsons" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Danielle Parsons</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Danielle assisted with sorting, rebottling, labeling, reorganizing, and databasing the arachnid collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Fabienne Paumet */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Fabienne Paumet" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Fabienne Paumet</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Fabienne assisted with sorting, rebottling, labeling, reorganizing, and databasing the arachnid collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Warren Schmidt */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Warren Schmidt" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Warren Schmidt</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Warren accompanied Lorenzo Prendini on an expedition to collect arachnids in Malawi.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Susan Tosier */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Susan Tosier" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Susan Tosier</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Susan assisted with sorting, rebottling, labeling, and reorganizing, and databasing the arachnid collection.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Zach Valois */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Zach-Valois.jpg"
                alt="Zach Valois"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Zach Valois</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Zach generously assisted the NSF-REVSYS Vaejovidae project with fieldwork throughout Arizona, Nevada, and Utah. Zach was studying scorpion biogeography at the Utah State University. RIP.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* John Visser */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/John-Visser.jpg"
                alt="John Visser"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">John Visser</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                John Visser was a retired herpetologist with a fascination for scorpions. John's association with the AMNH went back to the time of the herpetologist Charles Mitchell Bogert. He assisted the AMNH with donations of arachnids for several years before he passed away.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Peg Werns */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Peg Werns" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Peg Werns</h4>
              <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
              <p className="text-gray-700">
                Peg assisted with sorting, rebottling, labeling, reorganizing, and databasing specimens and tissue samples.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
    </div>
  );
}
