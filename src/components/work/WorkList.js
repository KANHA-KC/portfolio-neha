"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projectsData } from "@/data/portfolioData";

export default function WorkList() {
  const root = useRef(null);
  const preview = useRef(null);
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      if (!prefersReducedMotion()) {
        gsap.from(root.current.querySelectorAll(".wl-row"), {
          yPercent: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          delay: 0.2
        });
      }
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const el = preview.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const rTo = gsap.quickTo(el, "rotate", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      const move = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="wl" onPointerLeave={() => setActive(null)}>
      <ol className="wl-list">
        {projectsData.map((p, i) => (
          <li key={p.id} className="wl-row" onPointerEnter={() => setActive(i)} style={{ "--accent": p.palette.wash, "--spark": p.palette.spark }}>
            <Link href={`/work/${p.id}`} className="wl-link" data-cursor="open">
              <span className="wl-num">{p.num}</span>
              <span className="wl-title">{p.title}</span>
              <span className="wl-meta">
                <span>{p.tag}</span>
                <span>{p.client}</span>
                <span>{p.year}</span>
              </span>
              <span className="wl-mobile-cover">
                <ProjectCover project={p} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div ref={preview} className={`wl-preview ${active !== null ? "is-on" : ""}`} aria-hidden="true">
        <div className="wl-preview-stack" style={{ transform: `translateY(${-(active ?? 0) * 100}%)` }}>
          {projectsData.map((p) => (
            <div key={p.id} className="wl-preview-item">
              <ProjectCover project={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
