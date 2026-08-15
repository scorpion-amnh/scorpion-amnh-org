import type { Person } from "@/lib/content/schema";
import { buildPersonProfilePath } from "@/lib/people/peoplePageUrl";
import { LORENZO_PRENDINI_ID, PRENDINI_BIO_PATH } from "@/lib/publications/citation";

const SECONDARY_ID_SUFFIXES = /-(visitor|vol|undergrad|hs)$/;

export type AuthorProfileCandidate = {
  personId: string;
  sectionId: string;
  tab: Person["tab"];
  givenParts: string[];
};

export type AuthorProfileLookup = {
  byExactKey: Record<string, string>;
  bySurname: Record<string, AuthorProfileCandidate[]>;
};

export const normalizeCitationAuthorKey = (name: string) =>
  name
    .replace(/^and\s+/i, "")
    .replace(/\*+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const normalizeSurnameKey = (surname: string) =>
  normalizeCitationAuthorKey(surname).replace(/[-\s]+/g, " ").trim();

const getInitialsFromGivenParts = (givenParts: string[]) =>
  givenParts
    .map((part) => part.replace(/\./g, "").charAt(0))
    .filter(Boolean)
    .join("")
    .toLowerCase();

const addCitationKeys = (keys: Set<string>, surname: string, givenParts: string[]) => {
  if (givenParts.length === 0) {
    keys.add(normalizeCitationAuthorKey(surname));
    return;
  }

  const allInitials =
    givenParts
      .map((part) => part.replace(/\./g, "").charAt(0))
      .filter(Boolean)
      .join(".") + ".";
  const firstInitial = `${givenParts[0].replace(/\./g, "").charAt(0)}.`;

  for (const initials of [allInitials, firstInitial]) {
    keys.add(normalizeCitationAuthorKey(`${surname}, ${initials}`));
    keys.add(normalizeCitationAuthorKey(`${surname}, ${initials.replace(/\.$/, "")}`));
  }
};

const getPersonNameParts = (name: string) => name.trim().split(/\s+/).filter(Boolean);

/** Citation-style surname variants, including compound surnames such as "Blasco Aróstegui". */
const getPersonSurnameVariants = (name: string): Array<{ surname: string; givenParts: string[] }> => {
  const parts = getPersonNameParts(name);
  if (parts.length === 0) {
    return [];
  }

  const variants: Array<{ surname: string; givenParts: string[] }> = [
    { surname: parts[parts.length - 1], givenParts: parts.slice(0, -1) },
  ];

  if (parts.length >= 3) {
    for (let splitIndex = 1; splitIndex < parts.length; splitIndex += 1) {
      const givenParts = parts.slice(0, splitIndex);
      const surnameParts = parts.slice(splitIndex);
      const spaceSurname = surnameParts.join(" ");
      const hyphenSurname = surnameParts.join("-");

      variants.push({ surname: spaceSurname, givenParts });
      if (hyphenSurname !== spaceSurname) {
        variants.push({ surname: hyphenSurname, givenParts });
      }
    }
  }

  return variants;
};

const getPersonCitationKeys = (name: string): string[] => {
  const keys = new Set<string>();

  for (const { surname, givenParts } of getPersonSurnameVariants(name)) {
    addCitationKeys(keys, surname, givenParts);
  }

  return [...keys];
};

const parseCitationAuthor = (name: string) => {
  const normalized = normalizeCitationAuthorKey(name);
  const commaIndex = normalized.indexOf(",");

  if (commaIndex === -1) {
    return { surname: normalized, initials: "" };
  }

  return {
    surname: normalized.slice(0, commaIndex).trim(),
    initials: normalized
      .slice(commaIndex + 1)
      .replace(/[^a-z]/g, ""),
  };
};

const initialsAreCompatible = (citationInitials: string, givenParts: string[]) => {
  const personInitials = getInitialsFromGivenParts(givenParts);

  if (!citationInitials) {
    return true;
  }

  if (!personInitials) {
    return false;
  }

  if (citationInitials === personInitials) {
    return true;
  }

  // Citations may include middle initials omitted from the people directory (e.g. V.L. vs Valentin).
  if (citationInitials.startsWith(personInitials) || personInitials.startsWith(citationInitials)) {
    return true;
  }

  return citationInitials.charAt(0) === personInitials.charAt(0);
};

const pickBestPersonMatch = (matches: Person[]): Person | null => {
  if (matches.length === 0) {
    return null;
  }

  if (matches.length === 1) {
    return matches[0];
  }

  const primaryMatches = matches.filter((person) => !SECONDARY_ID_SUFFIXES.test(person.id));
  const candidatePool = primaryMatches.length > 0 ? primaryMatches : matches;
  const currentMatches = candidatePool.filter((person) => person.tab === "current");

  if (currentMatches.length === 1) {
    return currentMatches[0];
  }

  return [...candidatePool].sort((a, b) => a.id.localeCompare(b.id))[0];
};

const pickBestCandidate = (
  candidates: AuthorProfileCandidate[],
  citationInitials: string
): AuthorProfileCandidate | null => {
  const compatibleCandidates = candidates.filter((candidate) =>
    initialsAreCompatible(citationInitials, candidate.givenParts)
  );

  if (compatibleCandidates.length === 0) {
    return null;
  }

  if (compatibleCandidates.length === 1) {
    return compatibleCandidates[0];
  }

  const primaryCandidates = compatibleCandidates.filter(
    (candidate) => !SECONDARY_ID_SUFFIXES.test(candidate.personId)
  );
  const candidatePool = primaryCandidates.length > 0 ? primaryCandidates : compatibleCandidates;

  return [...candidatePool].sort((a, b) => a.personId.localeCompare(b.personId))[0];
};

export const getPersonProfileHref = (person: Pick<Person, "id" | "sectionId" | "tab">) =>
  person.id === LORENZO_PRENDINI_ID ? PRENDINI_BIO_PATH : buildPersonProfilePath(person);

export const buildAuthorProfileLookup = (people: Person[]): AuthorProfileLookup => {
  const matchesByKey = new Map<string, Person[]>();
  const bySurname: Record<string, AuthorProfileCandidate[]> = {};

  for (const person of people) {
    for (const key of getPersonCitationKeys(person.name)) {
      const existingMatches = matchesByKey.get(key) ?? [];
      existingMatches.push(person);
      matchesByKey.set(key, existingMatches);
    }

    for (const { surname, givenParts } of getPersonSurnameVariants(person.name)) {
      const surnameKey = normalizeSurnameKey(surname);
      const existingCandidates = bySurname[surnameKey] ?? [];
      existingCandidates.push({
        personId: person.id,
        sectionId: person.sectionId,
        tab: person.tab,
        givenParts: givenParts.map((part) => part.toLowerCase()),
      });
      bySurname[surnameKey] = existingCandidates;
    }
  }

  const byExactKey: Record<string, string> = {};

  for (const [key, matches] of matchesByKey) {
    const bestMatch = pickBestPersonMatch(matches);
    if (bestMatch) {
      byExactKey[key] = getPersonProfileHref(bestMatch);
    }
  }

  return { byExactKey, bySurname };
};

export const getAuthorProfileHref = (
  authorName: string,
  lookup: AuthorProfileLookup
): string | null => {
  const exactMatch = lookup.byExactKey[normalizeCitationAuthorKey(authorName)];
  if (exactMatch) {
    return exactMatch;
  }

  const { surname, initials } = parseCitationAuthor(authorName);
  if (!surname) {
    return null;
  }

  const bestCandidate = pickBestCandidate(lookup.bySurname[normalizeSurnameKey(surname)] ?? [], initials);
  return bestCandidate
    ? getPersonProfileHref({
        id: bestCandidate.personId,
        sectionId: bestCandidate.sectionId,
        tab: bestCandidate.tab,
      })
    : null;
};

export const linkAuthorsInCitationHtml = (
  html: string,
  lookup: AuthorProfileLookup
): string =>
  html.replace(/<b>([\s\S]*?)<\/b>/gi, (_, content: string) => {
    const href = getAuthorProfileHref(content, lookup);
    const displayName = content.replace(/\*+$/g, "");

    if (href) {
      return `<a href="${href}">${displayName}</a>`;
    }

    return `<b>${displayName}</b>`;
  });
