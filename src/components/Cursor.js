"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/*
  Design-tool cursor (desktop + mouse only).
  The tool changes with what's under the pointer:
    select     empty space: a rounded selection arrow (default)
    type       text and fields
    move       links and buttons (their data-cursor label shows as a tooltip)
    zoom       work cards and "view"-type links
    hand       draggable things (grabs on press)
    eyedropper images (live colour swatch; click picks the colour for the brush and copies the hex)
  Hidden shortcuts (ignored while typing in a field):
    V selection · P pen (or B) · E eraser · [ ] brush size · X swap colours · ⌘/Ctrl+Z undo stroke · ? shortcuts card
*/

const ICONS = {
  // rounded selection arrow with a curved tail: the top-left tip is the hotspot
  select:
    '<svg viewBox="0 0 24 24"><path d="M5.7 2.8 19.3 13c.8.6.4 1.9-.6 1.9l-4.9.2c-2.3.1-4.4 1.2-5.8 3l-1.8 2.3c-.6.8-1.9.4-1.9-.6V3.6c0-.9.8-1.3 1.4-.8Z"/></svg>',
  // pen tool with bezier anchor points: the nib's tip is the hotspot
  brush:
    '<svg viewBox="0 0 24 24"><path class="tc-arc" d="M3.6 10.4C3.8 6 7.6 3.2 11 3.2M13 3.2c3.4 0 7.2 2.8 7.4 7.2"/><rect x="10.2" y="1.6" width="3.6" height="3.2" rx=".5"/><rect x="1.8" y="10.4" width="3.6" height="3.2" rx=".5"/><rect x="18.6" y="10.4" width="3.6" height="3.2" rx=".5"/><path class="tc-nib" d="M12 5.6 17.6 12.3 15.4 17.2H8.6L6.4 12.3Z"/><path d="M12 5.6v5"/><circle cx="12" cy="11.8" r="1.25"/><rect x="8.6" y="17.2" width="6.8" height="4.6" rx=".6"/><path d="M10.2 19.5h3.6"/></svg>',
  eraser:
    '<svg viewBox="0 0 24 24"><path d="m14.8 3.6 5.6 5.6a1.5 1.5 0 0 1 0 2.1l-8.2 8.2H6.9l-3.3-3.3a1.5 1.5 0 0 1 0-2.1l9.1-9.1a1.5 1.5 0 0 1 2.1 0Z"/><path d="M9 9.9 14.6 15.5M7 19.5h13"/></svg>',
  move:
    '<svg viewBox="0 0 24 24"><path d="M3 2.5v15.2l4-3.8 2.6 6 2.8-1.2-2.6-5.9 5.6-.3Z"/><path d="M17.5 13v8M13.5 17h8M17.5 13l-1.4 1.4M17.5 13l1.4 1.4M17.5 21l-1.4-1.4M17.5 21l1.4-1.4"/></svg>',
  type:
    '<svg viewBox="0 0 24 24"><path d="M12 4.2c-.6-.8-1.6-1.2-2.8-1.2M12 4.2c.6-.8 1.6-1.2 2.8-1.2M12 4.2v15.6M12 19.8c-.6.8-1.6 1.2-2.8 1.2M12 19.8c.6.8 1.6 1.2 2.8 1.2M9.5 12h5"/></svg>',
  zoom:
    '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6M10 7v6M7 10h6"/></svg>',
  hand:
    '<svg viewBox="0 0 24 24"><path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5M14 10.5V5.5a1.5 1.5 0 0 1 3 0V12M17 11.5V8a1.5 1.5 0 0 1 3 0v6.5c0 3.9-3 7-6.8 7h-1.1c-2.3 0-4.1-1-5.4-2.8L3.6 14.5a1.5 1.5 0 0 1 2.3-1.9L8 15"/></svg>',
  grab:
    '<svg viewBox="0 0 24 24"><path d="M7 11.5V9a1.5 1.5 0 0 1 3 0v2M10 10.5V8.5a1.5 1.5 0 0 1 3 0v2M13 10.5V9a1.5 1.5 0 0 1 3 0v2M16 11V10a1.5 1.5 0 0 1 3 0v4.5c0 3.9-3 7-6.8 7h-1.1c-3.4 0-6.1-2.8-6.1-6.2V12.5a1.5 1.5 0 0 1 2-1.4"/></svg>',
  eyedropper:
    '<svg viewBox="0 0 24 24"><path d="m14.5 6.2 3.3 3.3M19.6 4.4a2.2 2.2 0 0 0-3.1 0l-2.4 2.4-1-1-1.4 1.4 1 1-7.9 7.9-.6 3.4 3.4-.6 7.9-7.9 1 1 1.4-1.4-1-1 2.4-2.4a2.2 2.2 0 0 0 .3-2.8Z"/></svg>'
};

