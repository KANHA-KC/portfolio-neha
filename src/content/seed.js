// Local seed content. It uses the SAME field keys as the Wix CMS collections (see WIX_SETUP.md),
// so it doubles as the reference for what each collection should contain.
// Used whenever Wix credentials are not configured, and as a fallback if Wix is unreachable.
// `src: null` / `cover: null` render as designed placeholder cards until real images are added.

export const profile = {
  name: "Neha Ondhia",
  role: "UX, Brand & Visual Designer",
  headline: "Designing human things for digital places.",
  heroIntro:
    "Hi 👋, I am Neha Ondhia.\nA fashion designer turned self learnt graphic designer. I’ve worked with major Indian and global brands in the last 6years.\nI love everything fun, quirky and bright. I am not a minimal design person.",
  manifesto:
    "I believe good design behaves like a *kind friend* — it listens first, explains things gently, and never makes you feel lost. Whether it’s a product people *rely on* or a logo they *remember*, I start with the humans and work my way to the pixels.",
  intro:
    "I’m a designer based in Mumbai. I work across UX and brand — from research-led product flows for fintech and health, to logos and identities that give small businesses a confident voice.",
  bio: [
    "I started out as an interaction designer, obsessing over the tiny moments between taps. Somewhere along the way I fell for both sides of the craft: the messy, human research — and the quiet precision of a well-drawn logo.",
    "Today I lead projects end to end: framing problems with stakeholders, running research, prototyping, and building the design systems and brand guidelines that keep it all consistent.",
    "Outside of work you’ll find me hunting for hand-lettered shop signs, filling notebooks with diagrams nobody asked for, and mentoring younger designers who are just finding their voice."
  ],
  email: "neha@nehaondhia.com",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  // availability: "Available for select projects",
  portrait: "/brand/neha-cutout.webp",
  socials: ["LinkedIn | https://linkedin.com/in/nehaondhia", "Dribbble | https://dribbble.com/nehaondhia"],
  principles: [
    "Listen before drawing | The first week of any project is mostly questions. The best design decisions are hiding in what people already told you.",
    "Accessible by default | Contrast, focus states and plain language aren’t a final checklist — they shape the very first sketch.",
    "Systems over screens | Whether it’s a product or a brand, I design the rules behind the pixels so teams keep shipping good work."
  ],
  tools: ["Figma", "Illustrator", "Photoshop", "InDesign", "Procreate", "After Effects", "FigJam", "Framer"],
  loves: [
    "teal everything",
    "hand-lettered shop signs",
    "long walks in old Mumbai",
    "card sorting",
    "chai, two sugars",
    "kerning at 2am",
    "pen plotters",
    "kind error messages"
  ]
};

export const categories = [
  { slug: "ux-ui", title: "UX / UI", icon: "▢", order: 1, description: "Research-led product design, told as case studies." },
  { slug: "logo-design", title: "Logo design", icon: "◎", order: 2, description: "Marks, monograms and wordmarks." },
  { slug: "branding", title: "Branding", icon: "✦", order: 3, description: "Identity systems, guidelines and brand worlds." },
  { slug: "visual-design", title: "Visual & print", icon: "▤", order: 4, description: "Packaging, posters, editorial and social." },
  { slug: "illustration", title: "Illustration", icon: "✎", order: 5, description: "Drawings, icons and spot illustrations." }
];

export const services = [
  { group: "ux", order: 1, title: "UX Research", description: "Interviews, usability tests & synthesis that find the real problem." },
  { group: "ux", order: 2, title: "Product Design", description: "From fuzzy problem to shipped, polished pixels." },
  { group: "ux", order: 3, title: "Design Systems", description: "Tokens, components & docs engineers actually enjoy." },
  { group: "ux", order: 4, title: "Accessibility", description: "WCAG AAA, built in from the first sketch." },
  { group: "brand", order: 5, title: "Logo Design", description: "Marks with meaning — sketched by hand, refined to the pixel." },
  { group: "brand", order: 6, title: "Brand Identity", description: "Colour, type, voice & guidelines that hold together." },
  { group: "brand", order: 7, title: "Packaging & Print", description: "Labels, boxes, posters and things you can hold." },
  { group: "brand", order: 8, title: "Illustration", description: "Spot drawings & icon sets with a warm hand." }
];

export const experience = [
  { order: 1, period: "2024 — now", role: "Senior UX & Brand Consultant", company: "Independent", location: "Mumbai & remote" },
  { order: 2, period: "2022 — 24", role: "Product Designer", company: "CarePulse Health", location: "Bangalore" },
  { order: 3, period: "2020 — 22", role: "UX Designer", company: "FinSpire Technologies", location: "Mumbai" },
  { order: 4, period: "2018 — 20", role: "Interaction Designer", company: "Studio Craft", location: "Mumbai" }
];

// Placeholder gallery slots for showcase projects.
const slots = (...items) => items.map(([title, aspect]) => ({ src: null, title, aspect }));

