"use client";

import { useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import SectionHead from "@/components/layout/SectionHead";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import { about, profile } from "@/data/content";
import styles from "./About.module.scss";

/**
 * About (spec §15).
 *
 * Sequence: the panel wipes open with a clip-path reveal, its contents
 * de-scale from 1.08, and the copy follows so the eye lands on the panel
 * first. The inner layer also carries a slow scrubbed parallax.
 *
 * No portrait photograph was supplied, so the frame holds a typographic
 * monogram rather than a stock image standing in for the person.
 */
export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const panel = scope.querySelector<HTMLElement>("[data-panel]");
      const inner = scope.querySelector<HTMLElement>("[data-panel-inner]");
      if (!panel || !inner) return;

      gsap.set(panel, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 });
      gsap.set(inner, { scale: 1.08 });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: panel, start: "top 85%", once: true },
        })
        .to(panel, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.5 }, 0)
        .to(inner, { scale: 1, duration: 1.6 }, 0);

      gsap.fromTo(
        inner,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    ref,
    [],
  );

  return (
    <section ref={ref} className={styles.section} id="about">
      <div className={styles.inner}>
        <SectionHead label="(About me)" title="The person behind the work" mode="words" />

        <div className={styles.grid}>
          <div className={styles.portrait} data-panel data-clip data-fade>
            <div className={styles.portraitInner} data-panel-inner>
              <span className={styles.monogram} aria-hidden="true">
                RS
              </span>
              <span className={styles.portraitMeta}>
                <span>{profile.role}</span>
                <span>{profile.location}</span>
              </span>
            </div>
          </div>

          <div className={styles.body}>
            <TextReveal
              text={about.lead}
              mode="words"
              as="p"
              className={styles.lead}
              stagger={0.03}
              duration={0.8}
            />

            <Reveal className={styles.paras} stagger={0.1} y={30}>
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Reveal className={styles.creds} stagger={0.06} y={20}>
              {about.credentials.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
