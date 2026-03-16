'use client';

import { SideNav } from "../components/SideNav";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "./PeopleCard";
import type { PeopleGroupCardProps } from "./PeopleGroupCard";
import { PeopleGroupSection } from "./PeopleGroupSection";
import { PeopleImage } from "./PeopleImage";
import { PeopleSectionTabs } from "./PeopleSectionTabs";
import { PeopleSearch } from "./PeopleSearch";
import { peopleSections } from "./sections";
import { usePeopleNavigation } from "./usePeopleNavigation";

const peopleGroupData: PeopleGroupCardProps[] = [
  {
    src: "/images/2025-Molecular-lab-interns-Summer-2025.jpg",
    alt: "Summer 2025 Molecular Lab Interns",
    caption: "Molecular Lab Interns.",
  },
  {
    src: "/images/2025-Pio-Colmenares-and-visiting-researchers-in-the-collection.jpg",
    alt: "2025 Colmenares and visiting researchers in the collection",
    caption: "Pío Colmenares and visiting researchers in the collection.",
  },
  {
    src: "/images/2025-Group-photp-back-Nick-William-Jose-Jairo-Drusilla-Lorenzo-Pio-front-Javier-Colby.jpg",
    alt: "2025 Group photo with Nick Cazzaniga, William Phillips, José Barba-Montoya, Jairo Moreno-González, Drusilla Sheridan, Lorenzo Prendini, Pío Colmenares, Javier Blasco Aróstegui, and Colby Sain",
    caption: "Back (left to right): Nick Cazzaniga, William Phillips, José Barba-Montoya, Jairo Moreno-González, Drusilla Sheridan, Lorenzo Prendini, Pío Colmenares. Front (left to right): Javier Blasco Aróstegui, Colby Sain.",
  },
  {
    src: "/images/2024-lunch-Pio-Ricardo-Lorenzo-Colby-Jairo.JPG",
    alt: "2024 lunch with Pío Colmenares, Ricardo Botero-Trujillo, Lorenzo Prendini, Colby Sain, and Jairo Moreno-González",
    caption: "Left to right: Pío Colmenares, Ricardo Botero-Trujillo, Lorenzo Prendini, Colby Sain, Jairo Moreno-González.",
  },
  {
    src: "/images/2023-dinner-Left-front-to-back-Pio-Isadora-Stephanie-Lorenzo-Valentin-right-front-to-back-Victoria-Jairo-Javier-Taylor-Colby.JPG",
    alt: "2023 dinner with Pío Colmenares, Isadora Colmenares, Stephanie Loria, Lorenzo Prendini, Valentin Ehrenthal, Victoria Long, Jairo Moreno-González, Javier Blasco Aróstegui, Taylor, and Colby Sain",
    caption: "Left (front to back): Pío Colmenares, Isadora Colmenares, Stephanie Loria, Lorenzo Prendini, Valentin Ehrenthal. Right (front to back): Victoria Long, Jairo Moreno-González, Javier Blasco Aróstegui, Taylor, Colby Sain.",
  },
  {
    src: "/images/2023-Kimberly-Russell-and-students-from-Rutgers-University.HEIC",
    alt: "2023 Kimberly Russell and students from Rutgers University",
    caption: "Kimberly Russell and students from Rutgers University.",
  },
  {
    src: "/images/2022-Lab-end-of-day-Javier-Marcel-Colby-Jairo-Sahibzada-Pio.JPG",
    alt: "2022 end of day in the lab with Javier Blasco Aróstegui, Marcel, Colby Sain, Jairo Moreno-González, Sahibzada M. Jawad, and Pío Colmenares",
    caption: "Left to right: Javier Blasco Aróstegui, Marcel, Colby Sain, Jairo Moreno-González, Sahibzada M. Jawad, Pío Colmenares.",
  },
  {
    src: "/images/2021-lunch-Ricardo-Lorenzo-Lou-Pio.HEIC",
    alt: "2021 lunch with Ricardo Botero-Trujillo, Lorenzo Prendini, Lou Sorkin, and Pío Colmenares",
    caption: "Left to right: Ricardo Botero-Trujillo, Lorenzo Prendini, Lou Sorkin, Pío Colmenares.",
  },
  {
    src: "/images/labfall2019_p08qpk.jpg",
    alt: "Fall 2019 Arachnology Lab at AMNH. Left to Right: George Tsinias, Jairo Moreno-González, Lorenzo Prendini, Stephanie Loria, Valentin Ehrenthal, Eleanor Goetz, Pío Colmenares, Miryam Trujillo, Ricardo Botero-Trujillo.",
    caption: "Left to Right: George Tsinias, Jairo Moreno-González, Lorenzo Prendini, Stephanie Loria, Valentin Ehrenthal, Eleanor Goetz, Pío Colmenares, Miryam Trujillo, Ricardo Botero-Trujillo.",
  },
  {
    src: "/images/summer2019.jpg",
    alt: "July 2019 Arachnology Lab at AMNH. Left to Right: Elena Babicz, Andria Santos da Silva, Stephanie Loria, Pío Colmenares, Colby Sain, Lorenzo Prendini, Jairo Moreno-González, Ricardo Botero-Trujillo.",
    caption: "Left to Right: Elena Babicz, Andria Santos da Silva, Stephanie Loria, Pío Colmenares, Colby Sain, Lorenzo Prendini, Jairo Moreno-González, Ricardo Botero-Trujillo.",
  },
  {
    src: "/images/Prendini_Lab_Summer2018.jpg",
    alt: "August 2018 Arachnology Lab at AMNH. Left to Right: Stephanie Loria, Max Roppo, Lorenzo Prendini, Diogo Casellato, Lou Sorkin, Pío Colmenares, Deborah Chin, Victoria Long, Jayson Slovak.",
    caption: "Left to Right: Stephanie Loria, Max Roppo, Lorenzo Prendini, Diogo Casellato, Lou Sorkin, Pío Colmenares, Deborah Chin, Victoria Long, Jayson Slovak.",
  },
  {
    src: "/images/PrendiniLabSeptember2017.jpg",
    alt: "September 2017 Arachnology Lab at AMNH. Left to Right: Pío Colmenares, Ivan Magalhães, Lorenzo Prendini, Tebogo Lebwada, Lou Sorkin, Gerardo Contreras, Rodrigo Monjáraz Ruedas.",
    caption: "Left to Right: Pío Colmenares, Ivan Magalhães, Lorenzo Prendini, Tebogo Lebwada, Lou Sorkin, Gerardo Contreras, Rodrigo Monjáraz Ruedas.",
  },
  {
    src: "/images/PrendiniLabAugust2017.jpg",
    alt: "August 2017 Arachnology Lab at AMNH. Left to Right: Stephanie Loria, Lorenzo Prendini, Pío Colmenares, Jayson Slovak, Deborah Chin.",
    caption: "Left to Right: Stephanie Loria, Lorenzo Prendini, Pío Colmenares, Jayson Slovak, Deborah Chin.",
  },
  {
    src: "/images/PrendiniLabAugust2015.jpg",
    alt: "August 2015 Arachnology Lab at AMNH. Left to Right: Lorenzo Prendini, Gustavo Miranda, Debbie Alwill, Diogo Casellato (back), Stephanie Loria, Bastian-Jesper Klüßmann-Fricke (back), Michelle Locke, Chelsea Silva, Billy Conlan.",
    caption: "Left to Right: Lorenzo Prendini, Gustavo Miranda, Debbie Alwill, Diogo Casellato (back), Stephanie Loria, Bastian-Jesper Klüßmann-Fricke (back), Michelle Locke, Chelsea Silva, Billy Conlan.",
  },
  {
    src: "/images/PrendiniLabJan2015.jpg",
    alt: "January 2015 Arachnology Lab at AMNH. Left to Right: Michelle Locke, Lorenzo Prendini, Stephanie Loria.",
    caption: "Left to Right: Michelle Locke, Lorenzo Prendini, Stephanie Loria.",
  },
  {
    src: "/images/scorpiongroups2013.jpg",
    alt: "August 2013 Arachnology Lab at AMNH. Left to Right: Pam Horsely, Stephanie Loria, Lorenzo Prendini, Massimiliano Roppo, Muhammad Tahir.",
    caption: "Left to Right: Pam Horsely, Stephanie Loria, Lorenzo Prendini, Massimiliano Roppo, Muhammad Tahir.",
  },
  {
    src: "/images/scorpiongroups.jpg",
    alt: "August 2011 Arachnology Lab at AMNH. Left to Right: Stephanie Loria, Adam Getzler, Ofelia Delgado, Edmundo González, Carlos Santibañez, Lorenzo Prendini, Randy Mercurio.",
    caption: "Left to Right: Stephanie Loria, Adam Getzler, Ofelia Delgado, Edmundo González, Carlos Santibañez, Lorenzo Prendini, Randy Mercurio.",
  },
  {
    src: "/images/scorpiongroup.jpg",
    alt: "2006 Arachnology Lab at AMNH Left to Right: (Back Row) Jeremy Huff, Erich Volschenk, Lionel Monod, Edmundo González, (Front Row) Randy Mercurio, Camilo Mattoni, Lauren A. Esposito, Monica Mosier, Ofelia Delgado, Valerio Vignoli, Lorenzo Prendini.",
    caption: "Left to Right: (Back Row) Jeremy Huff, Erich Volschenk, Lionel Monod, Edmundo González, (Front Row) Randy Mercurio, Camilo Mattoni, Lauren A. Esposito, Monica Mosier, Ofelia Delgado, Valerio Vignoli, Lorenzo Prendini.",
  },
  {
    src: "/images/ica.jpg",
    alt: "2007 Scorpion Biologists ICA Left to Right: (Back Row) Carsten Kamenz, Mingsheng Zhu, Edmundo González, Roger Farley, Erich Volschenk, Lauren A. Esposito, Camilo Mattoni, (Front Row) Jason Dunlop, Jeremy Huff, Warren Savary, Ricardo Pinto-da-Rocha, Oscar Francke, Lorenzo Prendini.",
    caption: "Left to Right: (Back Row) Carsten Kamenz, Mingsheng Zhu, Edmundo González, Roger Farley, Erich Volschenk, Lauren A. Esposito, Camilo Mattoni, (Front Row) Jason Dunlop, Jeremy Huff, Warren Savary, Ricardo Pinto-da-Rocha, Oscar Francke, Lorenzo Prendini.",
  },
  {
    src: "/images/Solifugae_2007.jpg",
    alt: "October 2007 BSI Solifugae Meeting at DMNS. Left to Right: Kristie Reddick (TAMU), Bob Wharton (TAMU), Warren Savary (CAS), Aaron Spriggs (DMNS), Tharina Bird (NMNW/CSU), Paula Cushing (DMNS), Lorenzo Prendini (AMNH), Sasha Gromov (IZAK), Jack Brookhart (DMNS).",
    caption: "Left to Right: Kristie Reddick (TAMU), Bob Wharton (TAMU), Warren Savary (CAS), Aaron Spriggs (DMNS), Tharina Bird (NMNW/CSU), Paula Cushing (DMNS), Lorenzo Prendini (AMNH), Sasha Gromov (IZAK), Jack Brookhart (DMNS).",
  },
  {
    src: "/images/Atol_2008.jpg",
    alt: "December 2008 AToL Morphology Scoring Party at Smithsonian USNM. Left to Right: Petra Sierwald (FMNH), Jonathan Coddington (USNM), Lorenzo Prendini (AMNH), Gustavo Hormiga (GWU), Charles Griswold (CAS).",
    caption: "Left to Right: Petra Sierwald (FMNH), Jonathan Coddington (USNM), Lorenzo Prendini (AMNH), Gustavo Hormiga (GWU), Charles Griswold (CAS).",
  },
];

