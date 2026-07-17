import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const externalAnchor =
  /<a\s+href="(https?:\/\/[^"]+)"\s+target="_blank"\s+rel="noopener noreferrer"\s+className="text-blue-600 hover:text-blue-800 underline"\s*>([\s\S]*?)<\/a>/g;

const sectionsDir = join("app", "people", "sections");
const files = readdirSync(sectionsDir)
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => join(sectionsDir, name));

for (const file of files) {
  const original = readFileSync(file, "utf8");
  const updated = original.replace(
    externalAnchor,
    '<ExternalLink href="$1">$2</ExternalLink>'
  );

  if (updated === original) {
    console.log(file, "unchanged");
    continue;
  }

  let content = updated;
  if (!content.includes('from "@/app/components/ExternalLink"')) {
    content = content.replace(
      "'use client';\n\n",
      "'use client';\n\nimport { ExternalLink } from \"@/app/components/ExternalLink\";\n"
    );
  }

  writeFileSync(file, content);
  console.log(file, "updated");
}
