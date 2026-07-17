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
    <h4 className="text-base font-bold mb-3 text-gray-900">{heading}</h4>
    {links.map((link) => (
      <p key={link.href}>
        <a
          href={link.href}
          target="_blank"
          rel={link.external === false ? undefined : "noopener noreferrer"}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {link.label}
        </a>
      </p>
    ))}
  </div>
);
