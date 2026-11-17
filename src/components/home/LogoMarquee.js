"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { prefersReducedMotion } from "@/lib/gsap";

// Images are cropped to the logo. Height is set optically: wide wordmarks get shorter, compact
// marks taller, so every logo carries a similar visual weight. `t` fine-tunes heavy/light marks.
// `bg` is the tile colour from the site palette, picked to suit each brand's own colours.
const LOGOS = [
  { name: "Amazon", file: "amazon", w: 860, h: 258, bg: "var(--light-aqua)" },
  { name: "Apollo Hospitals", file: "apollo-hospitals", w: 681, h: 500, bg: "var(--gold-wash)" },
  { name: "HDFC Life", file: "hdfc-life", w: 778, h: 500, bg: "var(--mist)", t: 0.95 },
  { name: "Salesforce", file: "salesforce", w: 583, h: 408, bg: "var(--soft-gold)" },
  { name: "Landmark Infratech", file: "landmark-infratech", w: 851, h: 500, bg: "var(--teal-0)", t: 1.05 },
  { name: "TCS", file: "tcs", w: 582, h: 359, bg: "var(--pearl)", t: 0.8 },
  { name: "Dabur Chyawanprash", file: "dabur-chyawanprash", w: 694, h: 409, bg: "var(--gold-wash)" },
  { name: "Airtel Business", file: "airtel-business", w: 859, h: 274, bg: "var(--soft-pap)" },
  { name: "Lighthouse Canton", file: "lighthouse-canton", w: 859, h: 210, bg: "var(--aqua-wash)" },
  { name: "Drink Prime", file: "drink-prime", w: 701, h: 500, bg: "var(--soft-gold)" },
  { name: "Sterling", file: "sterling", w: 860, h: 310, bg: "var(--light-aqua)" },
  { name: "Orion Uptown", file: "orion-uptown", w: 859, h: 230, bg: "var(--pap-wash)" }
].map((l) => ({ ...l, s: Math.pow(l.w / l.h / 1.7, -0.45) * (l.t ?? 1) }));

// The demo's route: a long swoop with a big loop in the middle (design space 996 × 330).
const PATH =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

function Logo({ name, file, w, h, s, bg }) {
  return (
    <span className="logo-chip" style={{ "--s": s.toFixed(3), "--tile": bg }}>
      <Image src={`/logo-marquee/${file}.png`} alt={name} width={w} height={h} sizes="240px" loading="eager" draggable={false} />
    </span>
  );
}

export default function LogoMarquee() {
  const [still, setStill] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a media query once on mount
  useEffect(() => setStill(prefersReducedMotion()), []);

  return (
    <div className="logo-marquee">
      <MarqueeAlongSvgPath
        path={PATH}
        viewBox="0 0 996 330"
        responsive
        fit="cover"
        baseVelocity={2.4}
        paused={still}
        slowdownOnHover
        slowDownFactor={0.2}
        draggable
        repeat={2}
        dragSensitivity={0.1}
        grabCursor
        className="logo-marquee-track"
        itemClassName="logo-marquee-item"
      >
        {LOGOS.map((l) => (
          <Logo key={l.file} {...l} />
        ))}
      </MarqueeAlongSvgPath>
    </div>
  );
}
