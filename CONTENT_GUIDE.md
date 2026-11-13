# Managing your website content

Everything you see on the site — your profile, projects, categories, services and experience — lives in the
**Wix CMS**. You edit it there; the website picks it up. No code needed.

**Where:** manage.wix.com → your site **nehaondhia.com** → **CMS** (left sidebar).

You'll see five collections:

| Collection | What it controls |
| --- | --- |
| **Profile** | One item: your name, intro, bio, email, socials, portrait, resume & Calendly links |
| **Projects** | One item per project — cards on Home / Work and the full project pages |
| **Categories** | The disciplines (UX / UI, Logo design, Branding…) used for filters and category pages |
| **Services** | The skills listed in the "two hats" sections on Home and About |
| **Experience** | Your work history on the About page |

---

## Add a new project

1. CMS → **Projects** → **+ Add Item**.
2. Fill in at least:
   - **Title** — the project name.
   - **Slug** — the web address, lowercase with dashes: `my-new-brand` → `nehaondhia.com/work/my-new-brand`. Must be unique; don't change it after publishing (old links would break).
   - **Kind** — `showcase` for visual work (logos, branding, packaging, illustration) or `case-study` for long-form UX.
   - **Category slug** — one of: `ux-ui`, `logo-design`, `branding`, `visual-design`, `illustration` (or a new category you created — see below).
   - **Summary** — 1–2 sentences. This is also what Google shows, so aim for **90–155 characters**.
   - **Order** — lower numbers appear first.
3. Add images (see next section).
4. Optional: **Featured on Home** (tick to show it on the home page), **Accent** (`gold`, `aqua`, `paprika` or `teal` — colours the page), **Client**, **Year**, **Role**, **Tags**, **Sticky note** (the handwritten label on the card).
5. Showcase projects: write the **Brief** — one paragraph per line.
   Case studies: fill **Challenge**, **Solution**, **Learnings**, and:
   - **Process** — one step per line: `Listen | 24 interviews, diary study`
   - **Stats** — one per line: `42% | Drop-off reduction` (plain numbers count up on screen)
   - **Deliverables** — one per line.
6. **Save**. Then publish/refresh (see "When do changes appear?").

Every field is optional except Title and Slug — sections with empty fields just don't show.

## Project images

Each project has three image fields:

| Field | Where it appears | Tips |
| --- | --- | --- |
| **Thumbnail (card image)** | The project card on Home, Work, category pages and "related work" | Use the shape set in **Card aspect** (`square`, `portrait`, `tall`, `landscape`, `wide`). |
| **Cover (top of project page)** | The big image at the top of the project page, and the preview image when the link is shared on LinkedIn / WhatsApp | Wide images work best, ~2400px wide. |
| **Gallery (images inside the project)** | The image mosaic further down the project page | Add as many as you like. Click an image to set its **Title** (shown as a caption) and **Description** (alt text for accessibility & Google). Tile shape follows each image's own proportions. |

- Upload just one of Thumbnail or Cover and it's used for both.
- If both are empty, the site shows a designed placeholder card — never a broken image.
- Always **upload** images into these fields (from your computer or Wix Media). Don't paste links to images hosted elsewhere — the site ignores them.
- Export JPG/WebP around 2400px on the long side; Wix serves resized versions automatically.

## Edit your profile

CMS → **Profile** → the single item. Don't add a second item — the site only reads the first.

- **Bio** — one paragraph per line; the first line is shown large.
- **Socials** — one per line: `LinkedIn | https://linkedin.com/in/…`. New lines automatically become keycap buttons on the Contact page (LinkedIn, Dribbble, Instagram, Behance and X have their own icons).
- **Principles** — one per line: `Title | Description`.
- **Tools / Loves / Marquee** — tags; type a word and press Enter.
- **Availability** — e.g. "Available for select projects". Leave empty to hide the badge.
- **Calendly link** — your real Calendly event link (currently a placeholder!). Leave empty to hide the "Book a chai chat" button.
- **Resume link** — `/resume.pdf` uses the file in the website itself. To change the CV, ask your developer to replace `public/resume.pdf` (a Wix-hosted PDF would open in a tab instead of downloading).
- **Intro** — also used as the Google description for the About page, so keep the first ~155 characters strong.

## Add or rename a category

CMS → **Categories** → **+ Add Item**: **Title** (shown on filters), **Slug** (lowercase-with-dashes, used in the web address), **Description**, **Icon** (a single symbol like ◎ ✦ ▢ ▤ ✎), **Order**.

- A category only appears on the site once at least one project uses its slug.
- Renaming a **slug** changes its web address — update the **Category slug** of its projects to match.

## Services & Experience

Plain lists — edit text and **Order**. Services need **Group**: `ux` or `brand` (which "hat" column it sits in).

---

## When do changes appear?

The site is cached for speed and refreshes **automatically once a day**.

To make edits appear **instantly**, set up this once (after the site is deployed):

1. Wix dashboard → **Automations** → **+ New Automation**.
2. Trigger: **CMS → Item created, updated or deleted** (pick the collection — make one automation per collection, or start with Projects and Profile).
3. Action: **Send HTTP request** →
   - Method: `POST`
   - URL: `https://nehaondhia.com/api/revalidate`
   - Header: `x-revalidate-secret` = the `REVALIDATE_SECRET` value from your hosting settings (ask your developer).
4. Save & activate. Now every save in the CMS refreshes the site within seconds.

## Before launch checklist

- [ ] Replace the 10 placeholder projects ("Brand Identity 01", "Logo Design 01"…) with real work, or delete them — placeholders hurt how Google sees the site.
- [ ] Upload a thumbnail and/or cover for every project.
- [ ] Put your real **Calendly link** in Profile.
- [ ] Set up the instant-update automation above.
- [ ] Submit `https://nehaondhia.com/sitemap.xml` in Google Search Console.

## Good habits for SEO

- **Title** and **Summary** are what people see on Google — make them specific ("Packaging for Chai Co." beats "Packaging 01").
- Fill **Description** (alt text) on every gallery image: describe what's in it.
- Keep slugs short and descriptive, and don't change them once live.
- New projects, categories and images are added to the sitemap and Google previews automatically.

## Safety

- Never share the **admin API key** — it can change everything. It isn't stored in the website; if you think it leaked, delete it in Wix → API Keys and create a new one.
- The site's **Client ID** is public by design and can only *read* content.
