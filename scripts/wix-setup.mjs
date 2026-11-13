// One-off setup: creates the Wix CMS collections this site reads from and fills them
// with the local seed content (src/content/seed.js).
//
//   npm run wix:setup -- --dry-run   show what would happen, touch nothing
//   npm run wix:setup                create missing collections + import seed into empty ones
//
// Needs an ADMIN API key (the site's public WIX_CLIENT_ID can only read). Put these in .env.local:
//   WIX_ADMIN_API_KEY=…   (Wix account → API Keys, with "Wix Data" manage permissions)
//   WIX_SITE_ID=…
// The site itself keeps reading with WIX_CLIENT_ID; the admin key is only used by this script.
//
// Safe to re-run: existing collections only get missing fields added / wrong types fixed (your own extra
// fields are left alone), and items are only imported into empty collections.

import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { collections as collectionsApi, items } from "@wix/data";
import * as seed from "../src/content/seed.js";
import { collections as ids } from "../src/content/config.js";

const DRY = process.argv.includes("--dry-run");

/* ---------- schema (keys must match src/content/normalize.js) ---------- */
const T = (key, displayName = key, type = "TEXT") => ({ key, displayName, type });
const N = (key, displayName = key) => T(key, displayName, "NUMBER");
const B = (key, displayName = key) => T(key, displayName, "BOOLEAN");
const IMG = (key, displayName = key) => T(key, displayName, "IMAGE");
const TAGS = (key, displayName = key) => T(key, displayName, "ARRAY_STRING");
const GALLERY = (key, displayName = key) => T(key, displayName, "MEDIA_GALLERY");

const SCHEMA = {
  profile: {
    id: ids.profile,
    displayName: "Profile",
    displayField: "name",
    fields: [
      T("name", "Name"),
      T("role", "Role"),
      T("headline", "Headline"),
      T("heroIntro", "Hero intro"),
      T("manifesto", "Manifesto"),
      T("intro", "Intro"),
      T("bio", "Bio (one paragraph per line)"),
      T("email", "Email"),
      T("location", "Location"),
      T("timezone", "Timezone"),
      T("availability", "Availability"),
      T("resume", "Resume link"),
      T("calendly", "Calendly link"),
      IMG("portrait", "Portrait"),
      T("socials", "Socials (Label | URL per line)"),
      T("principles", "Principles (Title | Description per line)"),
      TAGS("tools", "Tools"),
      TAGS("marquee", "Marquee"),
      TAGS("loves", "Loves")
    ]
  },
  categories: {
    id: ids.categories,
    displayName: "Categories",
    displayField: "title",
    fields: [T("title", "Title"), T("slug", "Slug"), T("description", "Description"), T("icon", "Icon"), N("order", "Order")]
  },
  projects: {
    id: ids.projects,
    displayName: "Projects",
    displayField: "title",
    fields: [
      T("title", "Title"),
      T("slug", "Slug"),
      T("subtitle", "Subtitle"),
      T("summary", "Summary"),
      T("kind", "Kind (showcase / case-study)"),
      T("category", "Category slug"),
      B("featured", "Featured on Home"),
      N("order", "Order"),
      T("client", "Client"),
      T("year", "Year"),
      T("role", "Role"),
      T("timeline", "Timeline"),
      T("platform", "Platform"),
      TAGS("tags", "Tags"),
      T("accent", "Accent (gold / aqua / paprika / teal)"),
      T("illustration", "Illustration"),
      IMG("thumbnail", "Thumbnail (card image)"),
      IMG("cover", "Cover (top of project page)"),
      T("aspect", "Card aspect"),
      T("note", "Sticky note"),
      T("brief", "Brief"),
      GALLERY("gallery", "Gallery (images inside the project)"),
      T("challenge", "Challenge"),
      T("solution", "Solution"),
      T("process", "Process (Step | What happened per line)"),
      T("stats", "Stats (42% | Label per line)"),
      T("deliverables", "Deliverables (one per line)"),
      T("learnings", "Learnings")
    ]
  },
  services: {
    id: ids.services,
    displayName: "Services",
    displayField: "title",
    fields: [T("title", "Title"), T("description", "Description"), T("group", "Group (ux / brand)"), N("order", "Order")]
  },
  experience: {
    id: ids.experience,
    displayName: "Experience",
    displayField: "role",
    fields: [T("role", "Role"), T("company", "Company"), T("period", "Period"), T("location", "Location"), N("order", "Order")]
  }
};

const PERMISSIONS = { read: "ANYONE", insert: "ADMIN", update: "ADMIN", remove: "ADMIN" };

/* ---------- seed → CMS item shape ---------- */
// Multi-line text fields are easier to edit in Wix than arrays; normalize.js reads both.
const lines = (v) => (Array.isArray(v) ? v.join("\n") : v);
const MULTILINE = new Set(["bio", "socials", "principles", "process", "stats", "deliverables", "brief"]);

function toItem(collection, raw) {
  const keys = new Set(SCHEMA[collection].fields.map((f) => f.key));
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    if (!keys.has(k) || v == null || v === "") continue;
    if (k === "gallery") {
      // Seed galleries are empty placeholder slots — upload real images in Wix instead.
      const real = v.filter((g) => g.src).map((g) => ({ type: "image", src: g.src, title: g.title || "" }));
      if (real.length) out.gallery = real;
      continue;
    }
    out[k] = MULTILINE.has(k) ? lines(v) : v;
  }
  return out;
}

