"use client";

import { useRef } from "react";
import Logo from "@/components/Logo";
import Emph from "@/components/Emph";
import BrandLogos from "@/components/home/BrandLogos";
import { gsap, useGSAP, SplitText, ScrollTrigger, afterIntro, prefersReducedMotion } from "@/lib/gsap";

export default function Manifesto({ text }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current;
      const textContainer = el?.querySelector(".manifesto-text");
      if (!textContainer) return;

      const split = SplitText.create(textContainer, { type: "words", wordsClass: "mw", tag: "span" });
      const words = split.words || [];
      const ring = el.querySelector(".mf-badge-ring");
      const circle = el.querySelector(".mf-badge-circle");
      const track = el.querySelector(".mf-line-track");
      const sticker = el.querySelector(".mf-pop--b");

      gsap.set(words, { opacity: 0.1, yPercent: 55, rotate: 4, filter: "blur(8px)", transformOrigin: "0% 100%" });
      gsap.set(circle, { scale: 0.4, rotate: -60 });
      gsap.set(track, { height: 0 });
      gsap.set(sticker, { scale: 0, rotate: -30 });

      const build = (scrollTrigger) =>
        gsap
          .timeline({ defaults: { ease: "power1.out" }, scrollTrigger })
          .to(words, { opacity: 1, yPercent: 0, rotate: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.04 }, 0)
          .to(circle, { scale: 1, rotate: -10, duration: 0.5, ease: "back.out(2)" }, 0)
          .to(ring, { rotate: "+=180", duration: 1.2, ease: "none" }, 0)
          .to(track, { height: 260, duration: 1.2, ease: "none" }, 0.1)
          .to(sticker, { scale: 1, rotate: 6, duration: 0.4, ease: "back.out(2)" }, ">-0.15");

      const mm = gsap.matchMedia();
      // Desktop: stop and pin this whole section (brands marquee + manifesto) when it reaches
      // the top, and while stopped, on scroll only the text and accents appear across 2-3 scrolls.
      mm.add("(min-width: 761px)", () => {
        build({
          trigger: el,
          start: "top top",
          end: "+=360px",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });
      });
      // Phones: same sequence over the normal scroll, no pinning.
      mm.add("(max-width: 760px)", () => {
        const manifestoEl = el.querySelector(".manifesto") || el;
        build({ trigger: manifestoEl, start: "top 75%", end: "bottom 80%", scrub: 0.3, invalidateOnRefresh: true });
      });

      // Positions depend on everything above (hero, fonts), so measure again once those settle.
      const refresh = () => ScrollTrigger.refresh();
      const off = afterIntro(refresh);
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      return () => {
        off();
        window.removeEventListener("load", refresh);
        mm.revert();
        split.revert();
      };
    },
    { scope: root, dependencies: [text], revertOnUpdate: true }
  );

  const paragraphs = typeof text === "string" ? text.split(/\n\s*\n/).filter(Boolean) : [];

  return (
    <div ref={root} className="home-brand-manifesto">
      <section className="logo-band" aria-labelledby="brands-heading">
        <div className="logo-band-head">
          <p className="eyebrow">
            Brands I’ve worked on
          </p>
          <h2 id="brands-heading" className="logo-band-title">
            <span className="sr-only">Brands I’ve worked on, </span>
            through <mark className="logo-band-highlight">Schbang, Webenza</mark> &amp; <mark className="logo-band-highlight">freelance</mark>
          </h2>
        </div>
        <BrandLogos />
      </section>

      <section className="manifesto" aria-label="Approach">
        <div className="manifesto-text">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p key={i} className="manifesto-p">
                <Emph text={para} />
              </p>
            ))
          ) : (
            <p className="manifesto-p">
              <Emph text={text} />
            </p>
          )}
        </div>

        <div className="mf-side-wrap" aria-hidden="true">
          <div className="mf-pop mf-pop--a">
            <div className="mf-badge">
              <svg viewBox="0 0 200 200" className="mf-badge-ring">
                <defs>
                  <path
                    id="mf-text-path"
                    d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                  />
                </defs>
                <text className="mf-badge-text">
                  <textPath href="#mf-text-path" textLength="455" lengthAdjust="spacing">
                    Brand - Graphic Designer - Illustrator -{" "}
                  </textPath>
                </text>
              </svg>
              <div className="mf-badge-circle">
                <Logo variant="monogram" height={30} gradient />
              </div>
            </div>
          </div>

          <div className="mf-line-track">
            <svg className="mf-dashed-line" viewBox="0 0 160 270" fill="none">
              <path
                d="M 36 6 C 90 60, 110 130, 84 185 C 65 220, 52 245, 62 260"
                stroke="rgba(24, 47, 52, 0.22)"
                strokeWidth="2.2"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="mf-pop mf-pop--b hand">since 2018</span>
        </div>
      </section>
    </div>
  );
}
