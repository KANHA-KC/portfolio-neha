"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MARK_PATH, MARK_VIEWBOX } from "@/components/brand/markPath";

if (typeof window !== "undefined") gsap.registerPlugin(DrawSVGPlugin);

const PHI = (1 + Math.sqrt(5)) / 2;
const { w: W, h: H } = MARK_VIEWBOX;
// The mark is two loops; each one is "grown" from a golden spiral centred in it.
const LOOPS = [
  { cx: 247, cy: 246, R: 236, end: Math.PI * 1.08 }, // left loop, spiral ends on its left side
  { cx: 549, cy: 246, R: 236, end: Math.PI * 0.08 } // right loop: the same spiral turned 180°
];

// Logarithmic golden spiral (r grows by φ every quarter turn), drawn from the centre outwards.
const spiral = ({ cx, cy, R, end }) => {
  const turns = 3.2, n = 260, pts = [];
  for (let i = 0; i <= n; i++) {
    const th = -turns * 2 * Math.PI * (1 - i / n);
    const r = R * Math.pow(PHI, (2 * th) / Math.PI);
    const a = end + th;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
};

// Golden-rectangle construction lines (squares carved off in turn), placed so their pole sits on the spiral centre.
const guides = ({ cx, cy, R, end }) => {
  let x = 0, y = 0, w = R * PHI, h = R;
  const lines = [`M0 0 H${w} V${h} H0 Z`];
  for (let k = 0; k < 7; k++) {
    const d = k % 4;
    if (d === 0) { lines.push(`M${x + h} ${y} V${y + h}`); x += h; w -= h; }
    else if (d === 1) { lines.push(`M${x} ${y + w} H${x + w}`); y += w; h -= w; }
    else if (d === 2) { lines.push(`M${x + w - h} ${y} V${y + h}`); w -= h; }
    else { lines.push(`M${x} ${y + h - w} H${x + w}`); h -= w; }
  }
  const px = x + w / 2, py = y + h / 2; // pole ≈ centre of the last tiny rectangle
  const deg = Math.round(((end * 180) / Math.PI + 180) / 90) * 90; // keep the guides square to the page, like a layout grid
  return { d: lines.join(" "), transform: `translate(${cx} ${cy}) rotate(${deg}) translate(${-px} ${-py})` };
};

const SPIRALS = LOOPS.map(spiral);
const GUIDES = LOOPS.map(guides);

let playIntro = null; // decided on first mount: true on the first visit of a session

const finish = () => {
  window.__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
};

// First-visit intro: golden spirals grow into the "no" mark, it fills with the brand gradient,
// then settles into the "neha ondhia" lockup and the screen lifts away. Tap or press a key to skip.
// Easter egg: anything can replay it by dispatching `intro:replay` (the nav logo does, on 4+ quick clicks).
export default function Preloader() {
  const ref = useRef(null);
  const [gone, setGone] = useState(false);
  const [run, setRun] = useState(0); // 0 = the page-load intro; 1, 2, … = replays

  useEffect(() => {
    const replay = () => {
      if (prefersReducedMotion()) return;
      setRun((n) => n + 1);
      setGone(false);
    };
    window.addEventListener("intro:replay", replay);
    return () => window.removeEventListener("intro:replay", replay);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // Decide once per page load (React may run this effect twice in development). Replays always play.
    if (run === 0 && playIntro === null) {
      let seen = false;
      try {
        seen = sessionStorage.getItem("intro") === "1";
        sessionStorage.setItem("intro", "1");
      } catch {}
      playIntro = !seen && !prefersReducedMotion();
    }

    if (run === 0 && !playIntro) {
      root.style.display = "none";
      finish();
      return;
    }
    root.style.animation = "none"; // scripts are running, so the CSS failsafe isn't needed
    root.style.display = ""; // a replay reuses the element that was hidden on load
    gsap.set(root, { clipPath: "inset(0 0 0 0)" });
    gsap.set(root.querySelectorAll(".pre-spiral, .pre-dot, .pre-guide, .pre-outline"), { opacity: 1 });

    const q = (s) => root.querySelectorAll(s);
    const mark = root.querySelector(".pre-mark");
    const word = root.querySelector(".pre-word");
    let tl = null;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      // The mark is laid out at its real large size (so the SVG is drawn sharp, never stretched),
      // centred on screen, then its width animates down to the lockup size next to the word.
      const gap = parseFloat(getComputedStyle(root.querySelector(".pre-lockup")).columnGap) || 24;
      const smallW = (parseFloat(getComputedStyle(mark).height) * W) / H || mark.getBoundingClientRect().width || 136;
      const bigW = Math.max(smallW, Math.min(innerWidth * 0.62, innerHeight * 0.5 * (W / H)));
      const shift = (word.getBoundingClientRect().width + gap) / 2;

      gsap.set(mark, { width: bigW, height: "auto", x: shift, scale: 1 });
      gsap.set(q(".pre-dot"), { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".pre-guide"), { drawSVG: "0%", opacity: 0.55 });
      gsap.set(q(".pre-spiral"), { drawSVG: "0%" });
      gsap.set(q(".pre-outline"), { drawSVG: "0%" });
      gsap.set(q(".pre-fill"), { opacity: 0 });
      gsap.set(word, { clipPath: "inset(0 100% 0 0)", x: -24 });

      tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: () => setGone(true) });
      tl.to(q(".pre-dot"), { scale: 1, duration: 0.35, ease: "back.out(3)", stagger: 0.08 }, 0)
        .to(q(".pre-guide"), { drawSVG: "100%", duration: 0.9, stagger: 0.1 }, 0.2)
        .to(q(".pre-spiral"), { drawSVG: "100%", duration: 1.3, ease: "power1.inOut", stagger: 0.12 }, 0.4)
        .to(q(".pre-outline"), { drawSVG: "100%", duration: 1.0 }, 1.5)
        .to([...q(".pre-spiral"), ...q(".pre-dot")], { opacity: 0, duration: 0.6 }, 1.75)
        .to(q(".pre-guide"), { opacity: 0, duration: 0.6 }, 1.6)
        .to(q(".pre-fill"), { opacity: 1, duration: 0.7, ease: "power1.out" }, 2.3)
        .to(q(".pre-outline"), { opacity: 0, duration: 0.5 }, 2.6)
        .to(mark, { x: 0, width: smallW, duration: 0.9, ease: "expo.inOut" }, 2.95)
        .to(word, { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.8, ease: "expo.out" }, 3.35)
        .add(finish, "+=0.35")
        .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "<");
    };
    // Wait (briefly) for the wordmark font so the lockup is measured at its real width.
    Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 700))]).then(start);

    // Tap / key to fast-forward.
    const skip = () => tl?.timeScale(6);
    root.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      cancelled = true;
      tl?.kill();
      root.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [run]);

  if (gone) return null;

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="pre-lockup">
        <svg className="pre-mark" viewBox={`0 0 ${W} ${H}`} overflow="visible">
          <defs>
            <linearGradient id="pre-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
              <stop offset="0" stopColor="#cada49" />
              <stop offset="1" stopColor="#c5f6fc" />
            </linearGradient>
          </defs>
          {GUIDES.map((g, i) => (
            <path key={`g${i}`} className="pre-guide" d={g.d} transform={g.transform} />
          ))}
          {SPIRALS.map((d, i) => (
            <path key={`s${i}`} className="pre-spiral" d={d} />
          ))}
          {LOOPS.map((l, i) => (
            <circle key={`d${i}`} className="pre-dot" cx={l.cx} cy={l.cy} r="7" />
          ))}
          <path className="pre-outline" d={MARK_PATH} />
          <path className="pre-fill" d={MARK_PATH} />
        </svg>
        <span className="pre-word">neha ondhia</span>
      </div>
      <span className="pre-skip">tap to skip</span>
    </div>
  );
}
