import Link from "next/link";

export type HeaderNavItem = {
  href: string;
  label: string;
};

type HeaderNavProps = {
  items: HeaderNavItem[];
  isActive: (href: string) => boolean;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function HeaderNav({ items, isActive, variant, onNavigate }: HeaderNavProps) {
  const isDesktop = variant === "desktop";

  return (
    <nav className={isDesktop ? "hidden lg:flex lg:items-center lg:gap-6" : "px-5 py-4 space-y-3"}>
      {items.map((item) => {
        const isCurrent = isActive(item.href);
        const className = isDesktop
          ? `text-sm xl:text-base font-medium transition-colors ${
              isCurrent
                ? "text-gray-50 border-b-2 border-blue-500 pb-1"
                : "text-gray-300 hover:text-gray-50"
            }`
          : `block text-base font-medium transition-colors ${
              isCurrent ? "text-gray-50" : "text-gray-300 hover:text-gray-50"
            }`;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={className}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
