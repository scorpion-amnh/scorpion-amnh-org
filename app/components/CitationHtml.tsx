import type { ReactNode } from "react";
import { ExternalLink } from "@/app/components/ExternalLink";

type CitationHtmlProps = {
  html: string;
};

const externalLinkPattern = /<a href="(https?:\/\/[^"]+)"(?:[^>]*)>([\s\S]*?)<\/a>/gi;

const renderCitationHtml = (html: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of html.matchAll(externalLinkPattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(
        <span
          key={`text-${lastIndex}`}
          dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, matchIndex) }}
        />
      );
    }

    nodes.push(
      <ExternalLink key={`link-${matchIndex}`} href={match[1]}>
        {match[2]}
      </ExternalLink>
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < html.length) {
    nodes.push(
      <span
        key={`text-${lastIndex}`}
        dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }}
      />
    );
  }

  return nodes;
};

export const CitationHtml = ({ html }: CitationHtmlProps) => (
  <span className="[&_a]:text-color-link [&_a]:hover:text-color-link-hover [&_a]:hover:underline">{renderCitationHtml(html)}</span>
);
