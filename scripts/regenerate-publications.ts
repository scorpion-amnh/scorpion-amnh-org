import { promises as fs } from "fs";
import path from "path";
import { parsePublications } from "./parse-publications";
import { syncPublicationDetails } from "./generate-publication-details";

const main = async () => {
  const publications = await parsePublications();
  const outputPath = path.join(process.cwd(), "content/publications.json");
  await fs.writeFile(outputPath, `${JSON.stringify(publications, null, 2)}\n`, "utf8");
  console.log(`Wrote ${publications.length} publications to ${outputPath}`);

  const syncResult = await syncPublicationDetails();
  if (syncResult.generated > 0) {
    console.log(`Added ${syncResult.generated} publication detail entries.`);
  } else {
    console.log("Publication details are up to date.");
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