const peopleGroupSectionData: {
  year?: string;
  subtitle?: string;
  cards: [PeopleGroupCardProps, ...PeopleGroupCardProps[]];
}[] = [
  { year: "Summer 2025", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[0]] },
  { year: "2025", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[1]] },
  { year: "2025", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[2]] },
  { year: "2024", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[3]] },
  { year: "2023", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[4]] },
  { year: "2023", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[5]] },
  { year: "2022", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[6]] },
  { year: "2021", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[7]] },
  { year: "Fall 2019", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[8]] },
  { year: "Summer 2019", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[9]] },
  { year: "Summer 2018", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[10]] },
  { year: "Fall 2017", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[11]] },
  { year: "Summer 2017", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[12]] },
  { year: "Summer 2015", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[13]] },
  { year: "Winter 2015", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[14]] },
  { year: "Summer 2013", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[15]] },
  { year: "Summer 2011", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[16]] },
  { year: "2006", subtitle: "Arachnology Lab at AMNH", cards: [peopleGroupData[17]] },
  { year: "Fall 2007", subtitle: "Scorpion Biologists ICA", cards: [peopleGroupData[18]] },
  { year: "2007", subtitle: "BSI Solifugae Meeting at DMNS", cards: [peopleGroupData[19]] },
  { year: "Winter 2008", subtitle: "AToL Morphology Scoring Party at Smithsonian USNM", cards: [peopleGroupData[20]] },
];

