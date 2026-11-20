"use client";

import { useRef } from "react";
import Logo from "@/components/Logo";
import Emph from "@/components/Emph";
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
      const accents = el.querySelectorAll(".manifesto-text em");
      const ring = el.querySelector(".mf-badge-ring");
      const circle = el.querySelector(".mf-badge-circle");
      const track = el.querySelector(".mf-line-track");
      const sticker = el.querySelector(".mf-pop--b");

      gsap.set(words, { opacity: 0.1, yPercent: 55, rotate: 4, filter: "blur(8px)", transformOrigin: "0% 100%" });
      accents.forEach((a) => a.style.setProperty("--hl", "0%"));
      gsap.set(circle, { scale: 0.4, rotate: -60 });
      gsap.set(track, { height: 0 });
      gsap.set(sticker, { scale: 0, rotate: -30 });

      // One scrubbed sequence: words rise out of a blur, accent words get a neon sweep,
      // the badge spins in, the dashed line draws down and the sticker lands.
      // Each accent word's neon underline grows as the words around it arrive (driven by the timeline's progress).
      const sweep = (p) =>
        accents.forEach((a, i) => {
          const from = 0.45 + i * 0.2;
          const t = Math.min(1, Math.max(0, (p - from) / 0.25));
          a.style.setProperty("--hl", `${Math.round(t * 100)}%`);
        });

      const build = (scrollTrigger) =>
        gsap
          .timeline({ defaults: { ease: "power2.out" }, scrollTrigger, onUpdate() { sweep(this.progress()); } })
          .to(words, { opacity: 1, yPercent: 0, rotate: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.09 }, 0)
          .to(circle, { scale: 1, rotate: -10, duration: 0.8, ease: "back.out(2)" }, 0)
          .to(ring, { rotate: "+=220", duration: words.length * 0.09 + 0.6, ease: "none" }, 0)
          .to(track, { height: 490, duration: words.length * 0.09, ease: "none" }, 0.2)
          .to(sticker, { scale: 1, rotate: 6, duration: 0.5, ease: "back.out(3)" }, ">-0.2");

      const mm = gsap.matchMedia();
      // Desktop: pin the section while the words play through.
      mm.add("(min-width: 761px)", () => {
        build({ trigger: el, start: "center center", end: "+=120%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true });
      });
      // Phones: same sequence over the normal scroll, no pinning.
      mm.add("(max-width: 760px)", () => {
        build({ trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.6, invalidateOnRefresh: true });
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
        accents.forEach((a) => a.style.removeProperty("--hl"));
        split.revert();
      };
    },
    { scope: root, dependencies: [text], revertOnUpdate: true }
  );

  const paragraphs = typeof text === "string" ? text.split(/\n\s*\n/).filter(Boolean) : [];

  return (
    <section ref={root} className="manifesto" aria-label="Approach">
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
                  Logo Designer - Brand Designer - Marketing -{" "}
                </textPath>
              </text>
            </svg>
            <div className="mf-badge-circle">
              <Logo variant="monogram" height={30} gradient />
            </div>
          </div>
        </div>

        <div className="mf-line-track">
          <svg className="mf-dashed-line" viewBox="0 0 160 500" fill="none">
            <path
              d="M 36 6 C 90 60, 110 140, 84 210 C 52 290, 24 350, 52 420 C 68 455, 96 480, 126 492"
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
  );
}
