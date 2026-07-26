"use client";

import ScrambledText from "@/components/motion/ScrambledText";
import { about, certifications, education, experience } from "@/data/content";
import styles from "./About.module.scss";

/**
 * About / experience / certifications / education — the light editorial break.
 * Editorial rows with thin dividers, no cards and no dashboard.
 */
export default function About() {
  return (
    <section className={styles.section} id="about">
      <h2 className={styles.heading}>
        {about.headingLines.map((line) => (
          <span className="lineMask" key={line}>
            <span className="lineInner" data-split-inner>
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div className={styles.introRow}>
        <span className={styles.label}>
          <ScrambledText text={about.label} />
        </span>
        <div className={styles.copy} data-fade>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockLabel}>Experience</h3>
        {experience.map((job) => (
          <div className={styles.job} key={job.company}>
            <h4 className={styles.company}>{job.company}</h4>
            <div className={styles.jobMid}>
              <span className={styles.role}>{job.role}</span>
              <span className={styles.period}>{job.period}</span>
              <span className={styles.period}>{job.location}</span>
            </div>
            <ul className={styles.tags}>
              {job.tech.map((t) => (
                <li key={t}>
                  <ScrambledText text={t} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.twoUp}>
        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Certifications</h3>
          <ul className={styles.plainList}>
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Education</h3>
          <ul className={styles.plainList}>
            {education.map((e) => (
              <li key={e.degree}>
                {e.degree} — {e.year}
                <span className={styles.school}>{e.school}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
