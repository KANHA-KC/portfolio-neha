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
            Brands I’ve given <span style={{ whiteSpace: "nowrap" }}>a <em>voice</em></span>
          </h2>
          <span className="hand section-hand">A few of the 50 ↓</span>
        </div>
      </header>

      <div className="work-field">
        {projects.map((p) => {
          return (
            <article key={p.slug} className={`wcard wcard--${p.kind}`}>
              <Link href={`/work/${p.slug}`} className="gcard-inner" data-cursor={p.kind === "case-study" ? "read case" : "view"}>
                <ProjectVisual project={p} card aspect="landscape" sizes="(max-width: 900px) 100vw, 45vw" />
                <div className="gcard-cap">
                  <p className="gcard-cat">
                    {p.sector || p.categoryTitle}
                    {p.kind === "case-study" && <span className="gcard-badge">Case study</span>}
                  </p>
                  <h3 className="gcard-title">{p.title}</h3>
                  <p className="gcard-meta">
                    {[p.client !== p.title ? p.client : null, p.projectType, p.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
        <Link href="/work" className="work-all" data-cursor="all work">
          <span>All work</span>
        </Link>
      </div>
    </section>
  );
}
