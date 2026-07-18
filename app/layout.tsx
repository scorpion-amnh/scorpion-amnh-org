import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/app/components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "600", "700"],
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: getSiteSettings().defaultMetaTitle,
  description: getSiteSettings().defaultMetaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navItems } = getSiteSettings();

  return (
    <html lang="en" className={sourceSans.variable}>
      <body className="antialiased">
        <Header navItems={navItems} />
        <div className="pt-[var(--header-height)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
