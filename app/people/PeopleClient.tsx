'use client';

import { SideNav } from "@/app/components/SideNav";
import { BackToTop } from "@/app/components/BackToTop";
import type { PeopleGroupCardProps } from "@/app/people/PeopleGroupCard";
import { PeopleSearch } from "@/app/people/PeopleSearch";
import { GraduateStudentsSection } from "@/app/people/sections/GraduateStudentsSection";
import { HighSchoolStudentsSection } from "@/app/people/sections/HighSchoolStudentsSection";
import { LabEvolutionSection } from "@/app/people/sections/LabEvolutionSection";
import { MuseumSpecialistsSection } from "@/app/people/sections/MuseumSpecialistsSection";
import { PostdocsSection } from "@/app/people/sections/PostdocsSection";
import { PrincipalInvestigatorSection } from "@/app/people/sections/PrincipalInvestigatorSection";
import { ResearchAffiliatesSection } from "@/app/people/sections/ResearchAffiliatesSection";
import { TechnicalStaffSection } from "@/app/people/sections/TechnicalStaffSection";
import { UndergraduateStudentsSection } from "@/app/people/sections/UndergraduateStudentsSection";
import { VisitingStudentsSection } from "@/app/people/sections/VisitingStudentsSection";
import { VolunteersSection } from "@/app/people/sections/VolunteersSection";
import { peopleSections } from "@/app/people/sections";
import { usePeopleNavigation } from "@/app/people/usePeopleNavigation";
import type { Person } from "@/lib/content/schema";

type PeopleClientProps = {
  labHistorySections: {
    year?: string;
    subtitle?: string;
    cards: [PeopleGroupCardProps, ...PeopleGroupCardProps[]];
  }[];
  people: Person[];
  undergraduateStudentsOrder: string[];
};

export function PeopleClient({
  labHistorySections,
  people,
  undergraduateStudentsOrder,
}: PeopleClientProps) {
  const {
    activeSection,
    contentRef,
    filteredResults,
    handlePersonSelect,
    handleSectionSelect,
    isNavigationReady,
    isSearchOpen,
    searchContainerRef,
    searchQuery,
    sectionTabs,
    setIsSearchOpen,
    setSearchQuery,
    setTabForSection,
    sideNavRef,
  } = usePeopleNavigation(peopleSections, people);

  const undergraduateStudents = people.filter(
    (person) => person.sectionId === "undergraduate-students"
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-bold mb-8">People</h1>

        <p className="text-lead mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 relative">
          <div
            ref={sideNavRef}
            className="lg:col-span-1 sticky top-[var(--header-height)] lg:top-[calc(var(--header-height)+var(--section-scroll-gap))] z-40 bg-white self-start"
          >
            <SideNav
              sections={peopleSections}
              activeSection={isNavigationReady ? activeSection : ""}
              onSelect={handleSectionSelect}
            />
          </div>

          <div ref={contentRef} className="md:col-span-3 section-content">
            <LabEvolutionSection
              isActive={isNavigationReady && activeSection === "lab-evolution"}
              labHistorySections={labHistorySections}
            />
            <PrincipalInvestigatorSection
              isActive={isNavigationReady && activeSection === "principal-investigator"}
            />
            <MuseumSpecialistsSection
              isActive={isNavigationReady && activeSection === "museum-specialists"}
              tab={sectionTabs["museum-specialists"]}
              onTabChange={(value) => setTabForSection("museum-specialists", value)}
            />
            <TechnicalStaffSection
              isActive={isNavigationReady && activeSection === "technical-staff"}
              tab={sectionTabs["technical-staff"]}
              onTabChange={(value) => setTabForSection("technical-staff", value)}
            />
            <ResearchAffiliatesSection
              isActive={isNavigationReady && activeSection === "research-affiliates"}
              tab={sectionTabs["research-affiliates"]}
              onTabChange={(value) => setTabForSection("research-affiliates", value)}
            />
            <PostdocsSection
              isActive={isNavigationReady && activeSection === "postdocs"}
              tab={sectionTabs.postdocs}
              onTabChange={(value) => setTabForSection("postdocs", value)}
            />
            <GraduateStudentsSection
              isActive={isNavigationReady && activeSection === "graduate-students"}
              tab={sectionTabs["graduate-students"]}
              onTabChange={(value) => setTabForSection("graduate-students", value)}
            />
            <UndergraduateStudentsSection
              isActive={isNavigationReady && activeSection === "undergraduate-students"}
              tab={sectionTabs["undergraduate-students"]}
              onTabChange={(value) => setTabForSection("undergraduate-students", value)}
              people={undergraduateStudents}
              sectionOrder={undergraduateStudentsOrder}
            />
            <HighSchoolStudentsSection
              isActive={isNavigationReady && activeSection === "high-school-students"}
              tab={sectionTabs["high-school-students"]}
              onTabChange={(value) => setTabForSection("high-school-students", value)}
            />
            <VolunteersSection
              isActive={isNavigationReady && activeSection === "volunteers"}
              tab={sectionTabs.volunteers}
              onTabChange={(value) => setTabForSection("volunteers", value)}
            />
            <VisitingStudentsSection
              isActive={isNavigationReady && activeSection === "visiting-students"}
              tab={sectionTabs["visiting-students"]}
              onTabChange={(value) => setTabForSection("visiting-students", value)}
            />
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
