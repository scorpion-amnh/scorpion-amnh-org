import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { Header } from "./header";
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
        <Header />
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
