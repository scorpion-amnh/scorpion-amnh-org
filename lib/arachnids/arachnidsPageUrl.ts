export const ARACHNIDS_SECTION_IDS = [
  "diversity",
  "antiquity",
  "notoriety",
  "distribution",
  "ecology",
  "life-history",
  "conservation",
  "dwindling-expertise",
  "model-system",
] as const;

export type ArachnidsSectionId = (typeof ARACHNIDS_SECTION_IDS)[number];

export const DEFAULT_ARACHNIDS_SECTION: ArachnidsSectionId = "diversity";

export const isArachnidsSectionId = (value: string): value is ArachnidsSectionId =>
  ARACHNIDS_SECTION_IDS.includes(value as ArachnidsSectionId);

export const readArachnidsSectionFromUrl = (): ArachnidsSectionId => {
  const section = new URLSearchParams(window.location.search).get("section");
  return section && isArachnidsSectionId(section) ? section : DEFAULT_ARACHNIDS_SECTION;
};

export const pushArachnidsPageUrl = (section: ArachnidsSectionId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  url.hash = "";
  window.history.pushState(null, "", url);
};

export const ARACHNIDS_SECTION_LABELS: Record<ArachnidsSectionId, string> = {
  diversity: "Diversity",
  antiquity: "Antiquity",
  notoriety: "Notoriety",
  distribution: "Distribution",
  ecology: "Ecology",
  "life-history": "Life History",
  conservation: "Conservation",
  "dwindling-expertise": "Dwindling Expertise",
  "model-system": "Model System",
};
