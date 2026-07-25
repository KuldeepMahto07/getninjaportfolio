import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import MotionFlag from "@/components/motion/MotionFlag";
import { profile } from "@/data/content";
import "@/styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const title = `${profile.firstName} ${profile.lastName} — ${profile.role}`;

export const metadata: Metadata = {
  title,
  description: `${profile.tagline} ${profile.intro}`,
  authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
  keywords: [
    "Rohit Sharma",
    "Generative AI Developer",
    "AWS",
    "NLP",
    "Machine Learning",
    "MLOps",
    "LangChain",
    "Bedrock Agents",
    "Bangalore",
  ],
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
  themeColor: "#f4f2ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body>
        {/* Flags <html> for animation *before* paint so pre-animation
            hidden states never flash for no-JS / reduced-motion users. */}
        <MotionFlag />
        <SmoothScroll>
          {children}
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
