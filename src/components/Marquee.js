// Infinite CSS marquee. `items` repeat twice so the loop is seamless.
export default function Marquee({ items, className = "", reverse = false }) {
  const row = (
    <div className="marquee-row">
      {items.map((t, i) => (
        <span key={i} className="marquee-item">
          {t}
          <span className="marquee-sep" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${reverse ? "marquee--rev" : ""} ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
