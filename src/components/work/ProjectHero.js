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
      <div className={`case-hero-top${num ? "" : " case-hero-top--plain"}`}>
        {num && <span className="case-num">{num}</span>}
        <div>
          <p className="eyebrow eyebrow--ink">
            {p.workedOn || Array.from(new Set([p.categoryTitle, ...p.tags])).filter(Boolean).join(" · ")}
          </p>
          <h1 className="case-title">{p.title}</h1>
          {(p.brief || p.subtitle || p.summary) && (
            <p className="case-sub">{p.brief || p.subtitle || p.summary}</p>
          )}
        </div>
      </div>
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
