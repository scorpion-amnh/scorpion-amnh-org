export const FACILITIES_SECTION_IDS = ["arachnology-facilities", "associated-amnh-facilities"] as const;

export type FacilitiesSectionId = (typeof FACILITIES_SECTION_IDS)[number];

export const DEFAULT_FACILITIES_SECTION: FacilitiesSectionId = "arachnology-facilities";

const LEGACY_FACILITIES_SECTION_IDS = [
  "scorpion-research-laboratory",
  "research-laboratory-facilities",
] as const;

export const isFacilitiesSectionId = (value: string): value is FacilitiesSectionId =>
  FACILITIES_SECTION_IDS.includes(value as FacilitiesSectionId);

export const readFacilitiesSectionFromUrl = (): FacilitiesSectionId => {
  const section = new URLSearchParams(window.location.search).get("section");

  if (section && isFacilitiesSectionId(section)) {
    return section;
  }

  if (
    section &&
    LEGACY_FACILITIES_SECTION_IDS.includes(section as (typeof LEGACY_FACILITIES_SECTION_IDS)[number])
  ) {
    return "arachnology-facilities";
  }

  return DEFAULT_FACILITIES_SECTION;
};

export const pushFacilitiesPageUrl = (section: FacilitiesSectionId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  url.hash = "";
  window.history.pushState(null, "", url);
};
