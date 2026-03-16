export type PeopleSection = {
  id: string;
  label: string;
};

export const peopleSections: PeopleSection[] = [
  { id: 'lab-evolution', label: 'Lab Evolution' },
  { id: 'principal-investigator', label: 'Principal Investigator' },
  { id: 'museum-specialists', label: 'Museum Specialists' },
  { id: 'technical-staff', label: 'Technical Staff' },
  { id: 'research-affiliates', label: 'Research Affiliates' },
  { id: 'postdocs', label: 'Postdocs' },
  { id: 'graduate-students', label: 'Graduate Students' },
  { id: 'undergraduate-students', label: 'Undergraduate Students' },
  { id: 'high-school-students', label: 'High School Students' },
  { id: 'volunteers', label: 'Volunteers' },
  { id: 'visiting-students', label: 'Visitors' },
];