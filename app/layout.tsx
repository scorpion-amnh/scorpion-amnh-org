import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arachnology at AMNH | Scorpion Systematics Research Group",
  description: "The Arachnology Lab in the Division of Invertebrate Zoology at the American Museum of Natural History focuses on the taxonomy, phylogeny and biogeography of scorpions and related arachnid orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-hidden`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700 bg-gray-900">
          <div className="mx-auto max-w-7xl w-full">
            <div className="flex w-full items-center justify-between pl-6 pr-4 md:pl-8 md:pr-8 xl:pl-10 xl:pr-10 gap-6 py-4 xl:py-6">
            <div className="flex-1 min-w-0 max-w-[400px]">
              <Image
                src="/images/logo-color-on-dark.svg"
                alt="Arachnology at AMNH Logo"
                width={400}
                height={40}
                priority
                className="w-full h-auto"
              />
            </div>
            <nav className="hidden lg:flex lg:items-center lg:gap-6">
              <a href="/" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">Home</a>
              <a href="/arachnids" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">Arachnids</a>
              <a href="/research" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">Research</a>
              <a href="#" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">People</a>
              <a href="/facilities" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">Facilities</a>
              <a href="/collections" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">Collections</a>
              <a href="#" className="text-sm xl:text-base font-medium text-gray-300 hover:text-white">Publications</a>
            </nav>
            <button className="lg:hidden text-gray-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            </div>
          </div>
        </header>
        <div className="pt-24 xl:pt-28">
          {children}
        </div>
        <footer className="bg-gray-900 text-white p-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <p className="text-sm">&copy; Copyright Lorenzo Prendini 2026. All Rights Reserved.</p>
            <a href="https://www.amnh.org" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/amnh-logo-white.svg"
                alt="Logo: American Museum of Natural History"
                width={150}
                height={50}
              />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
