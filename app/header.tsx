'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

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
          <nav className="hidden lg:flex lg:items-center lg:gap-6">
            <Link 
              href="/" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/') && pathname === '/'
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/arachnids" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/arachnids')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Arachnids
            </Link>
            <Link 
              href="/research" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/research')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Research
            </Link>
            <Link 
              href="/people" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/people')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              People
            </Link>
            <Link 
              href="/facilities" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/facilities')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Facilities
            </Link>
            <Link 
              href="/collections" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/collections')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Collections
            </Link>
            <Link 
              href="/fieldwork" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/fieldwork')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Fieldwork
            </Link>
            <Link 
              href="/publications" 
              className={`text-sm xl:text-base font-medium transition-colors ${
                isActive('/publications')
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Publications
            </Link>
          </nav>
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
            <nav className="px-5 py-4 space-y-3">
              <Link 
                href="/" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/') && pathname === '/'
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/arachnids" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/arachnids')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Arachnids
              </Link>
              <Link 
                href="/research" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/research')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Research
              </Link>
              <Link 
                href="/people" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/people')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                People
              </Link>
              <Link 
                href="/facilities" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/facilities')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Facilities
              </Link>
              <Link 
                href="/collections" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/collections')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/fieldwork" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/fieldwork')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Fieldwork
              </Link>
              <Link 
                href="/publications" 
                className={`block text-base font-medium transition-colors ${
                  isActive('/publications')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Publications
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
