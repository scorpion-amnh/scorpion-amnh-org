import type { ReactNode } from "react";

const BOLD_PATTERN = /\*\*((?:[^*]|\*(?!\*))+)\*\*/;
const ITALIC_PATTERN = /\*([^*]+)\*/;

const parsePlainTextEmphasis = (text: string, keyPrefix = ""): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let partIndex = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(BOLD_PATTERN);
    const italicMatch = remaining.match(ITALIC_PATTERN);

    const boldIndex = boldMatch?.index ?? -1;
    const italicIndex = italicMatch?.index ?? -1;

    let nextMatch: RegExpMatchArray | null = null;
    let kind: "bold" | "italic" | null = null;

    if (boldIndex !== -1 && (italicIndex === -1 || boldIndex <= italicIndex)) {
      nextMatch = boldMatch;
      kind = "bold";
    } else if (italicIndex !== -1) {
      nextMatch = italicMatch;
      kind = "italic";
    }

    if (!nextMatch || kind === null || nextMatch.index === undefined) {
      nodes.push(remaining);
      break;
    }

    if (nextMatch.index > 0) {
      nodes.push(remaining.slice(0, nextMatch.index));
    }

    const key = `${keyPrefix}-${partIndex}`;
    if (kind === "bold") {
      nodes.push(
        <b key={key}>{parsePlainTextEmphasis(nextMatch[1], `${key}-b`)}</b>
      );
    } else {
      nodes.push(<i key={key}>{nextMatch[1]}</i>);
    }

    remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
    partIndex += 1;
  }

  return nodes;
};

export const formatInlineEmphasis = (text: string): ReactNode => {
  const nodes = parsePlainTextEmphasis(text);

  if (nodes.length === 0) {
    return text;
  }

  if (nodes.length === 1 && typeof nodes[0] === "string") {
    return nodes[0];
  }

  return <>{nodes}</>;
};

const convertPlainTextEmphasisToHtml = (text: string): string => {
  const parts: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(BOLD_PATTERN);
    const italicMatch = remaining.match(ITALIC_PATTERN);

    const boldIndex = boldMatch?.index ?? -1;
    const italicIndex = italicMatch?.index ?? -1;

    let nextMatch: RegExpMatchArray | null = null;
    let kind: "bold" | "italic" | null = null;

    if (boldIndex !== -1 && (italicIndex === -1 || boldIndex <= italicIndex)) {
      nextMatch = boldMatch;
      kind = "bold";
    } else if (italicIndex !== -1) {
      nextMatch = italicMatch;
      kind = "italic";
    }

    if (!nextMatch || kind === null || nextMatch.index === undefined) {
      parts.push(remaining);
      break;
    }

    if (nextMatch.index > 0) {
      parts.push(remaining.slice(0, nextMatch.index));
    }

    if (kind === "bold") {
      parts.push(
        `<b>${convertPlainTextEmphasisToHtml(nextMatch[1])}</b>`
      );
    } else {
      parts.push(`<i>${nextMatch[1]}</i>`);
    }

    remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
  }

  return parts.join("");
};

export const markdownEmphasisToHtml = (text: string): string =>
  text.replace(/(<[^>]+>)|([^<]+)/g, (full, tag: string | undefined, textSegment: string | undefined) => {
    if (tag) {
      return tag;
    }

    if (textSegment) {
      return convertPlainTextEmphasisToHtml(textSegment);
    }

    return full;
  });
