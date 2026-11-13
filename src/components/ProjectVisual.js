import Media from "@/components/Media";
import ProjectCover from "@/components/ProjectCover";

// A project's main visual: the uploaded image → a built-in illustration → a placeholder card.
// `card` (Home, Work, related projects) uses the thumbnail; the project page uses the cover.
export default function ProjectVisual({ project, card = false, aspect, sizes, preload, className = "" }) {
  const img = card ? project.thumbnail : project.cover;
  if (!img && project.illustration) return <ProjectCover project={project} className={className} />;
  return (
    <Media
      image={img}
      aspect={aspect || project.aspect}
      label={project.title}
      icon={project.categoryIcon}
      palette={project.palette}
      sizes={sizes}
      preload={preload}
      className={className}
    />
  );
}
