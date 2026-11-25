// Central content configuration. Collection IDs can be overridden per environment
// so the same code works against any Wix site.

export const CONTENT_TAG = "content";

export const collections = {
  profile: process.env.WIX_COLLECTION_PROFILE || "Profile",
  projects: process.env.WIX_COLLECTION_PROJECTS || "Projects",
  categories: process.env.WIX_COLLECTION_CATEGORIES || "Categories",
  services: process.env.WIX_COLLECTION_SERVICES || "Services",
  experience: process.env.WIX_COLLECTION_EXPERIENCE || "Experience",
  testimonials: process.env.WIX_COLLECTION_TESTIMONIALS || "Testimonials"
};

// Content comes from Wix when credentials exist, otherwise from the local seed in ./seed.js.
export const contentSource = () =>
  process.env.WIX_CLIENT_ID || (process.env.WIX_API_KEY && process.env.WIX_SITE_ID) ? "wix" : "local";

// Editors pick an accent name in the CMS; the site turns it into a palette.
export const palettes = {
  gold: { wash: "#EAFDFF", frame: "#B8F9FF", ink: "#045A68", spark: "#C7DB0A" },
  aqua: { wash: "#EAFDFF", frame: "#B8F9FF", ink: "#045A68", spark: "#045A68" },
  paprika: { wash: "#EAFDFF", frame: "#B8F9FF", ink: "#045A68", spark: "#C7DB0A" },
  teal: { wash: "#EAFDFF", frame: "#8EEAF3", ink: "#056E7F", spark: "#056E7F" }
};

export const aspects = {
  square: "1 / 1",
  portrait: "4 / 5",
  tall: "3 / 4",
  landscape: "4 / 3",
  wide: "16 / 9"
};
