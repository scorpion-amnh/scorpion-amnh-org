import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { ResearchClient } from "./ResearchClient";

export const metadata: Metadata = createPageMetadata(
  "Research | Arachnology at AMNH",
  "Research areas of the Scorpion Systematics Research Group at the American Museum of Natural History."
);

export default function ResearchPage() {
  return <ResearchClient />;
}
