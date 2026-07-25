"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { navLinks, profile } from "@/data/content";
import styles from "./Footer.module.scss";

/** Live clock in the subject's timezone — a small "this is a real person" signal. */
function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

const socials = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
];

export default function Footer() {
  const time = useLocalTime("Asia/Kolkata");
  const [year, setYear] = useState<number | null>(null);

  // Set on the client so the static export isn't frozen to build-time year.
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Reveal className={styles.grid} stagger={0.08} y={30}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.dot} aria-hidden="true" />
              {profile.firstName}&nbsp;{profile.lastName}
            </span>
            <p>{profile.tagline}</p>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <h3>Menu</h3>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={styles.link} data-cursor="link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.col}>
            <h3>Socials</h3>
            {socials.map((s) => (
              <MagneticButton
                key={s.label}
                as="a"
                href={s.href}
                className={styles.link}
                strength={6}
                data-cursor="link"
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
              >
                {s.label}
              </MagneticButton>
            ))}
          </div>

          <div className={styles.col}>
            <h3>Get in touch</h3>
            <a href={`mailto:${profile.email}`} className={styles.link} data-cursor="link">
              {profile.email}
            </a>
            <span className={styles.muted}>{profile.availability}</span>
          </div>
        </Reveal>

        <div className={styles.bottom}>
          <span>
            © {year ?? ""} {profile.firstName} {profile.lastName}. All rights reserved.
          </span>
          <span className={styles.clock}>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.location} — <b>{time} IST</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
