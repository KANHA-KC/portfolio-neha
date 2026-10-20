"use client";

import { useRef } from "react";
import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projectsData } from "@/data/portfolioData";

// Each card sits somewhere a little different — position, tilt and scroll speed.
const layout = [
  { pos: "a", rot: -2.5, speed: -60 },
  { pos: "b", rot: 2, speed: 90 },
  { pos: "c", rot: -1, speed: -20 }
];

export default function SelectedWork() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        root.current.querySelectorAll(".wcard").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 0 },
            {
              y: Number(card.dataset.speed),
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
            }
          );
        });
      });
      root.current.querySelectorAll(".wcard-inner").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          rotate: 4,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="work-scatter" aria-labelledby="work-title">
      <header className="section-head">
        <p className="eyebrow">
          <span className="eyebrow-num">(02)</span> Selected work
        </p>
        <h2 id="work-title" className="section-title">
          Things I’ve <em>shaped</em>
          <span className="hand section-hand">three favourites ↓</span>
        </h2>
      </header>

      <div className="work-field">
        {projectsData.map((p, i) => {
          const l = layout[i % layout.length];
          return (
            <article key={p.id} className={`wcard wcard--${l.pos}`} data-speed={l.speed} style={{ "--rot": `${l.rot}deg` }}>
              <Link href={`/work/${p.id}`} className="wcard-inner" data-cursor="view case">
                <div className="wcard-media">
                  <ProjectCover project={p} />
                  <span className="wcard-note hand" style={{ "--tape": p.palette.frame }}>{p.note}</span>
                </div>
                <div className="wcard-body">
                  <span className="wcard-num" style={{ color: p.palette.spark }}>{p.num}</span>
                  <div>
                    <h3 className="wcard-title">{p.title}</h3>
                    <p className="wcard-meta">
                      {p.client} · {p.year}
                    </p>
                  </div>
                  <span className="wcard-arrow" aria-hidden="true">↗</span>
                </div>
                <ul className="wcard-tags">
                  <li>{p.tag}</li>
                  <li>{p.category.split(" · ")[0]}</li>
                </ul>
              </Link>
            </article>
          );
        })}
        <Link href="/work" className="work-all" data-cursor="all work">
          <span>All work</span>
          <small>case studies & process</small>
        </Link>
      </div>
    </section>
  );
}
