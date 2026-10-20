export const site = {
  name: "Neha Ondhia",
  role: "UX & Product Designer",
  email: "neha@nehaondhia.com",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/nehaondhia" },
    { label: "Dribbble", href: "https://dribbble.com/nehaondhia" }
  ]
};

// `palette` drives the coloured surfaces of every card / cover / case-study hero.
export const projectsData = [
  {
    id: "financial-wellness",
    num: "01",
    tag: "Product Design",
    title: "Financial Wellness Platform",
    short: "FinSpire",
    subtitle: "Overhauling personal finance for 150k+ millennial earners",
    desc: "Redesigned the core money-tracking experience for a fintech startup, reducing drop-off by 42% through a research-led overhaul of onboarding and goal-setting.",
    role: "Lead UX Designer",
    timeline: "2023 – 2024",
    year: "2024",
    client: "FinSpire Technologies",
    category: "Fintech · Web & Mobile",
    cover: "finance",
    palette: { wash: "#FFF3DC", frame: "#F8CC78", ink: "#925B00", spark: "#F5A000" },
    note: "money, but make it calm",
    stats: [
      { label: "Drop-off reduction", val: "42%" },
      { label: "Onboarding completion", val: "88%" },
      { label: "Active users in 6 months", val: "150k+" }
    ],
    challenge:
      "The existing platform buried people under financial jargon and dense tables. 63% of new users dropped off during bank-link setup because of low trust signals and complex authentication screens.",
    solution:
      "24 moderated interviews and 3 rounds of prototype testing later, we shipped a progressive-disclosure flow, visual budget ‘buckets’, and small celebration moments that guided people through verification in under 3 minutes.",
    process: [
      { k: "Listen", v: "24 interviews, diary study, support-ticket mining" },
      { k: "Frame", v: "Trust map + jobs-to-be-done for first 7 days" },
      { k: "Make", v: "3 prototype rounds, 40+ onboarding variants" },
      { k: "Measure", v: "A/B framework + post-launch funnel analytics" }
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
    id: "healthcare-companion",
    num: "02",
    tag: "Mobile Design",
    title: "Healthcare Companion App",
    short: "CarePulse",
    subtitle: "Accessible care coordination for people living with chronic illness",
    desc: "An end-to-end wellness app focused on accessibility and trust, plus a design system now used across 4 products and 2 platforms.",
    role: "UX & Product Designer",
    timeline: "2022 – 2023",
    year: "2023",
    client: "CarePulse Health",
    category: "Healthtech · iOS & Android",
    cover: "health",
    palette: { wash: "#EDF7F4", frame: "#C8E8E2", ink: "#36786D", spark: "#9ED4CB" },
    note: "big buttons, kind words",
    stats: [
      { label: "Daily adherence rate", val: "76%" },
      { label: "Accessibility", val: "AAA" },
      { label: "Support calls", val: "−35%" }
    ],
    challenge:
      "Patients aged 50+ managing multiple prescriptions struggled with tiny tap targets, low-contrast reminders and notification copy that made them anxious.",
    solution:
      "High-contrast, large-touch interfaces with haptic reinforcement. Medication schedules became simple morning / afternoon / night buckets, and empathetic microcopy took the dread out of clinical check-ins.",
    process: [
      { k: "Listen", v: "Home visits with 12 patients & 4 carers" },
      { k: "Frame", v: "Accessibility audit against WCAG 2.1 AAA" },
      { k: "Make", v: "Cross-platform tokens & component library" },
      { k: "Measure", v: "Adherence tracking over 90 days" }
    ],
    deliverables: [
      "WCAG 2.1 AAA audit & redesign",
      "Cross-platform design system",
      "Medication adherence flow",
      "Voice & screen-reader specs"
    ],
    learnings:
      "Accessibility never costs beauty. When an interface works for the most vulnerable person, it feels effortless for everyone."
  },
  {
    id: "saas-dashboard",
    num: "03",
    tag: "Design System",
    title: "Prism — Logistics Design System",
    short: "LogiFlow",
    subtitle: "Enterprise logistics intelligence, made readable",
    desc: "Led a 0→1 design system for a logistics SaaS platform, cutting design-to-dev handoff time by 60% and giving three squads one shared visual language.",
    role: "Design Lead",
    timeline: "2021 – 2022",
    year: "2022",
    client: "LogiFlow Global",
    category: "Enterprise SaaS · Design Systems",
    cover: "system",
    palette: { wash: "#FBECE6", frame: "#EDA18A", ink: "#A6381B", spark: "#DF5227" },
    note: "18 buttons → 1",
    stats: [
      { label: "Faster handoff", val: "60%" },
      { label: "Component adoption", val: "94%" },
      { label: "UI bug reports", val: "−48%" }
    ],
    challenge:
      "Three engineering squads were shipping disjointed UI — 18 different button styles, conflicting modal behaviour and zero documentation.",
    solution:
      "Built ‘Prism’ in Figma with synced React tokens. Standardised data-viz components, dense table layouts and keyboard-first patterns for high-speed freight dispatch.",
    process: [
      { k: "Listen", v: "UI inventory across 140 screens" },
      { k: "Frame", v: "Multi-brand token architecture" },
      { k: "Make", v: "60+ accessible components + Storybook" },
      { k: "Measure", v: "Adoption dashboards & squad workshops" }
    ],
    deliverables: [
      "Multi-brand design-token architecture",
      "60+ accessible components",
      "Storybook documentation & guidelines",
      "Designer + engineer training workshops"
    ],
    learnings:
      "A design system is a communication tool before it’s a component library. It lives or dies on how easily engineers can adopt it."
  }
];

export const experienceData = [
  { year: "2024 — now", role: "Senior UX Consultant", company: "Independent", location: "Mumbai & remote" },
  { year: "2022 — 24", role: "Product Designer", company: "CarePulse Health", location: "Bangalore" },
  { year: "2020 — 22", role: "UX Designer", company: "FinSpire Technologies", location: "Mumbai" },
  { year: "2018 — 20", role: "Interaction Designer", company: "Studio Craft", location: "Mumbai" }
];

// Sticky notes on the home-page pinboard
export const expertiseData = [
  { title: "UX Research", desc: "Interviews, usability tests & synthesis that find the real problem.", color: "#FFF3DC" },
  { title: "Product Design", desc: "From fuzzy problem to shipped, polished pixels.", color: "#EDF7F4" },
  { title: "Design Systems", desc: "Tokens, components & docs engineers actually enjoy.", color: "#FBECE6" },
  { title: "Interaction", desc: "Micro-moments and motion that explain, not decorate.", color: "#E7EFF0" },
  { title: "Accessibility", desc: "WCAG AAA, built in from the first sketch.", color: "#C8E8E2" },
  { title: "Mobile", desc: "Native-feeling iOS & Android patterns.", color: "#F8CC78" }
];

export const loves = ["teal everything", "hand-lettered menus", "long walks in old Mumbai", "card sorting", "chai, two sugars", "dense spreadsheets (really)", "pen plotters", "kind error messages"];
