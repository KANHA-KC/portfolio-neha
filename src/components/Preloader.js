"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const finish = () => {
  window.__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
};

export default function Preloader() {
  const ref = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = ref.current;
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro") === "1";
      sessionStorage.setItem("intro", "1");
    } catch {}

    if (seen || prefersReducedMotion()) {
      root.style.display = "none";
      finish();
      return;
    }

    const count = { v: 0 };
    const num = root.querySelector(".pre-num");
    const tl = gsap.timeline({
      onComplete: () => setGone(true)
    });
    tl.fromTo(root.querySelector(".pre-mark"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" })
      .to(count, { v: 100, duration: 1.1, ease: "power2.inOut", onUpdate: () => (num.textContent = String(Math.round(count.v)).padStart(3, "0")) }, 0)
      .to(root.querySelector(".pre-note"), { opacity: 1, y: 0, duration: 0.5 }, 0.4)
      .to(root.querySelector(".pre-inner"), { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
      .add(finish, "-=0.15")
      .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.35");

    return () => tl.kill();
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-mark">
          <Logo variant="monogram" height="clamp(80px, 14vw, 160px)" color="var(--teal)" />
        </div>
        <p className="pre-note">warming up the pixels…</p>
      </div>
      <span className="pre-num">000</span>
    </div>
  );
}
