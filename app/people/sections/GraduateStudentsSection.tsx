'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function GraduateStudentsSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="graduate-students" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Graduate Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Several graduate students worked in the Arachnology lab in past years. These students were funded from various sources including grants from the <ExternalLink href="http://www.nsf.gov">National Science Foundation</ExternalLink> and the AMNH (graduate student fellowships and the Comparative Biology Program of the Richard Gilder Graduate School). If you are interested graduate study in the Arachnology lab, please visit the website of the <ExternalLink href="https://www.amnh.org/our-research/richard-gilder-graduate-school">Richard Gilder Graduate School</ExternalLink> to apply to the RGGS for a graduate student fellowship for study at a partner programs (e.g., City University of New York).
          </p>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />
          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>

          {/* George Popovici */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/George-Popovici.jpg"
                  alt="George Popovici"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">George Popovici</h3>
              <p className="text-base text-gray-600 mb-1">Comparative Biology Ph.D. Program, Richard Gilder Graduate School, AMNH</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2026 - Ph.D. on systematics and biogeography of the Asian vinegaroons (whip scorpions) and the evolution of defense secretions</p>
              <p className="text-gray-700">
                George Popovici graduated with a BSc in Biological Sciences from Imperial College London in 2025, during which time he conducted research on centipede taxonomy and systematics at the Natural History Museum, London. He is also affiliated with the Molecular Biology Laboratory of the “Grigore Antipa” National Museum of Natural History in Bucharest, Romania, where his work focuses on the systematics and biogeography of Romanian myriapods and arachnids. George joined the AMNH in 2025 as a doctoral student in the Richard Gilder Graduate School&apos;s Comparative Biology PhD program; his current research investigates the taxonomy and systematics of the <em>Thelyphonida</em> (whip scorpions) and the evolution of their complex chemical defense systems.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Alice Wang */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Alice-Wang.jpg"
                  alt="Alice Wang"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Alice Wang</h3>
              <p className="text-base text-gray-600 mb-1">Comparative Biology Ph.D. Program, Richard Gilder Graduate School, AMNH</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2026 - Ph.D. on phylogeny and evolution of sound communication in hormurid scorpions</p>
              <p className="text-gray-700">
                Alice Wang graduated with a BA in Environmental Science with a minor in Biology from Barnard College, Columbia University. Her research interests lie at the intersection of animal behavior and phylogenomics, focusing on how animals perceive and respond to the world around them and the evolutionary context underlying these actions. She has previously conducted research spanning systematics and biogeography of African freshwater tetra fishes (Alestidae) and olfactory communication in dogs (<em>Canis familiaris</em>). Her current research focuses on describing and determining the evolutionary history of intraspecific acoustic communication in scorpions, combining behavioral studies of live animals with morphological and phylogenomic analyses of museum collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Colby Sain */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Colby-Sain.jpg"
                  alt="Colby Sain"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Colby Sain</h3>
              <p className="text-base text-gray-600 mb-1">Ecology, Evolution and Behavior Program, City College, City University of New York</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2023 - M.S. on systematics and biogeography of montane lineages of vaejovid scorpions in the U.S.</p>
              <p className="text-gray-700">
                Colby Sain began her academic career as an undergraduate at the University of Tennessee, Knoxville, within the Department of Earth and Planetary Sciences, where she studied invertebrate microfossils. In 2019, Colby joined the AMNH as an REU (Research Experiences for Undergraduates) student under the guidance of Ricardo Botero-Trujillo, Stephanie Loria, and Pio Colmenares, focusing on the order <em>Ricinulei</em>. From conducting molecular laboratory work to collecting live specimens in the field, she has continued to collaborate with the AMNH Arachnology Lab in various capacities. Colby is currently a graduate student at the City University of New York (CUNY), where her thesis research investigates the systematics and distribution of <em>Vaejovis</em> scorpions in the American Southwest.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Nicolas Cazzaniga */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Nicolas-Cazzaniga.jpeg"
                  alt="Nicolas Cazzaniga"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Nicolas Cazzaniga</h3>
              <p className="text-base text-gray-600 mb-1">Ecology, Evolution and Behavior Program, City University of New York</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2022 - Ph.D. on systematics, evolution and biogeography of the Neotropical whip spider family Phrynidae</p>
              <p className="text-gray-700">
                Nick completed his B.S. in Entomology at Purdue University in 2019, where his capstone thesis analyzed social versus solitary growth rates in the Socotra Island Blue Baboon tarantula, <em>Monocentropus balfouri</em>. During his undergraduate tenure, he dedicated significant time to the Yale insect collection and various entomology laboratories on the Purdue campus. Nick pivoted his focus toward the understudied arachnid orders after working with live specimens in Purdue’s invertebrate zoo and within the exotic pet trade. Following a brief residency in the zoological sector at the Maritime Aquarium, he was awarded a Graduate Student Fellowship from the AMNH in 2022. He is currently conducting his doctoral research on the systematics and biogeography of the amblypygid family <em>Phrynidae</em> through the Ecology and Evolutionary Biology PhD program at the City University of New York. His work is supported by an NSF grant focused on the Systematics and Evolution of Pedipalpi.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Javier Blasco Aróstegui */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Javier-Blasco-Arostegui.jpg"
                  alt="Javier Blasco Aróstegui"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Javier Blasco Aróstegui</h3>
              <p className="text-base text-gray-600 mb-1">Center of Ecology, Evolution and Climate Change, University of Lisbon, Portugal</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2021 to 2026 - Ph.D. on systematics, evolution and biogeography of European scorpions</p>
              <p className="text-gray-700">
                Javier Blasco-Aróstegui is a visiting PhD candidate (2022–2026) from the University of Lisbon, who has collaborated with the AMNH Arachnology Lab since 2022. His research integrates phylogenomics, comparative morphology, and toxinology to explore the evolutionary history and diversification of Western Palearctic scorpions. By leveraging museum collections and data from global field expeditions, he aims to elucidate how geological and climatic shifts have shaped regional endemism across the Mediterranean and beyond. Javier holds an MSc in Biodiversity and Conservation (UIMP–CSIC) and a BSc in Biology from the University of Salamanca. His professional background includes tenures as a laboratory technician at CIBIO-InBIO, where he studied shark genomics, and as a fieldwork technician at the Museo Nacional de Ciencias Naturales (CSIC), focused on arthropod biodiversity. His expertise bridges evolutionary genomics, systematics, and conservation science—a trajectory sparked by a 2016 residency at the Natural History Museum, London. He actively contributes to the AMNH collections by generating high-quality molecular datasets and depositing specimens from his worldwide expeditions.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          </div>

          <div data-tab="alumni" className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}>

          {/* Nayeli Gutiérrez Trejo */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Nayeli-Gutierrez-Trejo.jpg"
                  alt="Nayeli Gutiérrez Trejo"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Nayeli Gutiérrez Trejo</h3>
              <p className="text-base text-gray-600 mb-1">Comparative Biology Ph.D. Program, Richard Gilder Graduate School, AMNH</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2018 to 2023</p>
              <p className="text-gray-700">
                Nayeli completed her B.S. and M.S. in Mexico at the Universidad Autonoma del Estado de Hidalgo and Universidad Nacional Autonoma de Mexico, respectively, where she studied the systematics of Cerambycidae beetles. During her PhD at the RGGS, with Dr. Prendini as co advisor, she investigated the evolutionary history of the beetle genus <em>Tetraopes</em>, which comprises a diverse and highly specialized group of species that interact with the toxic defenses of milkweed plants in the genus <em>Asclepias</em>.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          
          {/* Jayson Slovak */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jayson-Slovak.jpg"
                alt="Jayson Slovak"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Jayson Slovak</h3>
              <p className="text-base text-gray-600 mb-1">City University of New York</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2016 to 2020</p>
              <p className="text-gray-700">
                Jayson Slovak graduated with a BA in Biology from Queens College, CUNY. During his undergraduate studies he worked under Dr. Stephane Boissinot to see how population size affected abundance of Transposable Elements in the Threespine Stickleback. During his leap year he accompanied an expedition with Dr. Boissinot to Ethiopia to frog collect samples for his lab. He worked as a Masters student in City College from 2016 to 2020, studying how the Great Rift Valley affects scorpion distribution and speciation in the region.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Stephanie F. Loria */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Stephanie-F-Loria.jpg"
                alt="Stephanie F. Loria"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Stephanie F. Loria</h3>
              <p className="text-base text-gray-600 mb-1">Richard Gilder Graduate School, American Museum of Natural History</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2011 to 2016</p>
              <p className="text-gray-700">
                Stephanie first came to the AMNH as a high school student participating in the High School Science Research Program of the Center for Biodiversity and Conservation with Felicity Arengo. In 2011, she completed her B.S. at Sewanee University in TN. During her B.S. she spent a summer working at the Field Museum of Natural History in Chicago as an NSF REU intern studying the evolution and biogeography of the Malagasy giant pill-millipedes, genus <em>Sphaeromimus</em>, under the guidance of Thomas Wesener and Petra Sierwald. Stephanie entered the Comparative Biology PhD program at the AMNH Richard Gilder Graduate School in 2011 and graduated in 2015. Her dissertation focused on the evolution and biogeography of Southeast Asian scorpions, particularly the family Chaerilidae.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tharina Bird */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Tharina-Bird.png"
                alt="Tharina Bird"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Tharina Bird</h3>
              <p className="text-base text-gray-600 mb-1">Colorado State University, Fort Collins, CO | NSF BS&I Grant</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2009 to 2014</p>
              <p className="text-gray-700">
                Tharina holds six degrees including two B.S. degrees, a Masters and a Higher Education Diploma from the University of Pretoria, South Africa. She was funded in part for a PhD at Colorado State University, by a National Science Foundation Biodiversity Surveys and Inventories grant to Paula Cushing and Lorenzo Prendini, graduating in 2014. Tharina visited the AMNH on several occasions to study and image the extensive camel spider collection for her dissertation research on the cheliceral morphology of Solifugae and worked extensively with Prendini. She then returned to the National Museum of Namibia, Windhoek.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Lionel Monod */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Lionel-Monod.jpg"
                alt="Lionel Monod"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Lionel Monod</h3>
              <p className="text-base text-gray-600 mb-1">CUNY, The City College of New York | AMNH Graduate Student Fellowship</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2005 to 2011</p>
              <p className="text-gray-700">
                Lionel completed a B.Sc. at the University of Geneva and an MSc revising the systematics of <em>Liocheles</em> scorpions at the Muséum National d'Histoire Naturelle, Paris, graduating in 2000. Monod subsequently worked at the Muséum d'Histoire Naturelle, Geneva. He visited the AMNH to work in the collections and Molecular Systematics Laboratory in November-December 2002 and, in 2005, Monod was awarded a Graduate Student Fellowship from the AMNH to conduct a PhD thesis on the systematics and biogeography of Indo-Pacific liochelid scorpions, via the PhD program in Ecology and Evolutionary Biology, City University of New York. He completed his PhD in 2011 and now works as a Research Officer at the Muséum d'Histoire Naturelle, Geneva.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Edmundo González Santillan */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Edmundo-Gonzalez-Santillan.jpg"
                alt="Edmundo González Santillan"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Edmundo González Santillan</h3>
              <p className="text-base text-gray-600 mb-1">CUNY, The City College of New York | NSF REVSYS Grant</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2004 to 2012</p>
              <p className="text-gray-700">
                Edmundo completed his B.S. and MSc at the Universidad Nacional Autónoma de México (UNAM). In 2004, Edmundo moved to the AMNH, supported by a National Science Foundation REVSYS grant on vaejovid systematics awarded to Lorenzo Prendini. He was accepted into the PhD program in Ecology and Evolutionary Biology, City University of New York, in 2005. For his dissertation he studied the systematic biology of the North American vaejovid scorpion subfamily Syntropinae. After graduating in 2012, he moved to the Laboratorio Nacional de Genómica para la Biodiversidad in Guanajuato, Mexico, where he continues his research on the evolution, phylogeny and biogeography of Mexican scorpions.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Lauren A. Esposito */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Lauren-A-Esposito.jpg"
                alt="Lauren A. Esposito"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Lauren A. Esposito</h3>
              <p className="text-base text-gray-600 mb-1">CUNY, The City College of New York | MAGNET-STEM Fellowship | NSF AGEP Fellowship | CUNY College NOW Fellow | CUNY Magnet Dissertation Fellowship | NSF GK-12 Fellowship</p>
              <p className="text-sm text-gray-500 mb-3">Graduate student from 2004 to 2011</p>
              <p className="text-gray-700">
                Lauren first came to the AMNH in 2002 as an undergraduate intern in the National Science Foundation (NSF) Research Experience for Undergraduates program, for a summer research project on the systematics of medically important African <em>Parabuthus</em> scorpions. After graduating with her B.S. from the University of Texas at El Paso, she was accepted into the PhD program in Ecology and Evolutionary Biology, City University of New York, and returned to the AMNH to continue research on scorpions. She revised the systematics of the medically important North American scorpion genus <em>Centruroides</em> for her PhD dissertation. She completed her doctorate degree in 2011 and is now at the California Academy of Sciences, where she is an Assistant Curator and Schlinger Chair of Arachnology.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
    </div>
  );
}
