'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

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
            <a href="#" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">People</a>
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
          <button className="lg:hidden text-gray-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
