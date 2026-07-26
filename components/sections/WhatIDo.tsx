"use client";

import { useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import ScrambledText from "@/components/motion/ScrambledText";
import { services } from "@/data/content";
import styles from "./WhatIDo.module.scss";

/**
 * What I Do (spec §11).
 *
 * Per row the order is number -> title -> description -> tech, and the
 * horizontal rule draws itself with scaleX 0 -> 1 from the left edge.
 * Each row owns its own ScrollTrigger so rows arrive as you reach them.
 */
export default function WhatIDo() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;

      scope.querySelectorAll<HTMLElement>("[data-service]").forEach((row) => {
        const q = gsap.utils.selector(row);
        const rule = q("[data-rule]");
        const num = q("[data-num]");
        const body = q("[data-body]");
        const tech = q("[data-tech] li");

        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set([...num, ...body], { y: 40, opacity: 0 });
        gsap.set(tech, { y: 20, opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });

        tl.to(rule, { scaleX: 1, duration: 1.1, ease: "expo.out" }, 0)
          .to(num, { y: 0, opacity: 1, duration: 0.8 }, 0.08)
          .to(body, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, 0.16)
          .to(tech, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 }, 0.34);
      });
    },
    ref,
    [],
  );

  return (
    <section ref={ref} className={styles.section} id="services">
      <div className={styles.inner}>
        {/* Frame 03 geometry: the heading stands alone at the top of the
            sheet; the label and description sit far to the right beneath it,
            with a lot of empty space between them. */}
        <TextReveal
          text="What I Do /"
          mode="chars"
          as="h2"
          className={styles.heading}
          stagger={0.018}
          duration={0.9}
        />

        <div className={styles.introRow}>
          <Reveal className={styles.labelWrap} y={16} stagger={0} duration={0.6}>
            <ScrambledText text="(Services)" className={styles.label} />
          </Reveal>
          <TextReveal
            text="I design and ship production-grade AI systems — from data pipelines and retrieval to autonomous agents and cloud deployment."
            mode="words"
            as="p"
            className={styles.intro}
            stagger={0.012}
            duration={0.6}
          />
        </div>

        <div className={styles.list}>
          {services.map((service) => (
            <article className={styles.row} key={service.num} data-service>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <span className={styles.num} data-num>
                ({service.num})
              </span>
              <div className={styles.main}>
                <h3 className={styles.title} data-body>
                  {service.title}
                </h3>
                <p className={styles.desc} data-body>
                  {service.description}
                </p>
              </div>
              <ul className={styles.tech} data-tech>
                {service.tech.map((t, i) => (
                  <li key={t}>
                    <span className={styles.techIdx}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