export const projects = [
  /* ---------- UX case studies ---------- */
  {
    slug: "financial-wellness",
    kind: "case-study",
    category: "ux-ui",
    featured: true,
    order: 1,
    title: "Financial Wellness Platform",
    subtitle: "Overhauling personal finance for 150k+ millennial earners",
    summary:
      "Redesigned the core money-tracking experience for a fintech startup, reducing drop-off by 42% through a research-led overhaul of onboarding and goal-setting.",
    role: "Lead UX Designer",
    year: "2024",
    timeline: "2023 – 2024",
    client: "FinSpire Technologies",
    platform: "Web & Mobile",
    tags: ["Product Design", "Fintech"],
    accent: "gold",
    illustration: "finance",
    cover: null,
    aspect: "landscape",
    note: "money, but make it calm",
    stats: ["42% | Drop-off reduction", "88% | Onboarding completion", "150k+ | Active users in 6 months"],
    challenge:
      "The existing platform buried people under financial jargon and dense tables. 63% of new users dropped off during bank-link setup because of low trust signals and complex authentication screens.",
    solution:
      "24 moderated interviews and 3 rounds of prototype testing later, we shipped a progressive-disclosure flow, visual budget ‘buckets’, and small celebration moments that guided people through verification in under 3 minutes.",
    process: [
      "Listen | 24 interviews, diary study, support-ticket mining",
      "Frame | Trust map + jobs-to-be-done for the first 7 days",
      "Make | 3 prototype rounds, 40+ onboarding variants",
      "Measure | A/B framework + post-launch funnel analytics"
    ],
    deliverables: [
      "User journey maps & empathy diagrams",
      "High-fidelity interactive prototypes",
      "Onboarding design specification",
      "Post-launch analytics & A/B test framework"
    ],
    learnings:
      "Trust in fintech isn’t built with security badges — it’s earned when every state is transparent, predictable and forgiving."
  },
  {
    slug: "healthcare-companion",
    kind: "case-study",
    category: "ux-ui",
    featured: true,
    order: 2,
    title: "Healthcare Companion App",
    subtitle: "Accessible care coordination for people living with chronic illness",
    summary:
      "An end-to-end wellness app focused on accessibility and trust, plus a design system now used across 4 products and 2 platforms.",
    role: "UX & Product Designer",
    year: "2023",
    timeline: "2022 – 2023",
    client: "CarePulse Health",
    platform: "iOS & Android",
    tags: ["Mobile Design", "Healthtech"],
    accent: "aqua",
    illustration: "health",
    cover: null,
    aspect: "landscape",
    note: "big buttons, kind words",
    stats: ["76% | Daily adherence rate", "AAA | Accessibility", "−35% | Support calls"],
    challenge:
      "Patients aged 50+ managing multiple prescriptions struggled with tiny tap targets, low-contrast reminders and notification copy that made them anxious.",
    solution:
      "High-contrast, large-touch interfaces with haptic reinforcement. Medication schedules became simple morning / afternoon / night buckets, and empathetic microcopy took the dread out of clinical check-ins.",
    process: [
      "Listen | Home visits with 12 patients & 4 carers",
      "Frame | Accessibility audit against WCAG 2.1 AAA",
      "Make | Cross-platform tokens & component library",
      "Measure | Adherence tracking over 90 days"
    ],
    deliverables: ["WCAG 2.1 AAA audit & redesign", "Cross-platform design system", "Medication adherence flow", "Voice & screen-reader specs"],
    learnings:
      "Accessibility never costs beauty. When an interface works for the most vulnerable person, it feels effortless for everyone."
  },
  {
    slug: "saas-dashboard",
    kind: "case-study",
    category: "ux-ui",
    featured: true,
    order: 3,
    title: "Prism — Logistics Design System",
    subtitle: "Enterprise logistics intelligence, made readable",
    summary:
      "Led a 0→1 design system for a logistics SaaS platform, cutting design-to-dev handoff time by 60% and giving three squads one shared visual language.",
    role: "Design Lead",
    year: "2022",
    timeline: "2021 – 2022",
    client: "LogiFlow Global",
    platform: "Enterprise SaaS",
    tags: ["Design System", "Enterprise"],
    accent: "paprika",
    illustration: "system",
    cover: null,
    aspect: "landscape",
    note: "18 buttons → 1",
    stats: ["60% | Faster handoff", "94% | Component adoption", "−48% | UI bug reports"],
    challenge:
      "Three engineering squads were shipping disjointed UI — 18 different button styles, conflicting modal behaviour and zero documentation.",
    solution:
      "Built ‘Prism’ in Figma with synced React tokens. Standardised data-viz components, dense table layouts and keyboard-first patterns for high-speed freight dispatch.",
    process: [
      "Listen | UI inventory across 140 screens",
      "Frame | Multi-brand token architecture",
      "Make | 60+ accessible components + Storybook",
      "Measure | Adoption dashboards & squad workshops"
    ],
    deliverables: ["Multi-brand design-token architecture", "60+ accessible components", "Storybook documentation & guidelines", "Designer + engineer training workshops"],
    learnings:
      "A design system is a communication tool before it’s a component library. It lives or dies on how easily engineers can adopt it."
  },

  /* ---------- Branding (placeholders) ---------- */
  {
    slug: "branding-project-01",
    kind: "showcase",
    category: "branding",
    featured: true,
    order: 4,
    title: "Brand Identity 01",
    subtitle: "Project name — a short one-line description",
    summary: "Placeholder brand identity project. Add the cover, brief and gallery images in the Wix CMS.",
    client: "Client name",
    year: "2025",
    role: "Brand designer",
    tags: ["Identity", "Guidelines"],
    accent: "paprika",
    cover: null,
    aspect: "wide",
    note: "brand world goes here",
    brief:
      "Write the brief here: who the client is, what they needed, and the idea behind the identity. Two or three short paragraphs work best.",
    gallery: slots(["Primary logo", "wide"], ["Colour palette", "square"], ["Typography", "square"], ["Stationery", "landscape"], ["Brand guidelines spread", "wide"], ["In the wild — mockup", "portrait"])
  },
  {
    slug: "branding-project-02",
    kind: "showcase",
    category: "branding",
    order: 6,
    title: "Brand Identity 02",
    subtitle: "Project name — a short one-line description",
    summary: "Placeholder brand identity project.",
    client: "Client name",
    year: "2024",
    role: "Brand designer",
    tags: ["Identity", "Packaging"],
    accent: "gold",
    cover: null,
    aspect: "portrait",
    note: "add images in Wix",
    brief: "Write the brief here.",
    gallery: slots(["Logo suite", "landscape"], ["Packaging", "portrait"], ["Social templates", "square"], ["Signage", "landscape"])
  },
  {
    slug: "branding-project-03",
    kind: "showcase",
    category: "branding",
    order: 9,
    title: "Brand Identity 03",
    subtitle: "Project name — a short one-line description",
    summary: "Placeholder brand identity project.",
    client: "Client name",
    year: "2023",
    role: "Brand designer",
    tags: ["Identity"],
    accent: "aqua",
    cover: null,
    aspect: "landscape",
    brief: "Write the brief here.",
    gallery: slots(["Logo", "wide"], ["Colour & type", "landscape"], ["Applications", "landscape"])
  },

  /* ---------- Logo design (placeholders) ---------- */
  ...[1, 2, 3, 4].map((n, i) => ({
    slug: `logo-project-0${n}`,
    kind: "showcase",
    category: "logo-design",
    featured: n === 1,
    order: 4 + n,
    title: `Logo Design 0${n}`,
    subtitle: "Brand name — industry",
    summary: "Placeholder logo project. Add the final mark, sketches and variations in the Wix CMS.",
    client: "Client name",
    year: "2025",
    role: "Logo designer",
    tags: ["Logo", ["Monogram", "Wordmark", "Symbol", "Lettering"][i]],
    accent: ["teal", "gold", "paprika", "aqua"][i],
    cover: null,
    aspect: "square",
    note: n === 1 ? "sketch → mark" : "",
    brief: "Write the story behind the mark: the idea, the sketches, and why it works.",
    gallery: slots(["Final mark", "square"], ["Sketches", "square"], ["Construction grid", "square"], ["Variations", "landscape"])
  })),

  /* ---------- Visual & print (placeholders) ---------- */
  {
    slug: "packaging-project-01",
    kind: "showcase",
    category: "visual-design",
    order: 10,
    title: "Packaging Design 01",
    subtitle: "Product name — a short one-line description",
    summary: "Placeholder packaging project.",
    client: "Client name",
    year: "2024",
    role: "Packaging designer",
    tags: ["Packaging", "Print"],
    accent: "gold",
    cover: null,
    aspect: "tall",
    brief: "Write the brief here.",
    gallery: slots(["Front of pack", "portrait"], ["Label details", "square"], ["Range", "wide"])
  },
  {
    slug: "poster-series-01",
    kind: "showcase",
    category: "visual-design",
    order: 11,
    title: "Poster Series 01",
    subtitle: "Event or campaign name",
    summary: "Placeholder poster / campaign project.",
    client: "Client name",
    year: "2024",
    role: "Visual designer",
    tags: ["Poster", "Campaign"],
    accent: "paprika",
    cover: null,
    aspect: "portrait",
    brief: "Write the brief here.",
    gallery: slots(["Poster 1", "portrait"], ["Poster 2", "portrait"], ["Poster 3", "portrait"], ["Social cut-downs", "square"])
  },

  /* ---------- Illustration (placeholder) ---------- */
  {
    slug: "illustration-project-01",
    kind: "showcase",
    category: "illustration",
    order: 12,
    title: "Illustration Set 01",
    subtitle: "Series name — medium",
    summary: "Placeholder illustration project.",
    client: "Personal",
    year: "2025",
    role: "Illustrator",
    tags: ["Illustration", "Icons"],
    accent: "aqua",
    cover: null,
    aspect: "square",
    brief: "Write the brief here.",
    gallery: slots(["Illustration 1", "square"], ["Illustration 2", "square"], ["Process", "landscape"])
  }
];
