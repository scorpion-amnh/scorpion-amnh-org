export const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const getEditDistance = (a: string, b: string) => {
  const aLen = a.length;
  const bLen = b.length;
  if (!aLen) return bLen;
  if (!bLen) return aLen;

  const dp = Array.from({ length: aLen + 1 }, () => new Array(bLen + 1).fill(0));
  for (let i = 0; i <= aLen; i += 1) dp[i][0] = i;
  for (let j = 0; j <= bLen; j += 1) dp[0][j] = j;

  for (let i = 1; i <= aLen; i += 1) {
    for (let j = 1; j <= bLen; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[aLen][bLen];
};

/**
 * Scores how well a normalized query matches normalized text, allowing for typos.
 * Lower scores are better matches; returns null when the query doesn't match closely enough.
 */
export const getFuzzyScore = (query: string, text: string) => {
  if (!query) return null;
  if (text.includes(query)) return 0;

  const textTokens = text.split(/\s+/g).filter(Boolean);
  const tokenDistances = textTokens.map((token) => getEditDistance(query, token));
  const bestTokenDistance = tokenDistances.length ? Math.min(...tokenDistances) : getEditDistance(query, text);
  const textDistance = getEditDistance(query, text);
  const bestDistance = Math.min(bestTokenDistance, textDistance);

  const maxDistance = Math.max(1, Math.floor(query.length * 0.35));
  if (bestDistance <= maxDistance) {
    return bestDistance + 1;
  }

  return null;
};

const stripPunctuation = (value: string) => value.replace(/[^a-z0-9]/g, "");

/**
 * Scores how well a normalized, possibly multi-word query matches normalized text that may span
 * several fields (e.g. a full citation). Every word in the query must match somewhere in the text
 * (as a substring or a close typo) for the text to be considered a match. Lower scores are better
 * matches; returns null when any query word has no close match.
 */
export const getMultiWordFuzzyScore = (query: string, text: string) => {
  const queryWords = query.split(/\s+/g).filter(Boolean);
  if (queryWords.length === 0) return null;

  const textTokens = text.split(/\s+/g).filter(Boolean);
  if (textTokens.length === 0) return null;

  let totalScore = 0;

  for (const word of queryWords) {
    // Punctuation-stripped forms are used for typo-distance so trailing commas/periods on author
    // names (e.g. "Prendini,") don't inflate the edit distance for otherwise-close matches.
    const cleanedWord = stripPunctuation(word) || word;
    let bestScore: number | null = null;

    for (const token of textTokens) {
      if (token.includes(word)) {
        bestScore = 0;
        break;
      }

      const cleanedToken = stripPunctuation(token) || token;
      const distance = getEditDistance(cleanedWord, cleanedToken);
      const maxDistance = Math.max(1, Math.floor(cleanedWord.length * 0.35));
      if (distance <= maxDistance && (bestScore === null || distance < bestScore)) {
        bestScore = distance;
      }
    }

    if (bestScore === null) {
      return null;
    }

    totalScore += bestScore;
  }

  return totalScore;
};
