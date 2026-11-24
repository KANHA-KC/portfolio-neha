import fs from "node:fs";
import path from "node:path";

// Story photos live in /public/story/<slug>.<ext> or /public/. Returns the public URL, or "" if none has been added yet.
const EXTS = ["webp", "jpg", "jpeg", "png", "avif"];
export function peekImage(slug) {
  if (!slug) return "";
  const s = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (s === "ratan-tata" || s === "mr-ratan-tata" || s.includes("ratan")) {
    if (fs.existsSync(path.join(process.cwd(), "public", "story", "ratan-tata.png"))) return "/story/ratan-tata.png";
    if (fs.existsSync(path.join(process.cwd(), "public", "Ratan Tata Sir.png"))) return "/Ratan%20Tata%20Sir.png";
  }
  if (s === "dog") {
    if (fs.existsSync(path.join(process.cwd(), "public", "Dog", "IMG_20200119_185735_566.jpg"))) return "/Dog/IMG_20200119_185735_566.jpg";
    if (fs.existsSync(path.join(process.cwd(), "public", "story", "dog.jpg"))) return "/story/dog.jpg";
  }
  if (s === "shih-tzu" || s === "shish-tzu" || s.includes("shih") || s.includes("shish")) {
    if (fs.existsSync(path.join(process.cwd(), "public", "story", "shih-tzu.jpg"))) return "/story/shih-tzu.jpg";
    if (fs.existsSync(path.join(process.cwd(), "public", "Dog", "IMG_20200119_185735_566.jpg"))) return "/Dog/IMG_20200119_185735_566.jpg";
    if (fs.existsSync(path.join(process.cwd(), "public", "Dog", "IMG_20200119_185735_568.jpg"))) return "/Dog/IMG_20200119_185735_568.jpg";
  }
  if (s === "mumbai") {
    if (fs.existsSync(path.join(process.cwd(), "public", "story", "mumbai.jpg"))) return "/story/mumbai.jpg";
  }
  if (s === "half-marathons" || s === "half-marathon" || s.includes("marathon")) {
    if (fs.existsSync(path.join(process.cwd(), "public", "story", "half-marathons.jpg"))) return "/story/half-marathons.jpg";
  }
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "story", `${slug}.${ext}`))) return `/story/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", `${slug}.${ext}`))) return `/${slug}.${ext}`;
  }
  return "";
}

export const peekSlug = (text) => text.toLowerCase().replace(/^mr\.?\s+|^ms\.?\s+/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
