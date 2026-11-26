import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import ProjectHero from "@/components/work/ProjectHero";
import NextProject from "@/components/work/NextProject";
import Gallery from "@/components/work/Gallery";
import Reels from "@/components/work/Reels";

// Visual project page for logos, branding, print and illustration: cover → brief → gallery mosaic.
export default function Showcase({ project: p, next }) {
  return (
    <article className="case showcase" style={{ "--wash": p.palette.wash, "--frame": p.palette.frame, "--ink": p.palette.ink, "--spark": p.palette.spark }}>
      <ProjectHero
        project={p}
        meta={[
          ["Sector", p.sector],
          ["Project Type", p.projectType],
          ["Year", p.year],
          ["Role", p.role]
        ]}
      />

      {/* Not wrapped in <Reveal>: this is the page's largest image, so it must paint immediately. */}
      <figure className="case-cover showcase-cover">
        <ProjectVisual project={p} sizes="(max-width: 1200px) 100vw, 1200px" preload />
        {p.coverCaption && p.cover && <figcaption className="hand cover-caption">{p.coverCaption}</figcaption>}
      </figure>

      {p.videos.length > 0 && <Reels videos={p.videos} title={p.title} />}
      {p.gallery.length > 0 && <Gallery project={p} />}

      <NextProject next={next} />
    </article>
  );
}
