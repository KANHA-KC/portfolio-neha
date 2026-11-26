// The logo files are transparent PNGs used as CSS masks, so the mark can take any brand colour.
// `gradient` paints the mark in the brand's neon → cyan gradient (for dark/teal backgrounds).
// The vector original is /brand/mark.svg; the favicon/app icons are /brand/icon-*.png.
const V = "?v=2026-11b"; // bump when the files change so browsers drop the old mark
const marks = {
  monogram: { src: `/brand/monogram.png${V}`, ratio: 404 / 256 },
  wordmark: { src: "/brand/wordmark.png", ratio: 249 / 127 },
  full: { src: `/brand/logo-full.png${V}`, ratio: 1009 / 256 }
};
export const LOGO_GRADIENT = "linear-gradient(90deg, #cada49, #c5f6fc)";

export default function Logo({ variant = "monogram", height = 32, color, gradient = false, className = "", label }) {
  const m = marks[variant];
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`logo-mask ${gradient ? "is-gradient" : ""} ${className}`}
      style={{
        "--logo-src": `url(${m.src})`,
        width: typeof height === "number" ? height * m.ratio : `calc(${height} * ${m.ratio})`,
        height,
        color
      }}
    />
  );
}
