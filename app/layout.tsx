import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "./header";
import { Footer } from "./components/Footer";
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
        <Header />
        <div className="pt-[var(--header-height)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
