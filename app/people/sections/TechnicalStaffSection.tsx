'use client';

import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";
export function TechnicalStaffSection({ isActive, tab, onTabChange }: TabbedPeopleSectionProps) {
  return (
    <div data-section="technical-staff" className={isActive ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-8 text-gray-900">Technical Staff</h2>
          <PeopleSectionTabs
            value={tab}
            onChange={(value) => onTabChange(value)}
          />
          <div data-tab="current" className={tab === 'current' ? 'block' : 'hidden'}>
          {/* Steve Thurston */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Steve-Thurston.jpg"
                  alt="Steve Thurston"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Steve Thurston</h3>
                <p className="text-lg text-gray-600 mb-4">Scientific Illustrator</p>
                <p className="text-gray-700">
                  While completing his BS in Horticulture at the University of Connecticut (1977), Steve was trained by M.J. Brush in the Biological Illustration studio and began working as a scientific illustrator, drawing bugs for Dr. James A. Slater. He later received his MFA in New Genres/Video at The San Francisco Art Institute and has worked variously as a carpenter, video maker, artist and illustrator. He began full time employment at the AMNH in 1999 as a Scientific Assistant, providing illustration, photo and graphic support to the Division of Invertebrate Zoology.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Victoria Long */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Victoria-Long.jpg"
                  alt="Victoria Long"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Victoria Long</h3>
                <p className="text-lg text-gray-600 mb-4">Staff Member</p>
                <p className="text-gray-700">
                  Victoria Long Lab Technician Staff from 2021 to 2026 Victoria worked in the Arachnology Lab as a Technician on the NSF Pedipalpi grant (PI: Prendini) from 2021 to 2026, conducting DNA extraction, quantitation, PCR and sequencing.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          </div>

          <div
            data-tab="alumni"
            className={`people-compact ${tab === 'alumni' ? 'block' : 'hidden'}`}
          >
          {/* Alumni Section */}
          <h3 className="text-2xl font-bold mt-12 mb-2 text-gray-900">Alumni</h3>
          <p className="text-xl text-gray-600 mb-8">Former technical staff of the Arachnology Lab at AMNH</p>

          {/* Eleanor Goetz */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/people/Eleanor-Goetz.jpg"
                  alt="Eleanor Goetz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="text-lg font-bold mb-1 text-gray-900">Eleanor Goetz</h4>
                <p className="text-base text-gray-600 mb-1">Lab Technician</p>
                <p className="text-sm text-gray-500 mb-3">Technical staff from 2019 to 2021</p>
                <p className="text-gray-700">
                  Eleanor graduated from Smith College in 2019 with a BA in Biological Sciences, where she was a member of the Katz Lab and focussed on the lifecycles of foraminifera. She started in the Prendini lab as a Science Research Mentoring Program student in 2013 and continued to volunteer before starting as a Lab Technician in the fall of 2019. Eleanor currently works in the molecular lab doing DNA extractions, PCRs, Sanger Sequencing preparations, and generating molecular data.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Additional Alumni - Condensed */}
          <div className="space-y-6">
            {[
              { name: 'Yili Lim', title: 'Laboratory Technician', years: '2008 to 2009', image: 'people/Yili-Lim.jpg' },
              { name: 'Tricia Rubi', title: 'Laboratory Technician', years: '2008 to 2009', image: 'people/Tricia-Rubi.jpg' },
              { name: 'Kaythi Han', title: 'Laboratory Technician', years: '2008', image: 'people/Kaythi-Han.jpg' },
              { name: 'Allison Kerwin', title: 'Laboratory Technician', years: '2008', image: 'people/Allison-Kerwin.jpg' },
              { name: 'Kanvaly Bamba', title: 'Laboratory Technician', years: '2007 to 2008', image: 'people/Kanvaly-B-Bamba.jpg' },
              { name: 'Torsten Dikow', title: 'Laboratory Technician', years: '2007', image: 'people/Torsten-Dikow.jpg' },
              { name: 'Ligia Benavides', title: 'Laboratory Technician', years: '2006 to 2007', image: 'people/Ligia-Benavides.jpg' },
              { name: 'Monica Mosier', title: 'Laboratory Technician', years: '2006', image: 'people/Monica-Mosier.jpg' },
              { name: 'Kenneth "Tripp" MacDonald', title: 'Laboratory Technician', years: '2005', image: 'people/Kenneth-Tripp-MacDonald.jpg' },
              { name: 'Diana Pietri', title: 'Laboratory Technician', years: '2003 to 2005', image: 'people/Diana-Pietri.jpg' },
              { name: 'Tarang Sharma', title: 'Laboratory Technician', years: '2003 to 2004', image: 'people/Tarang-Sharma.jpg' },
              { name: 'Rebecca Budinoff', title: 'Laboratory Technician', years: '2004', image: 'people/Rebecca-Budinoff.jpg' },
            ].map((person, index, list) => (
              <div key={index} className={`mb-8 pb-8 ${index < list.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <PeopleImage
                      src={`/images/${person.image}`}
                      alt={person.name}
                      width={400}
                      height={533}
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                  <PeopleCardBody>
                    <h4 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h4>
                    <p className="text-base text-gray-600 mb-1">{person.title}</p>
                    <p className="text-sm text-gray-500 mb-3">Technical staff from {person.years}</p>
                    <p className="text-gray-700">
                      {person.title === 'Laboratory Technician' && 
                        `${person.name.split(' ')[0]} worked in the Molecular Systematics Laboratory of the Division of Invertebrate Zoology, AMNH, isolating, amplifying, and sequencing scorpion, spider, amblypygid, solifuge, uropygid and schizomid DNA. ${person.name.split(' ')[0] === 'Kanvaly' ? 'He' : 'She'} assisted with the training of postdoctoral fellows, undergraduate and high school students, and scientists visiting the lab.`
                      }
                    </p>
                  </PeopleCardBody>
                </div>
              </div>
            ))}

          </div>
          </div>
        </div>
    </div>
  );
}
