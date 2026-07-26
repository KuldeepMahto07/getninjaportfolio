import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import SelectedWorks from "@/components/sections/SelectedWorks";
import MarqueeBand from "@/components/sections/MarqueeBand";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import SectionSheet from "@/components/motion/SectionSheet";
import SectionTransition from "@/components/motion/SectionTransition";

/**
 * Sheet stacking (ANIMATION_REFERENCE §2, §12).
 *
 * Sheets ascend in z-index so each one rises over the last. The hero sheet is
 * pinned, so its canvas stays behind while the dark services sheet slides up
 * across it — and its *contents* recede separately via SectionTransition,
 * which is what the recording shows at ~4s (white canvas still visible up top,
 * hero copy already gone).
 *
 * Tonal rhythm, matching the reference:
 *   light hero -> dark content -> light editorial -> dark contact -> light footer
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <SectionSheet tone="light" z={1} pinned>
          {/* Sticky lives on the sheet; the transform lives inside, so the
              transformed wrapper can't break the sticky containing block. */}
          <SectionTransition triggerSelector="#services">
            <Hero />
          </SectionTransition>
        </SectionSheet>

        {/* Dark canvas: services -> works -> marquee -> skills */}
        <SectionSheet tone="dark" z={2} rise>
          <WhatIDo />
          <SelectedWorks />
          <MarqueeBand />
          <Skills />
        </SectionSheet>

        {/* Light break */}
        <SectionSheet tone="light" z={3} rise>
          <About />
          <Experience />
        </SectionSheet>

        {/* Dark contact sheet, ending above the light footer */}
        <SectionSheet tone="dark" z={4} rise>
          <Contact />
        </SectionSheet>
      </main>

      {/* Revealed underneath the contact sheet */}
      <SectionSheet tone="light" z={5}>
        <Footer />
      </SectionSheet>
    </>
  );
}
