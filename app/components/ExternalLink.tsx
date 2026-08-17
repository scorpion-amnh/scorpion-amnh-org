import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ExternalLinkIcon } from "@/app/components/icons/ExternalLinkIcon";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export const ExternalLink = ({
  children,
  className = "text-color-link hover:text-color-link-hover link-underline",
  href,
  ...props
}: ExternalLinkProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
    {children}
    <ExternalLinkIcon className="ml-1" />
  </a>
);
