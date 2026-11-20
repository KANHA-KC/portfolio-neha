// Shared pieces for generated social share images (app/opengraph-image.js, app/work/[slug]/opengraph-image.js).
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = { teal: "#03414B", canvas: "#F4F4F4", gold: "#C7DB0A", pearl: "#8EEAF3", aqua: "#B8F9FF" };

// Same type system as the site: PP Neue Montreal only. Satori needs TTF/OTF.
let fonts;
export async function ogFonts() {
  const f = (p) => readFile(join(process.cwd(), "src/fonts", p));
  fonts ??= Promise.all([
    f("pp-neue-montreal/ppneuemontreal-book.otf"),
    f("pp-neue-montreal/ppneuemontreal-italic.otf")
  ]).then(([book, italic]) => [
    { name: "Montreal", data: book, style: "normal", weight: 400 },
    { name: "Montreal", data: italic, style: "italic", weight: 400 }
  ]);
  return fonts;
}

// The OG renderer only takes absolute URLs, so images stored in /public are inlined as data URLs.
const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml" };
export async function ogImageSrc(src) {
  if (!src || /^https?:\/\//.test(src)) return src || null;
  const mime = MIME[src.split("?")[0].split(".").pop().toLowerCase()];
  if (!src.startsWith("/") || !mime) return null; // e.g. .webp isn't supported by the renderer
  try {
    const data = await readFile(join(process.cwd(), "public", decodeURIComponent(src.split("?")[0])));
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}
