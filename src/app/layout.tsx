import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "CodeAtlas — Free Computer Science Learning Platform",
  description:
    "Learn, practice, build projects, and launch your career in computer science. CodeAtlas is the free CS platform with roadmaps, coding challenges, and an AI tutor.",
};

export const viewport: Viewport = {
  themeColor: "#0d0e0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable}`}>
      <body className="grain font-sans antialiased">{children}</body>
    </html>
  );
}
