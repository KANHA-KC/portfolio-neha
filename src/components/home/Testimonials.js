"use client";

import { useEffect, useState } from "react";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { prefersReducedMotion } from "@/lib/gsap";

// Same tile language as the brand-logo band: flat palette swatches riding a curve.
// Copy comes from the Wix "Testimonials" collection (see src/content/seed.js for the fallback).
const TILE = { gold: "var(--gold-wash)", aqua: "var(--light-aqua)", paprika: "var(--pap-wash)", teal: "var(--mist)" };
const CYCLE = ["gold", "aqua", "paprika", "teal"];

// A long, gentle wave (design space 1600 × 560); both ends run far off-screen so the cards space out
// and glide in and out.
const PATH = "M-1000 330C-560 330 140 205 480 215C840 225 960 360 1280 345C1600 330 2140 225 2600 220";

function Card({ quote, author, role, bg }) {
  return (
    <figure className="testi-card" style={{ "--tile": bg }}>
      <span className="testi-mark" aria-hidden="true">“</span>
      <blockquote className="testi-quote">{quote}</blockquote>
      <figcaption className="testi-author">
        <span className="testi-name">{author}</span>
        <span className="testi-role">{role}</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ items = [] }) {
  const [still, setStill] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a media query once on mount
  useEffect(() => setStill(prefersReducedMotion()), []);

  if (!items.length) return null;

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-head">
        <p className="eyebrow">
          <span className="eyebrow-num">(03)</span> Kind words
        </p>
        <h2 id="testimonials-title" className="section-title">
          (They said it, <em>not me.</em>)
        </h2>
      </div>

      <div className="testi-marquee">
        <MarqueeAlongSvgPath
          path={PATH}
          viewBox="0 0 1600 560"
          responsive
          fit="cover"
          baseVelocity={1.1}
          paused={still}
          slowdownOnHover
          slowDownFactor={0.08}
          draggable
          repeat={items.length < 4 ? 3 : 2}
          dragSensitivity={0.06}
          grabCursor
          className="testi-track"
          itemClassName="testi-item"
        >
          {items.map((t, i) => (
            <Card key={`${t.author}-${i}`} {...t} bg={TILE[t.tile || CYCLE[i % CYCLE.length]]} />
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  );
}
