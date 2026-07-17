import type {
  GalleryImage,
  LabHistoryEntry,
  Person,
  Publication,
  SiteSettings,
} from "./schema";

export type ContentSource = {
  getPeople: () => Person[];
  getPeopleSectionOrder: (sectionId: string) => string[];
  getPublications: () => Publication[];
  getGallery: (category: string) => GalleryImage[];
  getLabHistory: () => LabHistoryEntry[];
  getSiteSettings: () => SiteSettings;
};

export type ContentSourceName = "local" | "cms";
