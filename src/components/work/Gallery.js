import Reveal from "@/components/Reveal";
import Media from "@/components/Media";

// Editorial mosaic of a project's gallery images. Tile size follows each image's format.
export default function Gallery({ project }) {
  return (
    <section className="mosaic-wrap" aria-label="Project images">
      <ul className="mosaic">
        {project.gallery.map((g, i) => (
          <Reveal as="li" key={i} className={`mosaic-item mosaic-item--${g.aspect}`} delay={(i % 3) * 80}>
            <figure>
              <Media
                image={g.image}
                aspect={g.aspect}
                label={g.caption}
                icon={project.categoryIcon}
                palette={project.palette}
                sizes="(max-width: 760px) 100vw, 60vw"
              />
              {g.caption && g.image && <figcaption className="hand">{g.caption}</figcaption>}
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
