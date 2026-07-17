import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

const sectionsDir = path.join(process.cwd(), "app/people/sections");
const files = readdirSync(sectionsDir).filter((file) => file.endsWith("Section.tsx"));

for (const file of files) {
  const filePath = path.join(sectionsDir, file);
  const content = readFileSync(filePath, "utf8");
  const typeImport = content.match(/^import type[^\n]+\n/m)?.[0] ?? "";
  const functionPart = content.replace(/^'use client';\n\n[\s\S]*?\n\n(?=export function)/, "");

  const neededImports: string[] = [];
  if (functionPart.includes("MarkdownContent")) {
    neededImports.push('import { MarkdownContent } from "@/app/components/MarkdownContent";');
  }
  if (functionPart.includes("PhotoPlaceholder")) {
    neededImports.push('import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";');
  }
  if (functionPart.includes("PeopleCard")) {
    neededImports.push('import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";');
  }
  if (functionPart.includes("PeopleGroupSection")) {
    neededImports.push('import { PeopleGroupSection } from "@/app/people/PeopleGroupSection";');
  }
  if (functionPart.includes("PeopleImage")) {
    neededImports.push('import { PeopleImage } from "@/app/people/PeopleImage";');
  }
  if (functionPart.includes("PeopleSectionTabs")) {
    neededImports.push('import { PeopleSectionTabs } from "@/app/people/PeopleSectionTabs";');
  }
  if (functionPart.includes("ProfileLinksList")) {
    neededImports.push('import { ProfileLinksList } from "@/app/people/ProfileLinksList";');
  }

  const updated = `'use client';\n\n${neededImports.join("\n")}${neededImports.length ? "\n" : ""}${typeImport}${functionPart}`;
  writeFileSync(filePath, updated);
  console.log("fixed", file);
}
