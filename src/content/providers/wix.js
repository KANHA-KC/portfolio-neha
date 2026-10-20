// Wix Headless CMS provider.
// Auth: a Headless OAuth client ID (public, read-only, collections must allow "Anyone" to read),
// or an API key + site ID (server-only, can read restricted collections).

import { createClient, OAuthStrategy, ApiKeyStrategy, media } from "@wix/sdk";
import { items } from "@wix/data";
import { collections } from "../config";

let client;
function getClient() {
  if (client) return client;
  const auth =
    process.env.WIX_API_KEY && process.env.WIX_SITE_ID
      ? ApiKeyStrategy({ apiKey: process.env.WIX_API_KEY, siteId: process.env.WIX_SITE_ID })
      : OAuthStrategy({ clientId: process.env.WIX_CLIENT_ID });
  client = createClient({ modules: { items }, auth });
  return client;
}

// Wix image fields hold "wix:image://v1/…" identifiers; media gallery items hold { src, title }.
export const image = (v, alt) => {
  if (!v) return null;
  if (typeof v === "object") v = v.src || v.url;
  if (typeof v !== "string") return null;
  if (v.startsWith("wix:image://")) {
    const img = media.getImageUrl(v);
    return { src: img.url, width: img.width || 0, height: img.height || 0, alt: img.altText || alt || "" };
  }
  if (/^(https?:)?\//.test(v)) return { src: v, width: 0, height: 0, alt: alt || "" };
  return null;
};

async function queryAll(collectionId) {
  let res = await getClient().items.query(collectionId).ascending("order").limit(100).find();
  const all = [...res.items];
  while (res.hasNext()) {
    res = await res.next();
    all.push(...res.items);
  }
  return all;
}

async function queryOne(collectionId) {
  const res = await getClient().items.query(collectionId).limit(1).find();
  return res.items[0] || {};
}

export async function fetchRaw() {
  const [profile, projects, categories, services, experience] = await Promise.all([
    queryOne(collections.profile),
    queryAll(collections.projects),
    queryAll(collections.categories),
    queryAll(collections.services),
    queryAll(collections.experience)
  ]);
  return { profile, projects, categories, services, experience };
}
