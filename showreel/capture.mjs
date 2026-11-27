// Captures the live site as 60fps frame sequences with a virtual clock, so GSAP motion,
// marquees and the custom cursor advance exactly one frame per screenshot (no dropped frames).
// Usage: node capture.mjs [clipName ...]   → frames/<clip>/00000.jpg …
import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = process.env.SITE || "http://localhost:3000";
const FPS = 60;
const OUT = path.resolve("frames");

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
// Scroll keyframes: [[time 0-1, fraction of page 0-1], …] eased between stops (lets a clip linger on sections)
const scrollPath = (stops) => (t) => {
  for (let i = 1; i < stops.length; i++) {
    const [t0, y0] = stops[i - 1];
    const [t1, y1] = stops[i];
    if (t <= t1) return y0 + (y1 - y0) * ease(clamp((t - t0) / (t1 - t0 || 1), 0, 1));
  }
  return stops.at(-1)[1];
};

const DESK = { width: 1920, height: 1080, scale: 1 };
const MOB = { width: 390, height: 844, scale: 2, mobile: true };

// y is a fraction of the scrollable height, or {px} for absolute pixels.
const CLIPS = {
  hero: { url: "/", vp: DESK, dur: Number(process.env.DUR || 4.5), scroll: () => 0, mouse: (t) => [1150 + 380 * Math.sin(t * 2.2), 430 + 160 * Math.cos(t * 1.7)] },
  home: {
    url: "/", vp: DESK, dur: 16,
    scroll: scrollPath([[0, 0], [0.12, 0.1], [0.3, 0.26], [0.45, 0.4], [0.62, 0.6], [0.8, 0.82], [1, 1]]),
    mouse: (t) => [960 + 500 * Math.sin(t * 0.9), 560 + 200 * Math.sin(t * 1.3)]
  },
  work: {
    url: "/work", vp: DESK, dur: 8,
    scroll: scrollPath([[0, 0], [0.2, 0], [1, 0.75]]),
    mouse: (t) => [700 + 600 * (t / 8), 600 + 120 * Math.sin(t * 2)]
  },
  case: {
    url: "/work/sterling", vp: DESK, dur: 9,
    scroll: scrollPath([[0, 0], [0.15, 0], [1, 0.7]]),
    mouse: (t) => [1300 - 300 * Math.sin(t), 500]
  },
  case2: {
    url: "/work/lighthouse-canton", vp: DESK, dur: 6,
    scroll: scrollPath([[0, 0], [0.2, 0], [1, 0.45]]),
    mouse: (t) => [900 + 300 * Math.sin(t), 500]
  },
  about: {
    url: "/about", vp: DESK, dur: 10,
    scroll: scrollPath([[0, 0], [0.15, 0], [0.4, 0.2], [0.55, 0.22], [1, 0.6]]),
    mouse: (t) => [1000 + 400 * Math.sin(t * 1.1), 480 + 150 * Math.cos(t)]
  },
  contact: { url: "/contact", vp: DESK, dur: 5, scroll: scrollPath([[0, 0], [0.3, 0], [1, 0.35]]), mouse: (t) => [800 + 300 * Math.sin(t * 1.4), 600] },
  mhome: { url: "/", vp: MOB, dur: 9, scroll: scrollPath([[0, 0], [0.12, 0], [1, 0.55]]) },
  mwork: { url: "/work", vp: MOB, dur: 7, scroll: scrollPath([[0, 0], [0.1, 0], [1, 0.4]]) },
  mabout: { url: "/about", vp: MOB, dur: 7, scroll: scrollPath([[0, 0], [0.1, 0], [1, 0.3]]) }
};

async function capture(browser, name, clip) {
  const { vp } = clip;
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.scale,
    isMobile: !!vp.mobile,
    hasTouch: !!vp.mobile,
    reducedMotion: "no-preference",
    colorScheme: "light"
  });
  // Skip the first-visit preloader (the showreel uses the intro film itself) and pin smooth scrolling off.
  await ctx.addInitScript(() => {
    try { sessionStorage.setItem("intro", "1"); } catch {}
    document.addEventListener("DOMContentLoaded", () => {
      document.documentElement.style.scrollBehavior = "auto";
      const st = document.createElement("style");
      st.textContent = "nextjs-portal,[data-nextjs-toast],[data-next-badge-root]{display:none!important}";
      document.head.appendChild(st);
    });
  });
  const page = await ctx.newPage();
  await page.clock.install();
  await page.goto(BASE + clip.url, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(() => document.fonts?.ready);
  // Let entrance animations, image fades and lazy content settle on the virtual clock.
  if (clip.mouse) await page.mouse.move(...clip.mouse(0));
  for (let i = 0; i < 40; i++) await page.clock.runFor(100);
  // Preload every lazy image so the scroll never shows blanks.
  await page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach((im) => (im.loading = "eager"));
    await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; }))));
  });
  await page.waitForTimeout(800);

  const dir = path.join(OUT, name);
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
  const n = Math.round(clip.dur * FPS);
  const maxY = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let f = 0; f < n; f++) {
    const t = f / FPS;
    const y = Math.round(clip.scroll(f / (n - 1)) * maxY);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    if (clip.mouse) await page.mouse.move(...clip.mouse(t), { steps: 1 });
    await page.clock.runFor(1000 / FPS);
    await page.screenshot({ path: path.join(dir, String(f).padStart(5, "0") + ".jpg"), type: "jpeg", quality: 92 });
  }
  await ctx.close();
  console.log(`${name}: ${n} frames`);
}

const wanted = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: path.join(process.env.HOME, "Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"),
  args: ["--force-color-profile=srgb", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"]
});
for (const [name, clip] of Object.entries(CLIPS)) {
  if (wanted.length && !wanted.includes(name)) continue;
  await capture(browser, name, clip);
}
await browser.close();
