"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import styles from "./Marquee.module.scss";

type Props = {
  items: readonly string[];
  /** px per second. */
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
};

/**
 * Ticker-driven marquee: frame-rate independent (px/second rather than a
 * fixed CSS duration) and eases to a stop on hover instead of snapping.
 */
export default function Marquee({
  items,
  speed = 60,
  direction = "left",
  className,
  separator = "✦",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotionPreference();

  useEffect(() => {
    if (!ready || reduced) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let half = track.scrollWidth / 2;
    let pos = 0;
    let velocity = 1;
    let targetVelocity = 1;
    let last = 0;
    const dir = direction === "right" ? 1 : -1;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    const onEnter = () => (targetVelocity = 0);
    const onLeave = () => (targetVelocity = 1);

    const tick = (time: number) => {
      const dt = last ? Math.min(time - last, 0.05) : 0.016;
      last = time;
      velocity += (targetVelocity - velocity) * Math.min(1, dt * 4);
      pos += speed * dt * velocity;
      if (half > 0) {
        const m = pos % half;
        track.style.transform = `translate3d(${dir === 1 ? m - half : -m}px, 0, 0)`;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    gsap.ticker.add(tick);
    if (document.fonts?.ready) void document.fonts.ready.then(measure);

    return () => {
      window.removeEventListener("resize", measure);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
    };
  }, [ready, reduced, speed, direction]);

  // Duplicated once so the loop can wrap seamlessly at 50%.
  const loop = [...items, ...items];

  return (
    <div ref={wrapRef} className={[styles.marquee, className].filter(Boolean).join(" ")}>
      <div ref={trackRef} className={styles.track}>
        {loop.map((item, i) => (
          <span className={styles.item} key={`${item}-${i}`} aria-hidden={i >= items.length}>
            {item}
            <i className={styles.sep} aria-hidden="true">
              {separator}
            </i>
          </span>
        ))}
      </div>
    </div>
  );
}
