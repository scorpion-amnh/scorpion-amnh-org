import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const SECTIONS_DIR = path.join(ROOT, "app/people/sections");
const PUBLIC_IMAGES = path.join(ROOT, "public/images");
const AUDIT_PATH = path.join(ROOT, "references/people-image-audit.json");
const MIN_SCORE = 68;

type ImageEntry = {
  folder: string;
  filename: string;
  publicPath: string;
  normalized: string;
};

type AuditEntry = {
  file: string;
  person: string;
  kind: "src" | "placeholder";
  original: string;
  resolved: string | null;
  score: number;
  reason: string;
  applied: boolean;
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

const nameTokens = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .split(/[\s,.-]+/)
    .map((token) => token.toLowerCase())
    .filter((token) => token.length >= 3);

const buildImageIndex = (): ImageEntry[] => {
  const entries: ImageEntry[] = [];

  const walk = (dir: string, folderParts: string[] = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === ".DS_Store") {
        continue;
      }
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, [...folderParts, entry.name]);
        continue;
      }
      const folder = folderParts.join("/");
      const publicPath = `/images/${folder ? `${folder}/` : ""}${entry.name}`;
      entries.push({
        folder,
        filename: entry.name,
        publicPath,
        normalized: normalize(path.parse(entry.name).name),
      });
    }
  };

  walk(PUBLIC_IMAGES);
  return entries;
};

const scoreMatch = (
  entry: ImageEntry,
  queries: { normalized?: string; tokens?: string[]; rawBasename?: string }
): { score: number; reason: string } => {
  let score = 0;
  const reasons: string[] = [];

  if (queries.normalized && entry.normalized === queries.normalized) {
    score = 100;
    reasons.push("exact normalized filename");
  }

  if (queries.rawBasename) {
    const rawNorm = normalize(path.parse(queries.rawBasename).name);
    if (rawNorm && entry.normalized === rawNorm) {
      score = Math.max(score, 98);
      reasons.push("exact legacy basename");
    }
    if (rawNorm.length >= 4 && entry.normalized.includes(rawNorm)) {
      score = Math.max(score, 82);
      reasons.push("legacy basename substring");
    }
    if (rawNorm.length >= 4 && rawNorm.includes(entry.normalized) && entry.normalized.length >= 4) {
      score = Math.max(score, 75);
      reasons.push("legacy basename contains file stem");
    }
  }

  if (queries.tokens && queries.tokens.length > 0) {
    const matched = queries.tokens.filter((token) => entry.normalized.includes(token));
    const coverage = matched.length / queries.tokens.length;
    if (coverage === 1 && queries.tokens.length >= 2) {
      score = Math.max(score, 90);
      reasons.push("all name tokens matched");
    } else if (coverage >= 0.5 && matched.length >= 1) {
      const tokenScore = 60 + Math.round(coverage * 25);
      score = Math.max(score, tokenScore);
      reasons.push(`name tokens matched (${matched.join(", ")})`);
    }
  }

  if (entry.folder === "people" && score > 0) {
    score += 3;
    reasons.push("people folder bonus");
  }

  return { score, reason: reasons.join("; ") || "no match" };
};

const findBestMatch = (
  index: ImageEntry[],
  queries: { normalized?: string; tokens?: string[]; rawBasename?: string }
): { entry: ImageEntry; score: number; reason: string } | null => {
  const scored = index
    .map((entry) => {
      const { score, reason } = scoreMatch(entry, queries);
      return { entry, score, reason };
    })
    .filter((item) => item.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score || a.entry.publicPath.localeCompare(b.entry.publicPath));

  if (scored.length === 0) {
    return null;
  }

  const best = scored[0];
  const tied = scored.filter((item) => item.score >= best.score - 2);
  if (tied.length > 1) {
    return null;
  }

  return best;
};

const defaultImageProps = (alt: string) =>
  `src="{SRC}"\n                  alt="${alt.replace(/"/g, "&quot;")}"\n                  width={300}\n                  height={400}\n                  className="w-full h-auto rounded-sm"`;

const audit: AuditEntry[] = [];
const index = buildImageIndex();

