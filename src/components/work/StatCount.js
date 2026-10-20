"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Counts the numeric part of a value like "42%", "150k+" or "−35%" up from zero when it scrolls into view.
export default function StatCount({ value }) {
  const ref = useRef(null);
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);

  useGSAP(
    () => {
      if (!match || prefersReducedMotion()) return;
      const [, pre, num, post] = match;
      const o = { v: 0 };
      gsap.to(o, {
        v: Number(num),
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        onUpdate: () => (ref.current.textContent = `${pre}${Math.round(o.v)}${post}`)
      });
    },
    { scope: ref }
  );

  return <span ref={ref}>{value}</span>;
}
