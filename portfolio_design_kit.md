# Portfolio Design Kit & Foundation System

This document serves as the foundational design system for the portfolio website, built strictly from the expanded color palette and typography stack (**Althy** and **Plus Jakarta Sans**).

---

## 1. Complete Color Palette Reference

### Brand & Supporting Families

| Family | Color Name | Hex | Recommended Use |
| :--- | :--- | :--- | :--- |
| **Teal** | **Deep Teal** | `#063641` | Footer, deeper background layers, hover state for teal buttons |
| **Teal** | **Dark Teal (Brand)** | `#0B4F5E` | Logo, primary headings, navigation, primary buttons, signature sections |
| **Teal** | **Soft Teal** | `#477B85` | Decorative lines, secondary illustrations, supporting graphics, interactive borders |
| **Teal** | **Teal Mist** | `#E7EFF0` | Quiet section backgrounds and subtle surface contrast |
| **Orange** | **Burnt Gold** | `#925B00` | Warm text accents on light backgrounds |
| **Orange** | **Golden Orange** | `#F5A000` | Small highlights, playful stickers, project numbers, decorative emphasis |
| **Orange** | **Soft Gold** | `#F8CC78` | Illustration details, occasional warm panels |
| **Orange** | **Golden Wash** | `#FFF3DC` | Soft spotlight backgrounds behind selected work |
| **Paprika** | **Deep Paprika** | `#A6381B` | Accent links and small emphasis text on light backgrounds |
| **Paprika** | **Spicy Paprika** | `#DF5227` | Large statement headings, expressive shapes, occasional secondary CTA |
| **Paprika** | **Soft Paprika** | `#EDA18A` | Collage elements and gentle editorial accents |
| **Paprika** | **Paprika Wash** | `#FBECE6` | Warm About-section details or project surfaces |
| **Aqua** | **Deep Aqua** | `#36786D` | Supporting illustration details and decorative accents |
| **Aqua** | **Pearl Aqua** | `#9ED4CB` | Buttons on teal backgrounds, tags, selected treatments, soft graphic shapes |
| **Aqua** | **Light Aqua** | `#C8E8E2` | Larger background accents and image framing |
| **Aqua** | **Aqua Wash** | `#EDF7F4` | Quiet panels and subtle background transitions |

### Neutral Foundation

| Color Name | Hex | Recommended Use |
| :--- | :--- | :--- |
| **Warm Canvas** | `#FCFAF6` | Main page background; warmer and less clinical than pure white |
| **Paper** | `#FFFFFF` | Form fields or surfaces that need clear separation |
| **Ink** | `#182F34` | Body text and text on warm accent colors |
| **Muted Ink** | `#52666A` | Captions, supporting descriptions, secondary information |
| **Soft Border** | `#D6E1DE` | Decorative dividers—not the only boundary for interactive controls |

---

## 2. Typography System

Your typographic voice balances **editorial warmth and personality** in headings with **crisp, geometric legibility** for long-form case study reading.

### Font Stack
* **Display / Hero (`--font-display`):** **Althy**
  * *Role:* Hero statements, page titles, section headers, pull quotes, and large project numbers (`01`, `02`).
  * *Rules:* Keep line-height tight (`1.05` – `1.15`) and letter-spacing slightly negative (`-0.02em`) so its expressive curves feel anchored.
* **Primary UI & Case Studies (`--font-sans`):** **Plus Jakarta Sans**
  * *Role:* Navigation, buttons, metadata, tags, subheadings, and all long-form case study body copy.
  * *Weights:* `400 Regular` (body), `500 Medium` (UI labels/nav), `600 SemiBold` (subheadings/cards), `700 Bold` (strong emphasis).
* **Secondary / Supporting Display (`--font-accent`):** **Secondary Display / Editorial Fallback** *(used sparingly)*
  * *Role:* Inline italic callouts inside an Althy headline (e.g., *"Designing **thoughtful** systems"*), playful sticker labels, or brief marginalia notes in case studies.

### Type Scale & Hierarchy (Desktop → Mobile)

