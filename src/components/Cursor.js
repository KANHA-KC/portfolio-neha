"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// A soft dot that trails the pointer. Elements with `data-cursor="label"` grow it into a labelled bubble.
export default function Cursor() {
  const ref = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    document.documentElement.classList.add("has-cursor");

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = e.target.closest?.("[data-cursor], a, button, input, textarea, label");
      const label = target?.getAttribute("data-cursor");
      if (label && label !== "home") {
        labelRef.current.textContent = label;
        el.dataset.state = "label";
      } else if (target) {
        el.dataset.state = "link";
      } else {
        el.dataset.state = "";
      }
    };
    const leave = () => (el.dataset.state = "gone");
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor-blob">
        <span ref={labelRef} className="cursor-label" />
      </span>
    </div>
  );
}
