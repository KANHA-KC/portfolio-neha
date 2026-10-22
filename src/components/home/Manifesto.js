"use client";

import { useRef } from "react";
import Logo from "@/components/Logo";
import Emph from "@/components/Emph";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";

export default function Manifesto({ text }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(root.current.querySelector(".manifesto-text"), { type: "words", wordsClass: "mw" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true }
        }
      );
      gsap.from(root.current.querySelectorAll(".mf-pop"), {
        scale: 0,
        rotate: -30,
        stagger: 0.2,
        ease: "back.out(2)",
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: "top 60%" }
      });
      const track = root.current.querySelector(".mf-line-track");
      if (track) {
        gsap.fromTo(
          track,
          { height: 0 },
          {
            height: 490,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true
            }
          }
        );
      }
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="manifesto" aria-label="Approach">
      <p className="eyebrow">
        <span className="eyebrow-num">(01)</span> The short version
      </p>
      <p className="manifesto-text">
        <Emph text={text} />
      </p>

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
              <Logo variant="monogram" height={28} color="#ffffff" />
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
            <path
              d="M 112 482 L 127 492 L 114 500"
              stroke="rgba(24, 47, 52, 0.25)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="mf-pop mf-pop--b hand">since 2018</span>
      </div>

      <span className="mf-pop mf-pop--c" aria-hidden="true">✿</span>
    </section>
  );
}