| Token / Level | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Letter Spacing | Default Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Althy | Regular | `64px (4rem)` / `42px` | `1.08` | `-0.02em` | Dark Teal (`#0B4F5E`) |
| **H1 — Page / Statement** | Althy | Regular | `48px (3rem)` / `34px` | `1.12` | `-0.015em` | Dark Teal (`#0B4F5E`) or Spicy Paprika (`#DF5227`) |
| **H2 — Section Header** | Althy | Regular | `36px (2.25rem)` / `28px` | `1.18` | `-0.01em` | Dark Teal (`#0B4F5E`) |
| **H3 — Case Study Subhead** | Plus Jakarta Sans | `600` | `24px (1.5rem)` / `20px` | `1.35` | `-0.01em` | Ink (`#182F34`) |
| **H4 — Card / Feature Title**| Plus Jakarta Sans | `600` | `18px (1.125rem)` | `1.4` | `0` | Ink (`#182F34`) |
| **Body Large (Lead)** | Plus Jakarta Sans | `400` | `20px (1.25rem)` / `18px` | `1.6` | `0` | Ink (`#182F34`) |
| **Body — Case Study** | Plus Jakarta Sans | `400` | `17px (1.0625rem)` | `1.7` | `0` | Ink (`#182F34`) *(Max line width: `65ch`)* |
| **Caption / Metadata** | Plus Jakarta Sans | `500` | `14px (0.875rem)` | `1.5` | `+0.01em` | Muted Ink (`#52666A`) |
| **Eyebrow / Tag** | Plus Jakarta Sans | `600` | `12px (0.75rem)` | `1.2` | `+0.06em` (UPPERCASE) | Deep Paprika (`#A6381B`) or Burnt Gold (`#925B00`) |

---

## 3. Color Architecture & Pairing Rules

To prevent your 21 colors from overwhelming the work, follow the **65 / 20 / 10 / 5 proportion rule**:
* **65% Neutral Foundation:** `Warm Canvas (#FCFAF6)`, `Paper (#FFFFFF)`, `Ink (#182F34)`, `Muted Ink (#52666A)`, `Soft Border (#D6E1DE)`.
* **20% Brand Anchor (Teals):** `Dark Teal (#0B4F5E)`, `Deep Teal (#063641)`, `Teal Mist (#E7EFF0)`, `Soft Teal (#477B85)`.
* **10% Secondary Atmosphere (Aquas & Washes):** `Aqua Wash (#EDF7F4)`, `Golden Wash (#FFF3DC)`, `Paprika Wash (#FBECE6)`, `Light Aqua (#C8E8E2)`, `Pearl Aqua (#9ED4CB)`.
* **5% High-Energy Sparks (Oranges & Paprikas):** `Spicy Paprika (#DF5227)`, `Deep Paprika (#A6381B)`, `Golden Orange (#F5A000)`, `Burnt Gold (#925B00)`.

### Approved Surface + Text Combinations (Contrast-Safe)

| Surface Background | Primary Heading | Body Copy | Secondary / Caption | Accent / Eyebrow / Link |
| :--- | :--- | :--- | :--- | :--- |
| **Warm Canvas** (`#FCFAF6`) | Dark Teal (`#0B4F5E`) | Ink (`#182F34`) | Muted Ink (`#52666A`) | Deep Paprika (`#A6381B`) or Burnt Gold (`#925B00`) |
| **Teal Mist** (`#E7EFF0`) | Dark Teal (`#0B4F5E`) | Ink (`#182F34`) | Muted Ink (`#52666A`) | Deep Aqua (`#36786D`) |
| **Golden Wash** (`#FFF3DC`) | Dark Teal (`#0B4F5E`) | Ink (`#182F34`) | Burnt Gold (`#925B00`) | Deep Paprika (`#A6381B`) |
| **Paprika Wash** (`#FBECE6`) | Dark Teal (`#0B4F5E`) | Ink (`#182F34`) | Deep Paprika (`#A6381B`)| Spicy Paprika (`#DF5227` — *large text only*) |
| **Aqua Wash** (`#EDF7F4`) | Dark Teal (`#0B4F5E`) | Ink (`#182F34`) | Muted Ink (`#52666A`) | Deep Aqua (`#36786D`) |
| **Dark Teal** (`#0B4F5E`) | Warm Canvas (`#FCFAF6`) | Teal Mist (`#E7EFF0`) | Pearl Aqua (`#9ED4CB`) | Golden Orange (`#F5A000`) or Soft Gold (`#F8CC78`) |
| **Deep Teal** (`#063641`) | Paper (`#FFFFFF`) | Light Aqua (`#C8E8E2`)| Pearl Aqua (`#9ED4CB`) | Golden Orange (`#F5A000`) |

