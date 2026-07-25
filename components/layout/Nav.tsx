"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGsap";
import { useLenis } from "@/hooks/useLenis";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import MagneticButton from "@/components/motion/MagneticButton";
import { navLinks, profile } from "@/data/content";
import styles from "./Nav.module.scss";

/**
 * Fixed nav (spec §06).
 *
 * Hover: two stacked copies of the label swap on Y with
 * cubic-bezier(.77, 0, .175, 1) — the reference's "large move" curve.
 * Entrance is part of the page-load sequence (delay 0.3s, the earliest
 * step in the reference's ladder).
 */
export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const lenis = useLenis();
  const { reduced, ready } = useMotionPreference();

  // Compact state after leaving the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Entrance
  useEffect(() => {
    if (!ready || reduced || !ref.current) return;
    const targets = ref.current.querySelectorAll("[data-nav-item]");
    const tween = gsap.fromTo(
      targets,
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.05, delay: 0.3 },
    );
    return () => {
      tween.kill();
    };
  }, [ready, reduced]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const go = (e: React.MouseEvent, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.15 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <header ref={ref} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <a
            href="#top"
            className={styles.logo}
            data-nav-item
            data-cursor="link"
            onClick={(e) => go(e, "#top")}
          >
            <span className={styles.dot} aria-hidden="true" />
            {profile.firstName}&nbsp;{profile.lastName}
          </a>

          <nav className={styles.links} aria-label="Primary">
            {navLinks.map((link) => (
              <MagneticButton
                key={link.href}
                as="a"
                href={link.href}
                className={`${styles.link} ${active === link.href.slice(1) ? styles.active : ""}`}
                strength={6}
                data-cursor="link"
              >
                <span className={styles.swap} onClick={(e) => go(e, link.href)}>
                  <span className={styles.swapA}>{link.label}</span>
                  <span className={styles.swapB} aria-hidden="true">
                    {link.label}
                  </span>
                </span>
              </MagneticButton>
            ))}
          </nav>

          <span className={styles.badge} data-nav-item>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.availability} — {profile.location}
          </span>

          <button
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-nav-item
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
        <span className={styles.badge}>
          <span className={styles.pulse} aria-hidden="true" />
          {profile.availability} — {profile.location}
        </span>
      </div>
    </>
  );
}
