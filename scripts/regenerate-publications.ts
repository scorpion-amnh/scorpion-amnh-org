import { promises as fs } from "fs";
import path from "path";
import { parsePublications } from "./parse-publications";

const main = async () => {
  const publications = await parsePublications();
  const outputPath = path.join(process.cwd(), "content/publications.json");
  await fs.writeFile(outputPath, `${JSON.stringify(publications, null, 2)}\n`, "utf8");
  console.log(`Wrote ${publications.length} publications to ${outputPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