> **Accessibility Guardrail:** Never use `Golden Orange (#F5A000)`, `Soft Gold (#F8CC78)`, `Soft Paprika (#EDA18A)`, or `Pearl Aqua (#9ED4CB)` as small text on light backgrounds (`#FCFAF6` or `#FFFFFF`). Always switch to **`Burnt Gold (#925B00)`** or **`Deep Paprika (#A6381B)`** for readable warm text on light surfaces, or place `Ink (#182F34)` text *on top* of those bright fills.

---

## 4. Core UI Components Kit

### A. Buttons & Links
* **Primary Button (On Light Surfaces):**
  * **Background:** `Dark Teal (#0B4F5E)` | **Text:** `Paper (#FFFFFF)` (`Plus Jakarta Sans`, `600`, `15px`)
  * **Hover:** Background shifts to `Deep Teal (#063641)` with a `2px` upward nudge.
* **Primary Button (On Dark Teal / Footer Surfaces):**
  * **Background:** `Pearl Aqua (#9ED4CB)` | **Text:** `Ink (#182F34)` (`Plus Jakarta Sans`, `600`, `15px`)
  * **Hover:** Background shifts to `Light Aqua (#C8E8E2)`.
* **Secondary / Expressive CTA:**
  * **Background:** `Spicy Paprika (#DF5227)` | **Text:** `Paper (#FFFFFF)` *(or `Warm Canvas #FCFAF6`)*
  * **Hover:** Background shifts to `Deep Paprika (#A6381B)`.
* **Ghost / Outline Button:**
  * **Background:** Transparent | **Border:** `1.5px solid Soft Teal (#477B85)` *(never rely solely on `Soft Border #D6E1DE` for interactive controls)* | **Text:** `Dark Teal (#0B4F5E)`
  * **Hover:** Background fills with `Teal Mist (#E7EFF0)`, border darkens to `Dark Teal (#0B4F5E)`.
* **Inline Text Links:**
  * **Default:** `Deep Paprika (#A6381B)` with a `1.5px` underline in `Soft Paprika (#EDA18A)`.
  * **Hover:** Underline transitions to solid `Spicy Paprika (#DF5227)`.

### B. Tags, Badges & Stickers
* **Category Tag (Default):**
  * **Fill:** `Aqua Wash (#EDF7F4)` | **Border:** `1px solid Light Aqua (#C8E8E2)` | **Text:** `Deep Aqua (#36786D)`
* **Selected / Dark Surface Tag:**
  * **Fill:** `Pearl Aqua (#9ED4CB)` | **Text:** `Ink (#182F34)`
* **Playful Sticker / Callout Badge:**
  * **Fill:** `Golden Orange (#F5A000)` or `Soft Gold (#F8CC78)` | **Text:** `Ink (#182F34)` | **Border:** `1.5px solid Ink (#182F34)` | **Rotation:** `-3deg` to `+3deg` for editorial personality.

