"use client";

import { useEffect, useEffectEvent, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const CARD_W = 250;
const CARD_H = 310;
const GAP = 26;
const noop = () => () => {};

// Global tracker: ensure only ONE card is visible at any time across the page
let activeHide = null;

// An inline name in story copy. Hover draws an underline and a photo card that trails the cursor;
// keyboard focus or a tap shows the same card anchored to the word.
export default function HoverPeek({ children, src, alt, position = "center top" }) {
  const termRef = useRef(null);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const tweens = useRef(null);
  const last = useRef({ x: 0, t: 0 });
  const isVisible = useRef(false);
  // true only in the browser, so the card can portal into document.body
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const hide = () => {
    const card = cardRef.current;
    if (!card) return;
    isVisible.current = false;
    if (activeHide === hide) {
      activeHide = null;
    }
    gsap.killTweensOf([card, imgRef.current]);
    gsap.to(card, {
      autoAlpha: 0,
      scale: 0.7,
      rotation: 6,
      duration: 0.25,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        if (!isVisible.current && card) {
          gsap.set(card, { autoAlpha: 0, scale: 0.6 });
        }
      }
    });
  };

  const place = (cx, cy, instant) => {
    const card = cardRef.current;
    if (!card) return;
    const vw = window.innerWidth;
    const x = Math.min(Math.max(cx, CARD_W / 2 + 12), vw - CARD_W / 2 - 12);
    const y = cy - CARD_H - GAP < 12 ? cy + GAP : cy - CARD_H - GAP;
    if (instant) gsap.set(card, { x, y });
    else if (tweens.current) {
      tweens.current.x(x);
      tweens.current.y(y);
    }
  };

  const show = (cx, cy) => {
    const card = cardRef.current;
    if (!card) return;

    // Immediately dismiss any other card currently showing
    if (activeHide && activeHide !== hide) {
      activeHide();
    }
    activeHide = hide;
    isVisible.current = true;

    // The photo is only fetched the first time its card opens, so the page itself stays light.
    const img = imgRef.current?.querySelector("img");
    if (img && !img.getAttribute("src")) img.setAttribute("src", img.dataset.src);

    place(cx, cy, true);
    last.current = { x: cx, t: performance.now() };
    gsap.killTweensOf([card, imgRef.current]);

    if (prefersReducedMotion()) {
      gsap.set(card, { autoAlpha: 1, scale: 1, rotation: -3 });
      return;
    }

    gsap.to(card, {
      autoAlpha: 1,
      scale: 1,
      rotation: -3,
      duration: 0.45,
      ease: "back.out(1.7)",
      overwrite: true
    });

    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.35 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.6, ease: "expo.out", delay: 0.03, overwrite: true }
      );
    }
  };

  // Always see the latest `hide`, without re-running the setup effect on every render.
  const onGlobalScroll = useEffectEvent(() => {
    if (isVisible.current) hide();
  });
  const release = useEffectEvent(() => {
    if (activeHide === hide) activeHide = null;
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(card, { xPercent: -50, yPercent: 0, autoAlpha: 0, scale: 0.6, rotation: -8 });
    tweens.current = {
      x: gsap.quickTo(card, "x", { duration: 0.55, ease: "power3" }),
      y: gsap.quickTo(card, "y", { duration: 0.55, ease: "power3" }),
      r: gsap.quickTo(card, "rotation", { duration: 0.6, ease: "power3" })
    };

    // Auto-hide when window scrolls
    const onScroll = () => onGlobalScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      release();
      if (card) gsap.killTweensOf(card);
    };
  }, [mounted]);

  const onEnter = (e) => {
    if (e.pointerType === "touch") return;
    show(e.clientX, e.clientY);
  };

  const onMove = (e) => {
    if (e.pointerType === "touch" || !tweens.current) return;
    place(e.clientX, e.clientY);
    const now = performance.now();
    const v = (e.clientX - last.current.x) / Math.max(now - last.current.t, 1);
    last.current = { x: e.clientX, t: now };
    tweens.current.r(Math.max(-14, Math.min(14, -3 + v * 6)));
  };

  const onLeave = () => {
    hide();
  };

  const anchor = () => {
    if (!termRef.current) return;
    const r = termRef.current.getBoundingClientRect();
    show(r.left + r.width / 2, r.top);
  };

  const onClick = () => {
    anchor();
    const off = (ev) => {
      if (!termRef.current?.contains(ev.target)) {
        hide();
        window.removeEventListener("pointerdown", off);
        window.removeEventListener("scroll", off);
      }
    };
    window.addEventListener("pointerdown", off);
    window.addEventListener("scroll", off, { once: true, passive: true });
  };

  return (
    <>
      <span
        ref={termRef}
        className="peek"
        tabIndex={0}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={anchor}
        onBlur={hide}
        onClick={onClick}
      >
        {children}
      </span>
      {mounted &&
        createPortal(
          <div ref={cardRef} className="peek-card" aria-hidden="true" style={{ width: CARD_W, height: CARD_H }}>
            <div ref={imgRef} className="peek-media">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-src={src} alt={alt || ""} decoding="async" style={{ objectPosition: position }} />
              ) : (
                <span className="peek-placeholder">{children}</span>
              )}
            </div>
            <span className="peek-caption">{alt || children}</span>
          </div>,
          document.body
        )}
    </>
  );
}
