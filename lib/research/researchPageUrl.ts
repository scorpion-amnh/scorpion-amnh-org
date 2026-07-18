export const RESEARCH_SECTION_IDS = ["research-areas", "funding"] as const;

export type ResearchSectionId = (typeof RESEARCH_SECTION_IDS)[number];

export const DEFAULT_RESEARCH_SECTION: ResearchSectionId = "research-areas";

const LEGACY_RESEARCH_SECTION_IDS = [
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
] as const;

export const isResearchSectionId = (value: string): value is ResearchSectionId =>
  RESEARCH_SECTION_IDS.includes(value as ResearchSectionId);

export const readResearchSectionFromUrl = (): ResearchSectionId => {
  const section = new URLSearchParams(window.location.search).get("section");

  if (section && isResearchSectionId(section)) {
    return section;
  }

  if (
    section &&
    LEGACY_RESEARCH_SECTION_IDS.includes(section as (typeof LEGACY_RESEARCH_SECTION_IDS)[number])
  ) {
    return "research-areas";
  }

  return DEFAULT_RESEARCH_SECTION;
};

export const pushResearchPageUrl = (section: ResearchSectionId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  url.hash = "";
  window.history.pushState(null, "", url);
};

export const RESEARCH_SECTION_LABELS: Record<ResearchSectionId, string> = {
  "research-areas": "Research Areas",
  funding: "Funding",
};
