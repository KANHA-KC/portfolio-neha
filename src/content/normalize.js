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

// Pick the closest card shape for an uploaded image so gallery tiles match the real photo.
const aspectFromSize = (img) => {
  if (!img?.width || !img?.height) return null;
  const r = img.width / img.height;
  if (r >= 1.55) return "wide";
  if (r >= 1.15) return "landscape";
  if (r >= 0.9) return "square";
  if (r >= 0.77) return "portrait";
  return "tall";
};

export function normalizeCategory(raw) {
  return {
    slug: str(raw.slug),
    title: str(raw.title, "Untitled"),
    description: str(raw.description),
    icon: str(raw.icon, "✦"),
    order: num(raw.order, 99)
  };
}

// Short industry labels the CMS may use, shown spelled out on the site.
const SECTOR_NAMES = { "f&b": "Food & Beverage" };
const spellOut = (v) => SECTOR_NAMES[String(v).trim().toLowerCase()] || v;

// Editorial fixes that apply even while the Wix item still has the older value.
const PROJECT_FIXES = {
  "lighthouse-canton": { year: "2025–2026" },
  unhumble: { sector: "Toys, Games & Entertainment" },
  "creamland-and-annn": { year: "2020–Current" },
  // the second line of the brief starts at "budget-friendly"
  "the-design-bar": {
    brief: "There was no brief. I wanted premium-feeling gifts that were customised,\nbudget-friendly and open to everyone.",
    role: "Founder"
  }
};
// Industry reads "Food and Beverage" on project pages (tags keep the short "&" form).
const sectorName = (v) => (/^(f&b|food\s*(&|and)\s*beverages?)$/i.test(String(v).trim()) ? "Food and Beverage" : spellOut(v));

export function normalizeProject(raw, image) {
  const fix = PROJECT_FIXES[str(raw.slug)];
  if (fix) raw = { ...raw, ...fix };
  // Twisted Tree is in Coorg, not Ooty: fix every text field even while Wix still says Ooty
  if (str(raw.slug) === "twisted-tree-homestay") {
    raw = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v.replace(/\ban Ooty\b/g, "a Coorg").replace(/\bOoty\b/g, "Coorg") : v]));
  }
  const accent = palettes[raw.accent] ? raw.accent : "teal";
  const kind = raw.kind === "case-study" ? "case-study" : "showcase";
  const feeling = str(raw.feeling || raw.note);
  const slug = str(raw.slug);
  const title = slug === "sterling" && str(raw.title) === "Sterling" ? "Sterling Holidays" : str(raw.title, "Untitled project");
  const client = slug === "sterling" && str(raw.client) === "Sterling" ? "Sterling Holidays" : str(raw.client);
  const workedOn =
    slug === "sterling"
      ? str(raw.workedOn).replace(/for a holiday brand\.?/i, "for a hospitality chain.").replace(/\bAI videos\b/g, "AI Videos")
      : str(raw.workedOn);
  const rawSummary = str(raw.summary || raw.workedOn || raw.brief);
  const summary =
    slug === "sterling"
      ? rawSummary.replace(/for a holiday brand\.?/i, "for a hospitality chain.").replace(/\bAI videos\b/g, "AI Videos")
      : rawSummary;
  return {
    slug,
    // Sterling's full name is the title everywhere (cards, case study, SEO), even while Wix still says "Sterling"
    title,
    kind,
    category: str(raw.category),
    featured: bool(raw.featured),
    order: num(raw.order, 99),
    year: str(raw.year),
    timeline: str(raw.timeline || raw.year),
    client,
    role: str(raw.role),
    projectType: str(raw.projectType),
    cardName: str(raw.cardName),
    // UnHumble is a card game, so it reads as Games & Entertainment even while Wix says Gifting
    sector: slug === "unhumble" && /^gifting$/i.test(str(raw.sector)) ? "Toys, Games & Entertainment" : sectorName(str(raw.sector)),
    workedOn,
    feeling,
    platform: str(raw.platform),
    summary,
    subtitle: str(raw.subtitle).replace(/\bF&B\b/g, "food & beverage"),
    note: feeling,
    accent,
    palette: palettes[accent],
    illustration: str(raw.illustration) || null,
    // Cover = top of the project page; thumbnail = card image on Home / Work / related projects.
    // Each falls back to the other, so uploading just one is enough.
    cover: image(raw.cover, title) || image(raw.thumbnail, title),
    coverCaption: str(raw.coverCaption),
    thumbnail: image(raw.thumbnail, title) || image(raw.cover, title),
    aspect: aspectOf(raw.aspect),
    tags: list(raw.tags).map(String).map(spellOut).map((t) => (slug === "unhumble" && /^gifting$/i.test(t) ? "Games & Entertainment" : t)),
    // showcase
    brief: str(raw.brief),
    gallery: list(raw.gallery).map((g) => {
      const img = image(g.src ?? g.image, g.description || g.title || g.alt || title);
      let caption = str(g.title ?? g.caption);
      if (raw.slug === "lighthouse-canton" && caption.toLowerCase() === "website") {
        caption = "Pitch deck";
      }
      return {
        image: img,
        caption,
        aspect: aspects[g.aspect] ? g.aspect : aspectFromSize(img) || "landscape",
        // optional layout override: "full" (whole row) or "half" (two per row)
        size: ["full", "half"].includes(g.size) ? g.size : ""
      };
    }),
    // Short portrait films (e.g. AI videos), shown as a reel strip under the gallery.
    videos: list(raw.videos)
      .map((v) => (typeof v === "string" ? { src: v } : v))
      .map((v) => ({ src: str(v.src), poster: str(v.poster), title: str(v.title) }))
      .filter((v) => v.src),
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
    highlight: str(raw.highlight),
    order: num(raw.order, 99)
  };
}

