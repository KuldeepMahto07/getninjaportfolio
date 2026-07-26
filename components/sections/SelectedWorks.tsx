"use client";

import SectionHead from "@/components/layout/SectionHead";
import TextReveal from "@/components/motion/TextReveal";
import ProjectRow from "@/components/projects/ProjectRow";
import { projects } from "@/data/content";
import styles from "./SelectedWorks.module.scss";

/**
 * Selected Works (ANIMATION_REFERENCE §4, §5).
 *
 * The heading reveals first, then the intro copy, then each project runs its
 * own state: giant index anchored left, dominant visual right. Yummi and Deblo
 * never enter together — each row owns its triggers and its own sticky range.
 */
export default function SelectedWorks() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.inner}>
        <SectionHead label="(Projects)" title="Selected Works /" mode="words" />

        <TextReveal
          text="Two builds that show the range — a cross-platform product with a Go backend, and an AI assistant running live in production."
          mode="words"
          as="p"
          className={styles.intro}
          stagger={0.012}
          duration={0.6}
        />

        <div className={styles.list}>
          {projects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
