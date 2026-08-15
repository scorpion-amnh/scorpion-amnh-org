import fs from "node:fs";
import path from "node:path";

const DOCUMENTS_DIR = path.join(process.cwd(), "public/documents");
const publications = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content/publications.json"), "utf8"),
);

const MANUAL_OVERRIDES = {
  "Prendini 2003.pdf":
    "Threats facing southern Africa’s unique scorpion fauna",
};

const stripMarkdown = (value) =>
  value.replace(/\*\*((?:[^*]|\*(?!\*))+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

const normalizeAscii = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const slugify = (value) =>
  normalizeAscii(stripMarkdown(value))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getLastName = (authorName) => authorName.split(",")[0].trim();

const parseLegacyPdfFilename = (filename) => {
  const base = filename.replace(/\.pdf$/i, "");

  if (/publisher correction$/i.test(base)) {
    const match = base.match(/^(.+?)\s+(\d{4})\s+Publisher Correction$/i);
    if (!match) {
      return null;
    }

    const authorPart = match[1].trim();
    const isTwoAuthors = / & /.test(authorPart);
    let firstAuthor;
    let secondAuthor;
    if (isTwoAuthors) {
      [firstAuthor, secondAuthor] = authorPart.split(" & ").map((part) => part.trim());
    } else {
      firstAuthor = authorPart;
    }

    return {
      kind: "publisher-correction",
      authorPart,
      year: Number(match[2]),
      suffix: "",
      firstAuthor,
      secondAuthor,
      isEtAl: false,
      isTwoAuthors,
    };
  }

  const match = base.match(/^(.+?)\s+(\d{4})([a-z])?$/i);
  if (!match) {
    return null;
  }

  const authorPart = match[1].trim();
  const isEtAl = /\bet al\.?$/i.test(authorPart);
  const isTwoAuthors = / & /.test(authorPart);

  let firstAuthor;
  let secondAuthor;
  if (isEtAl) {
    firstAuthor = authorPart.replace(/\s+et al\.?$/i, "").trim();
  } else if (isTwoAuthors) {
    [firstAuthor, secondAuthor] = authorPart.split(" & ").map((part) => part.trim());
  } else {
    firstAuthor = authorPart;
  }

  return {
    kind: "standard",
    authorPart,
    year: Number(match[2]),
    suffix: match[3]?.toLowerCase() ?? "",
    firstAuthor,
    secondAuthor,
    isEtAl,
    isTwoAuthors,
  };
};

const parseRenamedPdfFilename = (filename) => {
  if (!/^\d{4}--/.test(filename)) {
    return null;
  }

  const base = filename.replace(/\.pdf$/i, "");
  const multiMatch = base.match(
    /^(\d{4})--(.+)--([a-z0-9-]+)--et-al(?:--(\d+))?$/i,
  );
  if (multiMatch) {
    return {
      year: Number(multiMatch[1]),
      titleSlug: multiMatch[2],
      authorSlug: multiMatch[3],
      hasEtAl: true,
    };
  }

  const singleMatch = base.match(/^(\d{4})--(.+)--([a-z0-9-]+)(?:--(\d+))?$/i);
  if (!singleMatch) {
    return null;
  }

  return {
    year: Number(singleMatch[1]),
    titleSlug: singleMatch[2],
    authorSlug: singleMatch[3],
    hasEtAl: false,
  };
};

const authorSurnameMatches = (hint, authorName) => {
  const surname = getLastName(authorName);
  const normalizedHint = normalizeAscii(hint).replace(/[^a-z0-9]+/g, "");
  const normalizedSurname = normalizeAscii(surname).replace(/[^a-z0-9]+/g, "");
  const surnameTokens = normalizeAscii(surname)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return (
    normalizedSurname === normalizedHint ||
    normalizedSurname.startsWith(normalizedHint) ||
    normalizedHint.startsWith(normalizedSurname) ||
    surnameTokens.some((token) => token === normalizedHint)
  );
};

const titleSlugMatches = (fileTitleSlug, publicationTitle) => {
  const publicationTitleSlug = slugify(publicationTitle);
  return (
    publicationTitleSlug === fileTitleSlug ||
    publicationTitleSlug.startsWith(fileTitleSlug) ||
    fileTitleSlug.startsWith(publicationTitleSlug)
  );
};

const findCandidates = (parsed) => {
  if (parsed.kind === "publisher-correction") {
    return publications.filter(
      (publication) =>
        publication.year === parsed.year &&
        /publisher correction/i.test(publication.title) &&
        authorSurnameMatches(parsed.firstAuthor, publication.authors[0].name) &&
        (!parsed.secondAuthor ||
          publication.authors.some((author) => authorSurnameMatches(parsed.secondAuthor, author.name))),
    );
  }

  return publications.filter((publication) => {
    if (publication.year !== parsed.year) {
      return false;
    }

    if (!authorSurnameMatches(parsed.firstAuthor, publication.authors[0].name)) {
      return false;
    }

    if (parsed.isTwoAuthors) {
      return publication.authors.some((author) =>
        authorSurnameMatches(parsed.secondAuthor, author.name),
      );
    }

    if (parsed.isEtAl) {
      return publication.authors.length > 1;
    }

    return publication.authors.length === 1;
  });
};

const findPublicationFromRenamedFilename = (parsed) => {
  const candidates = publications.filter((publication) => {
    if (publication.year !== parsed.year) {
      return false;
    }

    if (slugify(getLastName(publication.authors[0].name)) !== parsed.authorSlug) {
      return false;
    }

    if (parsed.hasEtAl && publication.authors.length <= 1) {
      return false;
    }

    if (!parsed.hasEtAl && publication.authors.length > 1) {
      return false;
    }

    return titleSlugMatches(parsed.titleSlug, publication.title);
  });

  if (candidates.length === 1) {
    return candidates[0];
  }

  return null;
};

const pickPublication = (filename, parsed, candidates) => {
  if (MANUAL_OVERRIDES[filename]) {
    const override = publications.find(
      (publication) => publication.title === MANUAL_OVERRIDES[filename],
    );
    if (override) {
      return override;
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  const sorted = [...candidates].sort((left, right) =>
    stripMarkdown(left.title).localeCompare(stripMarkdown(right.title)),
  );

  if (!parsed.suffix) {
    throw new Error(
      `Ambiguous match for ${filename}: ${sorted.length} publications share author/year`,
    );
  }

  const index = parsed.suffix.charCodeAt(0) - "a".charCodeAt(0);
  if (index < 0 || index >= sorted.length) {
    throw new Error(
      `Suffix ${parsed.suffix} out of range for ${filename} (${sorted.length} candidates)`,
    );
  }

  return sorted[index];
};

const MAX_FILENAME_LENGTH = 255;
const SEPARATOR = "--";

const buildFilenameWithSeparator = (publication, separator, usedNames) => {
  const year = publication.year;
  const firstAuthorSlug = slugify(getLastName(publication.authors[0].name));
  const authorPart = `${separator}${firstAuthorSlug}`;
  const etAlPart = publication.authors.length > 1 ? `${separator}et-al` : "";
  const suffix = `${authorPart}${etAlPart}.pdf`;
  const prefix = `${year}${separator}`;
  const maxTitleLength = MAX_FILENAME_LENGTH - prefix.length - suffix.length;
  let titleSlug = slugify(publication.title);

  if (titleSlug.length > maxTitleLength) {
    titleSlug = titleSlug.slice(0, maxTitleLength).replace(/-+$/g, "");
  }

  let candidate = `${prefix}${titleSlug}${suffix}`;
  if (!usedNames?.has(candidate)) {
    usedNames?.add(candidate);
    return candidate;
  }

  let duplicateSuffix = 2;
  while (
    usedNames.has(
      `${prefix}${titleSlug}${authorPart}${etAlPart}${separator}${duplicateSuffix}.pdf`,
    )
  ) {
    duplicateSuffix += 1;
  }

  candidate = `${prefix}${titleSlug}${authorPart}${etAlPart}${separator}${duplicateSuffix}.pdf`;
  usedNames.add(candidate);
  return candidate;
};

const buildFilename = (publication, usedNames) =>
  buildFilenameWithSeparator(publication, SEPARATOR, usedNames);

const publicationByExistingFilename = new Map(
  publications.map((publication) => [
    buildFilenameWithSeparator(publication, "-"),
    publication,
  ]),
);

const isTargetFilename = (filename) => /^\d{4}--/.test(filename);

const resolvePublication = (filename) => {
  const fromExistingName = publicationByExistingFilename.get(filename);
  if (fromExistingName) {
    return fromExistingName;
  }

  const renamed = parseRenamedPdfFilename(filename);
  if (renamed) {
    const publication = findPublicationFromRenamedFilename(renamed);
    if (publication) {
      return publication;
    }
  }

  const legacy = parseLegacyPdfFilename(filename);
  if (!legacy) {
    return null;
  }

  const candidates = findCandidates(legacy);
  return pickPublication(filename, legacy, candidates);
};

const pdfs = fs
  .readdirSync(DOCUMENTS_DIR)
  .filter((filename) => filename.toLowerCase().endsWith(".pdf"))
  .filter((filename) => !filename.toLowerCase().includes("cv"))
  .filter((filename) => !isTargetFilename(filename))
  .sort();

const usedNames = new Set(
  fs.readdirSync(DOCUMENTS_DIR).filter((filename) => isTargetFilename(filename)),
);

const renames = [];
const errors = [];

for (const oldName of pdfs) {
  try {
    const publication = resolvePublication(oldName);
    if (!publication) {
      errors.push({ oldName, error: "No matching publication found" });
      continue;
    }

    const newName = buildFilename(publication, usedNames);
    if (oldName === newName) {
      continue;
    }

    renames.push({ oldName, newName, title: publication.title });
  } catch (error) {
    errors.push({
      oldName,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

const dryRun = !process.argv.includes("--apply");

console.log(`${dryRun ? "Dry run" : "Applying"} ${renames.length} rename(s)\n`);

for (const { oldName, newName, title } of renames) {
  console.log(`${oldName}`);
  console.log(`  -> ${newName}`);
  console.log(`     ${title.slice(0, 90)}${title.length > 90 ? "…" : ""}`);
}

if (errors.length > 0) {
  console.log(`\n${errors.length} error(s):`);
  for (const { oldName, error } of errors) {
    console.log(`- ${oldName}: ${error}`);
  }
}

if (!dryRun && errors.length === 0) {
  for (const { oldName, newName } of renames) {
    fs.renameSync(path.join(DOCUMENTS_DIR, oldName), path.join(DOCUMENTS_DIR, newName));
  }
  console.log("\nRenamed successfully.");
}

process.exit(errors.length > 0 ? 1 : 0);
