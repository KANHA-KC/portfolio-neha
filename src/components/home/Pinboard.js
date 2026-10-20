"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, Draggable, prefersReducedMotion } from "@/lib/gsap";
import { expertiseData } from "@/data/portfolioData";

// Starting spots on the board (percentages) and tilts.
const spots = [
  { x: 4, y: 8, r: -6 },
  { x: 30, y: 2, r: 4 },
  { x: 58, y: 10, r: -3 },
  { x: 12, y: 52, r: 5 },
  { x: 42, y: 48, r: -5 },
  { x: 70, y: 54, r: 3 }
];

export default function Pinboard() {
  const root = useRef(null);
  const [moved, setMoved] = useState(0);

  useGSAP(
    () => {
      const notes = root.current.querySelectorAll(".note");
      if (!prefersReducedMotion()) {
        gsap.from(notes, {
          y: -60,
          opacity: 0,
          rotate: () => gsap.utils.random(-25, 25),
          stagger: 0.08,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: root.current, start: "top 70%" }
        });
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        let z = 10;
        const d = Draggable.create(notes, {
          bounds: root.current.querySelector(".board"),
          onPress() {
            this.target.style.zIndex = ++z;
            gsap.to(this.target, { scale: 1.06, rotate: 0, boxShadow: "0 30px 50px -20px rgba(6,54,65,.45)", duration: 0.25 });
          },
          onRelease() {
            gsap.to(this.target, { scale: 1, rotate: gsap.utils.random(-6, 6), boxShadow: "0 12px 24px -16px rgba(6,54,65,.35)", duration: 0.5, ease: "back.out(2)" });
          },
          onDragEnd() {
            setMoved((m) => m + 1);
          }
        });
        return () => d.forEach((x) => x.kill());
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="pinboard" aria-labelledby="pin-title">
      <header className="section-head section-head--split">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-num">(03)</span> What I bring
          </p>
          <h2 id="pin-title" className="section-title">
            A tidy-ish <em>toolkit</em>
          </h2>
        </div>
        <p className="pin-hint hand" aria-live="polite">
          {moved === 0 ? "go on, rearrange my skills →" : moved < 4 ? "see? designers can’t help it." : "okay, you’re hired too ✿"}
        </p>
      </header>

      <div className="board">
        {expertiseData.map((e, i) => (
          <div
            key={e.title}
            className="note"
            data-cursor="drag"
            style={{ "--x": `${spots[i].x}%`, "--y": `${spots[i].y}%`, "--r": `${spots[i].r}deg`, "--bg": e.color }}
          >
            <span className="pin" aria-hidden="true" />
            <span className="note-num">0{i + 1}</span>
            <h3>{e.title}</h3>
            <p>{e.desc}</p>
          </div>
        ))}
        <span className="board-doodle hand" aria-hidden="true">✎ plus: workshops, mentoring & a lot of sticky notes</span>
      </div>
    </section>
  );
}
