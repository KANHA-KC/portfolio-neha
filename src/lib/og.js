// Shared pieces for generated social share images (app/opengraph-image.js, app/work/[slug]/opengraph-image.js).
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = { teal: "#063641", canvas: "#FCFAF6", gold: "#F5A000", pearl: "#9ED4CB", aqua: "#C8E8E2" };

let fonts;
export async function ogFonts() {
  fonts ??= Promise.all([
    readFile(join(process.cwd(), "public/fonts/Cralika.ttf")),
    readFile(join(process.cwd(), "public/fonts/Cralika-Italic.ttf"))
  ]).then(([regular, italic]) => [
    { name: "Cralika", data: regular, style: "normal", weight: 400 },
    { name: "Cralika", data: italic, style: "italic", weight: 400 }
  ]);
  return fonts;
}
