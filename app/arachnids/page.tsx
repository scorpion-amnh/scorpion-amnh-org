import { getGallery } from "@/lib/content";
import { ArachnidsClient } from "./ArachnidsClient";

export default function ArachnidsPage() {
  return <ArachnidsClient gallery={getGallery("arachnids")} />;
}
