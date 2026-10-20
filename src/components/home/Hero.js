"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Emph from "@/components/Emph";
import { gsap, useGSAP, afterIntro, prefersReducedMotion } from "@/lib/gsap";

export default function Hero({ profile }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      gsap.set(q(".hero-word .ch"), { yPercent: 110 });
      gsap.set(q(".hero-cutout"), { y: 120, rotate: 6, opacity: 0 });
      gsap.set(q(".hero-pop"), { scale: 0, rotate: -20 });
      gsap.set(q(".hero-fade"), { opacity: 0, y: 24 });
      gsap.set(q(".draw path"), { strokeDasharray: 1, strokeDashoffset: 1 });

      const intro = () =>
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(q(".hero-word .ch"), { yPercent: 0, duration: 1.3, stagger: 0.045 })
          .to(q(".hero-cutout"), { y: 0, rotate: 0, opacity: 1, duration: 1.4 }, 0.25)
          .to(q(".hero-pop"), { scale: 1, rotate: (i, el) => Number(el.dataset.rot || 0), duration: 0.9, stagger: 0.08, ease: "back.out(2)" }, 0.8)
          .to(q(".hero-fade"), { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7)
          .to(q(".draw path"), { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.15 }, 1);

      const off = afterIntro(intro);

      // Pull the two words apart as you scroll away.
      const st = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 } })
        .to(q(".hero-word--a"), { xPercent: -14 }, 0)
        .to(q(".hero-word--b"), { xPercent: 12 }, 0)
        .to(q(".hero-cutout-wrap"), { yPercent: 14, rotate: -3 }, 0);

      // Gentle mouse parallax on the collage layers.
      const layers = q("[data-depth]");
      const onMove = (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        layers.forEach((el) => {
          const d = Number(el.dataset.depth);
          gsap.to(el, { x: x * d, y: y * d, duration: 1.2, ease: "power3.out", overwrite: "auto" });
        });
      };
      if (window.matchMedia("(hover: hover)").matches) window.addEventListener("pointermove", onMove);

      return () => {
        off();
        st.scrollTrigger?.kill();
        window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root }
  );

  const split = (word) =>
    word.split("").map((c, i) => (
      <span className="ch-mask" key={i}>
        <span className="ch">{c}</span>
      </span>
    ));

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">{profile.name} — {profile.role}</h1>

      <div className="hero-stage" aria-hidden="true">
        <div className="hero-word hero-word--a">
          <span data-depth="-14">{split(profile.firstName.toLowerCase())}</span>
        </div>
        <div className="hero-word hero-word--b">
          <span data-depth="-22">{split(profile.lastName.toLowerCase())}</span>
        </div>

        <div className="hero-cutout-wrap" data-depth="18">
          <div className="hero-cutout">
            <span className="tape tape--tl" />
            <span className="tape tape--br" />
            <Image
              src={profile.portrait?.src || "/brand/neha-cutout.webp"}
              alt=""
              width={653}
              height={870}
              preload
              sizes="(max-width: 760px) 70vw, 34vw"
              className="hero-img"
            />
            <span className="sticker sticker--gold hero-pop" data-rot="-6">UX × Brand</span>
            <span className="sticker sticker--paprika hero-pop" data-rot="6">research first ✿</span>
          </div>
        </div>

        <div className="hero-note hero-pop" data-rot="3" data-depth="26">
          <span className="hand">that’s me!</span>
          <span className="hand hand--sm">(the teal hair is a design decision)</span>
          <svg className="draw hero-arrow" viewBox="0 0 100 70">
            <path pathLength="1" d="M85 10 C 60 12, 35 30, 15 55 M15 55 L 30 50 M15 55 L 20 38" />
          </svg>
        </div>

        <span className="blob blob--aqua hero-pop" data-rot="0" data-depth="12" />
        <span className="star hero-pop" data-rot="12" data-depth="46">✦</span>

        <svg className="draw hero-squiggle" viewBox="0 0 300 60">
          <path pathLength="1" d="M4 40 C 30 4, 50 56, 78 30 S 120 4, 146 30 S 196 58, 222 26 S 270 10, 296 34" />
        </svg>
      </div>

      <div className="hero-copy">
        <p className="hero-lede hero-fade">
          Hi, I’m <strong>{profile.firstName}</strong> — <Emph text={profile.heroIntro} />
        </p>
        <div className="hero-actions hero-fade">
          <Link href="/work" className="btn btn--teal" data-cursor="peek">
            See the work <span aria-hidden="true">↘</span>
          </Link>
          <Link href="/about" className="link-underline">More about me</Link>
        </div>
      </div>

      <div className="hero-meta hero-fade">
        <span><span className="pulse" aria-hidden="true" /> {profile.availability}</span>
        <span className="hero-scroll" aria-hidden="true">scroll <i /></span>
      </div>
    </section>
  );
}
