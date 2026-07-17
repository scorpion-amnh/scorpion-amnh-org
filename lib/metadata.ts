import type { Metadata } from "next";

export const createPageMetadata = (title: string, description: string): Metadata => ({
  title,
  description,
});
