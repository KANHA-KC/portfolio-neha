// Is the painted surface at a screen point dark? Used by the custom cursor (neon on dark, teal on light)
// and the nav bar (deep-teal glass over dark sections). Reads the real colours under the point, so new
// sections need no list. `ignore` skips matching layers (e.g. the element doing the asking).
// Colours from a computed style string: rgb()/rgba() and color(srgb …), the forms browsers report.
const colorsIn = (str) => {
  const out = [];
  for (const m of String(str).matchAll(/rgba?\(([^)]+)\)/g)) {
    const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    out.push({ r, g, b, a });
  }
  for (const m of String(str).matchAll(/color\(srgb ([^)]+)\)/g)) {
    const [r, g, b, a = 1] = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
    out.push({ r: r * 255, g: g * 255, b: b * 255, a });
  }
  return out;
};
const luminance = ({ r, g, b }) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const SKIP = new Set(["IMG", "VIDEO", "CANVAS", "IFRAME", "PICTURE"]);
// Teal (#056e7f) is ~0.13, the neon (#c7db0a) ~0.65, the page canvas ~0.9; 0.35 sits cleanly between.
const DARK_BELOW = 0.35;
export function surfaceIsDark(x, y, ignore = ".tc") {
  if (typeof document === "undefined") return false;
  for (const el of document.elementsFromPoint(x, y)) {
    if (ignore && el.closest(ignore)) continue;
    const forced = el.dataset?.surface;
    if (forced === "light") return false;
    if (forced === "dark") return true;
    if (SKIP.has(el.tagName)) continue; // photos/videos: decide by what they sit on
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || Number(cs.opacity) < 0.3) continue;
    // Filled SVG shapes (badges, discs, the logo) count as surfaces too.
    const paints = el instanceof SVGGeometryElement ? colorsIn(cs.fill) : [];
    if (cs.backgroundImage !== "none" && cs.backgroundImage.includes("gradient")) paints.push(...colorsIn(cs.backgroundImage));
    paints.push(...colorsIn(cs.backgroundColor));
    const solid = paints.filter((c) => c.a >= 0.5);
    if (solid.length) return solid.reduce((sum, c) => sum + luminance(c), 0) / solid.length < DARK_BELOW;
  }
  return false; // nothing painted: the light page canvas
}
