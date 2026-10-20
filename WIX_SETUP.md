# Managing content with Wix Headless

All site content — profile, projects, categories, services and experience — comes from the
content layer in `src/content/`. Pages only call `getProfile()`, `getProjects()`, etc. from `@/content`.

- **No Wix credentials** → content comes from `src/content/seed.js` (what you see today).
- **Wix credentials set** → content comes from your Wix CMS collections. If Wix is unreachable, the
  site logs an error and falls back to the seed so it never goes blank.

The seed file uses exactly the same field keys as the Wix collections below, so it is also a
worked example of what to put in each field.

---

## 1. Connect

1. In Wix: **Settings → Headless Settings → OAuth apps → Create OAuth App**. Copy the **Client ID**.
2. Copy `.env.example` to `.env.local` and set `WIX_CLIENT_ID=…`.
3. In the CMS, give every collection below **Read: Anyone** permission.
4. Restart `npm run dev`.

(Alternative: set `WIX_API_KEY` + `WIX_SITE_ID` instead to read private collections from the server.)

## 2. Create these collections

Field **keys** must match exactly (Wix shows the key under each field's settings). Every
collection except Profile has an `order` number field — lower numbers show first.

### `Profile` — a single item

| Key | Type | Notes |
| --- | --- | --- |
| `name` | Text | First word → giant first word in the hero, the rest → the outlined word |
| `role` | Text | e.g. "UX, Brand & Visual Designer" |
| `headline` | Text | Short tagline (used for social sharing) |
| `heroIntro` | Text | Follows "Hi, I'm Neha —". Wrap words in `*asterisks*` for the italic accent |
| `manifesto` | Text | Big scroll-reveal paragraph on Home. `*asterisks*` = accent |
| `intro` | Text | About intro + meta description |
| `bio` | Text (multi-line) | One paragraph per line. The first line is shown large |
| `email` | Text | |
| `location` | Text | "Mumbai, India" |
| `timezone` | Text | IANA name, e.g. `Asia/Kolkata` (drives the live clock) |
| `availability` | Text | "Available for select projects" |
| `portrait` | Image | Transparent cut-out PNG works best |
| `socials` | Text (multi-line) | One per line: `LinkedIn \| https://…` |
| `principles` | Text (multi-line) | One per line: `Title \| Description` |
| `tools` | Tags | Figma, Illustrator… |
| `loves` | Tags | Things-I-love stickers |

### `Categories`

| Key | Type | Notes |
| --- | --- | --- |
| `slug` | Text | e.g. `logo-design`, `branding`, `ux-ui`, `visual-design`, `illustration` |
| `title` | Text | Filter label |
| `description` | Text | Shown under the filters |
| `icon` | Text | A single glyph, e.g. ◎ ✦ ▢ ▤ ✎ |
| `order` | Number | |

Categories with no projects are hidden automatically. Add a new discipline any time — no code change.

### `Projects`

| Key | Type | Notes |
| --- | --- | --- |
| `slug` | Text | URL: `/work/<slug>` |
| `title`, `subtitle`, `summary` | Text | |
| `kind` | Text | `showcase` (logos, branding, print — visual layout) or `case-study` (long-form UX) |
| `category` | Text | A category `slug` |
| `featured` | Boolean | Show on the Home page |
| `order` | Number | |
| `client`, `year`, `role` | Text | |
| `tags` | Tags | |
| `accent` | Text | `gold`, `aqua`, `paprika` or `teal` — colours the cards & page |
| `cover` | Image | Empty = designed placeholder card |
| `aspect` | Text | Card shape: `square`, `portrait`, `tall`, `landscape`, `wide` |
| `note` | Text | Optional handwritten sticker |
| `brief` | Text (multi-line) | Showcase pages. One paragraph per line |
| `gallery` | Media gallery | Showcase & case-study image mosaic. Each image's title becomes its caption |
| `challenge`, `solution`, `learnings` | Text | Case studies |
| `timeline`, `platform` | Text | Case studies |
| `process` | Text (multi-line) | `Step \| What happened` per line |
| `stats` | Text (multi-line) | `42% \| Drop-off reduction` per line (numbers count up) |
| `deliverables` | Tags / multi-line text | |

Every field is optional — sections with empty fields simply don't render.

### `Services`

| Key | Type | Notes |
| --- | --- | --- |
| `title`, `description` | Text | |
| `group` | Text | `ux` or `brand` — the two "hats" on Home & About |
| `order` | Number | |

### `Experience`

| Key | Type |
| --- | --- |
| `period` | Text ("2022 — 24") |
| `role`, `company`, `location` | Text |
| `order` | Number |

## 3. Instant updates after publishing

Pages are static and cached for a day. To refresh as soon as you edit in Wix:

1. Set `REVALIDATE_SECRET` in your hosting environment.
2. In Wix: **Automations → New automation → Trigger: "CMS item created / updated / deleted"**
   (one per collection, or use any trigger you like) **→ Action: Send an HTTP request**:
   - Method `POST`
   - URL `https://<your-site>/api/revalidate`
   - Header `x-revalidate-secret: <your secret>`

## Where things live

```
src/content/
  config.js         collection IDs, accent palettes, card aspect ratios
  seed.js           local content (same shape as Wix)
  normalize.js      raw record → UI shape, with safe defaults
  providers/wix.js  Wix SDK queries + Wix image URLs
  providers/local.js
  index.js          cached public API: getProfile, getProjects, getProject, getCategories, …
src/app/api/revalidate/route.js
```

To add a new field: add it in Wix → map it in `normalize.js` → use it in a component.
To switch to a different CMS later: write another provider with the same `fetchRaw()` / `image()` exports.
