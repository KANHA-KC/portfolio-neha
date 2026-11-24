import fs from "node:fs";
import path from "node:path";

// Story photos live in /public/story/<slug>.<ext>. Returns the public URL, or "" if none has been added yet.
// Keep them small (≈640px tall WebP): they only ever show in the 250×310 hover card.
const EXTS = ["webp", "avif", "jpg", "jpeg", "png"];
const ALIASES = [
  [(s) => s.includes("ratan"), "ratan-tata"],
  [(s) => s.includes("shih") || s.includes("shish"), "shih-tzu"],
  [(s) => s.includes("marathon"), "half-marathons"]
];

export function peekImage(slug) {
  if (!slug) return "";
  const s = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const name = ALIASES.find(([match]) => match(s))?.[1] || s;
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "story", `${name}.${ext}`))) return `/story/${name}.${ext}`;
  }
  return "";
}

export const peekSlug = (text) => text.toLowerCase().replace(/^mr\.?\s+|^ms\.?\s+/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
