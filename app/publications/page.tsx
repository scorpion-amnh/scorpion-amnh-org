import type { Metadata } from "next";
import { getPeople, getPublications } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { buildAuthorProfileLookup } from "@/lib/publications/authorProfiles";
import { PublicationsClient } from "./PublicationsClient";

export const metadata: Metadata = createPageMetadata(
  "Publications | Arachnology at AMNH",
  "Publications from the Scorpion Systematics Research Group."
);

export default function PublicationsPage() {
  return (
    <PublicationsClient
      publications={getPublications()}
      authorProfileLookup={buildAuthorProfileLookup(getPeople())}
    />
  );
}
