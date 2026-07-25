"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { useNormalizedPointer } from "@/hooks/useMousePosition";
import ImageReveal from "@/components/motion/ImageReveal";
import TextReveal from "@/components/motion/TextReveal";
import ParallaxLayer from "@/components/motion/ParallaxImage";
import type { Project } from "@/data/content";
import styles from "./ProjectCard.module.scss";

/**
 * Editorial project case study (spec §07, §08, §09, §12, §13).
 *
 * - Image: clip-path mask reveal + scale 1.08 -> 1 (ImageReveal) and a
 *   scrubbed scroll parallax on the inner layer.
 * - Hover: image to 1.04, tint shift, cursor -> "View", title nudge,
 *   arrow diagonal translate, metadata dims.
 * - Mouse: image drifts +-10px toward the pointer with a slight rotation,
 *   all through quickTo.
 * - The oversized numeral drifts against the scroll for depth.
 */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { reduced, finePointer, ready } = useMotionPreference();
  const { measure, normalize } = useNormalizedPointer(frameRef);

  // Metadata + link fade (kept separate from the image reveal timing)
  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const q = gsap.utils.selector(scope);
      const bits = q("[data-meta-row], [data-note], [data-view]");
      gsap.set(bits, { opacity: 0, y: 24 });
      gsap.to(bits, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: scope, start: "top 80%", once: true },
      });
    },
    rootRef,
    [],
  );

  // Mouse-driven parallax + hover state
  useEffect(() => {
    if (!ready || reduced || !finePointer) return;
    const frame = frameRef.current;
    const root = rootRef.current;
    if (!frame || !root) return;

    const img = frame.querySelector<HTMLElement>("[data-reveal-img]");
    const title = root.querySelector<HTMLElement>("[data-title-inner]");
    const meta = root.querySelector<HTMLElement>("[data-meta]");
    if (!img) return;

    const xTo = gsap.quickTo(img, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(img, "y", { duration: 0.9, ease: "power3.out" });
    const rTo = gsap.quickTo(img, "rotate", { duration: 1.1, ease: "power3.out" });

    const onEnter = () => {
      measure();
      root.classList.add(styles.isHover);
      gsap.to(img, { scale: 1.04, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      if (title) gsap.to(title, { x: 16, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      if (meta) gsap.to(meta, { opacity: 0.45, duration: 0.45, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      const { x, y } = normalize(e);
      xTo(x * 10);
      yTo(y * 10);
      rTo(x * 1);
    };

    const onLeave = () => {
      root.classList.remove(styles.isHover);
      gsap.to(img, { scale: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      xTo(0);
      yTo(0);
      rTo(0);
      if (title) gsap.to(title, { x: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      if (meta) gsap.to(meta, { opacity: 1, duration: 0.45, overwrite: "auto" });
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
      gsap.killTweensOf([img, title, meta].filter(Boolean) as HTMLElement[]);
    };
  }, [ready, reduced, finePointer, measure, normalize]);

  const alt = index % 2 === 1;

  return (
    <article ref={rootRef} className={`${styles.card} ${alt ? styles.alt : ""}`}>
      <a
        ref={frameRef as never}
        className={styles.media}
        href={project.href}
        target="_blank"
        rel="noopener"
        aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`}
        data-cursor="project"
      >
        <ParallaxLayer className={styles.numWrap} amount={18}>
          <span className={styles.num} aria-hidden="true">
            <i>{project.num.slice(0, 1)}</i>
            {project.num.slice(1)}
          </span>
        </ParallaxLayer>

        <div className={`${styles.frame} ${project.stage === "warm" ? styles.stageWarm : ""}`}>
          <ImageReveal
            src={project.image}
            alt={project.imageAlt}
            width={project.fit === "cover" ? 1600 : 622}
            height={project.fit === "cover" ? 1000 : 680}
            fit={project.fit}
            parallax={6}
            scaleFrom={1.08}
            duration={1.5}
          />
          <span className={styles.tint} aria-hidden="true" />
        </div>
      </a>

      <div className={styles.side}>
        <dl className={styles.meta} data-meta>
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
      </div>

      <div className={styles.head}>
        <span className={styles.titleClip}>
          <span data-title-inner className={styles.titleInner}>
            <TextReveal
              text={project.title}
              mode="chars"
              as="span"
              className={styles.title}
              stagger={0.04}
              duration={0.9}
              start="top 85%"
            />
          </span>
        </span>
        <span className={styles.category}>{project.category}</span>
      </div>

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
    </article>
  );
}
