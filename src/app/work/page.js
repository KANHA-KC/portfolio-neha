import Link from "next/link";
import WorkGallery from "@/components/work/WorkGallery";
import { getCategories, getProjects } from "@/content";

export const metadata = {
  title: "Work",
  description: "UX case studies, logo design, branding, packaging and illustration by Neha Ondhia."
};

export default async function WorkPage() {
  const [projects, categories] = await Promise.all([getProjects(), getCategories()]);

  return (
    <section className="page work-page">
      <header className="page-head work-head">
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

      <aside className="nda-note">
        <span className="sticker sticker--gold">psst</span>
        <p>
          Some of my favourite work lives behind NDAs. Happy to walk you through it on a call —{" "}
          <Link href="/contact" className="link-underline">just ask</Link>.
        </p>
      </aside>
    </section>
  );
}