for (const file of readdirSync(SECTIONS_DIR).filter((name) => name.endsWith("Section.tsx"))) {
  const filePath = path.join(SECTIONS_DIR, file);
  let content = readFileSync(filePath, "utf8");
  let changed = false;

  for (const match of content.matchAll(
    /<PeopleImage[\s\S]*?src="(\/images[^"]+)"[\s\S]*?alt="([^"]+)"[\s\S]*?\/>/g
  )) {
    const [block, src, alt] = match;
    if (existsSync(path.join(ROOT, "public", src.slice(1)))) {
      continue;
    }

    const rawBasename = path.basename(src);
    const best = findBestMatch(index, {
      rawBasename,
      normalized: normalize(path.parse(rawBasename).name),
      tokens: nameTokens(alt),
    });

    audit.push({
      file,
      person: alt,
      kind: "src",
      original: src,
      resolved: best?.entry.publicPath ?? null,
      score: best?.score ?? 0,
      reason: best?.reason ?? "no confident match",
      applied: false,
    });

    if (best) {
      content = content.replace(block, block.replace(`src="${src}"`, `src="${best.entry.publicPath}"`));
      audit[audit.length - 1].applied = true;
      changed = true;
    }
  }

  for (const match of content.matchAll(
    /<PhotoPlaceholder name="([^"]+)"\s*\/>/g
  )) {
    const [block, personName] = match;
    const tokens = nameTokens(personName);
    const best = findBestMatch(index, { tokens, normalized: normalize(personName) });

    audit.push({
      file,
      person: personName,
      kind: "placeholder",
      original: "PhotoPlaceholder",
      resolved: best?.entry.publicPath ?? null,
      score: best?.score ?? 0,
      reason: best?.reason ?? "no confident match",
      applied: false,
    });

    if (best) {
      const replacement = `<PeopleImage\n                  ${defaultImageProps(personName).replace("{SRC}", best.entry.publicPath)}\n                />`;
      content = content.replace(block, replacement);
      audit[audit.length - 1].applied = true;
      changed = true;
    }
  }

  if (changed) {
    if (!content.includes('import { PeopleImage }') && content.includes("<PeopleImage")) {
      content = content.replace(
        "'use client';\n\n",
        "'use client';\n\nimport { PeopleImage } from \"@/app/people/PeopleImage\";\n"
      );
    }
    if (!content.includes("PhotoPlaceholder") && content.includes('import { PhotoPlaceholder }')) {
      content = content.replace(/import \{ PhotoPlaceholder \} from "@\/app\/components\/PhotoPlaceholder";\n/, "");
    }
    writeFileSync(filePath, content);
  }
}

const jsonAuditPath = path.join(ROOT, "references/people-json-image-audit.json");
const peopleDir = path.join(ROOT, "content/people");
const jsonAudit: AuditEntry[] = [];

for (const file of readdirSync(peopleDir).filter(
  (name) => name.endsWith(".json") && name !== "section-order.json"
)) {
  const parsed = JSON.parse(readFileSync(path.join(peopleDir, file), "utf8")) as {
    name?: string;
    image?: { folder: string; filename: string } | null;
  };

  if (!parsed.name || parsed.image) {
    continue;
  }

  const tokens = nameTokens(parsed.name);
  const best = findBestMatch(index, { tokens, normalized: normalize(parsed.name) });

  jsonAudit.push({
    file: `content/people/${file}`,
    person: parsed.name,
    kind: "placeholder",
    original: "image: null",
    resolved: best?.entry.publicPath ?? null,
    score: best?.score ?? 0,
    reason: best?.reason ?? "no confident match",
    applied: false,
  });
}

writeFileSync(jsonAuditPath, `${JSON.stringify(jsonAudit, null, 2)}\n`);

writeFileSync(AUDIT_PATH, `${JSON.stringify(audit, null, 2)}\n`);

const applied = audit.filter((entry) => entry.applied);
const unresolved = audit.filter((entry) => !entry.applied && entry.kind === "src");
const unresolvedPlaceholders = audit.filter((entry) => !entry.applied && entry.kind === "placeholder");

console.log(
  JSON.stringify(
    {
      total: audit.length,
      applied: applied.length,
      unresolvedSrc: unresolved.length,
      unresolvedPlaceholders: unresolvedPlaceholders.length,
      jsonNullImages: jsonAudit.length,
      jsonWithMatches: jsonAudit.filter((entry) => entry.resolved).length,
    },
    null,
    2
  )
);
