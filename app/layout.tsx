import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import MotionFlag from "@/components/motion/MotionFlag";
import RevealEngine from "@/components/motion/RevealEngine";
import { profile } from "@/data/content";
import "@/styles/globals.scss";

// Neo-grotesk for everything structural. No serif anywhere.
const grotesk = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-grotesk",
  display: "swap",
});

// Mono carries the giant project indices, micro labels and captions — in the
// frames the giant "01" has a dotted zero, which is what marks it as mono.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  title,
  description: profile.tagline,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title,
    description: profile.tagline,
    siteName: title,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: profile.tagline },
};

export const viewport: Viewport = {
  themeColor: "#f0f0eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <MotionFlag />
        <SmoothScroll>
          {children}
          {/* Mounted after the page so every reveal hook exists in the DOM. */}
          <RevealEngine />
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
