import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import Pinboard from "@/components/home/Pinboard";
import Marquee from "@/components/Marquee";
import { getCategories, getProfile, getProjects, getServices } from "@/content";
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
  const [profile, featured, categories, services] = await Promise.all([
    getProfile(),
    getProjects({ featured: true }),
    getCategories(),
    getServices()
  ]);

  return (
    <>
      <Hero profile={profile} />
      <div className="tilt-band">
        <Marquee
          items={
            profile.marquee?.length
              ? profile.marquee
              : [
                  "Logo Design",
                  "Brand Identity",
                  "Corporate Collateral",
                  "Social Media Graphics",
                  "Print & Digital Media",
                  "Packaging & Labels",
                  "Presentation Design",
                  "Signage & Spatial Visuals"
                ]
          }
          sep="·"
        />
      </div>
      <Manifesto text={profile.manifesto} />
      <SelectedWork projects={featured} categories={categories} />
      <AboutSnapshot profile={profile} services={services} />
      <Pinboard services={services} />
    </>
  );
}
