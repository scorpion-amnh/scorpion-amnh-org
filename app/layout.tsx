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
        <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900">
          <div className="flex h-16 w-full items-center justify-between px-4">
            <Image
              src="/images/logo-color-on-dark.svg"
              alt="Arachnology at AMNH Logo"
              width={120}
              height={40}
              priority
            />
            <nav className="hidden md:flex md:items-center md:gap-6">
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Home</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Arachnids</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Research</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">People</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Facilities</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Collections</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Publications</a>
            </nav>
            <button className="md:hidden text-gray-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </header>
        {children}
        <footer className="bg-gray-900 text-white text-center p-4 mt-4">
          <p className="text-sm">&copy; 2026 Your Company. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