### C. Project Cards (Home & Work Index)
To make your portfolio feel curated rather than repetitive, rotate your **Wash** shades across featured project cards:
* **Card 01 (Spotlight Project):** Surface `Golden Wash (#FFF3DC)` | Image Frame `Soft Gold (#F8CC78)` | Project Number `01` in `Althy` colored `Golden Orange (#F5A000)` with a subtle `Burnt Gold (#925B00)` label.
* **Card 02 (Systems / Product Project):** Surface `Aqua Wash (#EDF7F4)` | Image Frame `Light Aqua (#C8E8E2)` | Project Number `02` in `Althy` colored `Deep Aqua (#36786D)`.
* **Card 03 (Brand / Editorial Project):** Surface `Paprika Wash (#FBECE6)` | Image Frame `Soft Paprika (#EDA18A)` | Project Number `03` in `Althy` colored `Spicy Paprika (#DF5227)`.
* **Card Structure:**
  * Border radius: `16px` (outer card), `10px` (inner image frame).
  * Title: `Althy` (`28px–32px`, `Dark Teal #0B4F5E`).
  * Summary: `Plus Jakarta Sans` (`16px`, `Ink #182F34`).
  * Metadata (`Role • Year`): `Plus Jakarta Sans` (`14px`, `Muted Ink #52666A`).

### D. Case Study Editorial Modules
Long case studies win when they are effortless to scan:
1. **Page Canvas:** `Warm Canvas (#FCFAF6)` with a max text column of `680px` (`65ch`) centered inside a `1200px` grid.
2. **At-a-Glance Metadata Bar (Role, Timeline, Team, Impact):**
   * Surface: `Teal Mist (#E7EFF0)` | Dividers: `1px solid Soft Border (#D6E1DE)`
   * Labels: `Muted Ink (#52666A)` | Values: `Ink (#182F34)` (`600 SemiBold`).
3. **Key Insight / Problem Callout Box:**
   * Surface: `Golden Wash (#FFF3DC)` | Left Accent Bar: `4px solid Golden Orange (#F5A000)`
   * Eyebrow: `"KEY INSIGHT"` in `Burnt Gold (#925B00)` | Copy: `Ink (#182F34)`.
4. **Metric / Outcome Highlight Card:**
   * Surface: `Dark Teal (#0B4F5E)` | Stat Number: `Althy` (`56px`) in `Golden Orange (#F5A000)` or `Pearl Aqua (#9ED4CB)` | Caption: `Teal Mist (#E7EFF0)`.
5. **Artifact & Image Framing:**
   * Wrap UI screenshots in a generous container (`32px–48px` padding) using `Teal Mist (#E7EFF0)`, `Light Aqua (#C8E8E2)`, or `Paprika Wash (#FBECE6)` with a `1px solid Soft Border (#D6E1DE)`.

### E. Forms & Interactive Inputs (Contact Section)
* **Surface:** `Paper (#FFFFFF)` (gives crisp separation against `Warm Canvas #FCFAF6` or `Teal Mist #E7EFF0`).
* **Default Border:** `1.5px solid Soft Teal (#477B85)` *(since `Soft Border #D6E1DE` is reserved for decorative dividers only)*.
* **Focus State:** Border `2px solid Dark Teal (#0B4F5E)` + outer focus ring `0 0 0 4px Light Aqua (#C8E8E2)`.
* **Error / Validation State:** Border `2px solid Deep Paprika (#A6381B)` + helper text in `Deep Paprika (#A6381B)` on a `Paprika Wash (#FBECE6)` banner.

---

## 5. Layout & Spatial Tokens

* **Grid:** 12-column CSS Grid (`max-width: 1240px`, `24px` gap on desktop; 4-column, `16px` gap on mobile).
* **Case Study Reading Column:** `680px` max-width for prose; `1040px` for wide image callouts; `1240px` for full-bleed showcases.
* **Border Radius Scale:**
  * `--radius-sm: 6px` (Tags, small badges)
  * `--radius-md: 10px` (Buttons, form inputs, inner image frames)
  * `--radius-lg: 16px` (Project cards, callout panels)
  * `--radius-pill: 9999px` (Navigation bar pill, filter chips, stickers)
* **Decorative Dividers:** `1px solid #D6E1DE` (`Soft Border`) for quiet section rules; `1.5px solid #477B85` (`Soft Teal`) for technical diagrams or architectural grid lines.

---

## 6. Production-Ready CSS Variables (`tokens.css`)

