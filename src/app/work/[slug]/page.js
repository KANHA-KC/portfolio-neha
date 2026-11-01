import { Suspense } from "react";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/work/CaseStudy";
import Showcase from "@/components/work/Showcase";
import RelatedWork from "@/components/work/RelatedWork";
import JsonLd from "@/components/JsonLd";
import { getProfile, getProject, getProjects } from "@/content";
import { projectPath, projectSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [found, profile] = await Promise.all([getProject(slug), getProfile()]);
  if (!found) return { title: "Project not found", robots: { index: false } };
  const { project: p } = found;
  const title = p.kind === "case-study" ? `${p.title} — UX Case Study` : `${p.title} — ${p.categoryTitle}`;
  const description = p.summary || `${p.categoryTitle} project by ${profile.name}.`;
  const images = p.cover?.src ? [{ url: p.cover.src, alt: p.cover.alt || p.title }] : undefined;
  return {
    title,
    description,
    keywords: [p.categoryTitle, ...p.tags, p.client, profile.name].filter(Boolean),
    alternates: { canonical: projectPath(slug) },
    openGraph: { title, description, url: projectPath(slug), type: "article", images },
    twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) }
  };
}

export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<div className="case-hero case-hero--loading" aria-busy="true" />}>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }) {
  const { slug } = await params;
  const found = await getProject(slug);
  if (!found) notFound();
  const { project, next } = found;

  // Internal links: same discipline first, then other featured work.
  const all = await getProjects();
  const related = [
    ...all.filter((p) => p.category === project.category && p.slug !== slug),
    ...all.filter((p) => p.featured && p.category !== project.category)
  ].slice(0, 3);

  const View = project.kind === "case-study" ? CaseStudy : Showcase;
  return (
    <>
      <View project={project} next={next} />
      <RelatedWork projects={related} category={project} />
      <JsonLd data={projectSchema(project)} />
    </>
  );
}
