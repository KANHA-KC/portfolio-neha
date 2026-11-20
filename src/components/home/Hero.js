"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, afterIntro, prefersReducedMotion } from "@/lib/gsap";

const NAME_KEY = "hero-visitor-name";
const MAX_NAME = 16;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Splits a word into letters so each one can react on hover (screen readers get the whole word elsewhere).
const Letters = ({ word }) =>
  [...word].map((ch, i) => (
    <span key={i} className="hl" aria-hidden="true">
      {ch}
    </span>
  ));

// Four words around the portrait: "Hi" · [visitor types their name] · "I'm" · "Neha".
export default function Hero({ profile }) {
  const root = useRef(null);
  const field = useRef(null);
  const mirror = useRef(null);
  const [name, setName] = useState("");

  // Remember the visitor's name on this device (a convenience only; the site works without it).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(NAME_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restores a saved value once on mount
      if (saved) setName(saved.slice(0, MAX_NAME));
    } catch {}
  }, []);

  const onName = (e) => {
    const v = e.target.value.replace(/\s+/g, " ").slice(0, MAX_NAME);
    setName(v);
    if (!prefersReducedMotion()) gsap.fromTo(field.current, { scale: 1.06 }, { scale: 1, duration: 0.45, ease: "back.out(3)", transformOrigin: "left 70%" });
    try {
      window.localStorage.setItem(NAME_KEY, v.trim());
    } catch {}
  };

  // Size the name to its box: the input grows with the text, and long names shrink to fit.
  useIsoLayoutEffect(() => {
    const el = field.current;
    const m = mirror.current;
    if (!el || !m) return;
    const fit = () => {
      el.style.setProperty("--fit", "1");
      const avail = el.parentElement.clientWidth;
      const w = m.getBoundingClientRect().width;
      const scale = w > avail ? avail / w : 1;
      el.style.setProperty("--fit", scale.toFixed(3));
      el.style.width = `${Math.ceil(Math.min(w, avail) + 4)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [name]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      gsap.set(q(".hw"), { yPercent: 40, opacity: 0 });
      gsap.set(q(".hero-cutout"), { y: 120, rotate: 6, opacity: 0 });
      gsap.set(q(".hero-fade"), { opacity: 0, y: 24 });

      const intro = () =>
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(q(".hero-cutout"), { y: 0, rotate: 0, opacity: 1, duration: 1.4 }, 0)
          .to(q(".hw"), { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.12 }, 0.2)
          .to(q(".hero-fade"), { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.8);

      const off = afterIntro(intro);

      // The words drift apart from the portrait as you scroll away.
      const st = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 } })
        .to(q(".hw--left"), { xPercent: -18 }, 0)
        .to(q(".hw--right"), { xPercent: 14 }, 0);
      // (The portrait stays anchored on the hero's bottom edge: moving it would expose or clip its cropped base.)

      // Letters spring up and flash neon when the pointer touches them.
      const spring = (el) => {
        if (el.dataset.busy) return;
        el.dataset.busy = "1";
        const base = getComputedStyle(el).color;
        gsap
          .timeline({ onComplete: () => { delete el.dataset.busy; gsap.set(el, { clearProps: "color" }); } })
          .to(el, { yPercent: -16, rotate: gsap.utils.random(-12, 12), color: "#c7db0a", duration: 0.22, ease: "power2.out" })
          .to(el, { yPercent: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" })
          .to(el, { color: base, duration: 0.5, ease: "power1.out" }, "<0.15");
      };
      const onOver = (e) => {
        const l = e.target.closest?.(".hl");
        if (l) spring(l);
      };
      root.current.addEventListener("pointerover", onOver);

      // Gentle mouse parallax on the portrait (and the words, at their own depth).
      const layers = q("[data-depth]");
      const onMove = (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        layers.forEach((el) => {
          const d = Number(el.dataset.depth);
          const anchored = el.classList.contains("hero-cutout-wrap"); // portrait only sways sideways
          gsap.to(el, { x: x * d, y: anchored ? 0 : y * d, duration: 1.2, ease: "power3.out", overwrite: "auto" });
        });
      };
      if (window.matchMedia("(hover: hover)").matches) window.addEventListener("pointermove", onMove);

      return () => {
        off();
        st.scrollTrigger?.kill();
        root.current?.removeEventListener("pointerover", onOver);
        window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root }
  );

  // A ripple across a word's letters (used when a visitor finishes typing their name).
  const wave = (selector) => {
    if (prefersReducedMotion() || !root.current) return;
    gsap.fromTo(
      root.current.querySelectorAll(selector),
      { yPercent: 0 },
      { yPercent: -22, duration: 0.28, ease: "power2.out", stagger: 0.06, yoyo: true, repeat: 1 }
    );
  };

  const first = profile.firstName || "Neha";

  return (
    <section ref={root} className="hero hero4" aria-labelledby="hero-title">
      <div className="hero-cutout-wrap" data-depth="14">
        <div className="hero-cutout">
          <Image
            src={profile.portrait?.src || "/brand/neha-cutout.webp"}
            alt={`${profile.name}, ${profile.role} based in ${profile.location}`}
            width={653}
            height={870}
            preload
            sizes="(max-width: 760px) 70vw, 34vw"
            className="hero-img"
          />
        </div>
      </div>

      <p className="hw hw--left hw--hi" aria-hidden="true" data-depth="-10">
        <Letters word="Hi" />
      </p>

      <div className="hw hw--right hw--name" data-depth="-16">
        <span className="hw-cue" aria-hidden="true">{name ? "nice to meet you" : "type your name"} <i>✎</i></span>
        <label htmlFor="hero-name" className="sr-only">Your name</label>
        <input
          ref={field}
          id="hero-name"
          className="hw-input"
          type="text"
          value={name}
          onChange={onName}
          placeholder="{your name}"
          maxLength={MAX_NAME}
          autoComplete="given-name"
          spellCheck={false}
          enterKeyHint="done"
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          onBlur={() => name.trim() && wave(".hw--hi .hl")}
        />
        <span ref={mirror} className="hw-mirror" aria-hidden="true">{name || "{your name}"}</span>
      </div>

      <p className="hw hw--left hw--im" aria-hidden="true" data-depth="-8">
        <Letters word="I'm" />
      </p>

      <div className="hw hw--right hw--me" data-depth="-12">
        <h1 id="hero-title" className="hero4-role">
          <span className="sr-only">{profile.name || "Neha Ondhia"}, </span>
          {profile.role || "Illustrator, Brand and Graphic Designer"}.
        </h1>
        <p className="hw-word" aria-hidden="true">
          <Letters word={first} />
        </p>
      </div>

      <div className="hero4-foot hero-fade">
        <span className="hero-scroll" aria-hidden="true">scroll <i /></span>
      </div>
    </section>
  );
}
