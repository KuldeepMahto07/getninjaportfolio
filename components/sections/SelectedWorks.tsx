"use client";

import SectionHead from "@/components/layout/SectionHead";
import TextReveal from "@/components/motion/TextReveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/content";
import styles from "./SelectedWorks.module.scss";

/**
 * Selected Works (spec §12).
 *
 * Heading reveals first, then the intro copy, then each project on its own
 * trigger — so Yummi and Deblo never enter together.
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
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
