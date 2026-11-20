"use client";

import { useState } from "react";

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
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

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
      <button
        type="button"
        className="top-banner-close"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
          <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
        </svg>
      </button>
    </aside>
  );
}
