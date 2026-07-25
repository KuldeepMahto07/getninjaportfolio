"use client";

import { useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import SectionHead from "@/components/layout/SectionHead";
import { skillGroups } from "@/data/content";
import styles from "./Skills.module.scss";

/**
 * Skills (spec §14): title reveals, then each category group animates in
 * sequence (opacity 0 -> 1, y 20 -> 0). Individual chips get a very small
 * stagger inside their group — enough to feel alive, not so much that it
 * turns into a light show.
 */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;

      scope.querySelectorAll<HTMLElement>("[data-group]").forEach((group) => {
        const label = group.querySelector("[data-group-label]");
        const items = group.querySelectorAll("[data-skill]");
        const rule = group.querySelector("[data-group-rule]");

        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(label, { y: 20, opacity: 0 });
        gsap.set(items, { y: 20, opacity: 0 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          })
          .to(rule, { scaleX: 1, duration: 0.9, ease: "expo.out" }, 0)
          .to(label, { y: 0, opacity: 1, duration: 0.6 }, 0.06)
          .to(items, { y: 0, opacity: 1, duration: 0.5, stagger: 0.03 }, 0.14);
      });
    },
    ref,
    [],
  );

  return (
    <section ref={ref} className={styles.section} id="skills">
      <div className={styles.inner}>
        <SectionHead label="(Stack)" title="Skills" mode="chars" />

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div className={styles.group} key={group.label} data-group>
              <span className={styles.rule} data-group-rule aria-hidden="true" />
              <h3 className={styles.label} data-group-label>
                {group.label}
              </h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item} data-skill>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
