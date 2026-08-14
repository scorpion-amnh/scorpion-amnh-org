import Link from "next/link";
import type { Publication } from "@/lib/content/schema";
import { getAuthorProfileHref, type AuthorProfileLookup } from "@/lib/publications/authorProfiles";

const authorLinkClassName = "text-color-link hover:text-color-link-hover link-underline";

export const formatPublicationAuthors = (
  authors: Publication["authors"],
  authorProfileLookup: AuthorProfileLookup
) =>
  authors.map((author, index) => {
    const name = author.name.replace(/^and\s+/i, "");
    const displayName = name.replace(/\*+$/g, "");
    const profileHref = getAuthorProfileHref(name, authorProfileLookup);
    const formattedName = profileHref ? (
      <Link key={`${displayName}-${index}`} href={profileHref} className={authorLinkClassName}>
        {displayName}
      </Link>
    ) : (
      displayName
    );

    if (index === 0) {
      return formattedName;
    }

    if (index === authors.length - 1) {
      return (
        <span key={`${name}-${index}`}>
          {authors.length === 2 ? " and " : ", and "}
          {formattedName}
        </span>
      );
    }

    return (
      <span key={`${name}-${index}`}>
        , {formattedName}
      </span>
    );
  });
