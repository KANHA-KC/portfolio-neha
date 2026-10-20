import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";
import Reveal from "@/components/Reveal";
import StatCount from "@/components/work/StatCount";
import { projectsData } from "@/data/portfolioData";

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = projectsData.find((x) => x.id === id);
  if (!p) return { title: "Project not found" };
  return { title: `${p.title} — Case study`, description: p.desc };
}

export default function CaseStudyPage({ params }) {
  return (
    <Suspense fallback={<div className="case-hero case-hero--loading" aria-busy="true" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }) {
  const { id } = await params;
  const index = projectsData.findIndex((x) => x.id === id);
  if (index === -1) notFound();
  const p = projectsData[index];
  const next = projectsData[(index + 1) % projectsData.length];

  return (
    <article
      className="case"
      style={{ "--wash": p.palette.wash, "--frame": p.palette.frame, "--ink": p.palette.ink, "--spark": p.palette.spark }}
    >
      <header className="case-hero">
        <Link href="/work" className="case-back">← All work</Link>
        <div className="case-hero-top">
          <span className="case-num">{p.num}</span>
          <div>
            <p className="eyebrow eyebrow--ink">{p.tag} · {p.category}</p>
            <h1 className="case-title">{p.title}</h1>
            <p className="case-sub">{p.subtitle}</p>
          </div>
        </div>
        <span className="sticker case-sticker" style={{ background: p.palette.frame }}>{p.note}</span>

        <dl className="case-meta">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Client</dt><dd>{p.client}</dd></div>
          <div><dt>Timeline</dt><dd>{p.timeline}</dd></div>
          <div><dt>Platform</dt><dd>{p.category.split(" · ")[1]}</dd></div>
        </dl>
      </header>

      <Reveal className="case-cover">
        <ProjectCover project={p} />
      </Reveal>

      <section className="case-block">
        <Reveal className="case-label"><span>01</span> The problem</Reveal>
        <Reveal as="p" className="case-lead" delay={80}>{p.challenge}</Reveal>
      </section>

      <section className="case-insight">
        <Reveal className="insight-card">
          <p className="eyebrow eyebrow--ink">In one line</p>
          <p>{p.desc}</p>
        </Reveal>
      </section>

      <section className="case-block">
        <Reveal className="case-label"><span>02</span> How I got there</Reveal>
        <ol className="process">
          {p.process.map((s, i) => (
            <Reveal as="li" key={s.k} className="process-step" delay={i * 90}>
              <span className="process-k">{s.k}</span>
              <span className="process-v">{s.v}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="case-block">
        <Reveal className="case-label"><span>03</span> The solution</Reveal>
        <Reveal as="p" className="case-lead" delay={80}>{p.solution}</Reveal>
      </section>

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

      <section className="case-block">
        <Reveal className="case-label"><span>04</span> What I delivered</Reveal>
        <ul className="deliverables">
          {p.deliverables.map((d, i) => (
            <Reveal as="li" key={d} delay={i * 70}>
              <span aria-hidden="true">✦</span> {d}
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal as="blockquote" className="case-quote">
        <span className="quote-mark" aria-hidden="true">“</span>
        <p>{p.learnings}</p>
        <cite className="hand">— what this project taught me</cite>
      </Reveal>

      <Link
        href={`/work/${next.id}`}
        className="case-next"
        data-cursor="next"
        style={{ "--next-wash": next.palette.wash, "--next-spark": next.palette.spark }}
      >
        <span className="eyebrow">Next case study</span>
        <span className="case-next-title">{next.title}</span>
        <span className="case-next-arrow" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
