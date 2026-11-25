// Local seed content. It uses the SAME field keys as the Wix CMS collections (see WIX_SETUP.md),
// so it doubles as the reference for what each collection should contain.
// Used whenever Wix credentials are not configured, and as a fallback if Wix is unreachable.
// `src: null` / `cover: null` render as designed placeholder cards until real images are added.

export const profile = {
  name: "Neha Ondhia",
  role: "Illustrator, Brand and Graphic Designer",
  headline: "Designing human things for digital places.",
  resume: "/resume.pdf",
  // TODO: replace with the real Calendly event link
  calendly: "https://calendly.com/nehaondhia/chai-chat",
  heroIntro:
    "Hi 👋, I am Neha Ondhia.\nA fashion designer turned self learnt graphic designer. I’ve worked with major Indian and global brands in the last 6years.\nI love everything fun, quirky and bright. I am not a minimal design person.",
  manifesto:
    "Good design looks good. Great design *tells a story*.\n\nPeople remember how it made\nthem *feel*.",
  intro:
    "A self-taught illustrator and brand designer based in India. Agency-sharpened and designing since before AI, I work across illustration, brand identity, and graphic design to give ideas a distinct personality and bring brands to life.",
  bio: [
    "I started out as an interaction designer, obsessing over the tiny moments between taps. Somewhere along the way I fell for both sides of the craft: the messy, human research — and the quiet precision of a well-drawn logo.",
    "Today I lead projects end to end: framing problems with stakeholders, running research, prototyping, and building the design systems and brand guidelines that keep it all consistent.",
    "Outside of work you’ll find me hunting for hand-lettered shop signs, filling notebooks with diagrams nobody asked for, and mentoring younger designers who are just finding their voice."
  ],
  // About page story. Wrap words in *asterisks* to set them in the handwritten accent.
  storyTitle: "I came to design\nthrough *clothes*.",
  story: [
    "I studied fashion design in [[Mumbai]] (2015 to 2019). Afterwards I designed formal menswear at Bellani S for high-end clients, including the late [[Mr. Ratan Tata]]. Another client was a groom’s [[Shih Tzu]], who needed the same outfits as his owner, so I made a sherwani and a two-piece suit for a [[dog]]. *(Yes, really.)*",
    "Then Covid hit and put everything on pause. I moved back home and, restless to create, taught myself design software from scratch. Three internships later, I landed my first agency role in 2021.",
    "Over the last five years, I’ve designed for brands like HDFC Life, Amazon, Airtel Business, and Salesforce across agencies including The Social Lions, Schbang, and Webenza. At Webenza, I grew to Senior Graphic Designer over four years — producing around 120 creatives a month, mentoring junior designers, and stepping in as art director. Alongside agency work, I also ran my own design studio, The Design Bar, from 2020 to 2023.",
    "I’ve been designing since before the wave of AI. Today I use it daily to accelerate research and mockups, while the visual thinking, taste, and craft remain entirely mine.",
    "*Off the screen:* 10K and [[half marathons]], travel, chai, and anything that gets my hands dirty."
  ],
  storyStats: ["5+ | years in agencies", "~120 | creatives a month", "3 | junior designers trained", "1 | dog in a sherwani"],
  workWith: [
    "Clear and responsive | You’ll always know where things stand.",
    "On time | Deliverables arrive when I said they would.",
    "Calm under pressure | Always up for a chat, and good at lightening a stressful week."
  ],
  workProcess: [
    "Listen | A call to understand the brand: its values, what it does, its audience and how it wants to be seen.",
    "Research | I brainstorm words that capture the brand and pick the 5 to 7 strongest routes.",
    "Sketch | Rough sketches of those routes, and the client shortlists 3 to 5.",
    "Develop | Detailed logos with the thinking behind each, plus a real-life mockup.",
    "Finalise | Minor tweaks, then clean files delivered."
  ],
  email: "neha@nehaondhia.com",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  // availability: "Available for select projects",
  portrait: "/brand/neha-cutout.webp",
  socials: ["LinkedIn | https://www.linkedin.com/in/neha-ondhia/", "Instagram | https://www.instagram.com/nehaondhiadesign/"],
  principles: [
    "Listen before drawing | The first week of any project is mostly questions. The best design decisions are hiding in what people already told you.",
    "Accessible by default | Contrast, focus states and plain language aren’t a final checklist — they shape the very first sketch.",
    "Systems over screens | Whether it’s a product or a brand, I design the rules behind the pixels so teams keep shipping good work."
  ],
  designTools: ["Photoshop", "Illustrator", "InDesign", "Figma (learning)", "Wix.com"],
  aiTools: ["Claude", "ChatGPT", "Recraft", "Kling AI", "Leonardo.Ai", "Midjourney", "Adobe Firefly", "Gemini"],
  marquee: [
    "Logo Design",
    "Brand Identity",
    "Corporate Collateral",
    "Social Media Graphics",
    "Print & Digital Media",
    "Packaging & Labels",
    "Presentation Design",
    "Signage & Spatial Visuals"
  ],
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
  { slug: "logo", title: "Logo", icon: "◎", order: 1, description: "Marks, monograms and wordmarks." },
  { slug: "brand-identity", title: "Brand identity", icon: "✦", order: 2, description: "Identity systems, guidelines and brand worlds." },
  { slug: "illustration", title: "Illustration", icon: "✎", order: 3, description: "Drawings, icons and spot illustrations." },
  { slug: "packaging", title: "Packaging", icon: "▤", order: 4, description: "Labels, boxes, packaging and things you can hold." },
  { slug: "marketing", title: "Marketing", icon: "↗", order: 5, description: "Campaigns, collateral, social media and promotional design." },
  { slug: "ai-videos", title: "AI Videos", icon: "▶", order: 6, description: "AI-generated video concepts, reels and motion stories." }
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

// From the résumé (Work Experience). `highlight` shows in the right-hand column.
export const experience = [
  { order: 1, period: "2024 — 26", role: "Senior Graphic Designer", company: "Webenza India", highlight: "Led 3 designers · 120+ creatives a month" },
  { order: 2, period: "2022 — 24", role: "Graphic Designer", company: "Webenza India", highlight: "60+ assets a month across 8 accounts" },
  { order: 3, period: "2021 — 22", role: "Graphic Visualiser", company: "Schbang Digital Solutions", highlight: "20+ creatives a week, 5 sectors" },
  { order: 4, period: "2021", role: "Executive Graphic Designer", company: "The Social Lions", highlight: "Turnaround cut from 5 days to 3" },
  { order: 5, period: "2019 — 21", role: "Fashion Designer", company: "Bellani S", highlight: "Bespoke formal wear for 40–70 clients a season" }
];

// Home "Kind words" marquee. Tile: gold / aqua / paprika / teal (leave empty to cycle).
export const testimonials = [
  {
    order: 1,
    quote:
      "Neha has been a wonderful part of our design team at Webenza over the last four years. Her work for Sterling Holidays has always stood out. She understands the brief, brings fresh ideas and pays attention to every detail. It's been a pleasure working with someone so creative, dependable and consistent.",
    author: "Pradeep Nair",
    role: "Executive Vice President and Business Head, Webenza India Pvt. Ltd.",
    tile: "gold"
  },
  {
    order: 2,
    quote:
      "It was a pleasure to have Neha on my team, working on brands like Dabur and HDFC. Their eye for design, attention to detail, and willingness to explore ideas made them a valued team member. They brought creativity and a collaborative spirit to the work, and I’d happily recommend them.",
    author: "Himanshu Bisht",
    role: "HOD – Creative Director (Art), Jio Creative Labs.",
    tile: "aqua"
  },
  {
    order: 3,
    quote:
      "Neha did a wonderful job bringing our ideas and vision for BricX to life. From designing the company logo to developing the brand guidelines and helping with basics of the UI/UX, she made the entire process seamless. I loved how everything turned out and would highly recommend her work. Would definitely work with her again!",
    author: "Eashani and Yaman",
    role: "CCO and Founder, BricX",
    tile: "paprika"
  },
  {
    order: 4,
    quote:
      "Neha is a talented and creative designer with a knack for turning ideas into engaging visual stories. She understands client briefs well, brings fresh perspectives to every project and combines strong creative thinking with a collaborative, can-do attitude. A dependable team player who consistently brings value to the table.",
    author: "Swastika Karmakar",
    role: "Art Director, Webenza India Pvt. Ltd.",
    tile: "teal"
  },
  {
    order: 5,
    quote:
      "Neha consistently delivers top-notch social media and advertising creatives with a great eye for detail. She understands briefs quickly, brings fresh ideas to life and works with impressive turnaround times. Her creative thinking and quality of execution often mean one-shot approvals. A reliable, efficient and creatively sharp professional.",
    author: "Sahil Mehta",
    role: "Founder, Connection Design",
    tile: "aqua"
  }
];

// Placeholder gallery slots for showcase projects.
const slots = (...items) => items.map(([title, aspect]) => ({ src: null, title, aspect }));

// Real project images in /public/Projects/<slug>/ (all exported at 1600×1200).
const shot = (slug, file) => ({ src: `/Projects/${slug}/${file}`, width: 1600, height: 1200 });
const thumb = (slug) => ({ src: `/Projects/${slug}/thumbnail.jpg`, width: 521, height: 397 });
// Gallery from [file, caption] pairs: with an odd count the first runs full width, the rest sit in pairs.
const shots = (slug, ...items) =>
  items.map(([file, title], i) => ({ src: shot(slug, file), title, size: items.length % 2 && i === 0 ? "full" : "half" }));
const reel = (file, title) => ({ src: `/Projects/sterling/videos/${file}.mp4`, poster: `/Projects/sterling/videos/${file}.jpg`, title });

export const projects = [
  /* ---------- Featured cards (Homepage 01 to 05) ---------- */
  {
    slug: "landmark-infratech",
    cardName: "01.psd",
    kind: "showcase",
    category: "brand-identity",
    featured: true,
    order: 1,
    title: "Landmark Infratech",
    subtitle: "A brand guidebook for a Bangalore real estate company",
    summary:
      "Building the brand guidelines, office stationery, signage, cutlery and designing the hospitality uniforms for the brand.",
    client: "Landmark Infratech",
    sector: "Real Estate",
    projectType: "Via Freelance",
    year: "2026–Current",
    role: "Brand & Hospitality Design",
    tags: ["Real Estate", "Brand Guidelines", "Stationery", "Signage"],
    accent: "teal",
    cover: shot("landmark-infratech", "1.jpg"),
    thumbnail: thumb("landmark-infratech"),
    aspect: "landscape",
    feeling: "Premium · Assured",
    note: "Premium · Assured",
    brief:
      "A brand guidebook for a Bangalore real estate company, to guide every touchpoint, from social and web to stationery and signage.",
    workedOn:
      "Building the brand guidelines, office stationery, signage, cutlery and designing the hospitality uniforms for the brand.",
    gallery: shots("landmark-infratech", ["2.jpg", "Brand guidelines"], ["3.jpg", "Billboard, social & sales deck"], ["4.jpg", "Hospitality & booking email"])
  },
  {
    slug: "sterling",
    cardName: "02.psd",
    kind: "showcase",
    category: "ai-videos",
    featured: true,
    order: 2,
    title: "Sterling",
    subtitle: "Online and offline brand assets that feel homely",
    summary: "Logo, brochures, banners, email, social and AI videos for a holiday brand.",
    client: "Sterling",
    sector: "Hospitality",
    projectType: "Via Webenza",
    year: "2023–2026",
    role: "Brand & Visual Designer",
    tags: ["Hospitality", "AI Videos", "Brand Assets", "Brochures"],
    accent: "gold",
    cover: shot("sterling", "1.jpg"),
    thumbnail: thumb("sterling"),
    aspect: "landscape",
    feeling: "Warm · Welcoming",
    note: "Warm · Welcoming",
    brief:
      "Online and offline assets that feel homely, with realistic visuals and clean, elegant type.",
    workedOn:
      "Logo, brochures, banners, email, social and AI videos for a holiday brand.",
    videos: [
      reel("alleppey-family", "Alleppey · Family"),
      reel("gangtok-family", "Gangtok · Family"),
      reel("mount-abu-couple", "Mount Abu · Couple"),
      reel("nainital-working-prof-couples", "Nainital · Working couples"),
      reel("ooty-fern-hill-family", "Ooty Fern Hill · Family")
    ],
    gallery: shots("sterling", ["2.jpg", "Instagram feed"], ["3.jpg", "Destination tent cards"], ["4.jpg", "Safari brochure"], ["5.jpg", "Seasonal newsletters"], ["6.jpg", "Offer & payment emails"], ["7.jpg", "Booking emails"])
  },
  {
    slug: "seru",
    cardName: "03.psd",
    kind: "showcase",
    category: "logo",
    featured: true,
    order: 3,
    title: "Séru",
    subtitle: "A warm, welcoming mark for a café in the heart of Bangalore",
    summary: "Logo Design, Building the Brand Guidelines, and Packaging for Séru.",
    client: "Séru",
    sector: "F&B",
    projectType: "Via Freelance",
    year: "2026–Current",
    role: "Logo & Brand Designer",
    tags: ["F&B", "Logo Design", "Packaging", "Brand Guidelines"],
    accent: "paprika",
    cover: shot("seru", "1.jpg"),
    thumbnail: thumb("seru"),
    aspect: "landscape",
    feeling: "Warm · Welcoming",
    note: "Warm · Welcoming",
    brief:
      "A warm, welcoming logo for a café in the heart of Bangalore. “Séru” means “together” in Kannada, so the mark needed a cultural connection.",
    workedOn:
      "Logo Design, Building the Brand Guidelines, and Packaging",
    gallery: shots("seru", ["2.jpg", "Social & WhatsApp catalogue"], ["3.jpg", "Logo explorations"])
  },
  {
    slug: "lighthouse-canton",
    cardName: "04.psd",
    kind: "showcase",
    category: "marketing",
    featured: true,
    order: 4,
    title: "Lighthouse Canton",
    subtitle: "Modern creatives for an NRI audience",
    summary: "Social media collateral for a financial services firm.",
    client: "Lighthouse Canton",
    sector: "Financial Services",
    projectType: "Via Webenza",
    year: "2026",
    role: "Visual & Social Media Designer",
    tags: ["Financial Services", "Social Media", "Typography"],
    accent: "aqua",
    cover: shot("lighthouse-canton", "1.jpg"),
    thumbnail: thumb("lighthouse-canton"),
    aspect: "landscape",
    feeling: "Premium · Trustworthy",
    note: "Premium · Trustworthy",
    brief:
      "Modern creatives for an NRI audience, indirect in their imagery, with typography doing much of the work.",
    workedOn:
      "Social media collateral for a financial services firm.",
    gallery: shots("lighthouse-canton", ["2.jpg", "Social carousel creatives"], ["3.jpg", "Pitch deck"], ["4.jpg", "Business cards"])
  },
  {
    slug: "unhumble",
    cardName: "05.psd",
    kind: "showcase",
    category: "illustration",
    featured: true,
    order: 5,
    title: "UnHumble",
    subtitle: "A deck of cards celebrating South Asian culture",
    summary: "A deck of cards celebrating South Asian culture, for a US company.",
    client: "UnHumble",
    sector: "Gifting",
    projectType: "Via Freelance",
    year: "2020",
    role: "Illustrator",
    tags: ["Illustration", "Gifting", "Culture", "Card Deck"],
    accent: "gold",
    cover: shot("unhumble", "1.jpg"),
    thumbnail: thumb("unhumble"),
    aspect: "landscape",
    feeling: "Proud · Playful",
    note: "Proud · Playful",
    brief:
      "A US company found my art page and asked me to illustrate a deck of cards inspired by South Asian culture. I drew on the culture I grew up around.",
    workedOn:
      "A deck of cards celebrating South Asian culture, for a US company.",
    gallery: shots("unhumble", ["2.jpg", "Face cards"])
  },

  /* ---------- Work page projects (06 to 11) ---------- */
  {
    slug: "hdfc-life-insurance",
    cardName: "06.psd",
    kind: "showcase",
    category: "marketing",
    featured: false,
    order: 6,
    title: "HDFC Life Insurance",
    subtitle: "Social, email and video assets for a national insurer",
    summary: "Social, email and video frames for a national insurer.",
    client: "HDFC Life Insurance",
    sector: "Insurance",
    projectType: "Via Schbang",
    year: "2021–2022",
    role: "Social & Digital Designer",
    tags: ["Insurance", "Social Media", "Email Design", "Video Frames"],
    accent: "teal",
    cover: null,
    aspect: "landscape",
    feeling: "Trustworthy · Caring",
    note: "Trustworthy · Caring",
    brief:
      "Social, email and video assets that sit inside the brand guidelines but feel relatable.",
    workedOn:
      "Social, email and video frames for a national insurer.",
    gallery: slots(["Social Creatives", "wide"], ["Email Design", "portrait"], ["Video Frames", "landscape"], ["Campaign Suite", "square"])
  },
  {
    slug: "bricx",
    cardName: "07.psd",
    kind: "showcase",
    category: "brand-identity",
    featured: false,
    order: 7,
    title: "BricX",
    subtitle: "A modern, memorable identity for real estate trading",
    summary: "Logo Design, Building the Brand Guidebook, and Office Stationery.",
    client: "BricX",
    sector: "Real Estate",
    projectType: "Via Freelance",
    year: "2026–Current",
    role: "Brand & Logo Designer",
    tags: ["Real Estate", "Logo Design", "Brand Guidebook", "Office Stationery"],
    accent: "paprika",
    cover: shot("bricx", "1.jpg"),
    thumbnail: thumb("bricx"),
    aspect: "landscape",
    feeling: "Modern · Confident",
    note: "Modern · Confident",
    brief:
      "A modern, memorable logo for a company pioneering real estate trading, plus a brand guidelines for its website and app, and later social and offline.",
    workedOn:
      "Logo Design, Building the Brand Guidebook, and Office Stationery",
    gallery: []
  },
  {
    slug: "drink-prime",
    cardName: "08.psd",
    kind: "showcase",
    category: "marketing",
    featured: false,
    order: 8,
    title: "Drink Prime",
    subtitle: "Fresh Google Ads creatives and website acquisition collateral",
    summary: "Social media collateral and ads.",
    client: "Drink Prime",
    sector: "Water Purification",
    projectType: "Via Freelance",
    year: "2026",
    role: "Digital & Ad Designer",
    tags: ["Water Purification", "Google Ads", "Social Media", "Creatives"],
    accent: "aqua",
    cover: null,
    aspect: "landscape",
    feeling: "Fresh · Clean",
    note: "Fresh · Clean",
    brief:
      "A fresh set of Google Ads creatives to bring more visitors to their website.",
    workedOn:
      "Social media collateral and ads.",
    gallery: slots(["Google Ads Suite", "wide"], ["Social Assets", "square"], ["Ad Variations", "landscape"], ["Landing Creatives", "portrait"])
  },
  {
    slug: "the-design-bar",
    cardName: "09.psd",
    kind: "showcase",
    category: "illustration",
    featured: false,
    order: 9,
    title: "The Design Bar",
    subtitle: "Customised, premium illustrated gifts open to everyone",
    summary: "Illustrated frames, Wallet Cards, Vintage Frames, Name plates and various other customised products including keychains and polaroids.",
    client: "The Design Bar",
    sector: "Gifting",
    projectType: "Via My Own Studio",
    year: "2020–2023",
    role: "Founder & Creative Lead",
    tags: ["Gifting", "Custom Products", "Illustrated Frames", "Merchandise"],
    accent: "gold",
    cover: null,
    aspect: "portrait",
    feeling: "Personal · Accessible",
    note: "Personal · Accessible",
    brief:
      "There was no brief. I wanted premium-feeling gifts that were customised, budget-friendly and open to everyone.",
    workedOn:
      "Illustrated frames, Wallet Cards, Vintage Frames, Name plates and various other customised products including keychains and polaroids",
    gallery: slots(["Illustrated Frames", "portrait"], ["Vintage Frames", "square"], ["Wallet Cards", "landscape"], ["Custom Product Range", "wide"])
  },
  {
    slug: "twisted-tree-homestay",
    cardName: "10.psd",
    kind: "showcase",
    category: "logo",
    featured: false,
    order: 10,
    title: "Twisted Tree Homestay",
    subtitle: "A heritage mark rooted in family history for an Ooty homestay",
    summary: "Logo and Signage Design.",
    client: "Twisted Tree Homestay",
    sector: "Hospitality",
    projectType: "Via Freelance",
    year: "2026",
    role: "Logo & Signage Designer",
    tags: ["Hospitality", "Logo Design", "Signage", "Heritage"],
    accent: "teal",
    cover: null,
    aspect: "square",
    feeling: "Homely · Rooted",
    note: "Homely · Rooted",
    brief:
      "A logo for a homestay in Ooty. The property has an old, twisted tree planted by the client’s great-grandfather, and he wanted it in the mark.",
    workedOn:
      "Logo and Signage Design",
    gallery: slots(["Final Mark", "square"], ["Property Signage", "landscape"], ["Sketches & Grid", "square"], ["Homestay Collateral", "wide"])
  },
  {
    slug: "creamland-and-annn",
    cardName: "11.psd",
    kind: "showcase",
    category: "packaging",
    featured: false,
    order: 11,
    title: "Creamland and Annn",
    subtitle: "Everyday packaging and memorable marks for sister F&B brands",
    summary: "Logo Design, Print Collateral, Packaging.",
    client: "Creamland and Annn",
    sector: "F&B",
    projectType: "Via Freelance",
    year: "2025–Current",
    role: "Packaging & Brand Designer",
    tags: ["F&B", "Packaging", "Logo Design", "Print Collateral"],
    accent: "gold",
    cover: null,
    aspect: "landscape",
    feeling: "Sweet · Playful",
    note: "Sweet · Playful",
    brief:
      "Easy-to-remember logos for the sister brands, for everyday packaging.",
    workedOn:
      "Logo Design, Print Collateral, Packaging",
    gallery: slots(["Packaging Range", "wide"], ["Logo Marks", "square"], ["Print Collateral", "landscape"], ["Pack Details", "portrait"])
  }
];
