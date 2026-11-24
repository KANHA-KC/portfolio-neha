"use client";

import { useRef } from "react";
import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function SelectedWork({ projects, categories }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      root.current.querySelectorAll(".wcard-inner").forEach((el, i) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1,
          delay: (i % 3) * 0.08,
          ease: "expo.out",
          clearProps: "transform,opacity", // hand the hover lift back to CSS once it's in
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="work-scatter work-scatter--grid" aria-labelledby="work-title">
      <header className="section-head">
        <div>
          <h2 id="work-title" className="section-title">
            Brands I’ve given a <em>voice</em>
          </h2>
          <span className="hand section-hand">A few of the 50 ↓</span>
        </div>
      </header>

      <div className="work-field">
        {projects.map((p, i) => {
          return (
            <article key={p.slug} className={`wcard wcard--${p.kind}`}>
              <Link href={`/work/${p.slug}`} className="wcard-inner" data-cursor={p.kind === "case-study" ? "read case" : "view"}>
                <div className="wcard-media">
                  <ProjectVisual project={p} card aspect="landscape" sizes="(max-width: 900px) 100vw, 45vw" />
                </div>
                <div className="wcard-body">
                  <span className="wcard-num" style={{ color: "var(--neon)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="wcard-cat">
                      {p.sector || p.categoryTitle}
                    </p>
                    <h3 className="wcard-title">{p.title}</h3>
                    {p.workedOn && <p className="wcard-work">{p.workedOn}</p>}
                    <p className="wcard-meta">
                      {[p.client !== p.title ? p.client : null, p.projectType, p.year].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className="wcard-arrow" aria-hidden="true">↗</span>
                </div>
              </Link>
            </article>
          );
        })}
        <Link href="/work" className="work-all" data-cursor="all work">
          <span>All work</span>
          <small>{categories.reduce((n, c) => n + c.count, 0)} projects</small>
        </Link>
      </div>
    </section>
  );
}
