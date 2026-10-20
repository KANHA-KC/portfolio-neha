// The logo files are transparent PNGs used as CSS masks, so the mark can take any brand colour.
const marks = {
  monogram: { src: "/brand/monogram.png", ratio: 227 / 127 },
  wordmark: { src: "/brand/wordmark.png", ratio: 249 / 127 },
  full: { src: "/brand/logo-full.png", ratio: 511 / 127 }
};

export default function Logo({ variant = "monogram", height = 32, color, className = "", label }) {
  const m = marks[variant];
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`logo-mask ${className}`}
      style={{
        "--logo-src": `url(${m.src})`,
        width: typeof height === "number" ? height * m.ratio : `calc(${height} * ${m.ratio})`,
        height,
        color
      }}
    />
  );
}
