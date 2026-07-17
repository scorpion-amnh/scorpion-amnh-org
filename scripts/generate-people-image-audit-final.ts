import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const SECTIONS_DIR = join(ROOT, "app/people/sections");
const ORIGINAL_AUDIT = join(ROOT, "references/people-image-audit.json");
const FINAL_AUDIT = join(ROOT, "references/people-image-audit-final.json");

type FinalEntry = {
  file: string;
  person: string;
  original: string;
  resolved: string;
  method: "auto-audit" | "manual-src" | "reverted-false-positive";
  notes?: string;
};

const manualSrc: Record<string, string> = {
  "/images/Pio.jpg": "/images/people/Pio-Colmenares.jpg",
  "/images/prendini.jpg": "/images/people/Lorenzo-Prendini.jpg",
  "/images/Jairo.jpg": "/images/people/Jairo-A-Moreno-Gonzalez.jpg",
  "/images/Ricardo.jpg": "/images/people/Ricardo-Botero-Trujillo.jpg",
  "/images/ric.jpg": "/images/people/Ricardo-Botero-Trujillo.jpg",
  "/images/victoria.jpg": "/images/people/Victoria-Long.jpg",
  "/images/Eleanor1_blmjit.jpg": "/images/people/Eleanor-Goetz.jpg",
};

const reverted = new Set([
  "Adrian Armstrong|/images/arachnids/Tityus_adrianoi_female_2.JPG",
  "Miguel Garcia|/images/people/Miguel-Medrano.jpg",
  "Rebecca Godwin|/images/people/Rebecca-Budinoff.jpg",
  "Roberta Engel|/images/people/Ian-Engelbrecht.jpg",
  "Simon Au|/images/people/Simone-Longe.jpg",
  "Asel Zhetigenova|/images/people/Diogo-Casellato.jpg",
  "Howard Bichard|/images/people/Howard-W-Fiedler.jpg",
  "Warren Schmidt|/images/people/Warren-Savary.jpg",
]);

const original = JSON.parse(readFileSync(ORIGINAL_AUDIT, "utf8")) as Array<{
  file: string;
  person: string;
  kind: string;
  original: string;
  resolved: string | null;
  applied: boolean;
}>;

const finalApplied: FinalEntry[] = [];
const stillPlaceholder: string[] = [];

for (const file of readdirSync(SECTIONS_DIR).filter((name) => name.endsWith("Section.tsx"))) {
  const content = readFileSync(join(SECTIONS_DIR, file), "utf8");
  for (const match of content.matchAll(/src="(\/images[^"]+)"[\s\S]*?alt="([^"]+)"/g)) {
    const [, src, person] = match;
    if (!existsSync(join(ROOT, "public", src.slice(1)))) {
      continue;
    }
    const orig = original.find((entry) => entry.person === person && entry.file === file);
    const originalPath =
      orig?.original === "PhotoPlaceholder" ? "PhotoPlaceholder" : orig?.original ?? src;
    const method =
      originalPath in manualSrc || Object.keys(manualSrc).includes(originalPath)
        ? "manual-src"
        : reverted.has(`${person}|${src}`)
          ? "reverted-false-positive"
          : "auto-audit";
    if (reverted.has(`${person}|${src}`)) {
      continue;
    }
    finalApplied.push({ file, person, original: originalPath, resolved: src, method });
  }
  for (const match of content.matchAll(/<PhotoPlaceholder name="([^"]+)"\s*\/>/g)) {
    stillPlaceholder.push(`${file}: ${match[1]}`);
  }
}

const revertedEntries = [...reverted].map((key) => {
  const [person, wrongSrc] = key.split("|");
  const orig = original.find((entry) => entry.person === person && entry.resolved === wrongSrc);
  return {
    person,
    file: orig?.file ?? "unknown",
    attemptedMatch: wrongSrc,
    reason: "First-name-only or species-name false positive; reverted to placeholder",
  };
});

writeFileSync(
  FINAL_AUDIT,
  `${JSON.stringify({ applied: finalApplied, reverted: revertedEntries, stillPlaceholder }, null, 2)}\n`
);

console.log(
  JSON.stringify(
    {
      applied: finalApplied.length,
      reverted: revertedEntries.length,
      stillPlaceholder: stillPlaceholder.length,
    },
    null,
    2
  )
);
