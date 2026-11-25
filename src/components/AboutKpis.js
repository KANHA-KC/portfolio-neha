"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// "At a glance" numbers under the About intro. Values are worked out from the CMS on the server;
// the finished numbers are in the HTML, and the count-up only plays once the row scrolls into view.
export default function AboutKpis({ items }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const tiles = [...el.querySelectorAll(".kpi")];
    const nums = tiles.map((t) => t.querySelector(".kpi-num"));
    const tweens = [];

    const count = (num, duration, delay = 0) => {
      const to = Number(num.dataset.value);
      const box = { v: 0 };
      tweens.push(
        gsap.to(box, {
          v: to,
          duration,
          delay,
          ease: "power3.out",
          onUpdate: () => (num.textContent = Math.round(box.v)),
          onComplete: () => (num.textContent = to)
        })
      );
    };

    gsap.set(tiles, { opacity: 0, y: 24 });
    nums.forEach((n) => (n.textContent = "0"));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tweens.push(gsap.to(tiles, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.09 }));
        nums.forEach((n, i) => count(n, 1.6, 0.15 + i * 0.09));
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    // Hover / focus: the number re-rolls quickly (CSS handles the lift, the neon bar and the source line).
    const replay = (e) => {
      const num = e.currentTarget.querySelector(".kpi-num");
      if (num.dataset.rolling) return;
      num.dataset.rolling = "1";
      const to = Number(num.dataset.value);
      const box = { v: Math.max(0, Math.round(to * 0.35)) };
      tweens.push(
        gsap.to(box, {
          v: to,
          duration: 0.55,
          ease: "power2.out",
          onUpdate: () => (num.textContent = Math.round(box.v)),
          onComplete: () => {
            num.textContent = to;
            delete num.dataset.rolling;
          }
        })
      );
    };
    tiles.forEach((t) => {
      t.addEventListener("pointerenter", replay);
      t.addEventListener("focus", replay);
    });

    return () => {
      io.disconnect();
      tweens.forEach((t) => t.kill());
      tiles.forEach((t) => {
        t.removeEventListener("pointerenter", replay);
        t.removeEventListener("focus", replay);
      });
      gsap.set(tiles, { clearProps: "opacity,transform" });
      nums.forEach((n) => (n.textContent = n.dataset.value));
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <ul ref={root} className="about-kpis" aria-label="At a glance">
      {items.map((k) => (
        <li key={k.label} className="kpi" tabIndex={0} aria-label={`${k.value}${k.suffix} ${k.label}. ${k.detail}`}>
          <span className="kpi-figure" aria-hidden="true">
            <span className="kpi-num" data-value={k.value}>
              {k.value}
            </span>
            {k.suffix && <span className="kpi-suffix">{k.suffix}</span>}
          </span>
          <span className="kpi-label" aria-hidden="true">{k.label}</span>
          <span className="kpi-detail hand" aria-hidden="true">{k.detail}</span>
        </li>
      ))}
    </ul>
  );
}
