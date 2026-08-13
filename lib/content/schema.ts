import { z } from "zod";

export const personImageSchema = z.object({
  folder: z.string().min(1),
  filename: z.string().min(1),
});

export const personLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
});

export const personTitleEntrySchema = z.object({
  title: z.string().min(1),
  label: z.string().min(1),
  url: z.string().optional(),
});

export const personSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sectionId: z.string().min(1),
  tab: z.enum(["current", "alumni"]),
  affiliation: z.string().optional(),
  title: z
    .union([
      z.string(),
      z.array(z.string()),
      z.array(personTitleEntrySchema),
    ])
    .optional(),
  years: z.string().optional(),
  image: personImageSchema.nullable(),
  bio: z.string().nullable().optional(),
  contact: z.string().optional(),
  links: z.array(personLinkSchema).optional(),
});

export const publicationAuthorSchema = z.object({
  name: z.string().min(1),
  isHighlighted: z.boolean(),
});

export const publicationSchema = z.object({
  year: z.number().int(),
  authors: z.array(publicationAuthorSchema).min(1),
  title: z.string().min(1),
  journal: z.string(),
  volume: z.string().nullable(),
  pages: z.string().nullable(),
  doi: z.string().nullable(),
  pdf: z.string().nullable().optional(),
  citationHtml: z.string().min(1).optional(),
});

export const galleryImageSchema = z.object({
  src: z.string().startsWith("/images/"),
  alt: z.string().min(1),
  orientation: z.enum(["portrait", "landscape"]).optional(),
});

export const peopleGroupCardSchema = z.object({
  src: z.string().startsWith("/images/"),
  alt: z.string().min(1),
  caption: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const labHistorySectionSchema = z.object({
  year: z.string().min(1),
  subtitle: z.string().min(1),
  cardIndex: z.number().int().nonnegative(),
});

export const labHistoryFileSchema = z.object({
  cards: z.array(peopleGroupCardSchema).min(1),
  sections: z.array(labHistorySectionSchema).min(1),
});

export const labHistoryEntrySchema = z.object({
  year: z.string().min(1),
  subtitle: z.string().min(1),
  cards: z.array(peopleGroupCardSchema).min(1),
});

export const pageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  body: z.string().optional(),
});

export const navItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const siteSettingsSchema = z.object({
  navItems: z.array(navItemSchema).min(1),
  footerCopyright: z.string().min(1),
  footerLogo: z.string().startsWith("/images/"),
  defaultMetaTitle: z.string().min(1),
  defaultMetaDescription: z.string().min(1),
});

export type PersonImage = z.infer<typeof personImageSchema>;
export type Person = z.infer<typeof personSchema>;
export type PublicationAuthor = z.infer<typeof publicationAuthorSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type PeopleGroupCard = z.infer<typeof peopleGroupCardSchema>;
export type LabHistoryEntry = z.infer<typeof labHistoryEntrySchema>;
export type Page = z.infer<typeof pageSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
