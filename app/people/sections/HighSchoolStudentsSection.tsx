'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function HighSchoolStudentsSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="high-school-students" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">High School Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Several high school students have worked in the Arachnology Lab supported by various internships. Many have continued to undergraduate programs. We acknowledge and appreciate their work. If you are interested in interning in the Arachnology Lab at the AMNH please visit the <ExternalLink href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program">Science Research Mentoring Program.</ExternalLink>
          </p>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />
          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>
          {/* Meredith Metz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Meredith-Metz.jpg"
                  alt="Meredith Metz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Meredith Metz</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2025 to 2026</p>
              <p className="text-gray-700">
                Meredith Metz joined the Arachnology lab in 2025 and continues to volunteer during the summer extracting and sequencing scorpion and amblypygid DNA under the supervision of Pío Colmenares and Colby Sain.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Alex Liu */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Alex-Liu.jpg"
                  alt="Alex Liu"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Alex Liu</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2026</p>
              <p className="text-gray-700">
                Alex volunteers in the Arachnology Lab assisting Pío Colmenares with sorting, organization and curation of collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Balthazar Edwards */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Balthazar-Edwards.jpg"
                  alt="Balthazar Edwards"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Balthazar Edwards</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2026</p>
              <p className="text-gray-700">
                Balthazar volunteers in the Arachnology Lab assisting Pío Colmenares with sorting, organization and curation of collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>

          <div
            data-tab="alumni"
            className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}
          >

          {/* Anika Mahbub */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Anika-Mahbub.jpeg"
                  alt="Anika Mahbub"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Anika Mahbub</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2024</p>
              <p className="text-gray-700">
                Anika was a volunteer research student for the Bronx High School of Science research program. She was mentored by Colby E. Sain for the summer of 2024. She worked in the Molecular Systematics Laboratory learning lab techniques such as DNA extraction and PCR, and helped make a data base of <em>Vaejovis</em> morphometrics. She went on to pursue a Bachelors of Science at Brandeis University.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* William Phillips */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/William-Phillips.jpg"
                  alt="William Phillips"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">William Phillips</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2023 to 2024</p>
              <p className="text-gray-700">
                Will volunteered in the Arachnology lab from 2023 to 2024, recording morphometric data and conducting digital imaging on scorpions, and assisting with sorting, organization and curation of collections, supervised by Lorenzo Prendini.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Christina Li */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Christina-Li.png"
                  alt="Christina Li"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Christina Li</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2023</p>
              <p className="text-gray-700">
                Christina volunteered in the Arachnology lab in the summer of 2023 where she conducted DNA extraction, quantitation, PCR and sequencing, supervised by Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Michelle Li */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Michelle-Li.png"
                  alt="Michelle Li"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Michelle Li</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2023</p>
              <p className="text-gray-700">
                Michelle volunteered in the Arachnology lab in the summer of 2023 where she conducted DNA extraction, quantitation, PCR and sequencing, supervised by Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Eva-Lucia Prendini */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Eva-Lucia-Prendini.jpeg"
                  alt="Eva-Lucia Prendini"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Eva-Lucia Prendini</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2023</p>
              <p className="text-gray-700">
                Eva-Lucia volunteered in the Arachnology lab in the summer of 2023 where she conducted DNA extraction, quantitation, PCR and sequencing, supervised by Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sophia Collins */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Sophia-Collins.png"
                  alt="Sophia Collins"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Sophia Collins</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2022</p>
              <p className="text-gray-700">
                Sophia volunteered at the Arachnida and Myriapoda collections in 2022, assisting Pio Colmenares with sorting, organization and curation of collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Aibrean Henry */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Aibrean-Henry.jpg"
                  alt="Aibrean Henry"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Aibrean Henry</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2022</p>
              <p className="text-gray-700">
                Aibrean volunteered at the Arachnida and Myriapoda collections in 2022, assisting Pio Colmenares with sorting, organization and curation of collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Alex Moell */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Alex-Moell.jpg"
                  alt="Alex Moell"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Alex Moell</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2022</p>
              <p className="text-gray-700">
                Alex volunteered at the Arachnida and Myriapoda collections in 2022, assisting Pio Colmenares with sorting, organization and curation of collections.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Hritwik Paul */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Hritwik-Paul.jpg"
                alt="Hritwik Paul"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Hritwik Paul</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
              <p className="text-gray-700">
                Hritwik volunteered at the Arachnida collections in 2019, assisting with curatorial activities, such as the reorganization of the scorpion collection, sorting, labeling and rehousing, under the supervision of Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Luke Siegel */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Luke-Siegel.png"
                  alt="Luke Siegel"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Luke Siegel</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
              <p className="text-gray-700">
                Luke volunteered at the Arachnida collections in 2019, assisting with curatorial activities, such as the reorganization of the scorpion collection, sorting, labeling and rehousing, under the supervision of Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Cherie Qu */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Cherie-Qu.jpg"
                alt="Cherie Qu"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Cherie Qu</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
              <p className="text-gray-700">
                Cherie volunteered at the Arachnology lab during the summer of 2019, through the AMNH Lang program. She worked rehousing and organizing spiders and daddy longlegs, under the supervision of Lou Sorkin.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Azmi Anamika */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Azmi-Anamika.jpg"
                alt="Azmi Anamika"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Azmi Anamika</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
              <p className="text-gray-700">
                Azmi volunteered at the Arachnology lab during the summer of 2019, through the AMNH Lang program. She worked rehousing and organizing spiders and daddy longlegs, under the supervision of Lou Sorkin.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Nathan Auyeng */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Nathan Auyeng" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Nathan Auyeng</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Nathan came from the AMNH <ExternalLink href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program">Science Research Mentoring Program,</ExternalLink> and volunteered at the Arachnida collections during the summer of 2018. He assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Aleyna Singer */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Aleyna Singer" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Aleyna Singer</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Aleyna came from the AMNH <ExternalLink href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program">Science Research Mentoring Program,</ExternalLink> and volunteered at the Arachnida collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Simon Au */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Simon Au" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Simon Au</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Simon came from the AMNH <ExternalLink href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program">Science Research Mentoring Program,</ExternalLink> and volunteered at the Arachnida collections during the summer of 2018. He assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Agnes Oduro */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Agnes-Oduro.jpg"
                  alt="Agnes Oduro"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Agnes Oduro</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Agnes came from the AMNH <ExternalLink href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program">Science Research Mentoring Program,</ExternalLink> and volunteered at the Arachnida and Myriapoda collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Amrita Banerji */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                  src="/images/people/Amrita-Banerji.png"
                  alt="Amrita Banerji"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Amrita Banerji</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Amrita came from the AMNH <ExternalLink href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program">Science Research Mentoring Program,</ExternalLink> and volunteered at the Arachnida and Myriapoda collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Geeta Sharma */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Geeta-Sharma.jpg"
                alt="Geeta Sharma"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Geeta Sharma</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2017</p>
              <p className="text-gray-700">
                Geeta volunteered at the AMNH during the summer of 2017. She worked sorting and organizing a scorpion collection from South Africa, under the supervision of Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sophia Castro */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Sophia-Castro.jpg"
                alt="Sophia Castro"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Sophia Castro</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2017</p>
              <p className="text-gray-700">
                Sophia volunteered at the AMNH during the summer of 2017. She worked sorting and organizing a scorpion collection from South Africa, under the supervision of Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tamar Cohen */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Tamar-Cohen.jpg"
                alt="Tamar Cohen"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Tamar Cohen</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2017</p>
              <p className="text-gray-700">
                Tamar volunteered at the AMNH during the summer of 2017. She worked in the Molecular Systematics Laboratory where they learned lab techniques and to perform PCRs under the supervision of Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Chelsea Silva */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Chelsea-Silva.jpg"
                alt="Chelsea Silva"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Chelsea Silva</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2015</p>
              <p className="text-gray-700">
                Chelsea volunteered at the AMNH during the summer of 2015. She worked in the Molecular Systematics Laboratory where she learned lab techniques and to perform PCRs under the supervision of Michelle Locke and Diogo Casellato.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Billy Conlan */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Billy-Conlan.jpg"
                alt="Billy Conlan"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Billy Conlan</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2015</p>
              <p className="text-gray-700">
                Billy volunteered at the AMNH during the summer of 2015. He worked in the Molecular Systematics Laboratory where he learned lab techniques and to perform PCRs under the supervision of Michelle Locke and Diogo Casellato.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Eleanor Goetz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Sasha-Reiter--and--Eleanor-Goetz.jpg"
                alt="Sasha Reiter and Eleanor Goetz"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Sasha Reiter and Eleanor Goetz</p>
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Eleanor Goetz</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2013 to 2014</p>
              <p className="text-gray-700">
                Eleanor attended the AMNH Science Research Mentoring Program (SRMP) at the AMNH for the 2013-2014 academic year. She worked in the Molecular Systematics Laboratory where she learned to isolate, amplify, sequence, and edit DNA under the supervision of Stephanie Loria.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sasha Reiter */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Sasha-Reiter--and--Eleanor-Goetz.jpg"
                alt="Sasha Reiter and Eleanor Goetz"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Sasha Reiter and Eleanor Goetz</p>
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Sasha Reiter</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2013 to 2014</p>
              <p className="text-gray-700">
                Sasha attended the AMNH Science Research Mentoring Program (SRMP) at the AMNH for the 2013-2014 academic year. They worked in the Molecular Systematics Laboratory where they learned to isolate, amplify, sequence, and edit DNA under the supervision of Stephanie Loria.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Adam Getzler */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Adam-Getzler.jpg"
                alt="Adam Getzler"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Adam Getzler</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2011</p>
              <p className="text-gray-700">
                Adam, a student at Plainview Old-Bethpage JFK High School, volunteered at the AMNH during the summer of 2011, sequencing scorpion DNA to further his interest in genetics. He went on to a Bachelor's degree at the University of Chicago.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Michelle Bayefsky-Anand */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Michelle Bayefsky-Anand" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Michelle Bayefsky-Anand</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2008</p>
              <p className="text-gray-700">
                Michelle, a student at Ramaz Upper High School, worked in the Molecular Systematics Laboratory learning to extract, amplify, and sequence scorpion DNA under the supervision of Lauren A. Esposito and Lorenzo Prendini in 2008.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jianhua Lin */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jianhua-Lin--and--Qiao-Rong-Huang.jpg"
                alt="Jianhua Lin and Qiao Rong Huang"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Qiao Rong Huang and Jianhua Lin</p>
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Jianhua Lin</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2006 to 2007</p>
              <p className="text-gray-700">
                Jianhua attended the NSF High School Research Program in Genetics at the AMNH for two academic years (2005-2007). She learned to conduct measurements and record setal counts under the supervision of Jeremy Huff and Lorenzo Prendini (summer 2006). From fall 2006 she worked in the Molecular Systematics Laboratory extracting, amplifying, and sequencing scorpion DNA.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Qiao Rong Huang */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Jianhua-Lin--and--Qiao-Rong-Huang.jpg"
                alt="Jianhua Lin and Qiao Rong Huang"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Qiao Rong Huang and Jianhua Lin</p>
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Qiao Rong Huang</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2006 to 2007</p>
              <p className="text-gray-700">
                Qiao attended the NSF High School Research Program in Genetics at the AMNH for two academic years (2005-2007). She learned to conduct measurements and record setal counts under the supervision of Jeremy Huff and Lorenzo Prendini (summer 2006). From fall 2006 she worked in the Molecular Systematics Laboratory extracting, amplifying, and sequencing scorpion DNA.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Melanie Ng */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Melanie-Ng.jpg"
                alt="Melanie Ng"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Melanie Ng</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2004 to 2005</p>
              <p className="text-gray-700">
                Melanie attended the AMNH High School Science Research Program in Biodiversity at the AMNH for 10 months (September 2004-June 2005). She learned to sort, identify and database specimens, prepare labels, conduct measurements, record setal counts, and prepare photographs with visible and UV light, under the supervision of Lorenzo Prendini and Randy Mercurio. Melanie also worked in the Molecular Systematics Laboratory, under the supervision of Rebecca Budinoff and Tripp MacDonald, where she learned to isolate, amplify, sequence, and edit DNA.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Connie Cai */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Connie-Cai.jpg"
                alt="Connie Cai"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Connie Cai</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2004 to 2005</p>
              <p className="text-gray-700">
                Connie attended the AMNH High School Science Research Program in Biodiversity at the AMNH for 10 months (September 2004-June 2005). She learned to sort, identify and database specimens, prepare labels, conduct measurements, record setal counts, and prepare photographs with visible and UV light, under the supervision of Lorenzo Prendini and Randy Mercurio.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Bernard Laszczower */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Bernard-Laszczower.jpg"
                alt="Bernard Laszczower"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Bernard Laszczower</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2003 to 2004</p>
              <p className="text-gray-700">
                Bernard attended the NSF After-School Centers in Exploration and New Discovery (ASCEND) program at the AMNH for 8 months (October 2003-May 2004). He worked in the Molecular Systematics Laboratory, under the supervision of Lorenzo Prendini, Diana Pietri and Tarang Sharma, where he learned to isolate, amplify, sequence and edit DNA.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Boitumelo "Tumi" McCallum */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/people/Boitumelo-Tumi-McCallum.jpg"
                alt="Boitumelo 'Tumi' McCallum"
                width={400}
                height={533}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Boitumelo "Tumi" McCallum</h3>
              <p className="text-sm text-gray-500 mb-3">High school student from 2003 to 2004</p>
              <p className="text-gray-700">
                Tumi attended the NSF After-School Centers in Exploration and New Discovery (ASCEND) program at the AMNH for 8 months (October 2003-May 2004). She worked in the Molecular Systematics Laboratory, under the supervision of Lorenzo Prendini, Diana Pietri and Tarang Sharma, where she learned to isolate, amplify, sequence and edit DNA. Tumi passed away in 2007. May she rest in peace.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
    </div>
  );
}
