import type { Metadata } from "next";
import { getGallery } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { ArachnidsClient } from "./ArachnidsClient";

export const metadata: Metadata = createPageMetadata(
  "Arachnids | Arachnology at AMNH",
  "Overview of arachnid diversity, ecology, and conservation."
);

export default function ArachnidsPage() {
  return <ArachnidsClient gallery={getGallery("arachnids")} />;
}
