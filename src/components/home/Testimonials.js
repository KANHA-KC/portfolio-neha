"use client";

import { useEffect, useState } from "react";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { prefersReducedMotion } from "@/lib/gsap";

// Two alternating pastel brand colors: light teal and light neon
const ALT_TILES = ["var(--light-aqua)", "var(--gold-wash)"];

// A straight, level line (design space 1600 × 440); both ends run far off-screen so the cards space
// out and glide in and out without tilting.
const PATH = "M-1000 220H2600";

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

  // Ensure an even sequence so the two alternating colors loop seamlessly without duplicate neighbors
  const cards = items.length % 2 === 1 ? [...items, ...items] : items;

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-head">
        <span className="hand testi-tag">Testimonials</span>
        <h2 id="testimonials-title" className="section-title">
          (They said it, <em>not me.</em>)
        </h2>
      </div>

      <div className="testi-marquee">
        <MarqueeAlongSvgPath
          path={PATH}
          viewBox="0 0 1600 490"
          responsive
          fit="contain-y"
          baseVelocity={1.1}
          paused={still}
          slowdownOnHover
          slowDownFactor={0.08}
          draggable
          repeat={cards.length < 8 ? 2 : 1}
          dragSensitivity={0.06}
          grabCursor
          className="testi-track"
          itemClassName="testi-item"
        >
          {cards.map((t, i) => (
            <Card key={`${t.author}-${i}`} {...t} bg={ALT_TILES[i % ALT_TILES.length]} />
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  );
}
