// Normalizers turn raw records (from Wix CMS or the local seed) into the exact shapes the UI uses.
// Every field has a safe default, so a half-filled CMS item never breaks a page.
// The `image` argument converts a source-specific image value into { src, width, height, alt } or null.

import { palettes, aspects } from "./config";

const str = (v, d = "") => (typeof v === "string" ? v.trim() : v == null ? d : String(v));
const num = (v, d = 0) => (Number.isFinite(Number(v)) && v !== "" && v != null ? Number(v) : d);
const bool = (v) => v === true || v === "true";

// Accepts an array, or text with one entry per line (easier to edit in a CMS text field).
const list = (v) => {
  if (Array.isArray(v)) return v.filter((x) => x != null && x !== "");
  if (typeof v === "string") return v.split("\n").map((s) => s.trim()).filter(Boolean);
  return [];
};

// "Label | Value" lines or [{a, b}] objects → pairs.
const pairs = (v, a, b) =>
  list(v).map((x) => {
    if (typeof x === "object") return { [a]: str(x[a]), [b]: str(x[b]) };
    const [left, ...rest] = String(x).split("|");
    return { [a]: left.trim(), [b]: rest.join("|").trim() };
  });

const aspectOf = (v, d = "landscape") => (aspects[v] ? v : d);

export function normalizeCategory(raw) {
  return {
    slug: str(raw.slug),
    title: str(raw.title, "Untitled"),
    description: str(raw.description),
    icon: str(raw.icon, "✦"),
    order: num(raw.order, 99)
  };
}

export function normalizeProject(raw, image) {
  const accent = palettes[raw.accent] ? raw.accent : "teal";
  const kind = raw.kind === "case-study" ? "case-study" : "showcase";
  return {
    slug: str(raw.slug),
    title: str(raw.title, "Untitled project"),
    kind,
    category: str(raw.category),
    featured: bool(raw.featured),
    order: num(raw.order, 99),
    year: str(raw.year),
    timeline: str(raw.timeline || raw.year),
    client: str(raw.client),
    role: str(raw.role),
    platform: str(raw.platform),
    summary: str(raw.summary),
    subtitle: str(raw.subtitle),
    note: str(raw.note),
    accent,
    palette: palettes[accent],
    illustration: str(raw.illustration) || null,
    cover: image(raw.cover, raw.title),
    aspect: aspectOf(raw.aspect),
    tags: list(raw.tags).map(String),
    // showcase
    brief: str(raw.brief),
    gallery: list(raw.gallery).map((g) => ({
      image: image(g.src ?? g.image, g.title || g.alt),
      caption: str(g.title ?? g.caption),
      aspect: aspectOf(g.aspect, "landscape")
    })),
    // case study
    challenge: str(raw.challenge),
    solution: str(raw.solution),
    process: pairs(raw.process, "k", "v"),
    stats: pairs(raw.stats, "val", "label"),
    deliverables: list(raw.deliverables).map(String),
    learnings: str(raw.learnings)
  };
}

export function normalizeService(raw) {
  return {
    title: str(raw.title),
    description: str(raw.description),
    group: str(raw.group, "ux"),
    order: num(raw.order, 99)
  };
}

export function normalizeExperience(raw) {
  return {
    period: str(raw.period),
    role: str(raw.role),
    company: str(raw.company),
    location: str(raw.location),
    order: num(raw.order, 99)
  };
}

export function normalizeProfile(raw, image) {
  const name = str(raw.name, "Neha Ondhia");
  return {
    name,
    firstName: name.split(" ")[0],
    lastName: name.split(" ").slice(1).join(" "),
    role: str(raw.role),
    headline: str(raw.headline),
    heroIntro: str(raw.heroIntro),
    manifesto: str(raw.manifesto),
    intro: str(raw.intro),
    bio: list(raw.bio),
    email: str(raw.email),
    location: str(raw.location),
    timezone: str(raw.timezone, "Asia/Kolkata"),
    availability: str(raw.availability),
    portrait: image(raw.portrait, name),
    socials: pairs(raw.socials, "label", "href"),
    principles: pairs(raw.principles, "title", "description"),
    tools: list(raw.tools).map(String),
    loves: list(raw.loves).map(String)
  };
}
