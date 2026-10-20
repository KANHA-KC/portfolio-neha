"use client";

import { useRef } from "react";
import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Loose "desk" layout. Slots repeat, so any number of featured projects can be placed.
// col = grid columns on the 12-col desktop grid, mt = nudge down, rot = tilt, speed = scroll parallax.
const slots = [
  { col: "1 / 8", mt: "0", rot: -2.5, speed: -60 },
  { col: "8 / 13", mt: "28vh", rot: 2, speed: 90 },
  { col: "2 / 7", mt: "-4vh", rot: 1.5, speed: -10 },
  { col: "8 / 13", mt: "14vh", rot: -1.5, speed: 50 },
  { col: "1 / 9", mt: "2vh", rot: -1, speed: -30 },
  { col: "9 / 13", mt: "22vh", rot: 3, speed: 70 }
];

export default function SelectedWork({ projects, categories }) {
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
            { y: Number(card.dataset.speed), ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      });
      root.current.querySelectorAll(".wcard-inner").forEach((el) => {
        gsap.from(el, { y: 80, opacity: 0, rotate: 4, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="work-scatter" aria-labelledby="work-title">
      <header className="section-head section-head--split">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-num">(02)</span> Selected work
          </p>
          <h2 id="work-title" className="section-title">
            Things I’ve <em>shaped</em>
            <span className="hand section-hand">products, marks & brand worlds ↓</span>
          </h2>
        </div>
        <nav className="disc-index" aria-label="Browse work by discipline">
          {categories.map((c) => (
            <Link key={c.slug} href={`/work#type=${c.slug}`} className="disc-chip" data-cursor="browse">
              <span aria-hidden="true">{c.icon}</span> {c.title}
              <sup>{c.count}</sup>
            </Link>
          ))}
        </nav>
      </header>

      <div className="work-field">
        {projects.map((p, i) => {
          const s = slots[i % slots.length];
          return (
            <article
              key={p.slug}
              className={`wcard wcard--${p.kind}`}
              data-speed={s.speed}
              style={{ "--rot": `${s.rot}deg`, gridColumn: s.col, marginTop: s.mt }}
            >
              <Link href={`/work/${p.slug}`} className="wcard-inner" data-cursor={p.kind === "case-study" ? "read case" : "view"}>
                <div className="wcard-media">
                  <ProjectVisual project={p} sizes="(max-width: 900px) 100vw, 55vw" />
                  {p.note && (
                    <span className="wcard-note hand" style={{ "--tape": p.palette.frame }}>
                      {p.note}
                    </span>
                  )}
                </div>
                <div className="wcard-body">
                  <span className="wcard-num" style={{ color: p.palette.spark }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="wcard-cat">
                      <span aria-hidden="true">{p.categoryIcon}</span> {p.categoryTitle}
                    </p>
                    <h3 className="wcard-title">{p.title}</h3>
                    <p className="wcard-meta">
                      {[p.client, p.year].filter(Boolean).join(" · ")}
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
