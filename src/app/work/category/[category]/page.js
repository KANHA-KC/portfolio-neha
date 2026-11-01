import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkGallery from "@/components/work/WorkGallery";
import DisciplineLinks from "@/components/work/DisciplineLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getCategories, getProfile, getProjects } from "@/content";
import { categoryPath, collectionSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ category: c.slug }));
}

async function load(slug) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  const [projects, profile] = await Promise.all([getProjects({ category: slug }), getProfile()]);
  return { category, categories, projects, profile };
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const data = await load(slug);
  if (!data) return { title: "Not found", robots: { index: false } };
  const { category, profile } = data;
  const title = `${category.title} Portfolio`;
  const description = `${category.title} by ${profile.name}, ${profile.role.toLowerCase()} based in ${profile.location}. ${category.description}`;
  return {
    title,
    description,
    alternates: { canonical: categoryPath(slug) },
    openGraph: { title: `${title} — ${profile.name}`, description, url: categoryPath(slug) }
  };
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<div className="page" aria-busy="true" />}>
      <Category params={params} />
    </Suspense>
  );
}

async function Category({ params }) {
  const { category: slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const { category, categories, projects, profile } = data;

  return (
    <section className="page work-page">
      <header className="page-head work-head">
        <Breadcrumbs items={[{ name: "Work", href: "/work" }, { name: category.title, href: categoryPath(slug) }]} />
        <p className="eyebrow">
          {category.icon} {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
        <h1 className="page-title">
          {category.title}
          <sup>({String(projects.length).padStart(2, "0")})</sup>
        </h1>
        <p className="page-lede">
          {category.description} Selected {category.title.toLowerCase()} work by {profile.name}, {profile.location}.
        </p>
      </header>

      <WorkGallery projects={projects} categories={[]} showFilters={false} />

      <div className="cat-foot">
        <DisciplineLinks categories={categories} current={slug} label="More disciplines" />
        <p>
          Want something like this for your brand?{" "}
          <Link href="/contact" className="link-underline">Let’s talk</Link> or{" "}
          <Link href="/work" className="link-underline">see all work</Link>.
        </p>
      </div>

      <JsonLd
        data={collectionSchema({
          name: `${category.title} — ${profile.name}`,
          description: category.description,
          path: categoryPath(slug),
          projects
        })}
      />
    </section>
  );
}
