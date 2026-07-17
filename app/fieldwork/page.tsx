import { getGallery } from "@/lib/content";
import { FieldworkClient } from "./FieldworkClient";

export default function FieldworkPage() {
  return <FieldworkClient gallery={getGallery("fieldwork")} />;
}
