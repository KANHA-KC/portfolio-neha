import Link from "next/link";
import { categoryPath } from "@/lib/seo";

// Crawlable links to every discipline page (the in-page filters are buttons, which search engines don't follow).
export default function DisciplineLinks({ categories, current, label = "Browse by discipline" }) {
  return (
    <nav className="disc-links" aria-label={label}>
      <span className="disc-links-label">{label}</span>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            {c.slug === current ? (
              <span className="disc-chip is-on" aria-current="page">
                <span aria-hidden="true">{c.icon}</span> {c.title}
              </span>
            ) : (
              <Link href={categoryPath(c.slug)} className="disc-chip">
                <span aria-hidden="true">{c.icon}</span> {c.title} <sup>{c.count}</sup>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
