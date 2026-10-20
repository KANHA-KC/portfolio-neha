// Central content configuration. Collection IDs can be overridden per environment
// so the same code works against any Wix site.

export const CONTENT_TAG = "content";

export const collections = {
  profile: process.env.WIX_COLLECTION_PROFILE || "Profile",
  projects: process.env.WIX_COLLECTION_PROJECTS || "Projects",
  categories: process.env.WIX_COLLECTION_CATEGORIES || "Categories",
  services: process.env.WIX_COLLECTION_SERVICES || "Services",
  experience: process.env.WIX_COLLECTION_EXPERIENCE || "Experience"
};

// Content comes from Wix when credentials exist, otherwise from the local seed in ./seed.js.
export const contentSource = () =>
  process.env.WIX_CLIENT_ID || (process.env.WIX_API_KEY && process.env.WIX_SITE_ID) ? "wix" : "local";

// Editors pick an accent name in the CMS; the site turns it into a palette.
export const palettes = {
  gold: { wash: "#FFF3DC", frame: "#F8CC78", ink: "#925B00", spark: "#F5A000" },
  aqua: { wash: "#EDF7F4", frame: "#C8E8E2", ink: "#36786D", spark: "#36786D" },
  paprika: { wash: "#FBECE6", frame: "#EDA18A", ink: "#A6381B", spark: "#DF5227" },
  teal: { wash: "#E7EFF0", frame: "#9ED4CB", ink: "#0B4F5E", spark: "#0B4F5E" }
};

export const aspects = {
  square: "1 / 1",
  portrait: "4 / 5",
  tall: "3 / 4",
  landscape: "4 / 3",
  wide: "16 / 9"
};
