export const RESEARCH_SECTION_IDS = [
  "scorpion-phylogeny-and-higher-classification",
  "minor-arachnid-orders",
  "revisionary-systematics",
  "adaptational-and-biogeographical-hypotheses",
  "comparative-morphology-and-anatomy",
  "distribution-and-conservation",
  "behavior",
  "paleontology",
  "theory-and-practice-of-systematics",
  "insect-plant-associations",
  "funding",
] as const;

export type ResearchSectionId = (typeof RESEARCH_SECTION_IDS)[number];

export const DEFAULT_RESEARCH_SECTION: ResearchSectionId = "scorpion-phylogeny-and-higher-classification";

export const isResearchSectionId = (value: string): value is ResearchSectionId =>
  RESEARCH_SECTION_IDS.includes(value as ResearchSectionId);

export const readResearchSectionFromUrl = (): ResearchSectionId => {
  const section = new URLSearchParams(window.location.search).get("section");
  return section && isResearchSectionId(section) ? section : DEFAULT_RESEARCH_SECTION;
};

export const pushResearchPageUrl = (section: ResearchSectionId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  url.hash = "";
  window.history.pushState(null, "", url);
};

export const RESEARCH_SECTION_LABELS: Record<ResearchSectionId, string> = {
  "scorpion-phylogeny-and-higher-classification": "Scorpion Phylogeny and Higher Classification",
  "minor-arachnid-orders": "Minor Arachnid Orders",
  "revisionary-systematics": "Revisionary Systematics",
  "adaptational-and-biogeographical-hypotheses": "Adaptational and Biogeographical Hypotheses",
  "comparative-morphology-and-anatomy": "Comparative Morphology and Anatomy",
  "distribution-and-conservation": "Distribution and Conservation",
  behavior: "Behavior",
  paleontology: "Paleontology",
  "theory-and-practice-of-systematics": "Theory and Practice of Systematics",
  "insect-plant-associations": "Insect-Plant Associations",
  funding: "Funding",
};
