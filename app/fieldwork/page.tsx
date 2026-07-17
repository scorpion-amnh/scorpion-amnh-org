import type { Metadata } from "next";
import { getGallery } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { FieldworkClient } from "./FieldworkClient";

export const metadata: Metadata = createPageMetadata(
  "Fieldwork | Arachnology at AMNH",
  "Fieldwork photographs from the Scorpion Systematics Research Group."
);

export default function FieldworkPage() {
  return <FieldworkClient gallery={getGallery("fieldwork")} />;
}
