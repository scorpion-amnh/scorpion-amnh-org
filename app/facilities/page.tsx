import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { FacilitiesClient } from "./FacilitiesClient";

export const metadata: Metadata = createPageMetadata(
  "Facilities | Arachnology at AMNH",
  "Research facilities available to the Arachnology Lab at the American Museum of Natural History."
);

export default function FacilitiesPage() {
  return <FacilitiesClient />;
}
