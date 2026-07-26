"use client";

import Image from "next/image";
import ScrambledText from "@/components/motion/ScrambledText";
import { asset } from "@/lib/asset";
import type { Project } from "@/data/content";
import styles from "./ProjectState.module.scss";

/**
 * One project state — frames 8 → 10.
 *
 * Two-zone composition: the giant mono index on the left (~40%, ~21vw, grey,
 * bleeding toward the left edge) and the large project visual on the right
 * (~55%, roughly square).
 *
 * The index is `position: sticky` inside its own grid cell. The cell is as tall
 * as the state, so `01` stays visually anchored for the whole of its project
 * and hands off to `02` when the next state arrives. Being CSS rather than a
 * pinned ScrollTrigger, it freezes when scrolling stops and reverses exactly.
 *
 * DOM split matters (see ANIMATION_REFERENCE §11): the visual mask and the
 * image are separate elements, so scroll choreography and image parallax/hover
 * never write `transform` to the same node.
 */
export default function ProjectState({ project }: { project: Project }) {
  return (
    <article className={styles.state}>
      <div className={styles.indexCol}>
        <span className={styles.indexSticky}>
          <span className={styles.index} data-index aria-hidden="true">
            {project.index}
          </span>
        </span>
      </div>

      <div className={styles.contentCol}>
        <a
          className={styles.mediaLink}
          href={project.href}
          target="_blank"
          rel="noopener"
          aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`}
          data-cursor="project"
        >
          {/* mask: choreography lives here */}
          <div className={`${styles.mask} ${project.fit === "contain" ? styles.stage : ""}`}>
            {/* image: parallax + hover live here */}
            <div className={styles.image} data-project-image>
              <Image
                src={asset(project.image)}
                alt={project.imageAlt}
                width={project.fit === "cover" ? 1600 : 622}
                height={project.fit === "cover" ? 1000 : 680}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className={project.fit === "cover" ? styles.cover : styles.contain}
              />
            </div>
          </div>
        </a>

        <div className={styles.caption}>
          <div className={styles.captionLeft}>
            <span className={styles.category}>
              <ScrambledText text={project.category} />
            </span>
            <h3 className={styles.title}>{project.title}</h3>
          </div>
          <div className={styles.pills}>
            <span className={styles.pill}>
              <ScrambledText text={project.discipline} />
            </span>
            <span className={styles.pill}>{project.year}</span>
          </div>
        </div>

        <div className={styles.meta}>
          <p className={styles.desc} data-fade>
            {project.description}
          </p>
          <ul className={styles.stack}>
            {project.stack.map((tech) => (
              <li key={tech}>
                <ScrambledText text={tech} />
              </li>
            ))}
          </ul>
          {project.assetNote ? <p className={styles.assetNote}>{project.assetNote}</p> : null}
          <a
            className={styles.view}
            href={project.href}
            target="_blank"
            rel="noopener"
            data-cursor="link"
          >
            <ScrambledText text={project.linkLabel} />
            <span className={styles.arrow} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 12L12 4M12 4H5.5M12 4V10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
