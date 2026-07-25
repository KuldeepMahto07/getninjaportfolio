"use client";

import { useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import MagneticButton from "@/components/motion/MagneticButton";
import SplitText from "@/components/motion/SplitText";
import { profile } from "@/data/content";
import styles from "./Hero.module.scss";

/**
 * Hero entrance sequence (spec §03).
 *
 * Ordering follows the reference's delay ladder [extracted]: meta ~0.3s,
 * headline words from ~0.5s, role 0.9s, description 1.1s, CTA 1.25s.
 * The name lines reveal through their masks (translateY 110% -> 0) rather
 * than fading, and each line starts slightly after the previous one.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const q = gsap.utils.selector(scope);

      const nameLines = q("[data-hero-name] [data-split-inner]");
      const roleWords = q("[data-hero-role] [data-split-inner]");
      const descWords = q("[data-hero-desc] [data-split-inner]");

      // `y: 0` clears the CSS pre-state so GSAP doesn't add it to yPercent.
      gsap.set([...nameLines, ...roleWords, ...descWords], { yPercent: 110, y: 0 });
      gsap.set(q("[data-hero-fade]"), { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        // 1 — meta lines
        .to(q("[data-hero-meta]"), { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        // 2/3 — ROHIT then SHARMA, each line offset
        .to(nameLines, { yPercent: 0, y: 0, duration: 1.1, stagger: 0.09 }, 0.5)
        // 4 — role
        .to(roleWords, { yPercent: 0, y: 0, duration: 0.7, stagger: 0.03 }, 0.9)
        // 5 — description
        .to(descWords, { yPercent: 0, y: 0, duration: 0.6, stagger: 0.012 }, 1.1)
        // 6 — CTA + scroll hint
        .to(q("[data-hero-cta]"), { opacity: 1, y: 0, duration: 0.8 }, 1.25);
    },
    ref,
    [],
  );

  return (
    <section ref={ref} className={styles.hero} id="top">
      <div className={styles.inner}>
        <div className={styles.meta}>
          <span data-hero-meta data-hero-fade>
            {profile.role}
          </span>
          <span data-hero-meta data-hero-fade>
            {profile.location}
            <br />
            Est. 2020
          </span>
        </div>

        <h1 className={styles.name} data-hero-name>
          <SplitText text={profile.firstName} mode="lines" as="span" className={styles.nameLine} />
          <SplitText text={profile.lastName} mode="lines" as="span" className={styles.nameLine} />
        </h1>

        <div className={styles.roleRow}>
          <SplitText
            text={profile.tagline}
            mode="words"
            as="p"
            className={styles.role}
            // marker attr for the timeline
            {...{ "data-hero-role": "" }}
          />
        </div>

        <div className={styles.bottom}>
          <SplitText
            text={profile.intro}
            mode="words"
            as="p"
            className={styles.desc}
            {...{ "data-hero-desc": "" }}
          />

          <div className={styles.ctaWrap} data-hero-cta data-hero-fade>
            <MagneticButton
              as="a"
              href={`mailto:${profile.email}?subject=Project%20Inquiry`}
              className={styles.cta}
              strength={14}
              data-cursor="button"
            >
              <span>Let&apos;s work together</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5.5M12 4V10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
