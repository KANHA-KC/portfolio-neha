"use client";

import { useEffect, useRef, useState } from "react";

// A strip of portrait videos. Each plays muted while on screen; clicking one turns its sound on (and the others off).
export default function Reels({ videos, title, heading = "AI Videos" }) {
  const listRef = useRef(null);
  const [loud, setLoud] = useState(-1);

  useEffect(() => {
    const els = [...listRef.current.querySelectorAll("video")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !reduce) e.target.play().catch(() => {});
          else e.target.pause();
        }),
      { threshold: 0.4 }
    );
    els.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const toggle = (i) => {
    const els = listRef.current.querySelectorAll("video");
    const next = loud === i ? -1 : i;
    els.forEach((v, j) => {
      v.muted = j !== next;
      if (j === next) v.play().catch(() => {});
    });
    setLoud(next);
  };

  return (
    <section className="reels" aria-label={`${title} videos`}>
      <div className="reels-head">
        <h2>{heading}</h2>
        <span className="hand reels-hint">
          <svg className="reels-hint-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
            <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a7.8 7.8 0 0 1 0 11" />
          </svg>
          tap one for sound
        </span>
      </div>
      <ul className="reels-list" ref={listRef}>
        {videos.map((v, i) => (
          <li key={v.src} className="reel">
            <figure style={{ margin: 0 }}>
              <button type="button" className="reel-frame" onClick={() => toggle(i)} aria-pressed={loud === i} aria-label={`${v.title || "Video"}: ${loud === i ? "mute" : "play with sound"}`}>
                <video src={v.src} poster={v.poster || undefined} muted loop playsInline preload="none" />
                <span className="reel-sound" aria-hidden="true">{loud === i ? "🔊 on" : "🔇"}</span>
              </button>
              {v.title && <figcaption>{v.title}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
