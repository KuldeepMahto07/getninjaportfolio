"use client";

import Marquee from "@/components/motion/Marquee";
import { marqueeWords } from "@/data/content";
import styles from "./MarqueeBand.module.scss";

/**
 * Inverted band between sections (spec §20). The dark block against the cream
 * page gives the section boundary weight, and the marquee crossing it edge to
 * edge is what makes the transition feel deliberate rather than abrupt.
 */
export default function MarqueeBand() {
  return (
    <section className={styles.band} aria-label="Roles">
      <Marquee items={marqueeWords} speed={70} direction="left" />
    </section>
  );
}
