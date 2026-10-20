import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import ProjectHero from "@/components/work/ProjectHero";
import NextProject from "@/components/work/NextProject";
import Gallery from "@/components/work/Gallery";

// Visual project page for logos, branding, print and illustration: cover → brief → gallery mosaic.
export default function Showcase({ project: p, next }) {
  return (
    <article className="case showcase" style={{ "--wash": p.palette.wash, "--frame": p.palette.frame, "--ink": p.palette.ink, "--spark": p.palette.spark }}>
      <ProjectHero
        project={p}
        num={p.categoryIcon}
        meta={[["Client", p.client], ["Year", p.year], ["Role", p.role], ["Discipline", p.categoryTitle]]}
      />

      <Reveal className="case-cover showcase-cover">
        <ProjectVisual project={p} sizes="(max-width: 1200px) 100vw, 1200px" preload />
      </Reveal>

      {(p.brief || p.summary) && (
        <section className="case-block">
          <Reveal className="case-label"><span>✎</span> The brief</Reveal>
          <div className="brief">
            {(p.brief || p.summary).split("\n").filter(Boolean).map((para, i) => (
              <Reveal as="p" key={i} className={i === 0 ? "case-lead" : "brief-p"} delay={80}>{para}</Reveal>
            ))}
          </div>
        </section>
      )}

      {p.gallery.length > 0 && <Gallery project={p} />}

      <NextProject next={next} />
    </article>
  );
}
