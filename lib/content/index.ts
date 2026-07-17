import { promises as fs } from "fs";
import path from "path";
import { getContentSource } from "./getContentSource";
import { getPersonImagePath } from "@/lib/people/personImage";

export { getContentSource, getContentSourceName } from "./getContentSource";
export type { ContentSource, ContentSourceName } from "./types";

export type {
  GalleryImage,
  LabHistoryEntry,
  Person,
  Publication,
  SiteSettings,
} from "./schema";

export { getPersonImagePath };

export const getPeople = () => getContentSource().getPeople();

export const getPeopleSectionOrder = (sectionId: string) =>
  getContentSource().getPeopleSectionOrder(sectionId);

export const getPublications = () => getContentSource().getPublications();

export const getGallery = (category: string) => getContentSource().getGallery(category);

export const getLabHistory = () => getContentSource().getLabHistory();

export const getSiteSettings = () => getContentSource().getSiteSettings();

export const resolvePublicImagePath = (src: string) => {
  if (!src.startsWith("/")) {
    return path.join(process.cwd(), "public", src);
  }
  return path.join(process.cwd(), "public", src.slice(1));
};

export const imagePathExists = async (src: string) => {
  try {
    await fs.access(resolvePublicImagePath(src));
    return true;
  } catch {
    return false;
  }
};
