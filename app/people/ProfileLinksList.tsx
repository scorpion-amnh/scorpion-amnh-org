import { ExternalLink } from "@/app/components/ExternalLink";

export type ProfileLink = {
  href: string;
  label: string;
  external?: boolean;
};

type ProfileLinksListProps = {
  links: ProfileLink[];
  heading?: string;
};

export const ProfileLinksList = ({
  links,
  heading = "CV and Online Profiles",
}: ProfileLinksListProps) => (
  <div className="space-y-3 mt-8 mb-8">
    <h4 className="font-bold mb-3">{heading}</h4>
    {links.map((link) => (
      <p key={link.href}>
        {link.external === false ? (
          <a href={link.href} className="text-color-link hover:text-color-link-hover underline">
            {link.label}
          </a>
        ) : (
          <ExternalLink href={link.href}>{link.label}</ExternalLink>
        )}
      </p>
    ))}
  </div>
);
