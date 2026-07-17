import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const SECTIONS_DIR = join(process.cwd(), "app/people/sections");

const srcReplacements: Record<string, string> = {
  "/images/Pio.jpg": "/images/people/Pio-Colmenares.jpg",
  "/images/prendini.jpg": "/images/people/Lorenzo-Prendini.jpg",
  "/images/Jairo.jpg": "/images/people/Jairo-A-Moreno-Gonzalez.jpg",
  "/images/Ricardo.jpg": "/images/people/Ricardo-Botero-Trujillo.jpg",
  "/images/ric.jpg": "/images/people/Ricardo-Botero-Trujillo.jpg",
  "/images/victoria.jpg": "/images/people/Victoria-Long.jpg",
  "/images/Eleanor1_blmjit.jpg": "/images/people/Eleanor-Goetz.jpg",
};

const revertToPlaceholder: Array<{ alt: string; wrongSrc: string }> = [
  { alt: "Adrian Armstrong", wrongSrc: "/images/arachnids/Tityus_adrianoi_female_2.JPG" },
  { alt: "Miguel Garcia", wrongSrc: "/images/people/Miguel-Medrano.jpg" },
  { alt: "Rebecca Godwin", wrongSrc: "/images/people/Rebecca-Budinoff.jpg" },
  { alt: "Roberta Engel", wrongSrc: "/images/people/Ian-Engelbrecht.jpg" },
  { alt: "Simon Au", wrongSrc: "/images/people/Simone-Longe.jpg" },
  { alt: "Asel Zhetigenova", wrongSrc: "/images/people/Diogo-Casellato.jpg" },
  { alt: "Howard Bichard", wrongSrc: "/images/people/Howard-W-Fiedler.jpg" },
  { alt: "Warren Schmidt", wrongSrc: "/images/people/Warren-Savary.jpg" },
];

for (const file of readdirSync(SECTIONS_DIR).filter((name) => name.endsWith("Section.tsx"))) {
  const filePath = join(SECTIONS_DIR, file);
  let content = readFileSync(filePath, "utf8");

  for (const [from, to] of Object.entries(srcReplacements)) {
    content = content.split(from).join(to);
  }

  for (const { alt, wrongSrc } of revertToPlaceholder) {
    const pattern = new RegExp(
      `<PeopleImage\\s+src="${wrongSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+alt="${alt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?/>`,
      "g"
    );
    content = content.replace(pattern, `<PhotoPlaceholder name="${alt}" />`);
  }

  if (content.includes("<PhotoPlaceholder") && !content.includes("PhotoPlaceholder from")) {
    if (!content.includes('import { PhotoPlaceholder }')) {
      content = content.replace(
        "'use client';\n\n",
        "'use client';\n\nimport { PhotoPlaceholder } from \"@/app/components/PhotoPlaceholder\";\n"
      );
    }
  }

  writeFileSync(filePath, content);
}

console.log("Applied manual people image corrections.");
