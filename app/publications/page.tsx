import { getPublications } from "@/lib/content";
import { PublicationsClient } from "./PublicationsClient";

export default function PublicationsPage() {
  return <PublicationsClient publications={getPublications()} />;
}
