// Public content API. Pages and server components import from "@/content" only —
// they never know (or care) whether data came from Wix or the local seed.

import { cacheLife, cacheTag } from "next/cache";
import { CONTENT_TAG, contentSource } from "./config";
import { normalizeCategory, normalizeExperience, normalizeProfile, normalizeProject, normalizeService } from "./normalize";
import * as local from "./providers/local";

const byOrder = (a, b) => a.order - b.order;

async function fetchFromSource() {
  if (contentSource() === "wix") {
    try {
      const wix = await import("./providers/wix");
      return { raw: await wix.fetchRaw(), image: wix.image };
    } catch (err) {
      console.error("[content] Wix fetch failed — falling back to local seed.", err);
    }
  }
  return { raw: await local.fetchRaw(), image: local.image };
}

// Everything is small, so it is loaded and cached as one bundle.
// It is revalidated daily, or immediately via POST /api/revalidate (see WIX_SETUP.md).
async function loadContent() {
  "use cache";
  cacheLife("days");
  cacheTag(CONTENT_TAG);

  const { raw, image } = await fetchFromSource();

  const projects = raw.projects.map((p) => normalizeProject(p, image)).filter((p) => p.slug).sort(byOrder);
  const categories = raw.categories
    .map(normalizeCategory)
    .filter((c) => c.slug)
    .sort(byOrder)
    .map((c) => ({ ...c, count: projects.filter((p) => p.category === c.slug).length }))
    .filter((c) => c.count > 0);
  const catOf = Object.fromEntries(categories.map((c) => [c.slug, c]));

  return {
    profile: normalizeProfile(raw.profile || {}, image),
    projects: projects.map((p) => ({ ...p, categoryTitle: catOf[p.category]?.title || p.category, categoryIcon: catOf[p.category]?.icon || "✦" })),
    categories,
    services: raw.services.map(normalizeService).sort(byOrder),
    experience: raw.experience.map(normalizeExperience).sort(byOrder)
  };
}

export async function getProfile() {
  return (await loadContent()).profile;
}

export async function getProjects({ category, featured, kind } = {}) {
  let list = (await loadContent()).projects;
  if (category) list = list.filter((p) => p.category === category);
  if (featured) list = list.filter((p) => p.featured);
  if (kind) list = list.filter((p) => p.kind === kind);
  return list;
}

export async function getProject(slug) {
  const list = (await loadContent()).projects;
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return { project: list[i], next: list[(i + 1) % list.length], prev: list[(i - 1 + list.length) % list.length] };
}

export async function getCategories() {
  return (await loadContent()).categories;
}

export async function getServices() {
  return (await loadContent()).services;
}

export async function getExperience() {
  return (await loadContent()).experience;
}
