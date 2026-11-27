// Renders reel.html frame by frame (60fps, 1920×1080) and pipes the frames into ffmpeg, then muxes music.wav.
// Usage: node render.mjs                → out/neha-ondhia-website-showreel.mp4
//        node render.mjs --stills 480,900 → out/stills/<frame>.jpg (quick look at chosen frames)
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const FPS = 60, DUR = 70, TOTAL = FPS * DUR;
const args = process.argv.slice(2);
const stillsArg = args.includes("--stills") ? args[args.indexOf("--stills") + 1] : null;
await fs.mkdir("out/stills", { recursive: true });

const browser = await chromium.launch({
  executablePath: path.join(process.env.HOME, "Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"),
  args: ["--allow-file-access-from-files", "--force-color-profile=srgb", "--disable-web-security"]
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.error("pageerror:", e.message));
await page.goto("file://" + path.resolve("reel.html"));
await page.evaluate(() => window.ready);

if (stillsArg) {
  for (const f of stillsArg.split(",").map(Number)) {
    await page.evaluate((fr) => window.renderFrame(fr), f);
    await page.screenshot({ path: `out/stills/${String(f).padStart(5, "0")}.jpg`, type: "jpeg", quality: 90 });
  }
  await browser.close();
  process.exit(0);
}

const silent = "out/reel-silent.mp4";
const ff = spawn("ffmpeg", ["-y", "-v", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "15", "-pix_fmt", "yuv420p", "-profile:v", "high", "-tune", "film",
  "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-movflags", "+faststart", silent], { stdio: ["pipe", "inherit", "inherit"] });
const t0 = Date.now();
for (let f = 0; f < TOTAL; f++) {
  await page.evaluate((fr) => window.renderFrame(fr), f);
  const buf = await page.screenshot({ type: "jpeg", quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % 300 === 0) console.log(`frame ${f}/${TOTAL}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();

// mux with the soundtrack, loudness-normalised to streaming level (-14 LUFS, -1 dBTP)
await new Promise((resolve, reject) => {
  const p = spawn("ffmpeg", ["-y", "-v", "error", "-i", silent, "-i", "music.wav", "-map", "0:v", "-map", "1:a", "-c:v", "copy",
    "-af", "loudnorm=I=-14:TP=-1:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "320k", "-shortest", "-movflags", "+faststart",
    "out/neha-ondhia-website-showreel.mp4"], { stdio: "inherit" });
  p.on("close", (c) => (c ? reject(new Error("mux failed")) : resolve()));
});
console.log("done in", ((Date.now() - t0) / 1000).toFixed(0), "s");
