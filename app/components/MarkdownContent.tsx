import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink } from "@/app/components/ExternalLink";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

const htmlToMarkdown = (html: string): string =>
  html
    .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .trim();

export const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
  const markdown = content.includes("<") ? htmlToMarkdown(content) : content;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href && /^https?:\/\//.test(href)) {
              return <ExternalLink href={href}>{children}</ExternalLink>;
            }

            return (
              <a href={href} className="text-blue-600 hover:text-blue-800 underline">
                {children}
              </a>
            );
          },
          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
