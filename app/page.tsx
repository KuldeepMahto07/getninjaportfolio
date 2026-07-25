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
import SectionTransition from "@/components/motion/SectionTransition";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Each section owns its own motion. SectionTransition reproduces the
            reference's handoff: the hero recedes as #services rises into view. */}
        <SectionTransition triggerSelector="#services">
          <Hero />
        </SectionTransition>

        <WhatIDo />
        <SelectedWorks />
        <MarqueeBand />
        <Skills />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
