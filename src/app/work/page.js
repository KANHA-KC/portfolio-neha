import Link from "next/link";
import WorkGallery from "@/components/work/WorkGallery";
import DisciplineLinks from "@/components/work/DisciplineLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getCategories, getProfile, getProjects } from "@/content";
import { collectionSchema, clip, SITE_OG_IMAGES } from "@/lib/seo";

export async function generateMetadata() {
  const p = await getProfile();
  const description = clip(`Portfolio of ${p.name}: UX case studies, logo design, brand identity, packaging and illustration work for Indian and global brands.`);
  return {
    title: "Work — UX, Logo & Brand Design Portfolio",
    description,
    alternates: { canonical: "/work" },
    openGraph: { title: `Work — ${p.name}`, description, url: "/work", images: SITE_OG_IMAGES }
  };
}

export default async function WorkPage() {
  const [projects, categories, profile] = await Promise.all([getProjects(), getCategories(), getProfile()]);

  return (
    <section className="page work-page">
      <header className="page-head work-head">
        <Breadcrumbs items={[{ name: "Work", href: "/work" }]} />
        <p className="eyebrow">Index — {projects.length} projects across {categories.length} disciplines</p>
        <h1 className="page-title">
          The <em>work</em>
          <sup>({String(projects.length).padStart(2, "0")})</sup>
        </h1>
        <p className="page-lede">
          Research-led product case studies alongside logos, identities and things you can hold. Pick a lens below — or
          just wander.
        </p>
        <span className="hand page-hand">tap a sticker to filter ↓</span>
      </header>

      <WorkGallery projects={projects} categories={categories} />

      <div className="cat-foot">
        <DisciplineLinks categories={categories} />
      </div>

      <aside className="nda-note">
        <span className="sticker sticker--gold">psst</span>
        <p>
          Some of my favourite work lives behind NDAs. Happy to walk you through it on a call —{" "}
          <Link href="/contact" className="link-underline">just ask</Link>.
        </p>
      </aside>
      <JsonLd
        data={collectionSchema({
          name: `Work — ${profile.name}`,
          description: "UX case studies, logo design, branding, packaging and illustration.",
          path: "/work",
          projects
        })}
      />
    </section>
  );
}
