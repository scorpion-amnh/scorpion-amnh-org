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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 backdrop-blur bg-gray-900 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Image
              src="/images/logo-color-on-dark.svg"
              alt="Arachnology at AMNH Logo"
              width={400}
              height={267}
              priority
            />
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300">Home</a>
              <a href="#" className="text-white hover:text-blue-300">Arachnids</a>
              <a href="#" className="text-white hover:text-blue-300">Research</a>
              <a href="#" className="text-white hover:text-blue-300">People</a>
              <a href="#" className="text-white hover:text-blue-300">Facilities</a>
              <a href="#" className="text-white hover:text-blue-300">Collections</a>
              <a href="#" className="text-white hover:text-blue-300">Publications</a>
            </nav>
            <div className="md:hidden">
              <button className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
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
