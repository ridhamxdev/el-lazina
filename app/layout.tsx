import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EL LAZINA — Café · Live Music · Auto Culture",
  description:
    "EL LAZINA is a culture-first café: open mic nights, live jamming, in-house music production and weekend auto shows. Coffee that stays up as late as you do.",
  openGraph: {
    title: "EL LAZINA — Café · Live Music · Auto Culture",
    description:
      "Open mics, live jamming, music production and auto shows. Where the night finds its rhythm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain bg-ink text-cream antialiased">
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
