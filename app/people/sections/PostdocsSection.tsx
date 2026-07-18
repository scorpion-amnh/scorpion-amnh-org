'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function PostdocsSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="postdocs" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="font-bold mt-8 lg:mt-0 mb-2">Postdocs</h2>
          <p className="text-xl mb-8">Current and former postdocs at the Arachnology Lab</p>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />
          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>
          
          {/* Muhammad Tahir */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Muhammad-Tahir.jpg"
                  alt="Muhammad Tahir"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">H. Muhammad Tahir</h3>
                <p className="text-base mb-3">Postdoc in 2026 - Postdoctoral research on the systematics and evolution of Pakistani scorpions supported by a Fulbright Postdoctoral Fellowship</p>
                <p>
                  Tahir earned his PhD from the University of the Punjab, Lahore, with a dissertation entitled “Biodiversity and Predatory Efficacy of Spiders Inhabiting the Rice Fields of Central Punjab, Pakistan.” In addition to his work on <em>Araneae</em>, he has conducted extensive research on the scorpions of Pakistan in collaboration with Dr. Lorenzo Prendini. In May 2013, he first joined the American Museum of Natural History (AMNH) as a postdoctoral fellow under the Higher Education Commission (HEC) of Pakistan Postdoctoral Fellowship Program, where his research focused on the molecular systematics of scorpions, particularly within the family <em>Buthidae</em>. In January 2026, he rejoined the AMNH as a Fulbright Postdoctoral Fellow. His current research involves the molecular systematics and development of a comprehensive DNA barcode database for medically and commercially significant scorpion species of Pakistan, including those from the Kashmir region. Alongside his research at the AMNH, he serves as Professor of Zoology at Government College University, Lahore.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Jose Barba-Montoya */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Jose-Barba-Montoya.jpg"
                  alt="Jose Barba-Montoya"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Jose Barba-Montoya</h3>
                <p className="text-base mb-3">Postdoc in 2024 and 2025 - Postdoctoral research on the phylogenomics of <em>Chelicerata</em> supported by a Gerstner Postdoctoral Fellowship</p>
                <p>
                  Jose investigates patterns of molecular evolution and species diversification across the tree of life by integrating phylogenomics with systematics and ecology. His primary focus lies in inferring evolutionary relationships and divergence times at both the species and subspecies levels. A central pillar of his research involves the development of novel bioinformatic methods for phylogenomic analysis and molecular clock dating, designed to mitigate sources of error and enhance the accuracy of evolutionary reconstructions. Currently a Research Associate in the Division of Invertebrate Zoology at the American Museum of Natural History (AMNH), Jose previously served as a Gerstner Scholar in Bioinformatics and Computational Biology at the Richard Gilder Graduate School (2023–2025). He continues to collaborate with Professor Lorenzo Prendini and members of the Arachnology Lab to investigate evolutionary patterns across the arachnid tree of life, utilizing high-throughput, next-generation sequencing data.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Jairo A. Moreno-González */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Jairo-A-Moreno-Gonzalez.jpg"
                  alt="Jairo A. Moreno-González"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Jairo A. Moreno-González</h3>
                <p className="text-base mb-3">Postdoc from 2022 to 2026 - Postdoctoral research on the systematics and evolution of <em>Pedipalpi</em> and Neotropical scorpions supported by an NSF Postdoctoral Fellowship and a Theodore Roosevelt Postdoctoral Fellowship</p>
                <p>
                  Jairo A. Moreno-González earned his B.Sc. in Biology from the Universidad del Valle, Colombia, and his Ph.D. in Biological Sciences at Universidade de São Paulo, Brazil. His Ph.D. dissertation focused on the systematics of the neotropical scorpion genus <em>Tityus</em> (Arachnida: <em>Scorpiones</em>, <em>Buthidae</em>), integrating morphological and molecular evidence. In May 2022, Jairo joint the American Museum of Natural History (AMNH) as a postdoc of the NSF project: “Systematics and evolution of <em>Pedipalpi</em> (whip spiders and whip scorpions): phylogenomics and morphology of understudied arachnids”, under the supervision of Dr. Lorenzo Prendini. In 2024, he became a Gerstner Scholar at the Richard Gilder School (RGGS) at AMNH with his project: "Neotropical biogeography assessed from the perspective of the World’s most diverse scorpion genus, <em>Tityus</em>". In May 2026, after finishing his appointment at Gerstner Scholar, he will continue to investigate the biogeography and phylogenomics of <em>Tityus</em> as a postdoctoral NSF STAR Grant scholar. Jairo's research combines detailed phenotype examination and molecular data to test biogeographic and phylogenetic hypotheses, using various arachnid orders —including <em>Amblypygi</em>, <em>Schizomida</em>, <em>Scorpiones</em>, and <em>Thelyphonida</em>— as study models.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          </div>

          <div
            data-tab="alumni"
            className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}
          >
          <h3 className="font-bold mt-12 mb-2">Alumni</h3>
          <p className="text-xl mb-8">Former postdocs of the Arachnology Lab at AMNH</p>

          {/* Ricardo Botero-Trujillo */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Ricardo-Botero-Trujillo.jpg"
                  alt="Ricardo Botero-Trujillo"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Ricardo Botero-Trujillo</h3>
                <p className="text-base mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET</p>
                <p className="text-meta mb-3">Postdoc from 2018 to 2020</p>
                <p className="mb-3">
                  <ExternalLink href="https://www.researchgate.net/profile/Ricardo_Botero-Trujillo">Research Gate</ExternalLink>
                </p>
                <p>
                  Ricardo completed his Biology B.S. at Javeriana University in Bogota. While an undergraduate student, he became interested in arachnids and started working on scorpions from his native country, Colombia. Gradually, hooded thick-spiders (order Ricinulei) and sun-spiders (order Solifugae) became part of his research interests. After a 5-year period working in the pharmaceutical industry, Ricardo moved to Argentina to undertake doctoral studies at the Buenos Aires University. There, he conducted his research at the Division of Arachnology of the Argentinian Museum of Natural Sciences Bernardino Rivadavia. His PhD thesis consisted of a taxonomic revision and phylogenetic analysis of the South American solifuge family Mummuciidae. In 2016, Ricardo visited the AMNH collections, supported by a Theodore Roosevelt Memorial Grant from the AMNH and a Vincent Roth Grant for Systematics Research from the American Arachnological Society. Ricardo is currently a Theodore Roosevelt Postdoctoral Research Fellow from the Richard Gilder Graduate School at the AMNH, and is now working on the evolution of Ricinuleids.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Frederic Schramm */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Frederic-Schramm.jpg"
                  alt="Frederic Schramm"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Frederic Schramm</h3>
                <p className="text-base mb-1">American Museum of Natural History, New York | <ExternalLink href="https://www.daad.de/en/study-and-research-in-germany/scholarships/">DAAD Scholarships</ExternalLink></p>
                <p className="text-meta mb-3">Postdoc in 2020</p>
                <p className="mb-3">
                  <ExternalLink href="https://www.researchgate.net/profile/Frederic_Schramm2">Research Gate</ExternalLink>
                </p>
                <p>
                  Fred got his Masters degree in molecular and cellular biology from the Philipps University of Marburg, Germany in 2013. In 2019 he obtained his PhD in molecular biosciences from Stockholm University, Sweden for his work investigating how bacteria fulfill the basic cellular need of maintaining a functional proteome. In his research, Frederic has always been keen on comparative approaches that incorporate the evolutionary perspective enabling a broader and functionally relevant understanding of fundamental biological processes. Becoming convinced of the importance of the evolutionary perspective of his research during his PhD, combined with a long-standing passion for arachnids, he began collaborating on arachnological research projects aimed at enhancing the knowledge of Caribbean arachnid diversity. In February of 2020 he joined the AMNH for a six-months short-term postdoctoral research stay. In his research project funded by the German Academic Exchange Service and a Theodore Roosevelt Memorial Grant he investigates the evolution of Mexican whip spiders.
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
                <h3 className="font-bold mb-1">Stephanie F. Loria</h3>
                <p className="text-base mb-1">American Museum of Natural History, New York</p>
                <p className="text-meta mb-3">Postdoc from 2018 to 2020</p>
                <p className="mb-3">
                  <ExternalLink href="https://www.researchgate.net/profile/Stephanie_Loria2">Research Gate</ExternalLink>
                </p>
                <p>
                  Stephanie first came to the AMNH as a high school student participating in the High School Science Research Program of the Center for Biodiversity and Conservation with Felicity Arengo. In 2011, she completed her B.S. at Sewanee University in TN. During her B.S. she spent a summer working at the Field Museum of Natural History in Chicago as an NSF REU intern studying the evolution and biogeography of the Malagasy giant pill-millipedes, genus <em>Sphaeromimus</em>, under the guidance of Thomas Wesener and Petra Sierwald. Stephanie entered the Comparative Biology PhD program at the AMNH Richard Gilder Graduate School in 2011 and graduated in 2015. Her dissertation focused on the evolution and biogeography of Southeast Asian scorpions, particularly the family Chaerilidae.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Carsten Kamenz */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Carsten-Kamenz.jpg"
                  alt="Carsten Kamenz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Carsten Kamenz</h3>
                <p className="text-base mb-1">American Museum of Natural History, New York | Kalbfleisch Fellowship</p>
                <p className="text-meta mb-3">Postdoc from 2009 to 2011</p>
                <p>
                  Carsten received his PhD at the Humboldt-Universität zu Berlin, Germany, during which he visited the AMNH on an Annette Kade Fellowship. His research interest comprises the evolution of Arachnida with the focus on terrestrial adaptations. Carsten's PhD thesis was a comprehensive study of the morphology of fully land-adapted book lungs from extant and extinct arachnids. During the course of his post-doctoral research at the AMNH, Carsten examined the Palaeozoic scorpions, testing them for the purported aquatic life. The methodological spectrum he applied for revealing the morphological and anatomical characters, reaches from classical microscopy, through electron microscopy, to cutting-edge microtomographical techniques.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* José Antonio Ochoa */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Jose-Antonio-Ochoa.jpg"
                  alt="José Antonio Ochoa"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">José Antonio Ochoa</h3>
                <p className="text-base mb-1">American Museum of Natural History, New York | Kalbfleisch Fellowship</p>
                <p className="text-meta mb-3">Postdoc from 2007 to 2009</p>
                <p>
                  José completed his PhD at the Universidad Nacional de Cordoba, Argentina. His dissertation reviewed the systematics and biogeography of the scorpions of southern Peru. Jose's research interests include the systematics of the Andean scorpion genera <em>Orobothriurus</em> (Bothriuridae) and <em>Hadruroides</em> (Iuridae). He moved to the AMNH, supported by a Postdoctoral Research Fellowship in 2007. His postdoctoral research project was the first attempt to study the phylogeny of the Neotropical family Chactidae using morphological and genetic data.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Dana Price */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Dana-Price.jpg"
                  alt="Dana Price"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Dana Price</h3>
                <p className="text-base mb-1">NSF-BS&I Solifugae Grant | NSF-AToL Spider Phylogeny Grant</p>
                <p className="text-meta mb-3">Postdoc from 2007 to 2008</p>
                <p>
                  Dana completed her PhD at Rutgers University in the Graduate Program of Ecology and Evolution. The title of her dissertation was Phylogeny, Biogeography and Behavior of the Dung Beetle Genus <em>Phanaeus</em> (Scarabaeidae: Scarabaeinae). In 2007 Dana worked with Lorenzo Prendini as a Postdoctoral Researcher at the AMNH (Division of Invertebrate Zoology) on sun spiders (Solifugae) and scorpions (Vaejovidae) supported by Prendini's NSF BS&I and RevSys grants; she worked for the NSF AToL Spider Phylogeny grant in 2008. Her interests include systematics, behavior, ecology and conservation biology.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Camilo I. Mattoni */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Camilo-I-Mattoni.jpg"
                  alt="Camilo I. Mattoni"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Camilo I. Mattoni</h3>
                <p className="text-base mb-1">American Museum of Natural History, New York | Postdoctoral Fellowship</p>
                <p className="text-meta mb-3">Postdoc from 2004 to 2006</p>
                <p>
                  Camilo completed his PhD at the Universidad Nacional de Córdoba. His dissertation involved a systematic revision of the South American scorpion genus <em>Bothriurus</em>. He moved to the AMNH, supported by a Postdoctoral Research Fellowship in Genomics, in 2004. The aim of Camilo's postdoctoral research was to produce a robust phylogenetic hypothesis of relationships in the diverse Gondwana scorpion family Bothriuridae, using morphological and genetic data, and a sampling of as many bothriurid species as possible. He is also interested in scorpion ecology, behavior and reproduction, and in theoretical aspects of cladistics. One of his most recent contributions provides the first detailed description and comparison of the genital plugs in scorpions.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Erich S. Volschenk */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Erich-S-Volschenk.jpg"
                  alt="Erich S. Volschenk"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="font-bold mb-1">Erich S. Volschenk</h3>
                <p className="text-base mb-1">American Museum of Natural History, New York | Postdoctoral Fellowship</p>
                <p className="text-meta mb-3">Postdoc from 2003 to 2006</p>
                <p>
                  Erich completed his PhD at Curtin University, Perth. His PhD dissertation involved a systematic revision of the Australian buthid genera. He began a Postdoctoral Research Fellowship in Genomics at the AMNH in 2003. His postdoctoral research project is the first serious attempt to investigate the phylogeny of the cosmopolitan scorpion family Buthidae, using molecular and morphological data and a broad sample of exemplar species. Erich's research interests include the systematics of Buthidae and the Australian endemic scorpion genus <em>Urodacus</em>, the homology of scorpion hemispermatophores, and the biology of troglobitic arachnids. He pioneered the use of ultraviolet light in scorpion photomicrography.
                </p>
              </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
    </div>
  );
}