// Where the pointer's hotspot sits inside each 28px icon (so clicks land exactly where the tool points).
const HOTSPOT = { select: [5.2, 3.6], brush: [14, 6.5], eraser: [6, 22], move: [3, 3], type: [14, 14], zoom: [11, 11], hand: [12, 12], grab: [12, 12], eyedropper: [3, 25] };
const INTERACTIVE = "a, button, [role='button'], summary, select, label[for]";
const FIELD = "input:not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']";
const TEXT = "p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption, dd, dt, td, th";
const ZOOMY = /^(view|read case|peek|browse|all work)$/i;
const BRAND_SWATCHES = [
  "#c7db0a", // neon
  "#056e7f", // teal
  "#b8f9ff", // light aqua
  "#03414b", // deep teal
  "#8eeaf3", // pearl
  "#333333"  // ink
];

export default function Cursor() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = (s) => root.querySelector(s);
    const toolEl = $(".tc-tool"), ring = $(".tc-ring"), tip = $(".tc-tip"), swatch = $(".tc-swatch"), hud = $(".tc-hud"), ants = $(".tc-ants");
    document.documentElement.classList.add("has-cursor");

    const state = {
      x: -100, y: -100, tool: "select", canvasTool: "select", size: 14, colors: [BRAND_SWATCHES[0], BRAND_SWATCHES[2]], down: false,
      painting: null, strokes: [], redo: [], lastMove: 0, lastX: 0, vx: 0, sampled: null, idleTimer: 0,
      marq: null, selection: null
    };

    // ---- positioning: the tool is exact, the ring and tooltip trail slightly for feel ----
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    const tipX = gsap.quickTo(tip, "x", { duration: 0.5, ease: "power3" });
    const tipY = gsap.quickTo(tip, "y", { duration: 0.5, ease: "power3" });
    const tilt = gsap.quickTo(toolEl, "rotation", { duration: 0.5, ease: "power3" });

    const setTool = (t) => {
      if (state.tool === t) return;
      state.tool = t;
      root.dataset.tool = t;
      toolEl.innerHTML = ICONS[t];
      const [hx, hy] = HOTSPOT[t];
      toolEl.style.setProperty("--hx", `${-hx}px`);
      toolEl.style.setProperty("--hy", `${-hy}px`);
      if (!reduce) gsap.fromTo(toolEl, { scale: 0.6 }, { scale: 1, duration: 0.35, ease: "back.out(3)" });
    };
    const setSize = (s) => {
      state.size = Math.max(4, Math.min(60, s));
      root.style.setProperty("--brush", `${state.size}px`);
    };
    const flash = (msg) => {
      hud.textContent = msg;
      gsap.killTweensOf(hud);
      gsap.set(hud, { x: state.x, y: state.y });
      gsap.fromTo(hud, { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 0.2 }); // yPercent, so the pointer position (x/y) is kept
      gsap.to(hud, { autoAlpha: 0, duration: 0.3, delay: 1.3 });
    };
    const setColors = () => {
      root.style.setProperty("--fg", state.colors[0]);
      root.style.setProperty("--bg2", state.colors[1]);
    };
    setTool("move"); setTool("select"); setSize(14); setColors();

    // ---- eyedropper: sample a pixel from the image under the pointer ----
    const samplers = new WeakMap();
    const sample = (img, cx, cy) => {
      try {
        let s = samplers.get(img);
        if (!s) {
          if (!img.complete || !img.naturalWidth) return null;
          const c = document.createElement("canvas");
          c.width = 96; c.height = Math.max(1, Math.round((96 * img.naturalHeight) / img.naturalWidth));
          const g = c.getContext("2d", { willReadFrequently: true });
          g.drawImage(img, 0, 0, c.width, c.height);
          s = { c, g };
          samplers.set(img, s);
        }
        const r = img.getBoundingClientRect();
        const px = Math.floor(((cx - r.left) / r.width) * s.c.width);
        const py = Math.floor(((cy - r.top) / r.height) * s.c.height);
        const d = s.g.getImageData(Math.max(0, Math.min(s.c.width - 1, px)), Math.max(0, Math.min(s.c.height - 1, py)), 1, 1).data;
        if (d[3] < 20) return null;
        return "#" + [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, "0")).join("");
      } catch {
        return null;
      }
    };

    // ---- which tool fits what's under the pointer ----
    const pick = (target) => {
      const el = target?.closest ? target : null;
      if (!el) return { tool: state.canvasTool };
      const labelled = el.closest("[data-cursor]");
      const label = labelled?.getAttribute("data-cursor");
      if (el.closest(FIELD)) return { tool: "type" };
      if (label === "drag" || el.closest("[data-drag], .is-draggable")) return { tool: state.down ? "grab" : "hand", label: label === "drag" ? "drag" : "" };
      if (el.tagName === "IMG" && !el.closest(INTERACTIVE)) return { tool: "eyedropper", img: el };
      if (el.closest(".peek")) return { tool: "zoom" };
      if (label && label !== "home" && ZOOMY.test(label)) return { tool: "zoom", label };
      if (el.closest(INTERACTIVE) || labelled) return { tool: state.canvasTool, isLink: true, label: label && label !== "home" ? label : "" };
      if (el.closest(TEXT) || el.closest(".hw")) return { tool: "type" };
      return { tool: state.canvasTool };
    };

    // ---- painting (page coordinates, so strokes scroll with the page; they fade after a while) ----
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const LIFE = 9000, FADE = 2500;
    function draw() {
      raf = 0;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const now = performance.now();
      state.strokes = state.strokes.filter((s) => s === state.painting || now - s.born < LIFE);
      for (const s of state.strokes) {
        const age = s === state.painting ? 0 : now - s.born;
        ctx.globalAlpha = age > LIFE - FADE ? Math.max(0, (LIFE - age) / FADE) : 1;
        ctx.strokeStyle = s.color; ctx.lineWidth = s.size; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath();
        const p = s.pts;
        ctx.moveTo(p[0].x - scrollX, p[0].y - scrollY);
        for (let i = 1; i < p.length - 1; i++) {
          const mx = (p[i].x + p[i + 1].x) / 2, my = (p[i].y + p[i + 1].y) / 2;
          ctx.quadraticCurveTo(p[i].x - scrollX, p[i].y - scrollY, mx - scrollX, my - scrollY);
        }
        const last = p[p.length - 1];
        ctx.lineTo(last.x - scrollX, last.y - scrollY);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (state.strokes.length) raf = requestAnimationFrame(draw);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const eraseAt = (x, y) => {
      const r = state.size;
      const before = state.strokes.length;
      state.strokes = state.strokes.filter((s) => !s.pts.some((p) => Math.hypot(p.x - x, p.y - y) < r + s.size / 2));
      if (state.strokes.length !== before) kick();
    };

    // ---- idle marching ants ----
    const resetIdle = () => {
      root.classList.remove("is-idle");
      clearTimeout(state.idleTimer);
      state.idleTimer = setTimeout(() => {
        if (state.tool === "brush" && !reduce) root.classList.add("is-idle");
      }, 4500);
    };

    // ---- marquee: click-and-drag in any direction draws a selection that shows the page as a negative ----
    // It lives in page coordinates (so it scrolls with the content) and fades away once the mouse is released.
    const DRAG_MIN = 6;
    const clearSelection = () => {
      const el = state.selection;
      if (!el) return;
      state.selection = null;
      el.remove();
    };
    const drawMarquee = (cx, cy) => {
      const m = state.marq;
      const x = cx + scrollX, y = cy + scrollY;
      if (!m.el) {
        if (Math.hypot(x - m.x0, y - m.y0) < DRAG_MIN) return;
        m.el = document.createElement("div");
        m.el.className = "tc-marquee";
        m.el.setAttribute("aria-hidden", "true");
        document.body.appendChild(m.el);
        document.documentElement.classList.add("is-marqueeing"); // no native text selection while dragging
        window.getSelection()?.removeAllRanges();
      }
      const l = Math.min(x, m.x0), t = Math.min(y, m.y0);
      const w = Math.abs(x - m.x0), h = Math.abs(y - m.y0);
      Object.assign(m.el.style, { left: `${l}px`, top: `${t}px`, width: `${w}px`, height: `${h}px` });
      m.el.dataset.size = `${Math.round(w)} × ${Math.round(h)}`;
    };
    const endMarquee = () => {
      const m = state.marq;
      state.marq = null;
      document.documentElement.classList.remove("is-marqueeing");
      if (!m?.el) return false;
      if (m.el.offsetWidth < 12 || m.el.offsetHeight < 12) { m.el.remove(); return true; }
      // Let go and the negative melts away on its own.
      const el = m.el;
      el.classList.add("is-set");
      state.selection = el;
      // Shrink back into the corner where the drag began (see .tc-marquee.is-leaving).
      el.style.transformOrigin = `${m.x0 - parseFloat(el.style.left)}px ${m.y0 - parseFloat(el.style.top)}px`;
      el.classList.add("is-leaving");
      setTimeout(() => { el.remove(); if (state.selection === el) state.selection = null; }, 900);
      return true;
    };
    // Dragging across an image or link would otherwise start the browser's own drag-and-drop and cut the marquee short.
    const onDragStart = (e) => { if (state.marq) e.preventDefault(); };
    const onCancel = () => { if (state.marq) endMarquee(); state.down = false; root.classList.remove("is-down"); };
    // A drag that ends over a link shouldn't also follow it.
    const swallowClick = (e) => { e.preventDefault(); e.stopPropagation(); };

    let current = { tool: "select" };
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      state.x = e.clientX; state.y = e.clientY;
      root.classList.remove("is-gone");
      gsap.set(toolEl, { x: e.clientX, y: e.clientY });
      ringX(e.clientX); ringY(e.clientY); tipX(e.clientX); tipY(e.clientY);
      gsap.set([swatch, hud, ants], { x: e.clientX, y: e.clientY });
      // flick tilt
      const now = performance.now();
      const v = (e.clientX - state.lastX) / Math.max(now - state.lastMove, 1);
      state.lastX = e.clientX; state.lastMove = now;
      if (!reduce) tilt(Math.max(-18, Math.min(18, v * 9)));

      if (state.marq) {
        drawMarquee(e.clientX, e.clientY);
        resetIdle();
        return;
      }
      if (state.painting) {
        state.painting.pts.push({ x: e.clientX + scrollX, y: e.clientY + scrollY });
        kick();
        return;
      }
      if (state.down && state.tool === "eraser") eraseAt(e.clientX + scrollX, e.clientY + scrollY);

      current = pick(e.target);
      // Cutout images are mostly transparent: only show the picker over pixels you can actually see.
      const hex = current.tool === "eyedropper" ? sample(current.img, e.clientX, e.clientY) : null;
      if (current.tool === "eyedropper" && !hex) current = { tool: state.canvasTool };
      setTool(current.tool);
      // Bright spots inside dark sections (e.g. the neon back-to-top disc) opt out with data-surface="light".
      const onDark = Boolean(e.target?.closest?.(".hero, .hero4, .hero-intro, .case-stats, .menu-overlay, .footer, .tilt-band, .nav--on-dark, [data-theme='dark']")) &&
        !e.target?.closest?.("[data-surface='light']");
      root.classList.toggle("is-on-dark", onDark);
      root.classList.toggle("is-link", Boolean(current.isLink));
      if (current.label) { tip.textContent = current.label; root.classList.add("has-tip"); } else root.classList.remove("has-tip");
      if (current.tool === "eyedropper") {
        state.sampled = hex;
        if (hex) { swatch.style.setProperty("--sample", hex); swatch.dataset.hex = hex.toUpperCase(); root.classList.add("has-swatch"); }
        else root.classList.remove("has-swatch");
      } else root.classList.remove("has-swatch");
      resetIdle();
    };

    const burst = (x, y) => {
      if (reduce) return;
      for (let i = 0; i < 6; i++) {
        const dot = document.createElement("i");
        dot.className = `tc-spark ${i % 2 === 1 ? "tc-spark--cyan" : ""}`;
        root.appendChild(dot);
        const a = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        gsap.fromTo(dot, { x, y, scale: 1, opacity: 1 }, {
          x: x + Math.cos(a) * gsap.utils.random(14, 26), y: y + Math.sin(a) * gsap.utils.random(14, 26), scale: 0, opacity: 0,
          duration: 0.55, ease: "power2.out", onComplete: () => dot.remove()
        });
      }
    };

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      state.down = true;
      root.classList.add("is-down");
      burst(e.clientX, e.clientY);
      clearSelection();
      const t = e.target;
      // On text (the I-beam) a drag selects text natively, as in any editor; elsewhere it draws the marquee.
      const canMarquee = !current.isLink && ["select", "eyedropper", "zoom"].includes(state.tool) &&
        !(t?.closest?.(`${FIELD}, ${INTERACTIVE}, [data-drag], .is-draggable, .tc-help`) || t?.isContentEditable);
      if (canMarquee) state.marq = { x0: e.clientX + scrollX, y0: e.clientY + scrollY, el: null };
      if (state.tool === "hand") setTool("grab");
      if (state.tool === "brush") {
        e.preventDefault(); // painting, not text selection
        state.redo = [];
        state.painting = { pts: [{ x: e.clientX + scrollX, y: e.clientY + scrollY }], color: state.colors[0], size: state.size, born: performance.now() };
        state.strokes.push(state.painting);
        kick();
      } else if (state.tool === "eraser") {
        e.preventDefault();
        eraseAt(e.clientX + scrollX, e.clientY + scrollY);
      } else if (state.tool === "eyedropper" && state.sampled) {
        state.colors[0] = state.sampled;
        setColors();
        navigator.clipboard?.writeText(state.sampled.toUpperCase()).catch(() => {});
        flash(`Picked ${state.sampled.toUpperCase()} · copied`);
        if (!reduce) gsap.fromTo(swatch, { scale: 1.4 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
      }
    };
    const onUp = () => {
      state.down = false;
      root.classList.remove("is-down");
      if (state.marq && endMarquee()) {
        window.addEventListener("click", swallowClick, { capture: true, once: true });
        setTimeout(() => window.removeEventListener("click", swallowClick, { capture: true }), 0);
      }
      if (state.painting) {
        state.painting.born = performance.now();
        if (state.painting.pts.length < 2) state.painting.pts.push({ ...state.painting.pts[0], x: state.painting.pts[0].x + 0.1 });
        state.painting = null;
        kick();
      }
      if (state.tool === "grab") setTool("hand");
    };

    const typing = (t) => t && (t.closest?.(FIELD) || t.isContentEditable);
    const onKey = (e) => {
      if (typing(e.target)) return;
      const k = e.key;
      if ((e.metaKey || e.ctrlKey) && k.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          const s = state.redo.pop();
          if (s) { s.born = performance.now(); state.strokes.push(s); kick(); flash("Redo brush stroke"); } else flash("Nothing to redo");
        } else {
          const s = state.strokes.pop();
          if (s) { state.redo.push(s); kick(); flash("Undo brush stroke"); } else flash("Nothing to undo. You’re doing great.");
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const onCanvas = current.tool === "select" || current.tool === "brush" || current.tool === "eraser";
      if (k === "v" || k === "V") { state.canvasTool = "select"; if (onCanvas) setTool("select"); flash("Selection tool (V)"); }
      else if (k === "b" || k === "B" || k === "p" || k === "P") { state.canvasTool = "brush"; if (onCanvas) setTool("brush"); flash("Pen tool (P) · hold & drag to draw"); }
      else if (k === "e" || k === "E") { state.canvasTool = "eraser"; if (onCanvas) setTool("eraser"); flash("Eraser tool (E)"); }
      else if (k === "[") { setSize(state.size - 4); flash(`Brush size ${state.size}px`); }
      else if (k === "]") { setSize(state.size + 4); flash(`Brush size ${state.size}px`); }
      else if (k === "x" || k === "X") {
        const curIdx = BRAND_SWATCHES.indexOf(state.colors[0]);
        const nextIdx = curIdx >= 0 ? (curIdx + 1) % BRAND_SWATCHES.length : 0;
        state.colors[0] = BRAND_SWATCHES[nextIdx];
        state.colors[1] = BRAND_SWATCHES[(nextIdx + 1) % BRAND_SWATCHES.length];
        setColors();
        if (!reduce) gsap.fromTo(root.querySelector(".tc-colors"), { rotation: -90 }, { rotation: 0, duration: 0.45, ease: "back.out(2)" });
        flash(`Colour: ${state.colors[0].toUpperCase()} (X to cycle)`);
      } else if (k === "?") root.classList.toggle("show-help");
      else if (k === "Escape") { root.classList.remove("show-help"); clearSelection(); }
    };

    const onLeave = () => root.classList.add("is-gone");
    const onScroll = () => { if (state.strokes.length) kick(); };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    window.addEventListener("dragstart", onDragStart);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    resize();

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      clearTimeout(state.idleTimer);
      cancelAnimationFrame(raf);
      state.marq?.el?.remove();
      state.selection?.remove();
      document.documentElement.classList.remove("is-marqueeing");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="tc-paint" aria-hidden="true" />
      <div ref={rootRef} className="tc is-gone" data-tool="select" aria-hidden="true">
        <span className="tc-ring" />
        <span className="tc-ants" />
        <span className="tc-tool" />
        <span className="tc-tip" />
        <span className="tc-swatch" />
        <span className="tc-hud" />
        <span className="tc-help">
          <b>Hidden tools</b>
          <span><kbd>V</kbd> Selection · drag to invert</span>
          <span><kbd>P</kbd> Pen · hold &amp; drag to draw</span>
          <span><kbd>E</kbd> Eraser</span>
          <span><kbd>[</kbd> <kbd>]</kbd> Brush size</span>
          <span><kbd>X</kbd> Swap colours <i className="tc-colors"><i /><i /></i></span>
          <span><kbd>⌘/Ctrl</kbd> <kbd>Z</kbd> Undo</span>
          <span>Click an image to pick its colour</span>
        </span>
      </div>
    </>
  );
}
