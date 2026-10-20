"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import { gsap, Flip, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// The active filter lives in the URL hash (#type=branding) so filtered views can be shared and linked to.
const subscribe = (cb) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => new URLSearchParams(window.location.hash.slice(1)).get("type") || "all";

// Card footprint on the wall, by format.
const span = (p) => (p.kind === "case-study" ? "xl" : { wide: "lg", landscape: "md", portrait: "md", tall: "sm", square: "sm" }[p.aspect] || "md");

export default function WorkGallery({ projects, categories }) {
  const root = useRef(null);
  const flipState = useRef(null);
  const active = useSyncExternalStore(subscribe, readHash, () => "all");
  const filter = categories.some((c) => c.slug === active) ? active : "all";
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const choose = (slug) => {
    if (!prefersReducedMotion()) flipState.current = Flip.getState(root.current.querySelectorAll(".gcard"));
    const url = slug === "all" ? window.location.pathname : `#type=${slug}`;
    history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  // Animate cards from their old spots to the new layout after a filter change.
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.02,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 })
    });
    flipState.current = null;
  }, [filter]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(root.current.querySelectorAll(".gcard"), { y: 80, opacity: 0, stagger: 0.06, duration: 1.1, ease: "expo.out", delay: 0.15 });
    },
    { scope: root }
  );

  const current = categories.find((c) => c.slug === filter);

  return (
    <div ref={root} className="gallery">
      <div className="filters" role="toolbar" aria-label="Filter work by discipline">
        <button type="button" className={`filter ${filter === "all" ? "is-on" : ""}`} aria-pressed={filter === "all"} onClick={() => choose("all")}>
          Everything <sup>{projects.length}</sup>
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`filter ${filter === c.slug ? "is-on" : ""}`}
            aria-pressed={filter === c.slug}
            onClick={() => choose(c.slug)}
          >
            <span aria-hidden="true">{c.icon}</span> {c.title} <sup>{c.count}</sup>
          </button>
        ))}
      </div>

      <p className="filter-desc hand" aria-live="polite">
        {current ? current.description : "everything, in no particular order (okay, a little order)"}
      </p>

      <ul className="wall">
        {visible.map((p, i) => (
          <li key={p.slug} className={`gcard gcard--${span(p)}`} data-flip-id={p.slug} style={{ "--i": i % 6 }}>
            <Link href={`/work/${p.slug}`} className="gcard-inner" data-cursor={p.kind === "case-study" ? "read case" : "view"}>
              <ProjectVisual project={p} sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="gcard-cap">
                <div>
                  <p className="gcard-cat">
                    <span aria-hidden="true">{p.categoryIcon}</span> {p.categoryTitle}
                    {p.kind === "case-study" && <span className="gcard-badge">Case study</span>}
                  </p>
                  <h2 className="gcard-title">{p.title}</h2>
                </div>
                <p className="gcard-meta">{[p.client, p.year].filter(Boolean).join(" · ")}</p>
              </div>
              {p.note && <span className="gcard-note hand">{p.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
