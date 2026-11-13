import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import { categoryPath, projectPath } from "@/lib/seo";

export default function RelatedWork({ projects, category }) {
  if (!projects.length) return null;
  return (
    <section className="related" aria-labelledby="related-title">
      <div className="related-head">
        <h2 id="related-title" className="section-title">
          More <em>work</em>
        </h2>
        <Link href={categoryPath(category.category)} className="link-underline">
          All {category.categoryTitle.toLowerCase()} projects →
        </Link>
      </div>
      <ul className="related-list">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={projectPath(p.slug)} className="related-card" data-cursor="view">
              <ProjectVisual project={p} card aspect="landscape" sizes="(max-width: 760px) 100vw, 33vw" />
              <span className="gcard-cat">
                <span aria-hidden="true">{p.categoryIcon}</span> {p.categoryTitle}
              </span>
              <h3 className="gcard-title">{p.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
