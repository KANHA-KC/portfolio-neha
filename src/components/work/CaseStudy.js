import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import StatCount from "@/components/work/StatCount";
import ProjectHero from "@/components/work/ProjectHero";
import NextProject from "@/components/work/NextProject";
import Gallery from "@/components/work/Gallery";

// Long-form UX case study. Every section is optional — empty CMS fields simply don't render.
export default function CaseStudy({ project: p, next }) {
  let n = 0;
  const label = (text) => (
    <Reveal className="case-label">
      <span>{String(++n).padStart(2, "0")}</span> {text}
    </Reveal>
  );

  return (
    <article className="case" style={{ "--wash": p.palette.wash, "--frame": p.palette.frame, "--ink": p.palette.ink, "--spark": p.palette.spark }}>
      <ProjectHero
        project={p}
        num={String(p.order).padStart(2, "0")}
        meta={[["Role", p.role], ["Client", p.client], ["Timeline", p.timeline], ["Platform", p.platform]]}
      />

      <Reveal className="case-cover">
        <ProjectVisual project={p} sizes="(max-width: 1200px) 100vw, 1200px" preload />
      </Reveal>

      {p.challenge && (
        <section className="case-block">
          {label("The problem")}
          <Reveal as="p" className="case-lead" delay={80}>{p.challenge}</Reveal>
        </section>
      )}

      {p.summary && (
        <section className="case-insight">
          <Reveal className="insight-card">
            <p className="eyebrow eyebrow--ink">In one line</p>
            <p>{p.summary}</p>
          </Reveal>
        </section>
      )}

      {p.process.length > 0 && (
        <section className="case-block">
          {label("How I got there")}
          <ol className="process">
            {p.process.map((s, i) => (
              <Reveal as="li" key={s.k + i} className="process-step" delay={i * 90}>
                <span className="process-k">{s.k}</span>
                <span className="process-v">{s.v}</span>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {p.solution && (
        <section className="case-block">
          {label("The solution")}
          <Reveal as="p" className="case-lead" delay={80}>{p.solution}</Reveal>
        </section>
      )}

      {p.gallery.length > 0 && <Gallery project={p} />}

      {p.stats.length > 0 && (
        <section className="case-stats" aria-label="Outcomes">
          <p className="eyebrow eyebrow--light">The outcome</p>
          <div className="stats-row">
            {p.stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-val"><StatCount value={s.val} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.deliverables.length > 0 && (
        <section className="case-block">
          {label("What I delivered")}
          <ul className="deliverables">
            {p.deliverables.map((d, i) => (
              <Reveal as="li" key={d} delay={i * 70}>
                <span aria-hidden="true">✦</span> {d}
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {p.learnings && (
        <Reveal as="blockquote" className="case-quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <p>{p.learnings}</p>
          <cite className="hand">— what this project taught me</cite>
        </Reveal>
      )}

      <NextProject next={next} />
    </article>
  );
}
