'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HeaderNav, type HeaderNavItem } from "@/app/components/HeaderNav";
import { CloseIcon } from "@/app/components/icons/CloseIcon";
import { MenuIcon } from "@/app/components/icons/MenuIcon";

type HeaderProps = {
  navItems: HeaderNavItem[];
};

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    const root = document.documentElement;
    const updateHeight = () => {
      if (!headerRef.current) {
        return;
      }
      const height = headerRef.current.getBoundingClientRect().height;
      root.style.setProperty("--header-height", `${height}px`);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700 bg-gray-900"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="flex w-full items-center justify-between pl-6 pr-4 md:pl-8 md:pr-8 xl:pl-10 xl:pr-10 gap-6 py-4 xl:py-6">
          <div className="flex-1 min-w-0 max-w-[400px]">
            <Link href="/">
              <Image
                src="/images/logos/logo-color-on-dark.svg"
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
            <MenuIcon />
          </button>
        </div>
        <div
          id="mobile-nav"
          className={`lg:hidden fixed inset-0 z-40 ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            className={`absolute inset-0 bg-black/60 transition-opacity ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-72 max-w-[85%] bg-gray-900 border-l border-gray-800 shadow-2xl transition-transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
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
                <CloseIcon />
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
