import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { CollectionsSections } from "./CollectionsSections";

export const metadata: Metadata = createPageMetadata(
  "Collections | Arachnology at AMNH",
  "Arachnid and Myriapod collections at the American Museum of Natural History."
);

export default function CollectionsPage() {
  return <CollectionsSections />;
}
