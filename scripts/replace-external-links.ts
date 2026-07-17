import { readFileSync, writeFileSync } from "fs";

const files = [
  "app/research/page.tsx",
  "app/facilities/page.tsx",
  "app/collections/page.tsx",
];

const externalAnchor =
  /<a href="(https?:\/\/[^"]+)" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">([\s\S]*?)<\/a>/g;

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const hadExternal = externalAnchor.test(content);
  content = readFileSync(file, "utf8").replace(
    externalAnchor,
    '<ExternalLink href="$1">$2</ExternalLink>'
  );

  if (content.includes("ExternalLink") && !content.includes('@/app/components/ExternalLink"')) {
    if (content.startsWith("'use client'")) {
      content = content.replace(
        "'use client';\n\n",
        "'use client';\n\nimport { ExternalLink } from \"@/app/components/ExternalLink\";\n"
      );
    } else {
      content = `import { ExternalLink } from "@/app/components/ExternalLink";\n${content.replace(/^import /m, "import ")}`;
      if (!content.includes('import { ExternalLink }')) {
        content = `import { ExternalLink } from "@/app/components/ExternalLink";\n${content}`;
      }
    }
  }

  writeFileSync(file, content);
  console.log(file, hadExternal ? "updated" : "unchanged");
}
