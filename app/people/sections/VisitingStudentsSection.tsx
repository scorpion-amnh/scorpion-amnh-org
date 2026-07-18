'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function VisitingStudentsSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="visiting-students" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="font-bold mt-8 lg:mt-0 mb-2">Visitors</h2>
          <p className="text-lead mb-8">
            Many postdocs and graduate students from other institutions in the U.S. and abroad have visited the AMNH Arachnology Lab in the past, often funded in part by the AMNH Small Grants program (Annette Kade Fellowships, Collections Study Grants and Theodore Roosevelt Memorial Fund). If you are interested in applying for small grants to visit the AMNH, please visit the <ExternalLink href="https://www.amnh.org/our-research/richard-gilder-graduate-school/academics-and-research/fellowship-and-grant-opportunities/research-grants-and-student-exchange-fellowships">Richard Gilder Graduate School.</ExternalLink>
          </p>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />
          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>

          {/* Antonio Galán Sánchez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Antonio-Galan-Sanchez.jpg"
                  alt="Antonio Galán Sánchez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Antonio Galán Sánchez</h4>
              <p className="text-sm mb-1">Museum für Naturkunde, Humboldt-Universität, Berlin, Germany</p>
              <p className="text-meta mb-2">PhD student in 2025 and 2026</p>
              <p>
                Antonio’s research focuses on the evolution and functional impacts of eye loss in spiders. He is also interested in linyphiid systematics, the online documentation of biodiversity inventories, and the taxonomy of Araneomorphae. As part of his PhD project, Antonio studied the Synspermiata, a diverse but understudied clade of spiders which exhibit extraordinary diversity in eye number. Antonio visited the AMNH collection in January 2025 to revise, identify, and request loan materials. After being awarded an Annette-Kade Fellowship, he returned to the AMNH for three months in 2025 and 2026 to comprehensively survey and document the variation in eyes across the family Pholcidae and other Synspermiata, as well as scan high-quality specimens using the micro-CT facility.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>

          <div data-tab="alumni" className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}>

          {/* Matias Izquierdo */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Matias-Izquierdo.jpg"
                  alt="Matias Izquierdo"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Matias Izquierdo</h4>
              <p className="text-sm mb-1">Universidad Nacional, Cordoba, Argentina</p>
              <p className="text-meta mb-2">Postdoc in 2025</p>
              <p>
                Matias visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Breanna Jordan */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Breanna-Jordan.png"
                  alt="Breanna Jordan"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Breanna Jordan</h4>
              <p className="text-sm mb-1">Harvard University, Cambridge, MA</p>
              <p className="text-meta mb-2">PhD student in 2025</p>
              <p>
                Breanna visited the AMNH for research on sea spiders (Pycnogonida).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sarah Morris */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Sarah-Morris.jpg"
                  alt="Sarah Morris"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Sarah Morris</h4>
              <p className="text-sm mb-1">The George Washington University, Washington, DC</p>
              <p className="text-meta mb-2">PhD student in 2025</p>
              <p>
                Sarah visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Daniel Castro-Pereira */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Daniel-Castro-Pereira.jpg"
                  alt="Daniel Castro-Pereira"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Daniel Castro-Pereira</h4>
              <p className="text-sm mb-1">Universidade de São Paulo, Brazil</p>
              <p className="text-meta mb-2">PhD student in 2024</p>
              <p>
                Daniel visited the AMNH for research on whip scorpions (Thelyphonida) supported by a grant from FAPESP.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Kaylin Chong */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Kaylin-Chong.jpg"
                  alt="Kaylin Chong"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Kaylin Chong</h4>
              <p className="text-sm mb-1">Harvard University, Cambridge, MA</p>
              <p className="text-meta mb-2">PhD student in 2024</p>
              <p>
                Kaylin visited the AMNH for research on ticks (Acari: Ixodida).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Erik Ciaccio */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Erik-Ciaccio.png"
                  alt="Erik Ciaccio"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Erik Ciaccio</h4>
              <p className="text-sm mb-1">University of Idaho, Moscow, ID</p>
              <p className="text-meta mb-2">PhD student in 2024</p>
              <p>
                Erik visited the AMNH for research on mygalomorph spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Valentin Ehrenthal */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Valentin-Ehrenthal.jpg"
                  alt="Valentin Ehrenthal"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Valentin Ehrenthal</h4>
              <p className="text-sm mb-1">University of Hamburg, Germany</p>
              <p className="text-meta mb-2">MS student in 2024</p>
              <p>
                Valentin visited the AMNH for research on Asian scorpions supported by an Annette Kade Fellowship.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Miguel Garcia */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Miguel Garcia" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Miguel Garcia</h4>
              <p className="text-sm mb-1">Instituto Politecnico Nacional, Mexico</p>
              <p className="text-meta mb-2">PhD student in 2024</p>
              <p>
                Miguel visited the AMNH for his research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Leonel Martinez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Leonel-Martinez.png"
                  alt="Leonel Martinez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Leonel Martinez</h4>
              <p className="text-sm mb-1">Museo Argentino de Ciencias Naturales, Argentina</p>
              <p className="text-meta mb-2">PhD student in 2024 and 2025</p>
              <p>
                Leonel visited the AMNH twice (2024, 2025) for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Paulo Pantoja */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Paulo-Pantoja.png"
                  alt="Paulo Pantoja"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Paulo Pantoja</h4>
              <p className="text-sm mb-1">Federal University of Pará, Brazil</p>
              <p className="text-meta mb-2">PhD student in 2024</p>
              <p>
                Paulo visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Karina Silvestre */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Karina Silvestre" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Karina Silvestre</h4>
              <p className="text-sm mb-1">University of Idaho, Moscow, ID</p>
              <p className="text-meta mb-2">PhD student in 2024</p>
              <p>
                Karina visited the AMNH for research on mygalomorph spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Pedro Martins */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Pedro-Martins.png"
                  alt="Pedro Martins"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Pedro Martins</h4>
              <p className="text-sm mb-1">Federal University of Minas Gerais, Brazil</p>
              <p className="text-meta mb-2">PhD student in 2023</p>
              <p>
                Pedro visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Goran Shikak */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Goran-Shikak.jpg"
                  alt="Goran Shikak"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Goran Shikak</h4>
              <p className="text-sm mb-1">University of Colorado, Denver, CO</p>
              <p className="text-meta mb-2">PhD student in 2023</p>
              <p>
                Goran visited the AMNH for research on Solifugae.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Pietro Tardelli */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Pietro Tardelli" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Pietro Tardelli</h4>
              <p className="text-sm mb-1">The George Washington University, Washington, DC</p>
              <p className="text-meta mb-2">PhD student in 2023</p>
              <p>
                Pietro visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Arnau Calatayud-Mascarell */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Arnau-Calatayud-Mascarell.png"
                  alt="Arnau Calatayud-Mascarell"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Arnau Calatayud-Mascarell</h4>
              <p className="text-sm mb-1">University of Idaho, Moscow, ID</p>
              <p className="text-meta mb-2">PhD student from 2022 to 2025</p>
              <p>
                Arnau visited the AMNH three times (2022, 2023, 2025) for his research on mygalomorph spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* David Chamé-Vázquez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/David-Chame-Vazquez.jpg"
                  alt="David Chamé-Vázquez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">David Chamé-Vázquez</h4>
              <p className="text-sm mb-1">Centro de Investigaciones Biológicas del Noroeste, La Paz, Mexico</p>
              <p className="text-meta mb-2">Postdoc in 2022</p>
              <p>
                David visited the AMNH for research on phrurolithid spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sahibzada M. Jawad */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Sahibzada-M-Jawad.jpg"
                  alt="Sahibzada M. Jawad"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Sahibzada M. Jawad</h4>
              <p className="text-sm mb-1">Ismailia College, Peshawar, Pakistan</p>
              <p className="text-meta mb-2">PhD student in 2022</p>
              <p>
                Sahib visited the AMNH for research on Pakistani scorpions supported by a HEC Pakistan Ph.D. Fellowship.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Willians Porto */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Willians-Porto.jpg"
                  alt="Willians Porto"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Willians Porto</h4>
              <p className="text-sm mb-1">Museo Argentino de Ciencias Naturales, Argentina</p>
              <p className="text-meta mb-2">PhD student in 2022</p>
              <p>
                Willians visited the AMNH for research on harvestmen (Opiliones).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Valerie Warhol */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Valerie Warhol" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Valerie Warhol</h4>
              <p className="text-sm mb-1">Carnegie Museum of Natural History, Pittsburgh, PA</p>
              <p className="text-meta mb-2">Volunteer researcher in 2022</p>
              <p>
                Valerie visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Shahan Derkarabetian */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Shahan-Derkarabetian.png"
                  alt="Shahan Derkarabetian"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Shahan Derkarabetian</h4>
              <p className="text-sm mb-1">Harvard University, Cambridge, MA</p>
              <p className="text-meta mb-2">Postdoc in 2019</p>
              <p>
                Shahan visited the AMNH for research on harvestmen (Opiliones).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jairo A. Moreno-González */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jairo-A-Moreno-Gonzalez.jpg"
                alt="Jairo A. Moreno-González"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Jairo A. Moreno-González</h4>
              <p className="text-sm mb-1">Museu de Zoologia, Universidade de Sao Paulo, Brasil</p>
              <p className="text-meta mb-2">PhD Student in 2019</p>
              <p>
                Jairo received his PhD from the Instituto de Biociencias, Universidad de Sao Paulo, Sao Paulo, Brazil. His research interests are focused on systematics and evolution of some arachnid orders such as Scorpiones (Buthidae: <em>Tityus</em>), and Pedipalpi (Schizomida, Uropygi and Amblypygi). His PhD project deals with the systematic revision of <em>Tityus</em> (<em>Archaeotityus</em>) using phenotypic and genetic evidence. He visited the AMNH for six months to examine material and score morphological characters for his thesis disseration.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Andria de Paula Santos da Silva */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Andria-de-Paula-Santos-da-Silva.jpg"
                alt="Andria de Paula Santos da Silva"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Andria de Paula Santos da Silva</h4>
              <p className="text-sm mb-1">Instituto de Biociencias, Universidade de Sao Paulo, Brasil</p>
              <p className="text-meta mb-2">PhD Student in 2019</p>
              <p>
                Andria's PhD project deals with the systematics of the scorpion genus <em>Ananteris</em> (Buthidae). She visited the AMNH collection to examine a large number of these scorpions and generate morphological data.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Catalina Romero */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Catalina-Romero.jpg"
                alt="Catalina Romero"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Catalina Romero</h4>
              <p className="text-sm mb-1">Universidad Nacional, Colombia</p>
              <p className="text-meta mb-2">PhD Student in 2019</p>
              <p>
                Catalina spent a few months visiting the AMNH collections to examine specimens and collect morphological data for her PhD thesis on pseudoscorpions of the family Whitiidae.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Miguel Medrano */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Miguel-Medrano.jpg"
                alt="Miguel Medrano"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Miguel Medrano</h4>
              <p className="text-sm mb-1">Museu Nacional, Universidade Federal do Rio de Janeiro, Brasil</p>
              <p className="text-meta mb-2">PhD Student in 2019</p>
              <p>
                Miguel spent a week at the AMNH examining type specimens for his PhD project on systematics of Cosmetidae (Opiliones, Laniatores).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Rene Barba */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Rene-Barba.jpg"
                alt="Rene Barba"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Rene Barba</h4>
              <p className="text-sm mb-1">Instituto de Ecología y Sistemática, Havana, Cuba | Collections Study Grant</p>
              <p className="text-meta mb-2">Student in 2019</p>
              <p>
                Rene's research focuses on the pseudoscorpion families Sternophoridae, Olpiidae and Garypinidae. He visited the AMNH collections to examine and image type and nontype material from the Caribbean.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jahnavi Joshi */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jahnavi-Joshi.jpg"
                alt="Jahnavi Joshi"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Jahnavi Joshi</h4>
              <p className="text-sm mb-1">Natural History Museum, UK</p>
              <p className="text-meta mb-2">Post-Doctoral Fellow in 2019</p>
              <p>
                Jahnnavi visited the AMNH to examine a series of old centipedes for an ongoing research project at the Natural History Museum in London.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Aaron Goodman */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Aaron-Goodman.jpg"
                alt="Aaron Goodman"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Aaron Goodman</h4>
              <p className="text-sm mb-1">California Academy of Sciences, USA</p>
              <p className="text-meta mb-2">Master's Student from 2018 to 2019</p>
              <p>
                Aaron is mainly interested in scorpion systematics. He came to the AMNH to generate morphological data for his master's dissertation on the genus <em>Centruroides</em> (Buthidae).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Stephan Schaffrath */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Stephan-Schaffrath.jpg"
                alt="Stephan Schaffrath"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Stephan Schaffrath</h4>
              <p className="text-sm mb-1">University of Cologne, Germany</p>
              <p className="text-meta mb-2">PhD Student in 2014 and 2018</p>
              <p>
                For Stephan's PhD he visited the AMNH to receive training in DNA isolation, amplification and sequencing while investigating the chemical composition of scorpion venoms, with a view to using species-specific signatures for systematics. Later, Stephan returned to spend three months at the AMNH generating DNA and morphological data for his PhD thesis, focused on the scorpion genus <em>Euscorpius</em> (Euscorpiidae).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carlos Alberto Martinez Muñoz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Carlos-Alberto-Martinez-Munoz.jpg"
                alt="Carlos Alberto Martinez Muñoz"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Carlos Alberto Martinez Muñoz</h4>
              <p className="text-sm mb-1">University of Turku, Finland</p>
              <p className="text-meta mb-2">PhD Student from 2018 to 2019</p>
              <p>
                Carlos' main research interest is focused on Myriapods. He came to the AMNH to examine and organize a series of old types described by Chamberlin.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Callum Mclean */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Callum-Mclean.jpg"
                alt="Callum Mclean"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Callum Mclean</h4>
              <p className="text-sm mb-1">Manchester Metropolitan University, UK</p>
              <p className="text-meta mb-2">PhD Student in 2018</p>
              <p>
                Callum visited the AMNH collections to examine various species of Amblypygi for his doctoral thesis, focused in biomechanics of predatory structures in arthropods.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Shlomo Cain */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Shlomo-Cain.jpg"
                alt="Shlomo Cain"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Shlomo Cain</h4>
              <p className="text-sm mb-1">University of Haifa, Oranim, Israel</p>
              <p className="text-meta mb-2">MSc Student in 2018</p>
              <p>
                Shlomo visited the AMNH for three months to examine scorpions of the genus <em>Buthacus</em> (Buthidae) for his master's dissertation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ivan Magalhaes */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Ivan-Magalhaes.jpg"
                alt="Ivan Magalhaes"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Ivan Magalhaes</h4>
              <p className="text-sm mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET | Doctoral fellow, Division Aracnologia</p>
              <p className="text-meta mb-2">PhD Student in 2017</p>
              <p>
                Ivan is a PhD candidate at the Museo Argentino de Ciencias Naturales "Bernardino Rivadavia", Argentina. His research focuses on spider systematics and its interface with their evolution and biogeography. His current project aims at resolving the systematics of crevice weavers (family Filistatidae), a group of shy and little-studied spiders most diverse in dry subtropical areas. His is also interested in the systematics of sand spiders (<em>Sicarius</em>) and spiny orb weavers (<em>Micrathena</em>).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Gerardo Contreras */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Gerardo-Contreras.jpg"
                alt="Gerardo Contreras"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Gerardo Contreras</h4>
              <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-meta mb-2">Student from 2015 to 2017</p>
              <p>
                Gerardo visited the AMNH to examine the collection of the North American scorpions of the genus <em>Vaejovis</em> and relatives, and score characters for his phylogenetic analysis. He returned a second time to generate DNA sequences in the molecular lab.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Rodrigo Monjáraz Ruedas */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Rodrigo-Monjaraz-Ruedas.jpg"
                alt="Rodrigo Monjáraz Ruedas"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Rodrigo Monjáraz Ruedas</h4>
              <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-meta mb-2">PhD student in 2014 and from 2016 to 2017</p>
              <p>
                Rodrigo is studying the Schizomida fauna of Mexico. He visited the AMNH to examine the schizomid holdings of the collection and score morphological characters for his PhD research.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tebogo Ledwaba */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Tebogo-Ledwaba.jpg"
                alt="Tebogo Ledwaba"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Tebogo Ledwaba</h4>
              <p className="text-sm mb-1">Ditsong National Museum of Natural History, Pretoria, South Africa</p>
              <p className="text-meta mb-2">Student in 2017</p>
              <p>
                Tebogo visited the AMNH for 2 months to digitize the AMNH collection of African scorpions and part of the Karoo BioGaps Grant funded by the South African National Research Foundation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jesus Alberto Cruz-López */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jesus-Alberto-Cruz-Lopez.jpg"
                alt="Jesus Alberto Cruz-López"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Jesus Alberto Cruz-López</h4>
              <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-meta mb-2">Student in 2017</p>
              <p>
                Jesus visited the AMNH to examine the collection of mexican harvestmen (Opiliones) as part of his dissertation research.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ricardo Botero-Trujillo */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Ricardo-Botero-Trujillo.jpg"
                alt="Ricardo Botero-Trujillo"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Ricardo Botero-Trujillo</h4>
              <p className="text-sm mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET | Doctoral fellow, Division Aracnologia | Theodore Roosevelt Memorial Grant</p>
              <p className="text-meta mb-2">PhD student in 2016</p>
              <p>
                Ricardo Botero Trujillo earned his biology degree from the Pontificia Universidad Javeriana, Bogotá. While an undergraduate student, he became interested in arachnids and started working on scorpions from his native country, Colombia. Gradually, hooded thick-spider (order Ricinulei) and sun-spiders (order Solifugae) became part of his research interests. After a 5-year period working in the pharmaceutical industry, Ricardo moved to Buenos Aires, Argentina to start his PhD His doctoral thesis consists of a taxonomic revision and phylogenetic analysis of the South American sun-spider family Mummuciidae. After being awarded a Theodore Roosevelt Memorial Grant, Ricardo visited the AMNH to study the collections of the groups he works on.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Dulce Flor Piedra */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Dulce-Flor-Piedra.jpg"
                alt="Dulce Flor Piedra"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Dulce Flor Piedra</h4>
              <p className="text-meta mb-2">PhD student in 2016</p>
              <p>
                Dulce came to examine the collection of Pseudoscorpiones for her dissertation research.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Rebecca Godwin */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Rebecca Godwin" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Rebecca Godwin</h4>
              <p className="text-sm mb-1">Auburn University, AL</p>
              <p className="text-meta mb-2">PhD student in 2016</p>
              <p>
                Rebecca visited the AMNH for research on trapdoor spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Francisco Salgueiro Sepulveda */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Francisco-Salgueiro-Sepulveda.jpg"
                alt="Francisco Salgueiro Sepulveda"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="font-bold mb-1">Francisco Salgueiro Sepulveda</h4>
              <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-meta mb-2">PhD student in 2016</p>
              <p>
                Francisco spent a month at the AMNH to study the collection of tetragnathid spiders for his dissertation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Diego Barrales */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Diego-Barrales.jpg"
                  alt="Diego Barrales"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Diego Barrales</h4>
                <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-meta mb-2">Student in 2016</p>
                <p>
                  Diego visted the AMNH to examine material belonging to the species <em>Mastigoproctus giganteus</em> especially from localities within the United States. His findings will be incorporated into a morphological analysis used for a species delimitation project.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Samuel Mwangi */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Samuel-Mwangi.jpg"
                  alt="Samuel Mwangi"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Samuel Mwangi</h4>
                <p className="text-sm mb-1">West Texas A&M University, Canyon, TX | National Museums of Kenya, Nairobi | Theodore Roosevelt Fellowship, Richard Lounsbery Foundation, Collections Study Grant</p>
                <p className="text-meta mb-2">MSc student in 2005 and 2016</p>
                <p>
                  Samuel's MSc research focuses on the diversity of Kenyan scorpions of Kenya. As student at the National Museums of Kenya, Nairobi, he visited the AMNH for training in the Molecular Systematics Laboratory. He later returned to the AMNH to examine and photograph specimens for his Masters research at West Texas A&M University.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Bastian-Jesper Klußmann-Fricke */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Bastian-Jesper-Klussmann-Fricke.jpg"
                  alt="Bastian-Jesper Klußmann-Fricke"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Bastian-Jesper Klußmann-Fricke</h4>
                <p className="text-sm mb-1">University of Rostock, Germany | Annette-Kade Fellowship</p>
                <p className="text-meta mb-2">Student in 2015</p>
                <p>
                  Bastian visited the AMNH to study the respiratory and circulatory systems of camel spiders (Solifugae) using osmium tetroxide staining, corrosion casting, and microCT.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Gustavo Silva de Miranda */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Gustavo-Silva-de-Miranda.jpg"
                  alt="Gustavo Silva de Miranda"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Gustavo Silva de Miranda</h4>
                <p className="text-sm mb-1">Natural History Museum of Denmark, University of Copenhagen</p>
                <p className="text-meta mb-2">PhD student in 2014 and 2015</p>
                <p>
                  Gustavo visited the AMNH twice during his PhD to work on the collection of whip spiders (Amblypygi) for his revision of the family Charinidae. He was trained and generated DNA sequence data from charinid samples in the AMNH molecular lab.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ingrid Catalina Romero Ortiz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Catalina-Romero.jpg"
                  alt="Ingrid Catalina Romero Ortiz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Ingrid Catalina Romero Ortiz</h4>
                <p className="text-sm mb-1">Universidad Nacional de Colombia, Bogotá</p>
                <p className="text-meta mb-2">Graduate student in 2015</p>
                <p>
                  Ingrid Catalina visited the AMNH to study the pseudoscorpion holdings and types as part of her graduate research on their taxonomy and systematics.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Daniela Ramírez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Daniela-Ramirez.jpg"
                  alt="Daniela Ramírez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Daniela Ramírez</h4>
                <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-meta mb-2">PhD student in 2014</p>
                <p>
                  Daniela visited the AMNH to examine the collection of tarantula spiders (Theraphosidae) as part of her PhD research.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carlos Santibañez-López */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Carlos-Santibanez-Lopez.jpg"
                  alt="Carlos Santibañez-López"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Carlos Santibañez-López</h4>
                <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City | Collections Study Grant, Theodore Roosevelt Memorial Grant</p>
                <p className="text-meta mb-2">PhD student in 2009, from 2011 to 2012, and in 2014</p>
                <p>
                  Carlos revised the genus <em>Diplocentrus</em> (Diplocentridae) for his PhD and has studied the taxonomy of other scorpions occurring in Mexico. He first visited the AMNH examine the collection of Diplocentridae and later returned to extract, amplify and sequence DNA from Diplocentridae, and to score a morphological matrix for phylogenetic analysis.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Roberta Engel */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PhotoPlaceholder name="Roberta Engel" />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Roberta Engel</h4>
                <p className="text-sm mb-1">University of Connecticut, Storrs, CT</p>
                <p className="text-meta mb-2">Student in 2012</p>
                <p>
                  Roberta's research focused on the systematics of pseudoscorpions. She visited the AMNH to examine the holdings of Australian pseudoscorpions.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* David Vrech */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PhotoPlaceholder name="David Vrech" />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">David Vrech</h4>
                <p className="text-sm mb-1">Universidad Nacional de Córdoba, Argentina</p>
                <p className="text-meta mb-2">PhD student in 2012</p>
                <p>
                  David visited the AMNH for research on the sperm packages of scorpions.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Humberto Yoji Yamaguti */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Humberto-Yoji-Yamaguti.jpg"
                  alt="Humberto Yoji Yamaguti"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Humberto Yoji Yamaguti</h4>
                <p className="text-sm mb-1">Universidade de São Paulo, Brazil</p>
                <p className="text-meta mb-2">PhD student in 2009 and 2011</p>
                <p>
                  Humberto conducted a revision and phylogenetic analysis of the scorpion genus <em>Rhopalurus</em> (Buthidae) for his PhD He visited the AMNH to extract, amplify and sequence DNA from Rhopalurus samples and to use materials to score characters.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Patricia Carrera */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PhotoPlaceholder name="Patricia Carrera" />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Patricia Carrera</h4>
                <p className="text-sm mb-1">Universidad Nacional de Cordoba, Argentina | Collections Study Grant</p>
                <p className="text-meta mb-2">PhD student in 2009</p>
                <p>
                  Patricia studied mating behavior and sexual selection in bothriurid scorpions for her PhD She visited the AMNH to study the structure and homology of the scorpion hemispermatophore.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jesus Alfonso Ballesteros Chavez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Jesus-Alfonso-Ballesteros-Chavez.jpg"
                  alt="Jesus Alfonso Ballesteros Chavez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Jesus Alfonso Ballesteros Chavez</h4>
                <p className="text-sm mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City | Collections Study Grant</p>
                <p className="text-meta mb-2">MSc student in 2008</p>
                <p>
                  Jesus' MSc research aimed to reconstruct the phylogenetic relationships of the species belonging to the Neotropical whip spider genus <em>Paraphrynus</em> (Amblypygi) and its relationship with the rest of the genera of Phrynidae. He visited the AMNH to study the Neotropical phrynids. He then moved to George Washington University for a PhD on spiders.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Fabio Akashi Hernandes */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Fabio-Akashi-Hernandes.jpg"
                  alt="Fabio Akashi Hernandes"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Fabio Akashi Hernandes</h4>
                <p className="text-sm mb-1">UNESP: São Paulo State University, Brazil</p>
                <p className="text-meta mb-2">MSc student in 2008 and 2016</p>
                <p>
                  Fabio's main interests are the taxonomy of plant mites (Bdellidae, Tetranychidae, Raphignathoidea) and feather mites (Astigmata), with an emphasis on the taxonomy and phylogeny of the genus <em>Aponychus</em> and related genera (Acari, Tetranychidae). He visited the AMNH to study mite types from several groups.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Andrés Ojanguren-Affilastro */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Andres-Ojanguren-Affilastro.jpg"
                  alt="Andrés Ojanguren-Affilastro"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Andrés Ojanguren-Affilastro</h4>
                <p className="text-sm mb-1">Museo Argentino de Ciencias Naturales, Buenos Aires, Argentina | AMNH Collections Study Grant</p>
                <p className="text-meta mb-2">PhD student in 2005 and 2007</p>
                <p>
                  Andrés' PhD research was a revision of the diverse South American bothriurid genus <em>Brachistosternus</em>. He visited the AMNH twice, the first time to extract, amplify and sequence DNA from bothriurid samples and a second time to continue his work on bothriurid systematics.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Alexander V. Gromov */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Alexander-V-Gromov.jpg"
                  alt="Alexander V. Gromov"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Alexander V. Gromov</h4>
                <p className="text-sm mb-1">Institute of Zoology, Almaty, Kazakhstan | Collections Study Grant and NSF BS&I Grant</p>
                <p className="text-meta mb-2">Student in 2007</p>
                <p>
                  Alex is interested in central Asian solifuges and is revising the family Karschiidae. He visited the AMNH to work on the solpugid collections as part of the Global Survey and Inventory of Solifugae.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carsten Kamenz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Carsten-Kamenz.jpg"
                  alt="Carsten Kamenz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Carsten Kamenz</h4>
                <p className="text-sm mb-1">Humboldt University, Berlin, Germany | Annette Kade Fellowship</p>
                <p className="text-meta mb-2">Student from 2005 to 2006</p>
                <p>
                  Carsten was a visiting student and a postdoc.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Valerio Vignoli */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Valerio-Vignoli.jpg"
                  alt="Valerio Vignoli"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Valerio Vignoli</h4>
                <p className="text-sm mb-1">University of Siena, Italy | Theodore Roosevelt Memorial Grant</p>
                <p className="text-meta mb-2">PhD student in 2004 and 2006</p>
                <p>
                  Valerio revised the taxonomy, ecology and biogeography of <em>Euscorpius</em> for his PhD. He visited the AMNH twice to revise the North American scorpion family Typhlochactidae. He also participated in AMNH trips to Benin, Costa Rica, Morocco, Guinea-Bissau and Senegal.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Christian Wirkner */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Christian-Wirkner.jpg"
                  alt="Christian Wirkner"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Christian Wirkner</h4>
                <p className="text-sm mb-1">Friedrich-Schiller University, Jena, Germany | Annette Kade Fellowship</p>
                <p className="text-meta mb-2">Student in 2004</p>
                <p>
                  Christian studied the comparative morphology of arthropods from phylogenetic and evolutionary perspectives and, more specifically, organ evolution and transformation, first at Jena University before moving to Rostock University. He visited the AMNH to study the scorpion circulatory system.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Christina Bisulca */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Christina-Bisulca.jpg"
                  alt="Christina Bisulca"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Christina Bisulca</h4>
                <p className="text-sm mb-1">University of Delaware, Newark, DE | Winterthur Art Conservation Fellowship</p>
                <p className="text-meta mb-2">MSc student in 2003</p>
                <p>
                  Christina visited the AMNH during her MSc in Art Conservation at the University of Delaware, working with the Department of Natural Sciences Conservation. Bisulca surveyed the state of curation of the non-spider Arachnid and Myriapod Collection, resulting in upgrades to the glassware and closures housing the collection.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Amazonas Chagas, Jr. */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Amazonas-Chagas-Jr.jpg"
                  alt="Amazonas Chagas, Jr."
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Amazonas Chagas, Jr.</h4>
                <p className="text-sm mb-1">Museu Nacional, Universidade Federal do Rio de Janeiro, Brazil</p>
                <p className="text-meta mb-2">Postgraduate student in 2003</p>
                <p>
                  After his Masters, Amazonas visited the AMNH while in the USA to work at the North Carolina State Museum, Raleigh. At the AMNH, Amazonas studied scolopendromorph centipedes from around the world.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Lionel Monod */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Lionel-Monod.jpg"
                  alt="Lionel Monod"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="font-bold mb-1">Lionel Monod</h4>
                <p className="text-sm mb-1">University of Geneva, Switzerland</p>
                <p className="text-meta mb-2">Student in 2002</p>
                <p>
                  Lionel Monod was a visiting student and graduate student.
                </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
    </div>
  );
}
