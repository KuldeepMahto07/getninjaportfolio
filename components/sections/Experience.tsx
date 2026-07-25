"use client";

import { useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import SectionHead from "@/components/layout/SectionHead";
import { experience } from "@/data/content";
import styles from "./Experience.module.scss";

/**
 * Experience (spec §16). Rows enter one after another; on hover the company
 * name shifts, the arrow moves and the technology list lifts from muted to
 * full contrast. Hover styling is CSS-only so it costs nothing on touch.
 */
export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const rows = scope.querySelectorAll<HTMLElement>("[data-row]");

      rows.forEach((row, i) => {
        const rule = row.querySelector("[data-row-rule]");
        const cells = row.querySelectorAll("[data-cell]");

        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(cells, { y: 34, opacity: 0 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          })
          .to(rule, { scaleX: 1, duration: 1, ease: "expo.out" }, 0)
          .to(cells, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 }, 0.06 + i * 0.02);
      });
    },
    ref,
    [],
  );

  return (
    <section ref={ref} className={styles.section} id="experience">
      <div className={styles.inner}>
        <SectionHead label="(Experience)" title="Where I've worked" mode="words" />

        <div className={styles.rows}>
          {experience.map((job) => (
            <div className={styles.row} key={job.company} data-row data-cursor="link">
              <span className={styles.rule} data-row-rule aria-hidden="true" />
              <h3 className={styles.company} data-cell>
                {job.company}
              </h3>
              <div className={styles.detail} data-cell>
                <span className={styles.role}>{job.role}</span>
                <span className={styles.summary}>{job.summary}</span>
              </div>
              <ul className={styles.tech} data-cell>
                {job.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className={styles.period} data-cell>
                {job.period}
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
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
