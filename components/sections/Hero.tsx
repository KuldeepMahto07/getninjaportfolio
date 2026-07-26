"use client";

import Image from "next/image";
import ScrambledText from "@/components/motion/ScrambledText";
import { asset } from "@/lib/asset";
import { navLinks, profile } from "@/data/content";
import styles from "./Hero.module.scss";

/**
 * Hero — frame 1.
 *
 * Light canvas, tiny in-flow nav (it scrolls away with the hero rather than
 * being fixed), an enormous single-line name spanning almost the full viewport
 * width, then a bottom row of: arrow + copy + CTA on the left, portrait in the
 * centre, availability bottom-right.
 *
 * Deliberately not vertically centred — the large void between the nav and the
 * name is part of the composition.
 */
export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <header className={styles.nav}>
        <ScrambledText text={profile.navLabel} />
        <nav className={styles.navLinks} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-cursor="link">
              <ScrambledText text={link.label} />
            </a>
          ))}
        </nav>
      </header>

      <div className={styles.nameWrap}>
        <span className="lineMask">
          <h1 className={`${styles.name} lineInner`} data-split-inner>
            {profile.name.toUpperCase()}
          </h1>
        </span>
      </div>

      <div className={styles.lower}>
        <div className={styles.left}>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 15V6.5M15 15H6.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
          <p className={styles.copy} data-fade>
            {profile.tagline}
          </p>
          <a
            className={styles.cta}
            href={`mailto:${profile.email}`}
            data-cursor="button"
            data-fade
          >
            Contact
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 12L12 4M12 4H5.5M12 4V10.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Renders the portrait once `profile.portrait` points at an asset;
            until then it keeps the marked placeholder so the hero never shows
            a broken image. Container geometry is identical either way. */}
        <div className={styles.portrait} data-clip>
          {profile.portrait ? (
            <Image
              src={asset(profile.portrait)}
              alt={profile.portraitAlt}
              width={960}
              height={1280}
              priority
              sizes="(max-width: 960px) 60vw, 21vw"
              className={styles.portraitImg}
            />
          ) : (
            <div className={styles.portraitInner}>
              <span className={styles.portraitNote}>
                Portrait
                <br />
                placeholder
                <br />— replace
              </span>
            </div>
          )}
        </div>

        <div className={styles.right}>
          <span className={styles.availLabel}>
            <ScrambledText text={profile.availability} />
          </span>
          <span className={styles.availDate} data-fade>
            {profile.availableFrom}
          </span>
        </div>
      </div>
    </section>
  );
}
