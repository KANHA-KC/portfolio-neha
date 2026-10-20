import { Suspense } from "react";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/work/CaseStudy";
import Showcase from "@/components/work/Showcase";
import { getProject, getProjects } from "@/content";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getProject(slug);
  if (!found) return { title: "Project not found" };
  const { project } = found;
  return {
    title: project.kind === "case-study" ? `${project.title} — Case study` : project.title,
    description: project.summary,
    openGraph: project.cover ? { images: [project.cover.src] } : undefined
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
  const View = found.project.kind === "case-study" ? CaseStudy : Showcase;
  return <View project={found.project} next={found.next} />;
}
