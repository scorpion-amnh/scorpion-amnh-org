import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const clientPath = path.join(ROOT, "app/people/PeopleClient.tsx");
const sectionsDir = path.join(ROOT, "app/people/sections");
const lines = readFileSync(clientPath, "utf8").split("\n");

type SectionConfig = {
  id: string;
  component: string;
  startLine: number;
  endLine: number;
  hasTabs: boolean;
  tabVar?: string;
};

const sections: SectionConfig[] = [
  { id: "lab-evolution", component: "LabEvolutionSection", startLine: 87, endLine: 96, hasTabs: false },
  {
    id: "principal-investigator",
    component: "PrincipalInvestigatorSection",
    startLine: 100,
    endLine: 275,
    hasTabs: false,
  },
  {
    id: "museum-specialists",
    component: "MuseumSpecialistsSection",
    startLine: 279,
    endLine: 440,
    hasTabs: true,
    tabVar: "museumTab",
  },
  {
    id: "technical-staff",
    component: "TechnicalStaffSection",
    startLine: 443,
    endLine: 565,
    hasTabs: true,
    tabVar: "technicalStaffTab",
  },
  {
    id: "research-affiliates",
    component: "ResearchAffiliatesSection",
    startLine: 568,
    endLine: 657,
    hasTabs: true,
    tabVar: "researchAffiliatesTab",
  },
  { id: "postdocs", component: "PostdocsSection", startLine: 660, endLine: 916, hasTabs: true, tabVar: "postdocsTab" },
  {
    id: "graduate-students",
    component: "GraduateStudentsSection",
    startLine: 919,
    endLine: 1151,
    hasTabs: true,
    tabVar: "graduateStudentsTab",
  },
  {
    id: "undergraduate-students",
    component: "UndergraduateStudentsSection",
    startLine: 1154,
    endLine: 1293,
    hasTabs: true,
    tabVar: "undergraduateStudentsTab",
  },
  {
    id: "high-school-students",
    component: "HighSchoolStudentsSection",
    startLine: 1296,
    endLine: 1909,
    hasTabs: true,
    tabVar: "highSchoolStudentsTab",
  },
  {
    id: "volunteers",
    component: "VolunteersSection",
    startLine: 1912,
    endLine: 2768,
    hasTabs: true,
    tabVar: "volunteersTab",
  },
  {
    id: "visiting-students",
    component: "VisitingStudentsSection",
    startLine: 2771,
    endLine: 3936,
    hasTabs: true,
    tabVar: "visitingStudentsTab",
  },
];

const commonImports = `import { MarkdownContent } from "@/app/components/MarkdownContent";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleGroupSection } from "@/app/people/PeopleGroupSection";
import { PeopleImage } from "@/app/people/PeopleImage";
import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";
`;

mkdirSync(sectionsDir, { recursive: true });

for (const section of sections) {
  let body = lines.slice(section.startLine - 1, section.endLine).join("\n");

  body = body.replace(
    new RegExp(`activeSection === '${section.id}' \\? 'block' : 'hidden'`, "g"),
    "isActive ? 'block' : 'hidden'"
  );

  if (section.hasTabs && section.tabVar) {
    body = body.replace(new RegExp(`\\b${section.tabVar}\\b`, "g"), "tab");
    body = body.replace(
      new RegExp(`setTabForSection\\('${section.id}', value\\)`, "g"),
      "onTabChange(value)"
    );
  }

  const propsType =
    section.id === "lab-evolution"
      ? "LabEvolutionSectionProps"
      : section.hasTabs
        ? "TabbedPeopleSectionProps"
        : "PeopleSectionProps";

  const propsDestruct =
    section.id === "lab-evolution"
      ? "{ isActive, labHistorySections }"
      : section.hasTabs
        ? "{ isActive, tab, onTabChange }"
        : "{ isActive }";

  const typeImport =
    section.id === "lab-evolution"
      ? `import type { LabEvolutionSectionProps } from "@/app/people/sections/types";\n`
      : section.hasTabs
        ? `import type { TabbedPeopleSectionProps } from "@/app/people/sections/types";\n`
        : `import type { PeopleSectionProps } from "@/app/people/sections/types";\n`;

  const wrapperOpen = `<div data-section="${section.id}" className={isActive ? 'block' : 'hidden'}>`;
  const fileContent = `'use client';

${commonImports}${typeImport}
export function ${section.component}(${propsDestruct}: ${propsType}) {
  return (
    ${wrapperOpen}
${body}
    </div>
  );
}
`;

  writeFileSync(path.join(sectionsDir, `${section.component}.tsx`), fileContent);
}

console.log(`Created ${sections.length} section files in app/people/sections/`);
