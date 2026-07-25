"use client";

import TextReveal from "@/components/motion/TextReveal";
import type { SplitMode } from "@/components/motion/SplitText";
import styles from "./SectionHead.module.scss";

/**
 * Shared section heading. `mode` is varied per section on purpose so that no
 * two headings animate identically (spec §02).
 */
export default function SectionHead({
  label,
  title,
  mode = "words",
  invert = false,
}: {
  label: string;
  title: string;
  mode?: SplitMode;
  invert?: boolean;
}) {
  return (
    <div className={`${styles.head} ${invert ? styles.invert : ""}`}>
      <TextReveal
        text={label}
        mode="chars"
        as="span"
        className={styles.label}
        stagger={0.02}
        duration={0.5}
      />
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
