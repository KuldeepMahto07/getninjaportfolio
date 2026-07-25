"use client";

import { useRef, useState } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import MagneticButton from "@/components/motion/MagneticButton";
import SplitText from "@/components/motion/SplitText";
import { contact, profile } from "@/data/content";
import styles from "./Contact.module.scss";

/**
 * Contact (spec §17, §18).
 *
 * The closing headline gets the strongest typography animation on the page:
 * three masked lines revealing one after another with a deliberate offset.
 * Form fields follow afterwards.
 *
 * There's no backend on a statically exported site, so submitting composes a
 * mailto with the entered values — honest behaviour rather than a fake
 * success state.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const q = gsap.utils.selector(scope);
      const lines = q("[data-headline] [data-split-inner]");
      const after = q("[data-after]");

      // `y: 0` clears the CSS pre-state so GSAP doesn't add it to yPercent.
      gsap.set(lines, { yPercent: 110, y: 0 });
      gsap.set(after, { y: 34, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        })
        // Each line lands separately — the offset is what sells it.
        .to(lines, {
          yPercent: 0,
          y: 0,
          duration: 1.15,
          ease: "expo.out",
          stagger: 0.11,
        })
        .to(
          after,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
          0.5,
        );
    },
    ref,
    [],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry — ${form.name || "Portfolio"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`.trim(),
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={ref} className={styles.section} id="contact">
      <div className={styles.inner}>
        <span className={styles.label} data-after>
          (Let&apos;s talk)
        </span>

        <h2 className={styles.headline} data-headline>
          {contact.headlineLines.map((line) => (
            <SplitText
              key={line}
              text={line}
              mode="lines"
              as="span"
              className={styles.headlineLine}
            />
          ))}
        </h2>

        <div className={styles.columns}>
          <div className={styles.aside}>
            <p className={styles.blurb} data-after>
              {contact.blurb}
            </p>
            <a
              className={styles.mail}
              href={`mailto:${profile.email}`}
              data-after
              data-cursor="link"
            >
              {profile.email}
            </a>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field} data-after>
              <input
                id="name"
                type="text"
                required
                placeholder=" "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label htmlFor="name">Your name</label>
              <span className={styles.underline} aria-hidden="true" />
            </div>

            <div className={styles.field} data-after>
              <input
                id="email"
                type="email"
                required
                placeholder=" "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label htmlFor="email">Email</label>
              <span className={styles.underline} aria-hidden="true" />
            </div>

            <div className={styles.field} data-after>
              <textarea
                id="message"
                rows={4}
                required
                placeholder=" "
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <label htmlFor="message">What are you building?</label>
              <span className={styles.underline} aria-hidden="true" />
            </div>

            <div data-after>
              <MagneticButton
                as="button"
                type="submit"
                className={styles.submit}
                strength={14}
                data-cursor="button"
              >
                {/* Vertical text swap on hover */}
                <span className={styles.submitSwap}>
                  <span>Send it</span>
                  <span aria-hidden="true">Send it</span>
                </span>
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
