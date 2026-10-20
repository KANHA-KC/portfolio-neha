import * as seed from "../seed";

// Local images are plain paths/URLs. Sizes are unknown, so <Media> falls back to the chosen aspect.
export const image = (v, alt) => {
  if (!v) return null;
  if (typeof v === "object" && v.src) return { src: v.src, width: v.width || 0, height: v.height || 0, alt: v.alt || alt || "" };
  if (typeof v === "string") return { src: v, width: 0, height: 0, alt: alt || "" };
  return null;
};

export async function fetchRaw() {
  return {
    profile: seed.profile,
    projects: seed.projects,
    categories: seed.categories,
    services: seed.services,
    experience: seed.experience
  };
}
