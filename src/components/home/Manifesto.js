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
      <span className="mf-pop mf-pop--a" aria-hidden="true"><Logo variant="monogram" height={28} color="#fff" /></span>
      <span className="mf-pop mf-pop--b hand" aria-hidden="true">since 2018</span>
      <span className="mf-pop mf-pop--c" aria-hidden="true">✿</span>
    </section>
  );
}
