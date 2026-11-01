import Breadcrumbs from "@/components/Breadcrumbs";
import { categoryPath, projectPath } from "@/lib/seo";

export default function ProjectHero({ project: p, num, meta }) {
  return (
    <header className="case-hero">
      <Breadcrumbs
        className="case-crumbs"
        items={[
          { name: "Work", href: "/work" },
          { name: p.categoryTitle, href: categoryPath(p.category) },
          { name: p.title, href: projectPath(p.slug) }
        ]}
      />
      <div className="case-hero-top">
        <span className="case-num">{num}</span>
        <div>
          <p className="eyebrow eyebrow--ink">
            {p.categoryIcon} {[p.categoryTitle, ...p.tags].join(" · ")}
          </p>
          <h1 className="case-title">{p.title}</h1>
          {p.subtitle && <p className="case-sub">{p.subtitle}</p>}
        </div>
      </div>
      {p.note && (
        <span className="sticker case-sticker" style={{ background: p.palette.frame }}>{p.note}</span>
      )}
      <dl className="case-meta">
        {meta
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
    </header>
  );
}
