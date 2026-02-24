'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HeaderNav, type HeaderNavItem } from "./components/HeaderNav";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navItems: HeaderNavItem[] = [
    { href: "/", label: "Home" },
    { href: "/arachnids", label: "Arachnids" },
    { href: "/research", label: "Research" },
    { href: "/people", label: "People" },
    { href: "/facilities", label: "Facilities" },
    { href: "/collections", label: "Collections" },
    { href: "/fieldwork", label: "Fieldwork" },
    { href: "/publications", label: "Publications" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700 bg-gray-900">
      <div className="mx-auto max-w-7xl w-full">
        <div className="flex w-full items-center justify-between pl-6 pr-4 md:pl-8 md:pr-8 xl:pl-10 xl:pr-10 gap-6 py-4 xl:py-6">
          <div className="flex-1 min-w-0 max-w-[400px]">
            <Link href="/">
              <Image
                src="/images/logo-color-on-dark.svg"
                alt="Arachnology at AMNH Logo"
                width={400}
                height={40}
                priority
                className="w-full h-auto"
              />
            </Link>
          </div>
          <HeaderNav items={navItems} isActive={isActive} variant="desktop" />
          <button
            type="button"
            className="lg:hidden text-gray-300"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div
          id="mobile-nav"
          className={`lg:hidden fixed inset-0 z-40 ${
            isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            className={`absolute inset-0 bg-black/60 transition-opacity ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-72 max-w-[85%] bg-gray-900 border-l border-gray-800 shadow-2xl transition-transform ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Menu</span>
              <button
                type="button"
                aria-label="Close navigation menu"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <HeaderNav
              items={navItems}
              isActive={isActive}
              variant="mobile"
              onNavigate={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
