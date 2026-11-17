import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import LogoMarquee from "@/components/home/LogoMarquee";
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
    twitter: { description }
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
      <section className="logo-band" aria-labelledby="brands-heading">
        <div className="logo-band-head">
          <p className="eyebrow">
            <span className="eyebrow-num">✦</span> Brands I’ve worked on
          </p>
          <h2 id="brands-heading" className="logo-band-title">
            <span className="sr-only">Brands I’ve worked on, </span>
            through <em>Schbang</em>, <em>Webenza</em> &amp; freelance.
          </h2>
        </div>
        <LogoMarquee />
      </section>
      <Manifesto text={profile.manifesto} />
      <SelectedWork projects={featured} categories={categories} />
      <Testimonials items={testimonials} />
    </>
  );
}
