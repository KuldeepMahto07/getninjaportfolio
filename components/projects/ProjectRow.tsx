"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { useNormalizedPointer } from "@/hooks/useMousePosition";
import ImageReveal from "@/components/motion/ImageReveal";
import TextReveal from "@/components/motion/TextReveal";
import type { Project } from "@/data/content";
import styles from "./ProjectRow.module.scss";

/**
 * One project state in the Selected Works choreography
 * (ANIMATION_REFERENCE §4, §5).
 *
 * Layout is the two-zone composition from the recording: an enormous index on
 * the left and the dominant project visual on the right.
 *
 * The index is anchored with `position: sticky` inside its own grid cell. That
 * cell is as tall as the row, so the number stays visually fixed for the whole
 * of *its* project and then hands off to the next one when that row arrives.
 * Being CSS rather than a pinned ScrollTrigger, it is exactly reversible,
 * freezes wherever you stop, and cannot double-scroll or desync from Lenis.
 */
export default function ProjectRow({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLAnchorElement>(null);
  const { reduced, finePointer, ready } = useMotionPreference();
  const { measure, normalize } = useNormalizedPointer(frameRef);

  // Index + caption metadata reveal
  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const q = gsap.utils.selector(scope);

      const index = q("[data-index]");
      gsap.fromTo(
        index,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: scope, start: "top 80%", once: true },
        },
      );

      const bits = q("[data-meta-row], [data-note], [data-view], [data-pill]");
      gsap.fromTo(
        bits,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: q("[data-caption]")[0] ?? scope, start: "top 90%", once: true },
        },
      );
    },
    rootRef,
    [],
  );

  // Hover + mouse parallax (desktop pointers only)
  useEffect(() => {
    if (!ready || reduced || !finePointer) return;
    const frame = frameRef.current;
    const root = rootRef.current;
    if (!frame || !root) return;

    const img = frame.querySelector<HTMLElement>("[data-reveal-img]");
    const title = root.querySelector<HTMLElement>("[data-title-inner]");
    if (!img) return;

    const xTo = gsap.quickTo(img, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(img, "y", { duration: 0.9, ease: "power3.out" });

    const onEnter = () => {
      measure();
      root.classList.add(styles.isHover);
      // Restrained, per the reference: 1 -> 1.025
      gsap.to(img, { scale: 1.025, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      if (title) gsap.to(title, { x: 14, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      const { x, y } = normalize(e);
      xTo(x * 10);
      yTo(y * 10);
    };

    const onLeave = () => {
      root.classList.remove(styles.isHover);
      gsap.to(img, { scale: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      xTo(0);
      yTo(0);
      if (title) gsap.to(title, { x: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" });
    };

    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      gsap.killTweensOf([img, title].filter(Boolean) as HTMLElement[]);
    };
  }, [ready, reduced, finePointer, measure, normalize]);

  return (
    <article ref={rootRef} className={styles.row}>
      {/* LEFT — oversized index */}
      <div className={styles.indexCol}>
        <span className={styles.indexSticky}>
          <span className={styles.index} data-index aria-hidden="true">
            {project.num}
          </span>
        </span>
      </div>

      {/* RIGHT — dominant visual */}
      <div className={styles.content}>
        <a
          ref={frameRef}
          className={styles.media}
          href={project.href}
          target="_blank"
          rel="noopener"
          aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`}
          data-cursor="project"
        >
          <div className={`${styles.frame} ${project.stage === "warm" ? styles.stageWarm : ""}`}>
            <ImageReveal
              src={project.image}
              alt={project.imageAlt}
              width={project.fit === "cover" ? 1600 : 622}
              height={project.fit === "cover" ? 1000 : 680}
              fit={project.fit}
              parallax={4}
              scaleFrom={1.08}
              duration={1.5}
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <span className={styles.tint} aria-hidden="true" />
          </div>
        </a>

        <div className={styles.caption} data-caption>
          <div>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.titleClip}>
              <span className={styles.titleInner} data-title-inner>
                <TextReveal
                  text={project.title}
                  mode="chars"
                  as="span"
                  className={styles.title}
                  stagger={0.035}
                  duration={0.85}
                  start="top 92%"
                />
              </span>
            </span>
          </div>
          <div className={styles.pills}>
            <span className={styles.pill} data-pill>
              {project.tag}
            </span>
            <span className={styles.pill} data-pill>
              {project.year}
            </span>
          </div>
        </div>

        <dl className={styles.meta}>
          {project.meta.map((m) => (
            <div className={styles.metaRow} key={m.key} data-meta-row>
              <dt>{m.key}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.note ? (
          <p className={styles.note} data-note>
            {project.note}
          </p>
        ) : null}

        <a
          className={styles.view}
          href={project.href}
          target="_blank"
          rel="noopener"
          data-view
          data-cursor="link"
        >
          {project.linkLabel}
          <span className={styles.arrow} aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
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
    </article>
  );
}
