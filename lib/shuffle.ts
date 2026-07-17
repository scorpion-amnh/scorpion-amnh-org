export const hashText = (value: string) =>
  value.split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);

export const deterministicShuffle = <T extends { src: string }>(items: readonly T[]) =>
  [...items].sort((a, b) => hashText(a.src) - hashText(b.src));

export const deterministicShuffleStrings = <T extends string>(items: readonly T[]) =>
  [...items].sort((a, b) => hashText(a) - hashText(b));
