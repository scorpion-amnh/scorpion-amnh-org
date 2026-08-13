/** Strip JATS/HTML wrapper tags and convert inline emphasis to markdown asterisks. */
export const normalizeDoiAbstract = (raw: string): string =>
  raw
    .replace(/<\/?jats:p>/gi, "")
    .replace(/<\/?p>/gi, "")
    .replace(/<jats:italic>([\s\S]*?)<\/jats:italic>/gi, "*$1*")
    .replace(/<italic>([\s\S]*?)<\/italic>/gi, "*$1*")
    .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<[^>]+>/g, "")
    .trim();

export const isPublicationAbstractPlaceholder = (abstract: string | null | undefined): boolean => {
  if (!abstract) {
    return true;
  }

  const trimmed = abstract.trim();

  if (!trimmed || trimmed === "-") {
    return true;
  }

  return (
    /^This publication presents research on/i.test(trimmed) ||
    /^A memorial tribute honoring/i.test(trimmed) ||
    /^A field report documenting/i.test(trimmed)
  );
};

export const hasPublicationAbstract = (abstract: string | null | undefined): abstract is string =>
  !isPublicationAbstractPlaceholder(abstract);

export const fetchCrossrefAbstract = async (doi: string): Promise<string | null> => {
  const doiId = doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
  const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doiId)}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    message?: { abstract?: string };
  };
  const abstract = payload.message?.abstract;

  if (!abstract) {
    return null;
  }

  return normalizeDoiAbstract(abstract);
};