const SEED = {
  profile: [seed.profile],
  categories: seed.categories,
  projects: seed.projects,
  services: seed.services,
  experience: seed.experience
};

/* ---------- run ---------- */
function client() {
  const apiKey = process.env.WIX_ADMIN_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) {
    console.error("Missing WIX_ADMIN_API_KEY and/or WIX_SITE_ID in .env.local — see the comment at the top of this file.");
    process.exit(1);
  }
  return createClient({ modules: { collectionsApi, items }, auth: ApiKeyStrategy({ apiKey, siteId }) });
}

const errMsg = (e) => e?.details?.applicationError?.description || e?.message || String(e);

async function exists(wix, id) {
  try {
    await wix.collectionsApi.getDataCollection(id);
    return true;
  } catch (e) {
    if (/WDE0025|not ?found|does not exist/i.test(errMsg(e)) || e?.details?.applicationError?.code === "WDE0025") return false;
    throw e;
  }
}

// Bring an existing collection in line with SCHEMA: add missing fields and fix wrong types.
// Fields not in SCHEMA (anything you added yourself in Wix) are never touched.
// Types are changed in place, which keeps the stored values.
async function syncFields(wix, s) {
  const current = await wix.collectionsApi.getDataCollection(s.id);
  const have = Object.fromEntries(current.fields.map((f) => [f.key, f]));
  for (const f of s.fields) {
    const existing = have[f.key];
    if (!existing) {
      await wix.collectionsApi.createDataCollectionField(s.id, { field: f });
      console.log(`  + added ${f.key} (${f.type})`);
    } else if (existing.type !== f.type) {
      await wix.collectionsApi.updateDataCollectionField(s.id, { field: f });
      console.log(`  ~ ${f.key}: ${existing.type} → ${f.type}`);
    }
  }
}

async function insertAll(wix, id, docs) {
  try {
    // bulkInsert reports per-item failures in its result instead of throwing.
    const res = await wix.items.bulkInsert(id, docs);
    const errors = res?.errors || [];
    if (errors.length) {
      const reasons = [...new Set(errors.map((r) => r.message || r.code || "unknown"))];
      throw new Error(`${errors.length} of ${docs.length} failed: ${reasons.join("; ")}`);
    }
    const total = await wix.items.query(id).count();
    if (total === 0) throw new Error("Wix accepted the insert but the collection is still empty");
    return { ok: docs.length, skipped: [] };
  } catch (e) {
    if (/WDE0027|permission/i.test(errMsg(e))) throw new Error(`No permission to write to ${id}. Give the API key "Wix Data" permissions in Wix → API Keys, then re-run.`);
    // Fall back to one-by-one so a single bad value (e.g. an image path Wix rejects) doesn't block the rest.
    console.warn(`    bulk insert failed (${errMsg(e)}); retrying item by item`);
    let ok = 0;
    const skipped = [];
    for (const doc of docs) {
      try {
        await wix.items.insert(id, doc);
        ok++;
      } catch {
        const { portrait, cover, gallery, ...rest } = doc;
        try {
          await wix.items.insert(id, rest);
          ok++;
          skipped.push(`${doc.title || doc.name}: image fields left empty — upload them in Wix`);
        } catch (e2) {
          skipped.push(`${doc.title || doc.name || "item"}: ${errMsg(e2)}`);
        }
      }
    }
    return { ok, skipped };
  }
}

async function main() {
  console.log(DRY ? "DRY RUN — nothing will be changed.\n" : "");
  if (DRY) {
    for (const [name, s] of Object.entries(SCHEMA)) {
      const docs = SEED[name].map((r) => toItem(name, r));
      console.log(`${s.id}: ${s.fields.length} fields, ${docs.length} seed item(s)`);
      console.log(`  fields: ${s.fields.map((f) => `${f.key}:${f.type}`).join(", ")}`);
      if (name === "profile") console.log(`  profile keys: ${Object.keys(docs[0]).join(", ")}`);
    }
    return;
  }

  const wix = client();
  const notes = [];
  for (const [name, s] of Object.entries(SCHEMA)) {
    process.stdout.write(`${s.id}: `);
    if (await exists(wix, s.id)) {
      console.log("exists");
      await syncFields(wix, s);
    } else {
      await wix.collectionsApi.createDataCollection({
        _id: s.id,
        displayName: s.displayName,
        displayField: s.displayField,
        fields: s.fields,
        permissions: PERMISSIONS
      });
      console.log("created");
    }

    const count = await wix.items.query(s.id).count();
    if (count > 0) {
      console.log(`  has ${count} item(s) — import skipped`);
      continue;
    }
    const { ok, skipped } = await insertAll(wix, s.id, SEED[name].map((r) => toItem(name, r)));
    console.log(`  imported ${ok} item(s)`);
    notes.push(...skipped.map((x) => `${s.id} → ${x}`));
  }

  if (notes.length) console.log(`\nNeeds attention:\n  ${notes.join("\n  ")}`);
  console.log("\nDone. Images (portrait, covers, galleries) are best uploaded through the Wix CMS.");
}

main().catch((e) => {
  console.error("\nSetup failed:", errMsg(e));
  process.exit(1);
});
