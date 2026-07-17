import type { Person } from "@/lib/content/schema";

export const getPersonImagePath = (image: Person["image"]) => {
  if (!image) {
    return null;
  }
  return `/images/${image.folder}/${image.filename}`;
};
