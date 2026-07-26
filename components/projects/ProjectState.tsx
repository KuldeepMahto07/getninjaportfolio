"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
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
  const rootRef = useRef<HTMLElement>(null);
  const { reduced, finePointer, ready } = useMotionPreference();

  // Scroll parallax lives on the image node only (Pass 6). Scrubbed, ease
  // "none" — it must track scroll exactly and reverse on the way back.
  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const img = scope.querySelector<HTMLElement>("[data-project-image]");
      const mask = img?.parentElement;
      if (!img || !mask) return;

      gsap.fromTo(
        img,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: mask, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    rootRef,
    [],
  );

  // Restrained hover: 1 -> 1.025, no tilt, no fake 3D.
  useEffect(() => {
    if (!ready || reduced || !finePointer) return;
    const root = rootRef.current;
    // Hover scale targets the <img> itself, NOT [data-project-image] — that
    // wrapper is owned by the scrubbed parallax. Two systems writing transform
    // to one node silently cancel each other out (ANIMATION_REFERENCE §11).
    const img = root?.querySelector<HTMLElement>("[data-project-image] img");
    const link = root?.querySelector<HTMLElement>('[data-cursor="project"]');
    if (!img || !link) return;

    // A plain tween, not quickTo: quickTo is for high-frequency per-frame
    // updates (mouse follow), and a one-shot hover state doesn't need it.
    const to = (scale: number) =>
      gsap.to(img, { scale, duration: 0.7, ease: "power3.out", overwrite: "auto" });
    const onEnter = () => to(1.025);
    const onLeave = () => to(1);

    link.addEventListener("pointerenter", onEnter);
    link.addEventListener("pointerleave", onLeave);
    // Marker so automated checks can assert the handlers really attached
    // (a silently-skipped effect looks identical to a broken animation).
    link.dataset.hoverReady = "1";

    return () => {
      link.removeEventListener("pointerenter", onEnter);
      link.removeEventListener("pointerleave", onLeave);
      delete link.dataset.hoverReady;
      gsap.killTweensOf(img);
    };
  }, [ready, reduced, finePointer]);

  return (
    <article ref={rootRef} className={styles.state}>
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
            {/* Where no product screenshot exists, the plate is labelled and the
              artwork held small, so it reads as an editorial plate rather than
              pretending to be a product shot. */}
          {project.assetNote ? (
            <span className={styles.plateLabel} aria-hidden="true">
              <span>{project.title}</span>
              <span>In-app artwork · no screenshot</span>
            </span>
          ) : null}

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