export default function People() {
  const {
    activeSection,
    contentRef,
    filteredResults,
    handlePersonSelect,
    handleSectionSelect,
    isSearchOpen,
    searchContainerRef,
    searchQuery,
    sectionTabs,
    setIsSearchOpen,
    setSearchQuery,
    setTabForSection,
    sideNavRef,
  } = usePeopleNavigation(peopleSections);

  const museumTab = sectionTabs['museum-specialists'];
  const technicalStaffTab = sectionTabs['technical-staff'];
  const researchAffiliatesTab = sectionTabs['research-affiliates'];
  const postdocsTab = sectionTabs.postdocs;
  const graduateStudentsTab = sectionTabs['graduate-students'];
  const undergraduateStudentsTab = sectionTabs['undergraduate-students'];
  const highSchoolStudentsTab = sectionTabs['high-school-students'];
  const volunteersTab = sectionTabs.volunteers;
  const visitingStudentsTab = sectionTabs['visiting-students'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">People</h1>
        
        <p className="text-lg leading-8 text-gray-700 mb-8">
          The Arachnology Lab, headed by Lorenzo Prendini, Associate Curator (Arachnids and Myriapods), 
          includes permanent specialists, various laboratory assistants, postdoctoral fellows, and PhD students. 
          Every year, the Group accommodates several visiting scientists, undergraduate students, high school students, and volunteers.
        </p>
        <PeopleSearch
          searchContainerRef={searchContainerRef}
          searchQuery={searchQuery}
          isSearchOpen={isSearchOpen}
          filteredResults={filteredResults}
          setSearchQuery={setSearchQuery}
          setIsSearchOpen={setIsSearchOpen}
          onPersonSelect={handlePersonSelect}
        />

        {/* Grid Layout with Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 relative">
          {/* Sidebar Navigation */}
          <div
            ref={sideNavRef}
            className="lg:col-span-1 sticky top-[var(--header-height)] lg:top-[calc(var(--header-height)+var(--section-scroll-gap))] z-40 bg-white self-start"
          >
            <SideNav
              sections={peopleSections}
              activeSection={activeSection}
              onSelect={handleSectionSelect}
            />
          </div>

          {/* Content Area */}
          <div ref={contentRef} className="md:col-span-3 section-content">
        <div data-section="lab-evolution" className={activeSection === 'lab-evolution' ? 'block' : 'hidden'}>
        <div>
          {peopleGroupSectionData.map((section, index) => (
            <PeopleGroupSection
              key={`${section.year ?? "group"}-${index}`}
              year={section.year}
              subtitle={section.subtitle}
              cards={section.cards}
            />
          ))}
        </div>
        </div>

        <div data-section="principal-investigator" className={activeSection === 'principal-investigator' ? 'block' : 'hidden'}>
        <div id="principal-investigator">
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Principal Investigator</h2>
          <p className="text-xl text-gray-600 mb-8">Head of the Arachnology Lab at AMNH</p>
          
          <div className="pb-8">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <PeopleImage
                  src="/images/prendini.jpg"
                  alt="Lorenzo Prendini"
                  width={500}
                  height={750}
                  className="w-full h-auto rounded-sm"
                />
              </div>
              
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Lorenzo Prendini</h3>
                <div className="space-y-3 mb-4">
                  <p className="text-lg text-gray-600 mb-0">
                    Curator of Arachnida and Myriapoda, Division of Invertebrate Zoology
                  </p>
                  <p className="text-base text-gray-600 mt-0">
                    <a
                      href="https://www.amnh.org/research/staff-directory/lorenzo-prendini"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Lorenzo Prendini: Curator, Invertebrate Zoology, Professor RGGS | AMNH
                    </a>
                  </p>
                  <p className="text-lg text-gray-600 mb-0">
                    Professor of Comparative Biology, Richard Gilder Graduate School
                  </p>
                  <p className="text-base text-gray-600 mt-0">
                    <a
                      href="https://www.amnh.org/research/richard-gilder-graduate-school"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Graduate Programs at the Museum | Richard Gilder Graduate School
                    </a>
                  </p>
                  <p className="text-lg text-gray-600 mb-0">
                    Principle Investigator, Institute of Comparative Genomics
                  </p>
                  <p className="text-base text-gray-600 mt-0">
                    <a
                      href="https://www.amnh.org/research/institute-comparative-genomics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Institute for Comparative Genomics | AMNH
                    </a>
                  </p>
                  <p className="text-lg text-gray-600 mb-0">
                    Chair, AMNH Scientific Publications
                  </p>
                  <p className="text-base text-gray-600 mt-0">
                    <a
                      href="https://www.amnh.org/research/scientific-publications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Scientific Publications | American Museum of Natural History
                    </a>
                  </p>
                  <p className="text-lg text-gray-600 mb-0">
                    Adjunct Professor, Ecology, Evolution and Behavior, City University of New York
                  </p>
                  <p className="text-base text-gray-600 mt-0">
                    <a
                      href="https://www.gc.cuny.edu/people/lorenzo-prendini"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Prendini, Lorenzo | CUNY Graduate Center
                    </a>
                  </p>
                </div>
                <div className="space-y-3 mt-8 mb-8">
                  <h4 className="text-base font-bold mb-3 text-gray-900">CV and Online Profiles</h4>
                  <p>
                    <a 
                      href="/documents/PrendiniCV2020_jyaiq9.pdf" 
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Curriculum Vitae (PDF)
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://www.researchgate.net/profile/Lorenzo-Prendini" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Research Gate
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://www.amnh.org/explore/videos/research-and-collections/profile-lorenzo-prendini" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      AMNH Meet the Scientists Video
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://scholar.google.com/citations?user=fU0VpL0AAAAJ&hl=en&oi=ao" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Google Scholar
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://orcid.org/0000-0001-8727-7106"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      ORCID
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.linkedin.com/in/lorenzo-prendini-34824218/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      LinkedIn
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://loop.frontiersin.org/people/722676/bio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Loop
                    </a>
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
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

        <div data-section="museum-specialists" className={activeSection === 'museum-specialists' ? 'block' : 'hidden'}>
        <div id="museum-specialists">
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-8 text-gray-900">Museum Specialists</h2>

          <PeopleSectionTabs
            value={museumTab}
            onChange={(value) => setTabForSection('museum-specialists', value)}
          />

          <div data-tab="current" className={museumTab === 'current' ? 'block' : 'hidden'}>
          <p className="text-gray-900 mb-8">Current museum specialist of the Arachnology Lab at AMNH</p>
          {/* Pio Colmenares */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Pio.jpg"
                  alt="Pío A. Colmenares"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Pío A. Colmenares</h3>
                <p className="text-lg text-gray-600 mb-4">Museum Specialist and Collections Manager, Arachnid and Myriapod Collections</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Pio_Colmenares" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Pío is an arachnologist with experience in taxonomy and ecology. His main research interests are the taxonomy, systematics, ecology, conservation and biogeography of Opiliones. In addition to working with Opiliones, he also has experience in the taxonomy of other arachnid orders, such as Amblypygi, Schizomida, Solifugae, and spiders of the family Pholcidae. Pío joined the AMNH staff in 2016 and is currently in charge of the Arachnid and Myriapod Collections.
                </p>
                <p className="text-gray-700 mb-6">
                  Pío began his studies at the University of Zulia (LUZ) in Maracaibo, Venezuela, where he received his undergraduate degree in biology in 2008. During his time as a student, he worked in the Museum of Biology at La Universidad del Zulia (MBLUZ). Upon graduating, he started working as a research assistant of the Biodiversity Unit at the Instituto Venezolano de Investigaciones Científicas (IVIC) in Caracas, Venezuela. In 2009 he studied at the National Museum of Natural History of the Smithsonian Institution in Washington, DC, where he received training in curatorial techniques and management of various natural history collections. In 2015, he defended his doctoral thesis on Amazonian Harvestmen communities at the Instituto Nacional de Pesquisas da Amazônia (INPA) in Manaus, Brazil.
                </p>
                <div className="mt-6">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
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
            className={`people-compact ${museumTab === 'alumni' ? 'block' : 'hidden'}`}
          >
          <p className="text-gray-900 mb-8">Former museum specialists of the Arachnology Lab at AMNH</p>

          {/* Michelle Locke */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/MichelleLockeField.jpg"
                  alt="Michelle Locke"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="text-lg font-bold mb-1 text-gray-900">Michelle Locke</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Technical staff from 2015 to 2016</p>
                <p className="text-gray-700">
                  Michelle Locke completed her MSc at Carleton University, in Ottawa ON. Michelle's MSc thesis was a revision of the flower fly genus <em>Dasysyrphus</em> (Diptera: Syrphidae) under the supervision of Dr. Jeff Skevington of Agriculture and Agri-Food Canada. before coming to the AMNH she worked as a contract Research Technician at the Canadian National Collection of Insects, Arachnids and Nematodes in Ottawa, ON. Her contract work focused on the Syrphidae collection, doing identifications, curation, databasing, species level conservation assessments, macro photography of specimens and work on a field guide to the Syrphidae. She came to the Division of Invertebrate Zoology, AMNH in 2014.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Pamela Horsley */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Pam.jpg"
                  alt="Pamela Horsley"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="text-lg font-bold mb-1 text-gray-900">Pamela Horsley</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Technical staff from 2013 to 2014</p>
                <p className="text-gray-700">
                  Pamela completed her MSc in Entomology at McGill University in 2009 and her thesis research included a systematic revision of the hyper-diverse leaf litter-inhabiting genus <em>Trachyphloeomimus</em> (Curculionidae, Entiminae). In 2009, she was hired through an NSF grant as the Entomology Collection Manager at the San Diego Natural History Museum. Her research and work experience has allowed her to do field work in central and northeast Mexico, as well as the south-western United States. She is heavily involved with the Entomological Collections Network (ECN), <a href="http://www.ecnweb.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Entomological Collections Network</a>, serving as president and assisting with coordination of the annual meetings.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Ofelia Delgado */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/ofelialab.jpg"
                  alt="Ofelia Delgado"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="text-lg font-bold mb-1 text-gray-900">Ofelia Delgado</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Technical staff from 2010 to 2012</p>
                <p className="text-gray-700">
                  Ofelia completed her BSc in Biology at the Facultad de Ciencias, Universidad Nacional Autónoma de México (UNAM) in 2000, based on a floristic survey of tropical dry forest. After graduating, she assisted in the curation of the Section of Odonata in the Insects National Collection, Instituto de Biología, UNAM, focusing on the Odonata of Jalisco. Her experience in the field includes collecting arachnids, insects and plants in Central and Southern Mexico. After volunteering in Lorenzo Prendini's molecular lab for several years, she came to work as a Scientific Assistant in January 2010, spending much time working on solifuges and scorpions in the molecular lab.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Jeremy Huff */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/huff2.jpg"
                  alt="Jeremy Huff"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="text-lg font-bold mb-1 text-gray-900">Jeremy Huff</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Technical staff from 2007 to 2010</p>
                <p className="text-gray-700">
                  Jeremy began working as a Scientific Assistant in the Division of Invertebrate Zoology in 2007. His main research interest is the systematics of the whip scorpions (Thelyphonida). Huff has extensive field experience collecting arachnids in Belize, Cameroon, Costa Rica, Dominican Republic, French Guiana, Grand Cayman, Guatemala, Guinea-Bissau, Guyana, Malaysia, Martinique, Mexico, Senegal, South Africa and the southwestern USA. He did 10 field trips for the AMNH and has collected several thousand specimens and discovered many new species.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Randy Mercurio */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/mercurio3.jpg"
                  alt="Randy Mercurio"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h4 className="text-lg font-bold mb-1 text-gray-900">Randy Mercurio</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Technical staff from 2002 to 2007</p>
                <p className="text-gray-700">
                  Randy joined the Division of Invertebrate Zoology, AMNH, as a full-time employee in 2002, after completing a B.A. in Biology at New York University. He worked as Scientific Assistant to Lorenzo Prendini and managed the curation of the Arachnid and Myriapod Collections. Randy is a professional photographer and was responsible for producing many of the photographs in publications and the group's website. His other research interests include the taxonomy, natural history, ecology and biogeography of centipedes in North America, as well as their functional morphology. He has collected arachnids and myriapods in Arizona, California, Connecticut, Florida, Massachusetts, New York, Nevada, Rhode Island, and Mexico.
                </p>
              </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
        </div>

        <div data-section="technical-staff" className={activeSection === 'technical-staff' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-8 text-gray-900">Technical Staff</h2>
          <PeopleSectionTabs
            value={technicalStaffTab}
            onChange={(value) => setTabForSection('technical-staff', value)}
          />
          <div data-tab="current" className={technicalStaffTab === 'current' ? 'block' : 'hidden'}>
          {/* Steve Thurston */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/thurston.jpg"
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
                  src="/images/victoria.jpg"
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
            className={`people-compact ${technicalStaffTab === 'alumni' ? 'block' : 'hidden'}`}
          >
          {/* Alumni Section */}
          <h3 className="text-2xl font-bold mt-12 mb-2 text-gray-900">Alumni</h3>
          <p className="text-xl text-gray-600 mb-8">Former technical staff of the Arachnology Lab at AMNH</p>

          {/* Eleanor Goetz */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Eleanor1_blmjit.jpg"
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
                  <div className="md:col-span-3">
                    <h4 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h4>
                    <p className="text-base text-gray-600 mb-1">{person.title}</p>
                    <p className="text-sm text-gray-500 mb-3">Technical staff from {person.years}</p>
                    <p className="text-gray-700">
                      {person.title === 'Laboratory Technician' && 
                        `${person.name.split(' ')[0]} worked in the Molecular Systematics Laboratory of the Division of Invertebrate Zoology, AMNH, isolating, amplifying, and sequencing scorpion, spider, amblypygid, solifuge, uropygid and schizomid DNA. ${person.name.split(' ')[0] === 'Kanvaly' ? 'He' : 'She'} assisted with the training of postdoctoral fellows, undergraduate and high school students, and scientists visiting the lab.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
          </div>
        </div>
        </div>

        <div data-section="research-affiliates" className={activeSection === 'research-affiliates' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-8 text-gray-900">Research Affiliates</h2>
          <PeopleSectionTabs
            value={researchAffiliatesTab}
            onChange={(value) => setTabForSection('research-affiliates', value)}
            includeAlumni={false}
          />

          <div data-tab="current" className={researchAffiliatesTab === 'current' ? 'block' : 'hidden'}>

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
                <h3 className="text-xl font-bold mb-1 text-gray-900">Boris Zakharov</h3>
                <p className="text-lg text-gray-600 mb-4">Research Associate, La Guardia Community College</p>
                <p className="text-gray-700 mb-6">
                  Boris has a wide range of research experiences and interests, primary within the fields of Invertebrate Zoology, Biogeography, Evolution and System Theory approach in Biology. His Master's project in Arachnology (1979) was performed at Far East State University at city Vladivostok (Russia) and dedicated to orb-weaving spiders Family Araneidae of South East Russia. In 1989, he earned his PhD in Entomology from Novosibirsk Biological Institute and it was dedicated to horse flies and deer-flies (Insecta, Diptera, Tabanidae) of South-East Transbaikalia. Currently, Boris am working in collaboration with Vladimir Ovtcharenko on the study of the ground spiders of Australia and New Zealand and the study of invertebrate dynamics in the Black Rock Forest.
                </p>
                <div className="mt-6">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
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
                <h3 className="text-xl font-bold mb-1 text-gray-900">Vladimir Ovtsharenko</h3>
                <p className="text-lg text-gray-600 mb-4">Research Associate, Hostos Community College</p>
                <p className="text-gray-700 mb-6">
                  Vladimir is a research associate in the Division of Invertebrate Zoology at the American Museum of Natural History (AMNH), and Curator of the Arachnological Collections at the Zoological Institute of the Russian Academy of Sciences. Dr. Ovtsharenko's research is on spider taxonomy: the science of identifying and classifying species according to their evolutionary relationships. Since the AMNH houses the largest spider collection in the world, with over a million spider specimens, and the arachnological research carried out there is among the best in the world, it is an ideal place for Vlad to work.
                </p>
                <div className="mt-6">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
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
                <h3 className="text-xl font-bold mb-1 text-gray-900">Louis Sorkin</h3>
                <p className="text-lg text-gray-600 mb-4">Visiting Scientist, New York Entomological Society</p>
                <p className="text-gray-700">
                  Lou began his career in arachnid studies during his graduate work at the University of Connecticut where he researched arthropod parasites of spiders. In 1978, Lou began work on spiders and other arachnids under Dr. Norman Platnick, in what was then the Department of Entomology at the AMNH. Over the years he sorted through many spider collections and labeled thousands of vials and worked with many arachnologists, some visiting and examining the museum's collection and sometimes at other institutions during his visits or on excursions from arachnology meetings. He deals with many public inquiries regarding insects and other arthropods. He has interests in entomophagy and forensic entomology (the latter includes stored products, urban, and medico-legal studies). Some of the cases and investigations have been aired online, on television and radio and in the print media. At present, some of his studies include investigations of the common bed bug, <em>Cimex lectularius</em> (Hemiptera: Cimicidae) due to the relatively recent increase in infestations of many homes, business, hotels, by this insect and for which he receives inquiries on their natural history and biology and management. He keeps a few bed bug colonies for study and for educational purposes. After 43 years of dedicated service, Lou retired from his position as Museum Specialist for the Spider Collection in early 2020. He will remain associated with the AMNH Invertebrate Zoology Division to continue with his outreach activities and the organization of the New York Entomological Society.
                </p>
              </PeopleCardBody>
          </PeopleCard>
          </div>

          <div data-tab="alumni" className={researchAffiliatesTab === 'alumni' ? 'block' : 'hidden'}>
            <p className="text-gray-700">No alumni listed yet.</p>
          </div>
        </div>
        </div>

        <div data-section="postdocs" className={activeSection === 'postdocs' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Postdocs</h2>
          <p className="text-xl text-gray-600 mb-8">Current and former postdocs at the Arachnology Lab</p>
          <PeopleSectionTabs
            value={postdocsTab}
            onChange={(value) => setTabForSection('postdocs', value)}
          />
          <div data-tab="current" className={postdocsTab === 'current' ? 'block' : 'hidden'}>
          
          {/* Muhammad Tahir */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Tahir.jpg"
                  alt="Muhammad Tahir"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">H. Muhammad Tahir</h3>
                <p className="text-base text-gray-600 mb-3">Postdoc in 2026 - Postdoctoral research on the systematics and evolution of Pakistani scorpions supported by a Fulbright Postdoctoral Fellowship</p>
                <p className="text-gray-700">
                  Tahir earned his PhD from the University of the Punjab, Lahore, with a dissertation entitled “Biodiversity and Predatory Efficacy of Spiders Inhabiting the Rice Fields of Central Punjab, Pakistan.” In addition to his work on <em>Araneae</em>, he has conducted extensive research on the scorpions of Pakistan in collaboration with Dr. Lorenzo Prendini. In May 2013, he first joined the American Museum of Natural History (AMNH) as a postdoctoral fellow under the Higher Education Commission (HEC) of Pakistan Postdoctoral Fellowship Program, where his research focused on the molecular systematics of scorpions, particularly within the family <em>Buthidae</em>. In January 2026, he rejoined the AMNH as a Fulbright Postdoctoral Fellow. His current research involves the molecular systematics and development of a comprehensive DNA barcode database for medically and commercially significant scorpion species of Pakistan, including those from the Kashmir region. Alongside his research at the AMNH, he serves as Professor of Zoology at Government College University, Lahore.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Jose Barba-Montoya */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Jose-Barba-Montoya.jpg"
                  alt="Jose Barba-Montoya"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Jose Barba-Montoya</h3>
                <p className="text-base text-gray-600 mb-3">Postdoc in 2024 and 2025 - Postdoctoral research on the phylogenomics of <em>Chelicerata</em> supported by a Gerstner Postdoctoral Fellowship</p>
                <p className="text-gray-700">
                  Jose investigates patterns of molecular evolution and species diversification across the tree of life by integrating phylogenomics with systematics and ecology. His primary focus lies in inferring evolutionary relationships and divergence times at both the species and subspecies levels. A central pillar of his research involves the development of novel bioinformatic methods for phylogenomic analysis and molecular clock dating, designed to mitigate sources of error and enhance the accuracy of evolutionary reconstructions. Currently a Research Associate in the Division of Invertebrate Zoology at the American Museum of Natural History (AMNH), Jose previously served as a Gerstner Scholar in Bioinformatics and Computational Biology at the Richard Gilder Graduate School (2023–2025). He continues to collaborate with Professor Lorenzo Prendini and members of the Arachnology Lab to investigate evolutionary patterns across the arachnid tree of life, utilizing high-throughput, next-generation sequencing data.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Jairo A. Moreno-González */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Jairo.jpg"
                  alt="Jairo A. Moreno-González"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Jairo A. Moreno-González</h3>
                <p className="text-base text-gray-600 mb-3">Postdoc from 2022 to 2026 - Postdoctoral research on the systematics and evolution of <em>Pedipalpi</em> and Neotropical scorpions supported by an NSF Postdoctoral Fellowship and a Theodore Roosevelt Postdoctoral Fellowship</p>
                <p className="text-gray-700">
                  Jairo A. Moreno-González earned his B.Sc. in Biology from the Universidad del Valle, Colombia, and his Ph.D. in Biological Sciences at Universidade de São Paulo, Brazil. His Ph.D. dissertation focused on the systematics of the neotropical scorpion genus <em>Tityus</em> (Arachnida: <em>Scorpiones</em>, <em>Buthidae</em>), integrating morphological and molecular evidence. In May 2022, Jairo joint the American Museum of Natural History (AMNH) as a postdoc of the NSF project: “Systematics and evolution of <em>Pedipalpi</em> (whip spiders and whip scorpions): phylogenomics and morphology of understudied arachnids”, under the supervision of Dr. Lorenzo Prendini. In 2024, he became a Gerstner Scholar at the Richard Gilder School (RGGS) at AMNH with his project: "Neotropical biogeography assessed from the perspective of the World’s most diverse scorpion genus, <em>Tityus</em>". In May 2026, after finishing his appointment at Gerstner Scholar, he will continue to investigate the biogeography and phylogenomics of <em>Tityus</em> as a postdoctoral NSF STAR Grant scholar. Jairo's research combines detailed phenotype examination and molecular data to test biogeographic and phylogenetic hypotheses, using various arachnid orders —including <em>Amblypygi</em>, <em>Schizomida</em>, <em>Scorpiones</em>, and <em>Thelyphonida</em>— as study models.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          </div>

          <div
            data-tab="alumni"
            className={`people-compact ${postdocsTab === 'alumni' ? 'block' : 'hidden'}`}
          >
          <h3 className="text-2xl font-bold mt-12 mb-2 text-gray-900">Alumni</h3>
          <p className="text-xl text-gray-600 mb-8">Former postdocs of the Arachnology Lab at AMNH</p>

          {/* Ricardo Botero-Trujillo */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Ricardo.jpg"
                  alt="Ricardo Botero-Trujillo"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Ricardo Botero-Trujillo</h3>
                <p className="text-base text-gray-600 mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2018 to 2020</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Ricardo_Botero-Trujillo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Ricardo completed his Biology B.S. at Javeriana University in Bogota. While an undergraduate student, he became interested in arachnids and started working on scorpions from his native country, Colombia. Gradually, hooded thick-spiders (order Ricinulei) and sun-spiders (order Solifugae) became part of his research interests. After a 5-year period working in the pharmaceutical industry, Ricardo moved to Argentina to undertake doctoral studies at the Buenos Aires University. There, he conducted his research at the Division of Arachnology of the Argentinian Museum of Natural Sciences Bernardino Rivadavia. His PhD thesis consisted of a taxonomic revision and phylogenetic analysis of the South American solifuge family Mummuciidae. In 2016, Ricardo visited the AMNH collections, supported by a Theodore Roosevelt Memorial Grant from the AMNH and a Vincent Roth Grant for Systematics Research from the American Arachnological Society. Ricardo is currently a Theodore Roosevelt Postdoctoral Research Fellow from the Richard Gilder Graduate School at the AMNH, and is now working on the evolution of Ricinuleids.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Frederic Schramm */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Frederic_jkwxyd.jpg"
                  alt="Frederic Schramm"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Frederic Schramm</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | <a href="https://www.daad.de/en/study-and-research-in-germany/scholarships/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">DAAD Scholarships</a></p>
                <p className="text-sm text-gray-500 mb-3">Postdoc in 2020</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Frederic_Schramm2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Fred got his Masters degree in molecular and cellular biology from the Philipps University of Marburg, Germany in 2013. In 2019 he obtained his PhD in molecular biosciences from Stockholm University, Sweden for his work investigating how bacteria fulfill the basic cellular need of maintaining a functional proteome. In his research, Frederic has always been keen on comparative approaches that incorporate the evolutionary perspective enabling a broader and functionally relevant understanding of fundamental biological processes. Becoming convinced of the importance of the evolutionary perspective of his research during his PhD, combined with a long-standing passion for arachnids, he began collaborating on arachnological research projects aimed at enhancing the knowledge of Caribbean arachnid diversity. In February of 2020 he joined the AMNH for a six-months short-term postdoctoral research stay. In his research project funded by the German Academic Exchange Service and a Theodore Roosevelt Memorial Grant he investigates the evolution of Mexican whip spiders.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Stephanie F. Loria */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/Stephanie-F-Loria.jpg"
                  alt="Stephanie F. Loria"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Stephanie F. Loria</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2018 to 2020</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Stephanie_Loria2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Stephanie first came to the AMNH as a high school student participating in the High School Science Research Program of the Center for Biodiversity and Conservation with Felicity Arengo. In 2011, she completed her B.S. at Sewanee University in TN. During her B.S. she spent a summer working at the Field Museum of Natural History in Chicago as an NSF REU intern studying the evolution and biogeography of the Malagasy giant pill-millipedes, genus <em>Sphaeromimus</em>, under the guidance of Thomas Wesener and Petra Sierwald. Stephanie entered the Comparative Biology PhD program at the AMNH Richard Gilder Graduate School in 2011 and graduated in 2015. Her dissertation focused on the evolution and biogeography of Southeast Asian scorpions, particularly the family Chaerilidae.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Carsten Kamenz */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/carstenk.jpg"
                  alt="Carsten Kamenz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Carsten Kamenz</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Kalbfleisch Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2009 to 2011</p>
                <p className="text-gray-700">
                  Carsten received his PhD at the Humboldt-Universität zu Berlin, Germany, during which he visited the AMNH on an Annette Kade Fellowship. His research interest comprises the evolution of Arachnida with the focus on terrestrial adaptations. Carsten's PhD thesis was a comprehensive study of the morphology of fully land-adapted book lungs from extant and extinct arachnids. During the course of his post-doctoral research at the AMNH, Carsten examined the Palaeozoic scorpions, testing them for the purported aquatic life. The methodological spectrum he applied for revealing the morphological and anatomical characters, reaches from classical microscopy, through electron microscopy, to cutting-edge microtomographical techniques.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* José Antonio Ochoa */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/jose.jpg"
                  alt="José Antonio Ochoa"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">José Antonio Ochoa</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Kalbfleisch Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2007 to 2009</p>
                <p className="text-gray-700">
                  José completed his PhD at the Universidad Nacional de Cordoba, Argentina. His dissertation reviewed the systematics and biogeography of the scorpions of southern Peru. Jose's research interests include the systematics of the Andean scorpion genera <em>Orobothriurus</em> (Bothriuridae) and <em>Hadruroides</em> (Iuridae). He moved to the AMNH, supported by a Postdoctoral Research Fellowship in 2007. His postdoctoral research project was the first attempt to study the phylogeny of the Neotropical family Chactidae using morphological and genetic data.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Dana Price */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/dana.jpg"
                  alt="Dana Price"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Dana Price</h3>
                <p className="text-base text-gray-600 mb-1">NSF-BS&I Solifugae Grant | NSF-AToL Spider Phylogeny Grant</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2007 to 2008</p>
                <p className="text-gray-700">
                  Dana completed her PhD at Rutgers University in the Graduate Program of Ecology and Evolution. The title of her dissertation was Phylogeny, Biogeography and Behavior of the Dung Beetle Genus <em>Phanaeus</em> (Scarabaeidae: Scarabaeinae). In 2007 Dana worked with Lorenzo Prendini as a Postdoctoral Researcher at the AMNH (Division of Invertebrate Zoology) on sun spiders (Solifugae) and scorpions (Vaejovidae) supported by Prendini's NSF BS&I and RevSys grants; she worked for the NSF AToL Spider Phylogeny grant in 2008. Her interests include systematics, behavior, ecology and conservation biology.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Camilo I. Mattoni */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/camilo.jpg"
                  alt="Camilo I. Mattoni"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Camilo I. Mattoni</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Postdoctoral Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2004 to 2006</p>
                <p className="text-gray-700">
                  Camilo completed his PhD at the Universidad Nacional de Córdoba. His dissertation involved a systematic revision of the South American scorpion genus <em>Bothriurus</em>. He moved to the AMNH, supported by a Postdoctoral Research Fellowship in Genomics, in 2004. The aim of Camilo's postdoctoral research was to produce a robust phylogenetic hypothesis of relationships in the diverse Gondwana scorpion family Bothriuridae, using morphological and genetic data, and a sampling of as many bothriurid species as possible. He is also interested in scorpion ecology, behavior and reproduction, and in theoretical aspects of cladistics. One of his most recent contributions provides the first detailed description and comparison of the genital plugs in scorpions.
                </p>
              </PeopleCardBody>
          </PeopleCard>

          {/* Erich S. Volschenk */}
          <PeopleCard containerClassName="mb-8 pb-8">
              <PeopleCardMedia>
                <PeopleImage
                  src="/images/erich.jpg"
                  alt="Erich S. Volschenk"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-sm"
                />
              </PeopleCardMedia>
              <PeopleCardBody>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Erich S. Volschenk</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Postdoctoral Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2003 to 2006</p>
                <p className="text-gray-700">
                  Erich completed his PhD at Curtin University, Perth. His PhD dissertation involved a systematic revision of the Australian buthid genera. He began a Postdoctoral Research Fellowship in Genomics at the AMNH in 2003. His postdoctoral research project is the first serious attempt to investigate the phylogeny of the cosmopolitan scorpion family Buthidae, using molecular and morphological data and a broad sample of exemplar species. Erich's research interests include the systematics of Buthidae and the Australian endemic scorpion genus <em>Urodacus</em>, the homology of scorpion hemispermatophores, and the biology of troglobitic arachnids. He pioneered the use of ultraviolet light in scorpion photomicrography.
                </p>
              </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
        </div>

        <div data-section="graduate-students" className={activeSection === 'graduate-students' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Graduate Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Several graduate students worked in the Arachnology lab in past years. These students were funded from various sources including grants from the <a href="http://www.nsf.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">National Science Foundation</a> and the AMNH (graduate student fellowships and the Comparative Biology Program of the Richard Gilder Graduate School). If you are interested graduate study in the Arachnology lab, please visit the website of the <a href="https://www.amnh.org/our-research/richard-gilder-graduate-school" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Richard Gilder Graduate School</a> to apply to the RGGS for a graduate student fellowship for study at a partner programs (e.g., City University of New York).
          </p>
          <PeopleSectionTabs
            value={graduateStudentsTab}
            onChange={(value) => setTabForSection('graduate-students', value)}
          />
          <div data-tab="current" className={graduateStudentsTab === 'current' ? 'block' : 'hidden'}>

          {/* George Popovici */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="George Popovici" />
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
              <PhotoPlaceholder name="Alice Wang" />
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
              <PhotoPlaceholder name="Colby Sain" />
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
              <PhotoPlaceholder name="Nicolas Cazzaniga" />
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
              <PhotoPlaceholder name="Javier Blasco Aróstegui" />
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

          <div data-tab="alumni" className={`people-compact ${graduateStudentsTab === 'alumni' ? 'block' : 'hidden'}`}>

          {/* Nayeli Gutiérrez Trejo */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Nayeli Gutiérrez Trejo" />
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
                src="/images/jayson.jpg"
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
                src="/images/Stephanie-F-Loria.jpg"
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
                src="/images/tharina.jpg"
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
                src="/images/lionel.jpg"
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
                src="/images/edmundo.jpg"
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

        <div data-section="undergraduate-students" className={activeSection === 'undergraduate-students' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Undergraduate Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Over the years, several undergraduate students have worked in the Arachnology Lab supported by various internships. Most have gone on to graduate school and beyond. We acknowledge and appreciate their work. If you are interested in interning in the Arachnology Lab at the AMNH please visit the <a href="https://www.amnh.org/our-research/richard-gilder-graduate-school/academics-and-research/fellowship-and-grant-opportunities/undergraduate-fellowships/reu-biology-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Experiences for Undergraduates Program.</a>
          </p>
          <PeopleSectionTabs
            value={undergraduateStudentsTab}
            onChange={(value) => setTabForSection('undergraduate-students', value)}
          />
          <div data-tab="current" className={undergraduateStudentsTab === 'current' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            {[
              {
                name: 'William Phillips',
                affiliation: 'Rutgers University, New Brunswick, NJ',
                years: '2024 to present',
                image: null,
                bio: 'William (Will) worked in the Arachnology lab from 2024, recording meristic data and conducting digital imaging on scorpions, supervised by Lorenzo Prendini, and conducting DNA extraction, quantitation, PCR and sequencing, supervised by Colby Sain.',
              },
              {
                name: 'Dhruva Mathews Jagga Ram',
                affiliation: 'Columbia University, New York, NY',
                years: '2025 to 2026',
                image: 'people/Dhruva-Mathews-Jagga-Ram.jpeg',
                bio: 'Dhruva worked in the Arachnology lab in 2025 and 2026, conducting DNA extraction, quantitation, PCR and sequencing, supervised by Colby Sain.',
              },
              {
                name: 'Maggie Mannon',
                affiliation: 'Rutgers University, New Brunswick, NJ',
                years: '2025 to 2026',
                image: 'people/Maggie-Mannon.jpeg',
                bio: 'Maggie worked in the Arachnology lab in 2025 and 2026, recording morphometric data from scorpions, under the supervision of Jairo Moreno-González and Lorenzo Prendini.',
              },
            ].map((person, index, list) => (
              <div key={index} className={`mb-8 pb-8 ${index < list.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    {person.image ? (
                      <PeopleImage
                        src={`/images/${person.image}`}
                        alt={person.name}
                        width={400}
                        height={533}
                        className="w-full h-auto rounded-sm"
                      />
                    ) : (
                      <PhotoPlaceholder name={person.name} />
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h3>
                    <p className="text-base text-gray-600 mb-1">{person.affiliation}</p>
                    <p className="text-sm text-gray-500 mb-3">Undergraduate student {person.years.includes('to') ? 'from' : 'in'} {person.years}</p>
                    <p className="text-gray-700">{person.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div
            data-tab="alumni"
            className={`people-compact ${undergraduateStudentsTab === 'alumni' ? 'block' : 'hidden'}`}
          >
          
          <div className="space-y-6">
            {[
              { name: 'Allison Borkenhagen', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Allison worked in the Arachnida and Myriapoda collections in the summer of 2025, assisting Pio Colmenares and Lorenzo Prendini with sorting, organization and curation of the arachnid collections.' },
              { name: 'Sharon Brown', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Sharon worked in the Arachnida and Myriapoda collections in the summer of 2025, assisting Pio Colmenares and Lorenzo Prendini with sorting, organization and curation of the arachnid collections.' },
              { name: 'Jack Coulson', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Jack worked in the Arachnology lab in the summer of 2025, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Eugene Ko', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Eugene worked in the Arachnology lab in the summer of 2025, recording morphometric data and conducting digital imaging on scorpions, under the supervision of Jairo Moreno-González.' },
              { name: 'Jakub Minkiewicz', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Jakub worked in the Arachnology lab in the summer of 2025, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Adithya Raghunath', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Adithya worked in the Arachnology lab in the summer of 2025, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Drusilla Sheridan', affiliation: 'CUNY, John Jay College', years: '2025', image: null, bio: 'Dru worked in the Arachnology lab in 2025, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares and Colby Sain.' },
              { name: 'Maxine Ting', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2025', image: null, bio: 'Maxine worked in the Arachnology lab in the summer of 2025, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Russell Gurland', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2024 to 2025', image: null, bio: 'In the summer of 2024, Russell worked in the Arachnida and Myriapoda collections, assisting Pio Colmenares with sorting, organization and curation of the arachnid collections. In the summer of 2025, Russell assisted Lorenzo Prendini with digital imaging of scorpions.' },
              { name: 'Cassandra Hansen', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2024', image: null, bio: 'Cassandra worked in the Arachnida and Myriapoda collections in the summer of 2024, assisting Pio Colmenares and Lorenzo Prendini with sorting, organization and curation of the arachnid collections.' },
              { name: 'Delia Lasek', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2024', image: null, bio: 'Delia worked in the Arachnology lab in the summer of 2024, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Emma Leonard', affiliation: 'Binghamton University, Binghamton, NY', years: '2024', image: null, bio: 'Emma worked in the Arachnology lab in the summer of 2024 with a team of undergraduate students to obtain foundational skills for PCR, biology research, and professional development, under the supervision of Pio Colmenares. She then moved to the Cornell School of Veterinary Medicine (DVM program).' },
              { name: 'Grace Michlik', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2024', image: null, bio: 'Grace worked in the Arachnology lab in the summer of 2024, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Amara Pardo', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2024', image: null, bio: 'Amara worked in the Arachnida and Myriapoda collections in the summer of 2024, assisting Pio Colmenares and Lorenzo Prendini with sorting, organization and curation of the arachnid collections.' },
              { name: 'Mann Patel', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2024', image: null, bio: 'During the summer of 2024, Mann worked in the Arachnology Lab, extracting DNA samples and sequencing genes from 70 species, gaining hands-on experience that directly strengthened his training and skills as a genetics major.' },
              { name: 'Christania Fraenkel', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2023', image: null, bio: 'Christania worked in the Arachnology lab in the summer of 2023, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Mitchell Kiwior', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2023', image: null, bio: 'Mitch worked in the Arachnida and Myriapoda collections in the summer of 2023, assisting Pio Colmenares with curation and organization of the Cokendolper collection of arachnids.' },
              { name: 'Graham Ort', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2023', image: null, bio: 'Graham worked in the Arachnology lab in the summer of 2023, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Thi Vu', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2023', image: null, bio: 'Thi worked in the Arachnida and Myriapoda collections in the summer of 2023, assisting Pio Colmenares with curation and organization of the Cokendolper collection of arachnids.' },
              { name: 'Hannah Choi', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2022', image: null, bio: 'Hannah worked in the Arachnida and Myriapoda collections in the summer of 2022, assisting Pio Colmenares with curation and digitization of a collection of Chilean spiders.' },
              { name: 'Alexus Crespo', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2022', image: null, bio: 'Alexus worked in the Arachnology lab in the summer of 2022, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Camille Jaramillo', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2022', image: null, bio: 'Camille worked in the Arachnida and Myriapoda collections in the summer of 2022, assisting Pio Colmenares with curation and digitization of a collection of Chilean spiders.' },
              { name: 'Angie Lopez', affiliation: 'Rutgers University, New Brunswick, NJ', years: '2022', image: null, bio: 'Angie worked in the Arachnology lab in the summer of 2022, conducting DNA extraction, quantitation, PCR and sequencing, under the supervision of Pio Colmenares.' },
              { name: 'Jared Martin', affiliation: 'University of Illinois Urbana-Champaign', years: '2022', image: null, bio: 'Jared worked in the Arachnida and Myriapoda Collections in the summer of 2022, assisting with curation of a donation of Opiliones (harvestmen).' },
              { name: 'Valentin Ehrenthal', affiliation: 'University of Hamburg, Germany', years: '2019 to 2020', image: null, bio: 'Valentin spent six months at the AMNH working on Southeast Asian scorpions. He generated images and data for a morphological matrix and performed extractions, PCRs and Sanger Sequencing. Additionally, he learned about the biogeography and phylogeny of these scorpions.' },
              { name: 'Diogo Casellato', affiliation: 'CUNY, Baruch College | Brazil Scientific Mobility Program', years: '2015 to 2019', image: null, bio: 'Diogo interned in the molecular lab, learning to extract, amplify, sequence, and edit DNA as part of a variety of scorpion phylogenetics projects.' },
              { name: 'Elena Babicz', affiliation: 'Bridgewater State University', years: '2019', image: null, bio: 'Elena spent the summer at the AMNH as an REU intern under the supervision of Stephanie Loria and Pio Colmenares, focusing on Thelyphonids. She was tasked with generating molecular data and images of the specimens, and also learned about the morphology, biogeography and phylogeny of this order of arachnids.' },
              { name: 'Colby Sain', affiliation: 'University of Tennessee', years: '2019', image: null, bio: 'Colby came to the AMNH as an REU intern. She worked under the mentorship of Ricardo Botero-Trujillo and Stephanie Loria, primarily on Ricinulei, with a focus on the African genus, <em>Ricinoides</em>. She generated an extensive set of morphological images, and she also generated molecular data. At the University of Tennessee, she studies Geology with a focus on Paleontology. In the future, Colby hopes to do more work in the Arachnology Lab.' },
              { name: 'Deborah Chin', affiliation: 'Fairleigh Dickinson University', years: '2016 to 2018', image: 'people/Deborah-Chin.jpg', bio: 'Deborah spent the summer doing extractions and PCRs on scorpions in the AMNH molecular lab.' },
              { name: 'Sasha Mendez', affiliation: 'Rutgers University', years: '2018', image: 'people/Sasha-Mendez.jpg', bio: 'Sasha spent the summer obtaining DNA extractions, PCRs and sequences from scorpion samples in the AMNH molecular lab.' },
              { name: 'Lam Ngo', affiliation: 'Sewanee: The University of the South', years: '2018', image: 'people/Lam-Ngo.jpg', bio: 'Lam assisted with field work in Asia, surpervised by Stephanie Loria.' },
              { name: 'Massimiliano "Max" Roppo', affiliation: 'Sapienza University of Rome, Italy', years: '2018', image: 'people/Massimiliano-Max-Roppo.jpg', bio: 'Max came to the AMNH and spent three months adquiring morphological data on some African scorpions.' },
              { name: 'Maggie Ruben', affiliation: 'Sapienza University of Rome, Italy', years: '2018', image: 'people/Maggie-Mannon.jpeg', bio: 'Maggie spent the summer of 2016 studying cuticular fluorescence in scorpions and other chelicerates including horseshoe crabs, solifuges, opilionids, and extinct eurypterids.' },
              { name: 'Michelle Yun', affiliation: 'CUNY, York College', years: '2010', image: null, bio: 'Michelle took part in an investigation of the phylogeny of the scorpion genus <em>Parabuthus</em> sequencing six different loci from samples collected all over southern Africa.' },
              { name: 'Angela Holuba', affiliation: 'Barnard College', years: '2008', image: 'people/Angela-Holuba.jpg', bio: 'Angela worked on a project investigating the phylogeny and evolutionary relationships of the scorpion family Buthidae.' },
              { name: 'Sylvia Johnson', affiliation: 'Barnard College | Collegiate Science and Technology Entry Program', years: '2008', image: 'people/Sylvia-Johnson.jpg', bio: 'Sylvia worked on a project investigating the phylogeny and evolutionary relationships of the scorpion family Diplocentridae.' },
              { name: 'Gena Esposito', affiliation: 'University of Texas at Austin | NSF RevSys Grant', years: '2007', image: 'people/Gena-Esposito.jpg', bio: 'Gena generated DNA sequence data as part of an investigation of the phylogeny of the scorpion family Buthidae.' },
              { name: 'Sarah Schoenbrun', affiliation: 'Brown University | NSF Research Experiences for Undergraduates Internship', years: '2007', image: 'people/Sarah-Schoenbrun.jpg', bio: 'Sarah studied the medically important North American scorpion genus, <em>Centruroides</em>, using molecular data from previously unidentified specimens to clarify their phylogenetic placement. Sarah also investigated the relationship between venom genes of <em>Centruroides</em> and other medically important scorpions.' },
              { name: 'Steve Webb', affiliation: 'Muhlenberg College | NSF Research Experiences for Undergraduates Internship', years: '2005', image: 'people/Steve-Webb.jpg', bio: 'Steve tested the phylogenetic placement and monophyly of the former scorpion family Microcharmidae, using morphological and molecular data.' },
              { name: 'Kanvaly B. Bamba', affiliation: 'Yale University | NSF Research Experiences for Undergraduates Internship', years: '2004', image: 'people/Kanvaly-B-Bamba.jpg', bio: 'Kanvaly contributed to the first phylogeny for the Gondwana scorpion family Hormuridae, based on a simultaneous analysis six gene loci and morphology.' },
              { name: 'Michelle McCoy', affiliation: 'North Carolina University | NSF Research Experiences for Undergraduates Internship', years: '2004', image: null, bio: 'Michelle contributed to the first phylogeny for the Gondwana scorpion family Hormuridae, based on a simultaneous analysis six gene loci and morphology.' },
              { name: 'Samara Maaliki', affiliation: 'CUNY, City University of New York | NSF Research Experiences for Undergraduates Internship | Undergraduate Mentoring in Evolutionary Biology Internship', years: '2003', image: null, bio: 'Samara studied the morphology of the central Asian scorpion <em>Pseudochactas ovchinnikovi</em> and investigated its phylogenetic position with morphological and molecular data.' },
              { name: 'Lauren A. Esposito', affiliation: 'University of Texas, El Paso | NSF Research Experiences for Undergraduates Internship', years: '2002', image: 'people/Lauren-A-Esposito.jpg', bio: 'Lauren first came to the AMNH for a summer research project on the systematics of medically important African <em>Parabuthus</em> scorpions. She returned to the lab as a graduate student from 2004 to 2011.' },
            ].map((person, index, list) => (
              <div key={index} className={`mb-8 pb-8 ${index < list.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    {person.image ? (
                      <PeopleImage
                        src={`/images/${person.image}`}
                        alt={person.name}
                        width={400}
                        height={533}
                        className="w-full h-auto rounded-sm"
                      />
                    ) : (
                      <PhotoPlaceholder name={person.name} />
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h3>
                    <p className="text-base text-gray-600 mb-1">{person.affiliation}</p>
                    <p className="text-sm text-gray-500 mb-3">Undergraduate student {person.years.includes('to') ? 'from' : 'in'} {person.years}</p>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: person.bio }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        </div>

        <div data-section="high-school-students" className={activeSection === 'high-school-students' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">High School Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Several high school students have worked in the Arachnology Lab supported by various internships. Many have continued to undergraduate programs. We acknowledge and appreciate their work. If you are interested in interning in the Arachnology Lab at the AMNH please visit the <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program.</a>
          </p>
          <PeopleSectionTabs
            value={highSchoolStudentsTab}
            onChange={(value) => setTabForSection('high-school-students', value)}
          />
          <div data-tab="current" className={highSchoolStudentsTab === 'current' ? 'block' : 'hidden'}>
          {/* Meredith Metz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Meredith Metz" />
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
              <PhotoPlaceholder name="Alex Liu" />
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
              <PhotoPlaceholder name="Balthazar Edwards" />
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
            className={`people-compact ${highSchoolStudentsTab === 'alumni' ? 'block' : 'hidden'}`}
          >

          {/* Anika Mahbub */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Anika Mahbub" />
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
              <PhotoPlaceholder name="William Phillips" />
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
              <PhotoPlaceholder name="Christina Li" />
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
              <PhotoPlaceholder name="Michelle Li" />
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
              <PhotoPlaceholder name="Eva-Lucia Prendini" />
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
              <PhotoPlaceholder name="Sophia Collins" />
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
              <PhotoPlaceholder name="Aibrean Henry" />
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
              <PhotoPlaceholder name="Alex Moell" />
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
                src="/images/HPaul_mnmt2g.jpg"
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
              <PhotoPlaceholder name="Luke Siegel" />
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
                src="/images/Cherie.jpg"
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
                src="/images/Azmi.jpg"
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
                Nathan came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. He assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
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
                Aleyna came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
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
                Simon came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. He assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Agnes Oduro */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Agnes Oduro" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Agnes Oduro</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Agnes came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida and Myriapoda collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Amrita Banerji */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Amrita Banerji" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Amrita Banerji</h3>
              <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
              <p className="text-gray-700">
                Amrita came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida and Myriapoda collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorkin and Pío Colmenares.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Geeta Sharma */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Geeta.jpg"
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
                src="/images/Sophia.jpg"
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
                src="/images/Tamar.jpg"
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
                src="/images/ChelseaSilva2015.jpg"
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
                src="/images/BillyConlan2015.jpg"
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
                src="/images/Sasha-Reiter--and--Eleanor-Goetz.jpg"
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
                src="/images/Sasha-Reiter--and--Eleanor-Goetz.jpg"
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
                src="/images/adam.jpg"
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
                src="/images/Jianhua-Lin--and--Qiao-Rong-Huang.jpg"
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
                src="/images/Jianhua-Lin--and--Qiao-Rong-Huang.jpg"
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
                src="/images/melanie.jpg"
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
                src="/images/cai.jpg"
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
                src="/images/berny.jpg"
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
                src="/images/tumi.jpg"
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

        <div data-section="volunteers" className={activeSection === 'volunteers' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Volunteers and Field Assistants</h2>
          <p className="text-xl text-gray-600 mb-8">
            The Arachnology Lab at the AMNH has had many dedicated volunteers work with us over the years. With their help we have been able to accomplish a great deal of work. We would like to thank all of our volunteers for their invaluable assistance. If you are interested in volunteering in the Arachnology Lab at the AMNH please visit the <a href="https://www.amnh.org/join-support/volunteer-now" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Volunteer Department.</a>
          </p>
          <PeopleSectionTabs
            value={volunteersTab}
            onChange={(value) => setTabForSection('volunteers', value)}
          />
          <div data-tab="current" className={volunteersTab === 'current' ? 'block' : 'hidden'}>

          {/* Soleil Blanquera */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Soleil Blanquera" />
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
              <PhotoPlaceholder name="Brian Sperber" />
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
                src="/images/victoria.jpg"
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

          <div data-tab="alumni" className={`people-compact ${volunteersTab === 'alumni' ? 'block' : 'hidden'}`}>

          {/* George Tsinias */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/George.jpg"
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
                src="/images/Christian.jpg"
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
                src="/images/Gerbi.jpg"
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
                src="/images/debbie.jpg"
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
                src="/images/Jasmin.jpg"
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
                src="/images/ReginaldChristiaan.jpg"
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
                src="/images/fiedler.jpg"
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
                src="/images/Stefan.Foord.jpg"
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
                src="/images/Tom-Sullivan.jpg"
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
                src="/images/Gildenhuys.Patrick.jpg"
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
                src="/images/Charles.Haddad.jpg"
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
                src="/images/Huber.jpg"
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
                src="/images/huff2.jpg"
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
                src="/images/simone.jpg"
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
                src="/images/warren.jpg"
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
                src="/images/west.jpg"
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
                <a href="http://www.birdspiders.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">BirdSpiders.com</a>
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
                src="/images/ofelialab.jpg"
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
                src="/images/desouer.jpg"
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
                src="/images/Engelbrecht.jpg"
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
                src="/images/ilsa.jpg"
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
                src="/images/sergios.jpg"
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
                Sergios holds a PhD in Ecology and Evolutionary Biology from Columbia University and had a <a href="https://research.amnh.org/users/koloko" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">postdoc</a> in the AMNH Sackler Institute for Comparative Genomics and Center for Conservation Genetics, where he coordinated the DNA Barcoding Initiative for Conservation. He created and maintained the lab website from 2006 until 2008.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sulata Maity */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/sulata.jpg"
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
                src="/images/kari.jpg"
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
                <a href="http://angelfire.com/tx4/scorpiones" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Kari's Scorpion Pages</a>
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Randy Mercurio */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/mercurio3.jpg"
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
                src="/images/zach.jpg"
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
                src="/images/Visser.jpg"
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

        <div data-section="visiting-students" className={activeSection === 'visiting-students' ? 'block' : 'hidden'}>
        <div>
          <h2 className="text-3xl font-bold mt-8 lg:mt-0 mb-2 text-gray-900">Visitors</h2>
          <p className="text-xl text-gray-600 mb-8">
            Many postdocs and graduate students from other institutions in the U.S. and abroad have visited the AMNH Arachnology Lab in the past, often funded in part by the AMNH Small Grants program (Annette Kade Fellowships, Collections Study Grants and Theodore Roosevelt Memorial Fund). If you are interested in applying for small grants to visit the AMNH, please visit the <a href="https://www.amnh.org/our-research/richard-gilder-graduate-school/academics-and-research/fellowship-and-grant-opportunities/research-grants-and-student-exchange-fellowships" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Richard Gilder Graduate School.</a>
          </p>
          <PeopleSectionTabs
            value={visitingStudentsTab}
            onChange={(value) => setTabForSection('visiting-students', value)}
          />
          <div data-tab="current" className={visitingStudentsTab === 'current' ? 'block' : 'hidden'}>

          {/* Antonio Galán Sánchez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Antonio Galán Sánchez" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Antonio Galán Sánchez</h4>
              <p className="text-sm text-gray-600 mb-1">Museum für Naturkunde, Humboldt-Universität, Berlin, Germany</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2025 and 2026</p>
              <p className="text-gray-700">
                Antonio’s research focuses on the evolution and functional impacts of eye loss in spiders. He is also interested in linyphiid systematics, the online documentation of biodiversity inventories, and the taxonomy of Araneomorphae. As part of his PhD project, Antonio studied the Synspermiata, a diverse but understudied clade of spiders which exhibit extraordinary diversity in eye number. Antonio visited the AMNH collection in January 2025 to revise, identify, and request loan materials. After being awarded an Annette-Kade Fellowship, he returned to the AMNH for three months in 2025 and 2026 to comprehensively survey and document the variation in eyes across the family Pholcidae and other Synspermiata, as well as scan high-quality specimens using the micro-CT facility.
              </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>

          <div data-tab="alumni" className={`people-compact ${visitingStudentsTab === 'alumni' ? 'block' : 'hidden'}`}>

          {/* Matias Izquierdo */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Matias Izquierdo" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Matias Izquierdo</h4>
              <p className="text-sm text-gray-600 mb-1">Universidad Nacional, Cordoba, Argentina</p>
              <p className="text-sm text-gray-500 mb-2">Postdoc in 2025</p>
              <p className="text-gray-700">
                Matias visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Breanna Jordan */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Breanna Jordan" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Breanna Jordan</h4>
              <p className="text-sm text-gray-600 mb-1">Harvard University, Cambridge, MA</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2025</p>
              <p className="text-gray-700">
                Breanna visited the AMNH for research on sea spiders (Pycnogonida).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sarah Morris */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Sarah Morris" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Sarah Morris</h4>
              <p className="text-sm text-gray-600 mb-1">The George Washington University, Washington, DC</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2025</p>
              <p className="text-gray-700">
                Sarah visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Daniel Castro-Pereira */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Daniel Castro-Pereira" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Daniel Castro-Pereira</h4>
              <p className="text-sm text-gray-600 mb-1">Universidade de São Paulo, Brazil</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024</p>
              <p className="text-gray-700">
                Daniel visited the AMNH for research on whip scorpions (Thelyphonida) supported by a grant from FAPESP.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Kaylin Chong */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Kaylin Chong" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Kaylin Chong</h4>
              <p className="text-sm text-gray-600 mb-1">Harvard University, Cambridge, MA</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024</p>
              <p className="text-gray-700">
                Kaylin visited the AMNH for research on ticks (Acari: Ixodida).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Erik Ciaccio */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Erik Ciaccio" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Erik Ciaccio</h4>
              <p className="text-sm text-gray-600 mb-1">University of Idaho, Moscow, ID</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024</p>
              <p className="text-gray-700">
                Erik visited the AMNH for research on mygalomorph spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Valentin Ehrenthal */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Valentin Ehrenthal" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Valentin Ehrenthal</h4>
              <p className="text-sm text-gray-600 mb-1">University of Hamburg, Germany</p>
              <p className="text-sm text-gray-500 mb-2">MS student in 2024</p>
              <p className="text-gray-700">
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
              <h4 className="text-base font-bold mb-1 text-gray-900">Miguel Garcia</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto Politecnico Nacional, Mexico</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024</p>
              <p className="text-gray-700">
                Miguel visited the AMNH for his research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Leonel Martinez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Leonel Martinez" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Leonel Martinez</h4>
              <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales, Argentina</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024 and 2025</p>
              <p className="text-gray-700">
                Leonel visited the AMNH twice (2024, 2025) for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Paulo Pantoja */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Paulo Pantoja" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Paulo Pantoja</h4>
              <p className="text-sm text-gray-600 mb-1">Federal University of Pará, Brazil</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024</p>
              <p className="text-gray-700">
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
              <h4 className="text-base font-bold mb-1 text-gray-900">Karina Silvestre</h4>
              <p className="text-sm text-gray-600 mb-1">University of Idaho, Moscow, ID</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2024</p>
              <p className="text-gray-700">
                Karina visited the AMNH for research on mygalomorph spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Pedro Martins */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Pedro Martins" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Pedro Martins</h4>
              <p className="text-sm text-gray-600 mb-1">Federal University of Minas Gerais, Brazil</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2023</p>
              <p className="text-gray-700">
                Pedro visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Goran Shikak */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Goran Shikak" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Goran Shikak</h4>
              <p className="text-sm text-gray-600 mb-1">University of Colorado, Denver, CO</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2023</p>
              <p className="text-gray-700">
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
              <h4 className="text-base font-bold mb-1 text-gray-900">Pietro Tardelli</h4>
              <p className="text-sm text-gray-600 mb-1">The George Washington University, Washington, DC</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2023</p>
              <p className="text-gray-700">
                Pietro visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Arnau Calatayud-Mascarell */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Arnau Calatayud-Mascarell" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Arnau Calatayud-Mascarell</h4>
              <p className="text-sm text-gray-600 mb-1">University of Idaho, Moscow, ID</p>
              <p className="text-sm text-gray-500 mb-2">PhD student from 2022 to 2025</p>
              <p className="text-gray-700">
                Arnau visited the AMNH three times (2022, 2023, 2025) for his research on mygalomorph spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* David Chamé-Vázquez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="David Chamé-Vázquez" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">David Chamé-Vázquez</h4>
              <p className="text-sm text-gray-600 mb-1">Centro de Investigaciones Biológicas del Noroeste, La Paz, Mexico</p>
              <p className="text-sm text-gray-500 mb-2">Postdoc in 2022</p>
              <p className="text-gray-700">
                David visited the AMNH for research on phrurolithid spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Sahibzada M. Jawad */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Sahibzada M. Jawad" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Sahibzada M. Jawad</h4>
              <p className="text-sm text-gray-600 mb-1">Ismailia College, Peshawar, Pakistan</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2022</p>
              <p className="text-gray-700">
                Sahib visited the AMNH for research on Pakistani scorpions supported by a HEC Pakistan Ph.D. Fellowship.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Willians Porto */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Willians Porto" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Willians Porto</h4>
              <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales, Argentina</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2022</p>
              <p className="text-gray-700">
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
              <h4 className="text-base font-bold mb-1 text-gray-900">Valerie Warhol</h4>
              <p className="text-sm text-gray-600 mb-1">Carnegie Museum of Natural History, Pittsburgh, PA</p>
              <p className="text-sm text-gray-500 mb-2">Volunteer researcher in 2022</p>
              <p className="text-gray-700">
                Valerie visited the AMNH for research on spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Shahan Derkarabetian */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PhotoPlaceholder name="Shahan Derkarabetian" />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Shahan Derkarabetian</h4>
              <p className="text-sm text-gray-600 mb-1">Harvard University, Cambridge, MA</p>
              <p className="text-sm text-gray-500 mb-2">Postdoc in 2019</p>
              <p className="text-gray-700">
                Shahan visited the AMNH for research on harvestmen (Opiliones).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jairo A. Moreno-González */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Jairo.jpg"
                alt="Jairo A. Moreno-González"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Jairo A. Moreno-González</h4>
              <p className="text-sm text-gray-600 mb-1">Museu de Zoologia, Universidade de Sao Paulo, Brasil</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
              <p className="text-gray-700">
                Jairo received his PhD from the Instituto de Biociencias, Universidad de Sao Paulo, Sao Paulo, Brazil. His research interests are focused on systematics and evolution of some arachnid orders such as Scorpiones (Buthidae: <em>Tityus</em>), and Pedipalpi (Schizomida, Uropygi and Amblypygi). His PhD project deals with the systematic revision of <em>Tityus</em> (<em>Archaeotityus</em>) using phenotypic and genetic evidence. He visited the AMNH for six months to examine material and score morphological characters for his thesis disseration.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Andria de Paula Santos da Silva */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Andria.jpg"
                alt="Andria de Paula Santos da Silva"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Andria de Paula Santos da Silva</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto de Biociencias, Universidade de Sao Paulo, Brasil</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
              <p className="text-gray-700">
                Andria's PhD project deals with the systematics of the scorpion genus <em>Ananteris</em> (Buthidae). She visited the AMNH collection to examine a large number of these scorpions and generate morphological data.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Catalina Romero */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Catalina.jpg"
                alt="Catalina Romero"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Catalina Romero</h4>
              <p className="text-sm text-gray-600 mb-1">Universidad Nacional, Colombia</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
              <p className="text-gray-700">
                Catalina spent a few months visiting the AMNH collections to examine specimens and collect morphological data for her PhD thesis on pseudoscorpions of the family Whitiidae.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Miguel Medrano */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Miguel.jpg"
                alt="Miguel Medrano"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Miguel Medrano</h4>
              <p className="text-sm text-gray-600 mb-1">Museu Nacional, Universidade Federal do Rio de Janeiro, Brasil</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
              <p className="text-gray-700">
                Miguel spent a week at the AMNH examining type specimens for his PhD project on systematics of Cosmetidae (Opiliones, Laniatores).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Rene Barba */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/ReneBarba.jpg"
                alt="Rene Barba"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Rene Barba</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto de Ecología y Sistemática, Havana, Cuba | Collections Study Grant</p>
              <p className="text-sm text-gray-500 mb-2">Student in 2019</p>
              <p className="text-gray-700">
                Rene's research focuses on the pseudoscorpion families Sternophoridae, Olpiidae and Garypinidae. He visited the AMNH collections to examine and image type and nontype material from the Caribbean.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jahnavi Joshi */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Jahnavi.jpg"
                alt="Jahnavi Joshi"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Jahnavi Joshi</h4>
              <p className="text-sm text-gray-600 mb-1">Natural History Museum, UK</p>
              <p className="text-sm text-gray-500 mb-2">Post-Doctoral Fellow in 2019</p>
              <p className="text-gray-700">
                Jahnnavi visited the AMNH to examine a series of old centipedes for an ongoing research project at the Natural History Museum in London.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Aaron Goodman */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Aaron.jpg"
                alt="Aaron Goodman"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Aaron Goodman</h4>
              <p className="text-sm text-gray-600 mb-1">California Academy of Sciences, USA</p>
              <p className="text-sm text-gray-500 mb-2">Master's Student from 2018 to 2019</p>
              <p className="text-gray-700">
                Aaron is mainly interested in scorpion systematics. He came to the AMNH to generate morphological data for his master's dissertation on the genus <em>Centruroides</em> (Buthidae).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Stephan Schaffrath */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Stephan_aslq3e.jpg"
                alt="Stephan Schaffrath"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Stephan Schaffrath</h4>
              <p className="text-sm text-gray-600 mb-1">University of Cologne, Germany</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2014 and 2018</p>
              <p className="text-gray-700">
                For Stephan's PhD he visited the AMNH to receive training in DNA isolation, amplification and sequencing while investigating the chemical composition of scorpion venoms, with a view to using species-specific signatures for systematics. Later, Stephan returned to spend three months at the AMNH generating DNA and morphological data for his PhD thesis, focused on the scorpion genus <em>Euscorpius</em> (Euscorpiidae).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carlos Alberto Martinez Muñoz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/CarlosM.jpg"
                alt="Carlos Alberto Martinez Muñoz"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Carlos Alberto Martinez Muñoz</h4>
              <p className="text-sm text-gray-600 mb-1">University of Turku, Finland</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student from 2018 to 2019</p>
              <p className="text-gray-700">
                Carlos' main research interest is focused on Myriapods. He came to the AMNH to examine and organize a series of old types described by Chamberlin.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Callum Mclean */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Callum.jpg"
                alt="Callum Mclean"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Callum Mclean</h4>
              <p className="text-sm text-gray-600 mb-1">Manchester Metropolitan University, UK</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2018</p>
              <p className="text-gray-700">
                Callum visited the AMNH collections to examine various species of Amblypygi for his doctoral thesis, focused in biomechanics of predatory structures in arthropods.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Shlomo Cain */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Shlomo.jpg"
                alt="Shlomo Cain"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Shlomo Cain</h4>
              <p className="text-sm text-gray-600 mb-1">University of Haifa, Oranim, Israel</p>
              <p className="text-sm text-gray-500 mb-2">MSc Student in 2018</p>
              <p className="text-gray-700">
                Shlomo visited the AMNH for three months to examine scorpions of the genus <em>Buthacus</em> (Buthidae) for his master's dissertation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ivan Magalhaes */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Ivan.jpg"
                alt="Ivan Magalhaes"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Ivan Magalhaes</h4>
              <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET | Doctoral fellow, Division Aracnologia</p>
              <p className="text-sm text-gray-500 mb-2">PhD Student in 2017</p>
              <p className="text-gray-700">
                Ivan is a PhD candidate at the Museo Argentino de Ciencias Naturales "Bernardino Rivadavia", Argentina. His research focuses on spider systematics and its interface with their evolution and biogeography. His current project aims at resolving the systematics of crevice weavers (family Filistatidae), a group of shy and little-studied spiders most diverse in dry subtropical areas. His is also interested in the systematics of sand spiders (<em>Sicarius</em>) and spiny orb weavers (<em>Micrathena</em>).
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Gerardo Contreras */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/GerardoContreras.jpg"
                alt="Gerardo Contreras"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Gerardo Contreras</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-sm text-gray-500 mb-2">Student from 2015 to 2017</p>
              <p className="text-gray-700">
                Gerardo visited the AMNH to examine the collection of the North American scorpions of the genus <em>Vaejovis</em> and relatives, and score characters for his phylogenetic analysis. He returned a second time to generate DNA sequences in the molecular lab.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Rodrigo Monjáraz Ruedas */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/RodrigoRuedas.jpg"
                alt="Rodrigo Monjáraz Ruedas"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Rodrigo Monjáraz Ruedas</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2014 and from 2016 to 2017</p>
              <p className="text-gray-700">
                Rodrigo is studying the Schizomida fauna of Mexico. He visited the AMNH to examine the schizomid holdings of the collection and score morphological characters for his PhD research.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Tebogo Ledwaba */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Tebogo.jpg"
                alt="Tebogo Ledwaba"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Tebogo Ledwaba</h4>
              <p className="text-sm text-gray-600 mb-1">Ditsong National Museum of Natural History, Pretoria, South Africa</p>
              <p className="text-sm text-gray-500 mb-2">Student in 2017</p>
              <p className="text-gray-700">
                Tebogo visited the AMNH for 2 months to digitize the AMNH collection of African scorpions and part of the Karoo BioGaps Grant funded by the South African National Research Foundation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jesus Alberto Cruz-López */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Jesus-Alberto-Cruz-Lopez.jpg"
                alt="Jesus Alberto Cruz-López"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Jesus Alberto Cruz-López</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-sm text-gray-500 mb-2">Student in 2017</p>
              <p className="text-gray-700">
                Jesus visited the AMNH to examine the collection of mexican harvestmen (Opiliones) as part of his dissertation research.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ricardo Botero-Trujillo */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/ric.jpg"
                alt="Ricardo Botero-Trujillo"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Ricardo Botero-Trujillo</h4>
              <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET | Doctoral fellow, Division Aracnologia | Theodore Roosevelt Memorial Grant</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
              <p className="text-gray-700">
                Ricardo Botero Trujillo earned his biology degree from the Pontificia Universidad Javeriana, Bogotá. While an undergraduate student, he became interested in arachnids and started working on scorpions from his native country, Colombia. Gradually, hooded thick-spider (order Ricinulei) and sun-spiders (order Solifugae) became part of his research interests. After a 5-year period working in the pharmaceutical industry, Ricardo moved to Buenos Aires, Argentina to start his PhD His doctoral thesis consists of a taxonomic revision and phylogenetic analysis of the South American sun-spider family Mummuciidae. After being awarded a Theodore Roosevelt Memorial Grant, Ricardo visited the AMNH to study the collections of the groups he works on.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Dulce Flor Piedra */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Dulce.jpg"
                alt="Dulce Flor Piedra"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Dulce Flor Piedra</h4>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
              <p className="text-gray-700">
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
              <h4 className="text-base font-bold mb-1 text-gray-900">Rebecca Godwin</h4>
              <p className="text-sm text-gray-600 mb-1">Auburn University, AL</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
              <p className="text-gray-700">
                Rebecca visited the AMNH for research on trapdoor spiders.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Francisco Salgueiro Sepulveda */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
              <PeopleImage
                src="/images/Francisco.jpg"
                alt="Francisco Salgueiro Sepulveda"
                width={300}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </PeopleCardMedia>
            <PeopleCardBody>
              <h4 className="text-base font-bold mb-1 text-gray-900">Francisco Salgueiro Sepulveda</h4>
              <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
              <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
              <p className="text-gray-700">
                Francisco spent a month at the AMNH to study the collection of tetragnathid spiders for his dissertation.
              </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Diego Barrales */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/diego.jpg"
                  alt="Diego Barrales"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Diego Barrales</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2016</p>
                <p className="text-gray-700">
                  Diego visted the AMNH to examine material belonging to the species <em>Mastigoproctus giganteus</em> especially from localities within the United States. His findings will be incorporated into a morphological analysis used for a species delimitation project.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Samuel Mwangi */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/mwangi.jpg"
                  alt="Samuel Mwangi"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Samuel Mwangi</h4>
                <p className="text-sm text-gray-600 mb-1">West Texas A&M University, Canyon, TX | National Museums of Kenya, Nairobi | Theodore Roosevelt Fellowship, Richard Lounsbery Foundation, Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2005 and 2016</p>
                <p className="text-gray-700">
                  Samuel's MSc research focuses on the diversity of Kenyan scorpions of Kenya. As student at the National Museums of Kenya, Nairobi, he visited the AMNH for training in the Molecular Systematics Laboratory. He later returned to the AMNH to examine and photograph specimens for his Masters research at West Texas A&M University.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Bastian-Jesper Klußmann-Fricke */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/bastian.jpg"
                  alt="Bastian-Jesper Klußmann-Fricke"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Bastian-Jesper Klußmann-Fricke</h4>
                <p className="text-sm text-gray-600 mb-1">University of Rostock, Germany | Annette-Kade Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2015</p>
                <p className="text-gray-700">
                  Bastian visited the AMNH to study the respiratory and circulatory systems of camel spiders (Solifugae) using osmium tetroxide staining, corrosion casting, and microCT.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Gustavo Silva de Miranda */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/Gustavo.jpg"
                  alt="Gustavo Silva de Miranda"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Gustavo Silva de Miranda</h4>
                <p className="text-sm text-gray-600 mb-1">Natural History Museum of Denmark, University of Copenhagen</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2014 and 2015</p>
                <p className="text-gray-700">
                  Gustavo visited the AMNH twice during his PhD to work on the collection of whip spiders (Amblypygi) for his revision of the family Charinidae. He was trained and generated DNA sequence data from charinid samples in the AMNH molecular lab.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Ingrid Catalina Romero Ortiz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PhotoPlaceholder name="Ingrid Catalina Romero Ortiz" />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Ingrid Catalina Romero Ortiz</h4>
                <p className="text-sm text-gray-600 mb-1">Universidad Nacional de Colombia, Bogotá</p>
                <p className="text-sm text-gray-500 mb-2">Graduate student in 2015</p>
                <p className="text-gray-700">
                  Ingrid Catalina visited the AMNH to study the pseudoscorpion holdings and types as part of her graduate research on their taxonomy and systematics.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Daniela Ramírez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/DanielaRamirez.jpg"
                  alt="Daniela Ramírez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Daniela Ramírez</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2014</p>
                <p className="text-gray-700">
                  Daniela visited the AMNH to examine the collection of tarantula spiders (Theraphosidae) as part of her PhD research.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carlos Santibañez-López */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/carlos.jpg"
                  alt="Carlos Santibañez-López"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Carlos Santibañez-López</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City | Collections Study Grant, Theodore Roosevelt Memorial Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2009, from 2011 to 2012, and in 2014</p>
                <p className="text-gray-700">
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
                <h4 className="text-base font-bold mb-1 text-gray-900">Roberta Engel</h4>
                <p className="text-sm text-gray-600 mb-1">University of Connecticut, Storrs, CT</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2012</p>
                <p className="text-gray-700">
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
                <h4 className="text-base font-bold mb-1 text-gray-900">David Vrech</h4>
                <p className="text-sm text-gray-600 mb-1">Universidad Nacional de Córdoba, Argentina</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2012</p>
                <p className="text-gray-700">
                  David visited the AMNH for research on the sperm packages of scorpions.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Humberto Yoji Yamaguti */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/humberto.jpg"
                  alt="Humberto Yoji Yamaguti"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Humberto Yoji Yamaguti</h4>
                <p className="text-sm text-gray-600 mb-1">Universidade de São Paulo, Brazil</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2009 and 2011</p>
                <p className="text-gray-700">
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
                <h4 className="text-base font-bold mb-1 text-gray-900">Patricia Carrera</h4>
                <p className="text-sm text-gray-600 mb-1">Universidad Nacional de Cordoba, Argentina | Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2009</p>
                <p className="text-gray-700">
                  Patricia studied mating behavior and sexual selection in bothriurid scorpions for her PhD She visited the AMNH to study the structure and homology of the scorpion hemispermatophore.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Jesus Alfonso Ballesteros Chavez */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/jesusb.jpg"
                  alt="Jesus Alfonso Ballesteros Chavez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Jesus Alfonso Ballesteros Chavez</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City | Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2008</p>
                <p className="text-gray-700">
                  Jesus' MSc research aimed to reconstruct the phylogenetic relationships of the species belonging to the Neotropical whip spider genus <em>Paraphrynus</em> (Amblypygi) and its relationship with the rest of the genera of Phrynidae. He visited the AMNH to study the Neotropical phrynids. He then moved to George Washington University for a PhD on spiders.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Fabio Akashi Hernandes */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/Hernanades.jpg"
                  alt="Fabio Akashi Hernandes"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Fabio Akashi Hernandes</h4>
                <p className="text-sm text-gray-600 mb-1">UNESP: São Paulo State University, Brazil</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2008 and 2016</p>
                <p className="text-gray-700">
                  Fabio's main interests are the taxonomy of plant mites (Bdellidae, Tetranychidae, Raphignathoidea) and feather mites (Astigmata), with an emphasis on the taxonomy and phylogeny of the genus <em>Aponychus</em> and related genera (Acari, Tetranychidae). He visited the AMNH to study mite types from several groups.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Andrés Ojanguren-Affilastro */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/ojanguren.jpg"
                  alt="Andrés Ojanguren-Affilastro"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Andrés Ojanguren-Affilastro</h4>
                <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales, Buenos Aires, Argentina | AMNH Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2005 and 2007</p>
                <p className="text-gray-700">
                  Andrés' PhD research was a revision of the diverse South American bothriurid genus <em>Brachistosternus</em>. He visited the AMNH twice, the first time to extract, amplify and sequence DNA from bothriurid samples and a second time to continue his work on bothriurid systematics.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Alexander V. Gromov */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/gromov.jpg"
                  alt="Alexander V. Gromov"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Alexander V. Gromov</h4>
                <p className="text-sm text-gray-600 mb-1">Institute of Zoology, Almaty, Kazakhstan | Collections Study Grant and NSF BS&I Grant</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2007</p>
                <p className="text-gray-700">
                  Alex is interested in central Asian solifuges and is revising the family Karschiidae. He visited the AMNH to work on the solpugid collections as part of the Global Survey and Inventory of Solifugae.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Carsten Kamenz */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/carstenk.jpg"
                  alt="Carsten Kamenz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Carsten Kamenz</h4>
                <p className="text-sm text-gray-600 mb-1">Humboldt University, Berlin, Germany | Annette Kade Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">Student from 2005 to 2006</p>
                <p className="text-gray-700">
                  Carsten was a visiting student and a postdoc.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Valerio Vignoli */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/vignoli.jpg"
                  alt="Valerio Vignoli"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Valerio Vignoli</h4>
                <p className="text-sm text-gray-600 mb-1">University of Siena, Italy | Theodore Roosevelt Memorial Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2004 and 2006</p>
                <p className="text-gray-700">
                  Valerio revised the taxonomy, ecology and biogeography of <em>Euscorpius</em> for his PhD. He visited the AMNH twice to revise the North American scorpion family Typhlochactidae. He also participated in AMNH trips to Benin, Costa Rica, Morocco, Guinea-Bissau and Senegal.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Christian Wirkner */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/wirkner.jpg"
                  alt="Christian Wirkner"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Christian Wirkner</h4>
                <p className="text-sm text-gray-600 mb-1">Friedrich-Schiller University, Jena, Germany | Annette Kade Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2004</p>
                <p className="text-gray-700">
                  Christian studied the comparative morphology of arthropods from phylogenetic and evolutionary perspectives and, more specifically, organ evolution and transformation, first at Jena University before moving to Rostock University. He visited the AMNH to study the scorpion circulatory system.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Christina Bisulca */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/bisulca.jpg"
                  alt="Christina Bisulca"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Christina Bisulca</h4>
                <p className="text-sm text-gray-600 mb-1">University of Delaware, Newark, DE | Winterthur Art Conservation Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2003</p>
                <p className="text-gray-700">
                  Christina visited the AMNH during her MSc in Art Conservation at the University of Delaware, working with the Department of Natural Sciences Conservation. Bisulca surveyed the state of curation of the non-spider Arachnid and Myriapod Collection, resulting in upgrades to the glassware and closures housing the collection.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Amazonas Chagas, Jr. */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/chagas.jpg"
                  alt="Amazonas Chagas, Jr."
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Amazonas Chagas, Jr.</h4>
                <p className="text-sm text-gray-600 mb-1">Museu Nacional, Universidade Federal do Rio de Janeiro, Brazil</p>
                <p className="text-sm text-gray-500 mb-2">Postgraduate student in 2003</p>
                <p className="text-gray-700">
                  After his Masters, Amazonas visited the AMNH while in the USA to work at the North Carolina State Museum, Raleigh. At the AMNH, Amazonas studied scolopendromorph centipedes from around the world.
                </p>
            </PeopleCardBody>
          </PeopleCard>

          {/* Lionel Monod */}
          <PeopleCard containerClassName="mb-8 pb-8">
            <PeopleCardMedia>
                <PeopleImage
                  src="/images/lionel.jpg"
                  alt="Lionel Monod"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
            </PeopleCardMedia>
            <PeopleCardBody>
                <h4 className="text-base font-bold mb-1 text-gray-900">Lionel Monod</h4>
                <p className="text-sm text-gray-600 mb-1">University of Geneva, Switzerland</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2002</p>
                <p className="text-gray-700">
                  Lionel Monod was a visiting student and graduate student.
                </p>
            </PeopleCardBody>
          </PeopleCard>
          </div>
        </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