```css
:root {
  /* ==========================================
     1. COLOR TOKENS
     ========================================== */

  /* Neutral Foundation */
  --color-warm-canvas: #FCFAF6;   /* Main page background */
  --color-paper: #FFFFFF;         /* Form fields & elevated surfaces */
  --color-ink: #182F34;           /* Primary body text & text on warm accents */
  --color-muted-ink: #52666A;     /* Captions, metadata, secondary info */
  --color-soft-border: #D6E1DE;   /* Decorative dividers only */

  /* Teal Family (Brand Anchor) */
  --color-deep-teal: #063641;     /* Footer, deep layers, primary btn hover */
  --color-dark-teal: #0B4F5E;     /* Logo, H1/H2, nav, primary buttons */
  --color-soft-teal: #477B85;     /* Decorative lines, control borders, graphics */
  --color-teal-mist: #E7EFF0;     /* Quiet section backgrounds */

  /* Orange Family (Warm Highlights) */
  --color-burnt-gold: #925B00;    /* Accessible warm text on light backgrounds */
  --color-golden-orange: #F5A000; /* Stickers, project numbers, small sparks */
  --color-soft-gold: #F8CC78;     /* Illustration details, warm panels */
  --color-golden-wash: #FFF3DC;   /* Spotlight backgrounds behind selected work */

  /* Paprika Family (Expressive Editorial) */
  --color-deep-paprika: #A6381B;  /* Accent links & small emphasis on light bg */
  --color-spicy-paprika: #DF5227; /* Statement headings, expressive shapes, secondary CTA */
  --color-soft-paprika: #EDA18A;  /* Collage elements & gentle editorial accents */
  --color-paprika-wash: #FBECE6;  /* Warm About-section details & project surfaces */

  /* Aqua Family (Secondary Atmosphere) */
  --color-deep-aqua: #36786D;     /* Supporting illustration details & accents */
  --color-pearl-aqua: #9ED4CB;    /* Buttons on dark teal, tags, selected states */
  --color-light-aqua: #C8E8E2;    /* Larger background accents & image framing */
  --color-aqua-wash: #EDF7F4;     /* Quiet panels & subtle background transitions */

  /* ==========================================
     2. SEMANTIC UI MAPPINGS
     ========================================== */
  --bg-canvas: var(--color-warm-canvas);
  --bg-surface-elevated: var(--color-paper);
  --bg-surface-subtle: var(--color-teal-mist);
  --bg-surface-brand: var(--color-dark-teal);
  --bg-surface-footer: var(--color-deep-teal);

  --text-primary: var(--color-ink);
  --text-heading: var(--color-dark-teal);
  --text-secondary: var(--color-muted-ink);
  --text-accent-warm: var(--color-burnt-gold);
  --text-link: var(--color-deep-paprika);
  --text-on-brand: var(--color-warm-canvas);

  --border-decorative: var(--color-soft-border);
  --border-interactive: var(--color-soft-teal);
  --border-focus: var(--color-dark-teal);

  /* ==========================================
     3. TYPOGRAPHY TOKENS
     ========================================== */
  --font-display: 'Althy', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-accent: 'Poor Richard', 'Instrument Serif', Georgia, serif; /* Optional secondary display */

  --text-hero: clamp(2.625rem, 5vw + 1rem, 4rem);       /* 42px -> 64px */
  --text-h1: clamp(2.125rem, 3.5vw + 1rem, 3rem);       /* 34px -> 48px */
  --text-h2: clamp(1.75rem, 2.5vw + 0.75rem, 2.25rem);  /* 28px -> 36px */
  --text-h3: clamp(1.25rem, 1.5vw + 0.75rem, 1.5rem);   /* 20px -> 24px */
  --text-body-lg: clamp(1.125rem, 0.5vw + 1rem, 1.25rem);
  --text-body: 1.0625rem;                               /* 17px optimal case study size */
  --text-caption: 0.875rem;                             /* 14px */
  --text-eyebrow: 0.75rem;                              /* 12px */

  /* ==========================================
     4. RADII & ELEVATION
     ========================================== */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 9999px;
}
```