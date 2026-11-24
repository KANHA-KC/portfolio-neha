import Hero from "@/components/home/Hero";
import HeroIntro from "@/components/home/HeroIntro";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import Testimonials from "@/components/home/Testimonials";
import { getCategories, getProfile, getProjects, getTestimonials } from "@/content";
import { clip } from "@/lib/seo";

export async function generateMetadata() {
  const p = await getProfile();
  const description = clip(`${p.name} — ${p.role} in ${p.location}. ${p.headline} Logo design, brand identity, packaging and UX case studies.`);
  return {
    description,
    alternates: { canonical: "/" },
    openGraph: { description, url: "/" },
    twitter: { card: "summary_large_image", description }
  };
}

export default async function HomePage() {
  const [profile, featured, categories, testimonials] = await Promise.all([
    getProfile(),
    getProjects({ featured: true }),
    getCategories(),
    getTestimonials()
  ]);

  return (
    <>
      <Hero profile={profile} />
      <HeroIntro profile={profile} />
      <Manifesto text={profile.manifesto} />
      <SelectedWork projects={featured} categories={categories} />
      <Testimonials items={testimonials} />
    </>
  );
}
