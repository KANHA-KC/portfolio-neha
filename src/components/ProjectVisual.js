import Media from "@/components/Media";
import ProjectCover from "@/components/ProjectCover";

// A project's main visual: the uploaded cover → a built-in illustration → a placeholder card.
export default function ProjectVisual({ project, aspect, sizes, preload, className = "" }) {
  if (!project.cover && project.illustration) return <ProjectCover project={project} className={className} />;
  return (
    <Media
      image={project.cover}
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
