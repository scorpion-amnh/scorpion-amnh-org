export const COLLECTIONS_SECTION_IDS = [
  "general-information",
  "specimens",
  "tissue-samples",
] as const;

export type CollectionsSectionId = (typeof COLLECTIONS_SECTION_IDS)[number];

export const DEFAULT_COLLECTIONS_SECTION: CollectionsSectionId = "general-information";

export const isCollectionsSectionId = (value: string): value is CollectionsSectionId =>
  COLLECTIONS_SECTION_IDS.includes(value as CollectionsSectionId);

export const readCollectionsSectionFromUrl = (): CollectionsSectionId => {
  const section = new URLSearchParams(window.location.search).get("section");
  return section && isCollectionsSectionId(section) ? section : DEFAULT_COLLECTIONS_SECTION;
};

export const pushCollectionsPageUrl = (section: CollectionsSectionId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  url.hash = "";
  window.history.pushState(null, "", url);
};
