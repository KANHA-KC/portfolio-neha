import WorkGallery from "@/components/work/WorkGallery";
import JsonLd from "@/components/JsonLd";
import { getCategories, getProfile, getProjects } from "@/content";
import { collectionSchema, clip, SITE_OG_IMAGES } from "@/lib/seo";

export async function generateMetadata() {
  const p = await getProfile();
  const description = clip(`Portfolio of ${p.name}: logo design, brand identity, illustration, packaging, marketing and AI video work for Indian and global brands.`);
  return {
    title: "Work — Logo, Brand Identity & Graphic Design Portfolio",
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
        <h1 className="page-title">
          The <em>work</em>
        </h1>
        <p className="page-lede">
          Logos, brand identities, packaging, marketing collateral, illustrations, and AI videos. Pick a lens below — or
          just wander.
        </p>
      </header>

      <WorkGallery projects={projects} categories={categories} />
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
