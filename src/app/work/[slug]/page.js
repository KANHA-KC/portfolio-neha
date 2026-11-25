import { Suspense } from "react";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/work/CaseStudy";
import Showcase from "@/components/work/Showcase";
import JsonLd from "@/components/JsonLd";
import { getProfile, getProject, getProjects } from "@/content";
import { clip, projectPath, projectSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [found, profile] = await Promise.all([getProject(slug), getProfile()]);
  if (!found) return { title: "Project not found", robots: { index: false } };
  const { project: p } = found;
  const title = p.kind === "case-study" ? `${p.title} — UX Case Study` : `${p.title} — ${p.categoryTitle}`;
  // Short summaries get padded with context so every project has a useful, unique description.
  const context = `${p.title}: ${p.categoryTitle.toLowerCase()} work by ${profile.name}, ${profile.role.toLowerCase()} in ${profile.location}.`;
  const description = clip(p.summary && p.summary.length >= 90 ? p.summary : [p.summary, context].filter(Boolean).join(" "));
  return {
    title,
    description,
    keywords: [p.categoryTitle, ...p.tags, p.client, profile.name].filter(Boolean),
    alternates: { canonical: projectPath(slug) },
    // Share image comes from ./opengraph-image.js (the cover, or a branded title card).
    openGraph: { title, description, url: projectPath(slug), type: "article" },
    twitter: { card: "summary_large_image", title, description }
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

  const View = project.kind === "case-study" ? CaseStudy : Showcase;
  return (
    <>
      <View project={project} next={next} />
      <JsonLd data={projectSchema(project)} />
    </>
  );
}
