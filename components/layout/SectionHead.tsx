"use client";

import TextReveal from "@/components/motion/TextReveal";
import ScrambledText from "@/components/motion/ScrambledText";
import Reveal from "@/components/motion/Reveal";
import type { SplitMode } from "@/components/motion/SplitText";
import styles from "./SectionHead.module.scss";

/**
 * Shared section heading.
 *
 * The heading itself uses a masked reveal; `mode` is varied per section so no
 * two headings animate identically. The small parenthesised label is the one
 * place a scramble is appropriate (ANIMATION_REFERENCE §9) — big type keeps
 * the mask.
 */
export default function SectionHead({
  label,
  title,
  mode = "words",
}: {
  label: string;
  title: string;
  mode?: SplitMode;
}) {
  return (
    <div className={styles.head}>
      <Reveal className={styles.labelWrap} y={16} stagger={0} duration={0.6}>
        <ScrambledText text={label} className={styles.label} />
      </Reveal>
      <TextReveal
        text={title}
        mode={mode}
        as="h2"
        className={styles.title}
        stagger={mode === "chars" ? 0.018 : 0.05}
        duration={0.9}
      />
    </div>
  );
}
