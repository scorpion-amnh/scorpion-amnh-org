import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

export default function NotFound() {
  const { navItems } = getSiteSettings();

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-bold mb-4">Page not found</h1>
        <p className="mb-8">
          The page you requested does not exist or may have moved.
        </p>
        <Link href="/" className="text-color-link hover:text-color-link-hover underline">
          Return to home
        </Link>
        <nav className="mt-10" aria-label="Site navigation">
          <h2 className="font-bold mb-4">Browse the site</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-color-link hover:text-color-link-hover underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
