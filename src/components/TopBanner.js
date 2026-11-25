const ITEMS = [
  "Logo Design",
  "Brand Identity",
  "Corporate Collateral",
  "Social Media Graphics",
  "Print & Digital Media",
  "Packaging & Labels",
  "Presentation Design",
  "Signage & Spatial Visuals"
];

export default function TopBanner() {
  return (
    <aside className="top-banner" aria-label="Services overview">
      <div className="top-banner-marquee">
        <div className="top-banner-track">
          {[0, 1, 2, 3].map((setIndex) => (
            <div key={setIndex} className="top-banner-row" aria-hidden={setIndex > 0 ? "true" : undefined}>
              {ITEMS.map((item, idx) => (
                <span key={idx} className="top-banner-item">
                  <span className="top-banner-text">{item}</span>
                  <span className="top-banner-dot" aria-hidden="true">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
