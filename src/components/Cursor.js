"use client";

if (typeof window !== "undefined") {
  window.__CURSOR_JS_EXECUTED = true;
}

import { useEffect, useRef } from "react";

/*
  Selection Tool cursor (desktop + mouse/trackpad).
  Default tool: Selection arrow pointer (Figma / Illustrator style).
  Contextual tools:
    select     default across the page and interactive links/buttons
    type       text fields and editable areas
    hand/grab  draggable elements
  No marker or drawing effect.
*/

const ICONS = {
  // Iconic Selection arrow pointer. Hotspot is top-left tip at (0, 0).
  select:
    '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M0 0 L0 18.5 L4.8 14 L8.2 21.5 L11.2 20.1 L7.8 12.8 L14 12.8 Z" fill="#18181b" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  type:
    '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M7 4h10M12 4v16M7 20h10" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 4h10M12 4v16M7 20h10" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  hand:
    '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5M14 10.5V5.5a1.5 1.5 0 0 1 3 0V12M17 11.5V8a1.5 1.5 0 0 1 3 0v6.5c0 3.9-3 7-6.8 7h-1.1c-2.3 0-4.1-1-5.4-2.8L3.6 14.5a1.5 1.5 0 0 1 2.3-1.9L8 15" fill="#18181b" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  grab:
    '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M7 11.5V9a1.5 1.5 0 0 1 3 0v2M10 10.5V8.5a1.5 1.5 0 0 1 3 0v2M13 10.5V9a1.5 1.5 0 0 1 3 0v2M16 11V10a1.5 1.5 0 0 1 3 0v4.5c0 3.9-3 7-6.8 7h-1.1c-3.4 0-6.1-2.8-6.1-6.2V12.5a1.5 1.5 0 0 1 2-1.4" fill="#18181b" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>'
};

const HOTSPOT = {
  select: [0, 0],
  type: [12, 12],
  hand: [12, 12],
  grab: [12, 12]
};

const FIELD = "input:not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']";

if (typeof window !== "undefined") {
  // Early bootstrap to position cursor instantly on first mouse move before React hydration finishes
  const onInitialMove = (e) => {
    if (e.pointerType === "touch") return;
    const root = document.getElementById("tc-cursor");
    const tool = root?.querySelector(".tc-tool");
    if (root && tool) {
      document.documentElement.classList.add("has-cursor");
      const tx = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      tool.style.transform = tx;
    }
  };
  window.addEventListener("pointermove", onInitialMove, { passive: true, once: true });
}

export default function Cursor() {
  const rootRef = useRef(null);
  const toolRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const root = rootRef.current;
    const toolEl = toolRef.current;
    const tipEl = tipRef.current;
    if (!root || !toolEl || !tipEl) return;

    let currentTool = "select";
    let isDown = false;
    let active = false;

    const setTool = (tool) => {
      const t = ICONS[tool] ? tool : "select";
      if (currentTool === t) return;
      currentTool = t;
      root.dataset.tool = t;
      toolEl.innerHTML = ICONS[t];
      const spot = HOTSPOT[t] || HOTSPOT.select;
      toolEl.style.setProperty("--hx", `${-spot[0]}px`);
      toolEl.style.setProperty("--hy", `${-spot[1]}px`);
    };

    const pick = (target) => {
      const el = target?.closest ? target : null;
      if (!el) return { tool: "select" };
      if (el.closest(FIELD)) return { tool: "type" };
      const labelled = el.closest("[data-cursor]");
      const label = labelled ? labelled.getAttribute("data-cursor") : null;
      if (label === "drag" || el.closest("[data-drag], .is-draggable")) {
        return { tool: isDown ? "grab" : "hand", label: label === "drag" ? "drag" : "" };
      }
      return { tool: "select", label: label && label !== "home" ? label : "" };
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;

      if (!active) {
        active = true;
        document.documentElement.classList.add("has-cursor");
      }

      const x = e.clientX;
      const y = e.clientY;
      const tx = `translate3d(${x}px, ${y}px, 0)`;
      toolEl.style.transform = tx;
      tipEl.style.transform = tx;

      const current = pick(e.target);
      setTool(current.tool);

      if (current.label) {
        tipEl.textContent = current.label;
        root.classList.add("has-tip");
      } else {
        root.classList.remove("has-tip");
      }
    };

    const onDown = (e) => {
      if (e.pointerType === "touch") return;
      isDown = true;
      root.classList.add("is-down");
      if (currentTool === "hand") setTool("grab");
    };

    const onUp = () => {
      isDown = false;
      root.classList.remove("is-down");
      if (currentTool === "grab") setTool("hand");
    };

    const onLeave = () => {
      active = false;
      document.documentElement.classList.remove("has-cursor");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} id="tc-cursor" className="tc" data-tool="select" aria-hidden="true">
      <span
        ref={toolRef}
        className="tc-tool"
        style={{ "--hx": "0px", "--hy": "0px" }}
        dangerouslySetInnerHTML={{ __html: ICONS.select }}
      />
      <span ref={tipRef} className="tc-tip" />
    </div>
  );
}