const TILES = ["gold", "aqua", "paprika", "teal"];
export function normalizeTestimonial(raw) {
  const tile = str(raw.tile).toLowerCase();
  return {
    quote: str(raw.quote).replace(/^["“]+|["”]+$/g, ""),
    author: str(raw.author),
    role: str(raw.role),
    tile: TILES.includes(tile) ? tile : "",
    order: num(raw.order, 99)
  };
}

function tidyTypography(text) {
  return String(text)
    .replace(/\b(in|from|to|at|by|of|for|on)\s+(\d{4}[–-]?\d{0,4}\.?)/gi, "$1\u00A0$2")
    .replace(/\b(to|from)\s+(\d{4}\.?)/gi, "$1\u00A0$2")
    .replace(/\s+([^\s]{1,10}\s+[^\s]{1,10}[.!?])$/, (m, g) => "\u00A0" + g.replace(/\s+/, "\u00A0"))
    .replace(/\s+([^\s]+[.!?])$/, "\u00A0$1");
}

export function normalizeProfile(raw, image) {
  const name = str(raw.name, "Neha Ondhia");
  return {
    name,
    firstName: name.split(" ")[0],
    lastName: name.split(" ").slice(1).join(" "),
    role: str(raw.role, "Illustrator, Brand and Graphic Designer"),
    headline: str(raw.headline),
    heroIntro: str(raw.heroIntro),
    manifesto: str(raw.manifesto)
      .replace(/Good design looks good\.?\s+Great design\s+\*?tells a story\*?\.?/gi, "Good design looks good\nGreat design *tells a story*.")
      .replace(/People remember(?:\s+|\n)how it(?:\s+|\n)(?:made\s+them\s+\*?feel\*?\.?|\*?made them feel\*?\.?)/gi, "People remember\nhow it *made them feel*."),
    intro: str(raw.intro)
      .replace(/^a self-taught/i, "A self-taught")
      .replace(/based in Mumbai/gi, "based in India"),
    bio: list(raw.bio),
    storyTitle: str(raw.storyTitle)
      .replace(/I came to\s+design\s+through/gi, "I came to design\nthrough"),
    story: list(raw.story).map(String).map((para) => {
      let p = para
        .replace(/(?<!\[\[)\b(half marathons?)\b(?!\]\])/gi, "[[half marathons]]")
        .replace(/(?<!\[\[)\b(travel)\b(?!\]\])/gi, "[[travel]]")
        .replace(/(?<!\[\[)\b(chai)\b(?!\]\])/gi, "[[chai]]");
      p = p.replace(/\s*in Bangalore and Kolkata,?\s*/gi, ", ");
      // Map older CMS paragraphs to improved widow-free phrasing if present
      if (p.includes("left everything hanging") && p.includes("2021")) {
        p = "Then Covid hit and put everything on pause. I moved back home and, restless to create, taught myself design software from scratch. Three internships later, I landed my first agency role in 2021.";
      } else if (p.includes("The Social Lions, Schbang") && p.includes("2020–2023")) {
        p = "Over the last five years, I’ve designed for brands like HDFC Life, Amazon, Airtel Business, and Salesforce across agencies including The Social Lions, Schbang, and Webenza. At Webenza, I grew to Senior Graphic Designer over two years — producing around 120 creatives a month, mentoring junior designers, and stepping in as art director. Alongside agency work, I also ran my own design studio, The Design Bar, from 2020 to 2023.";
      } else if (p.includes("designing since before AI") && p.includes("is still mine")) {
        p = "I’ve been designing since before the wave of AI. Today I use it daily to accelerate research and mockups, while the visual thinking, taste, and craft remain entirely mine.";
      }
      p = p.replace(/Senior Graphic Designer over four years/gi, "Senior Graphic Designer over two years");
      return tidyTypography(p);
    }),
    storyStats: pairs(raw.storyStats, "value", "label"),
    workWith: pairs(raw.workWith, "title", "description"),
    workProcess: pairs(raw.workProcess, "title", "description").map((step) =>
      step.title.toLowerCase() === "find the words" ? { ...step, title: "Research" } : step
    ),
    email: (() => {
      const e = str(raw.email);
      if (!e || e.toLowerCase() === "nehaondhia6@gmail.com" || e.toLowerCase() === "neha@nehaondhia.com") {
        return "nehaondhiadesign@gmail.com";
      }
      return e;
    })(),
    location: str(raw.location),
    timezone: str(raw.timezone, "Asia/Kolkata"),
    availability: str(raw.availability),
    resume: str(raw.resume, "/resume.pdf"),
    calendly: str(raw.calendly),
    portrait: image(raw.portrait, name),
    socials: pairs(raw.socials, "label", "href"),
    principles: pairs(raw.principles, "title", "description"),
    designTools: list(raw.designTools).map(String),
    aiTools: list(raw.aiTools).map(String),
    marquee: list(raw.marquee).map(String),
    loves: list(raw.loves).map(String)
  };
}
