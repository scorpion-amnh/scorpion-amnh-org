import { readFileSync, readdirSync } from "fs";
import path from "path";
import { z } from "zod";
import {
  galleryImageSchema,
  labHistoryFileSchema,
  personSchema,
  publicationSchema,
  siteSettingsSchema,
  type GalleryImage,
  type LabHistoryEntry,
  type Person,
  type Publication,
  type SiteSettings,
} from "./schema";
import type { ContentSource } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const readJsonFile = <T>(filePath: string): T => {
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
};

const formatValidationError = (label: string, error: unknown) => {
  if (error instanceof Error) {
    return `${label}: ${error.message}`;
  }
  return `${label}: Unknown validation error`;
};

const peopleSectionOrderSchema = z.record(z.string(), z.array(z.string().min(1)));

export const localAdapter: ContentSource = {
  getPeople(): Person[] {
    const peopleDir = path.join(CONTENT_DIR, "people");
    const files = readdirSync(peopleDir)
      .filter((file) => file.endsWith(".json") && file !== "section-order.json")
      .sort((a, b) => a.localeCompare(b));

    return files.map((file) => {
      const filePath = path.join(peopleDir, file);
      const parsed = readJsonFile<unknown>(filePath);
      const result = personSchema.safeParse(parsed);
      if (!result.success) {
        throw new Error(formatValidationError(`content/people/${file}`, result.error));
      }
      return result.data;
    });
  },

  getPeopleSectionOrder(sectionId: string): string[] {
    const filePath = path.join(CONTENT_DIR, "people", "section-order.json");
    const parsed = readJsonFile<unknown>(filePath);
    const result = peopleSectionOrderSchema.safeParse(parsed);
    if (!result.success) {
      throw new Error(formatValidationError("content/people/section-order.json", result.error));
    }

    return result.data[sectionId] ?? [];
  },

  getPublications(): Publication[] {
    const filePath = path.join(CONTENT_DIR, "publications.json");
    const parsed = readJsonFile<unknown>(filePath);
    const result = z.array(publicationSchema).safeParse(parsed);
    if (!result.success) {
      throw new Error(formatValidationError("content/publications.json", result.error));
    }

    return [...result.data].sort((a, b) => b.year - a.year);
  },

  getGallery(category: string): GalleryImage[] {
    const filePath = path.join(CONTENT_DIR, "gallery", `${category}.json`);
    const parsed = readJsonFile<unknown>(filePath);
    const result = z.array(galleryImageSchema).safeParse(parsed);
    if (!result.success) {
      throw new Error(formatValidationError(`content/gallery/${category}.json`, result.error));
    }
    return result.data;
  },

  getLabHistory(): LabHistoryEntry[] {
    const filePath = path.join(CONTENT_DIR, "lab-history.json");
    const parsed = readJsonFile<unknown>(filePath);
    const result = labHistoryFileSchema.safeParse(parsed);
    if (!result.success) {
      throw new Error(formatValidationError("content/lab-history.json", result.error));
    }

    return result.data.sections.map((section) => {
      const card = result.data.cards[section.cardIndex];
      if (!card) {
        throw new Error(
          `content/lab-history.json: section "${section.year}" references missing card index ${section.cardIndex}`
        );
      }

      return {
        year: section.year,
        subtitle: section.subtitle,
        cards: [card],
      };
    });
  },

  getSiteSettings(): SiteSettings {
    const filePath = path.join(CONTENT_DIR, "site.json");
    const parsed = readJsonFile<unknown>(filePath);
    const result = siteSettingsSchema.safeParse(parsed);
    if (!result.success) {
      throw new Error(formatValidationError("content/site.json", result.error));
    }
    return result.data;
  },
};
