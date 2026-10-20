import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import Pinboard from "@/components/home/Pinboard";
import Experience from "@/components/home/Experience";
import Marquee from "@/components/Marquee";
import { getCategories, getExperience, getProfile, getProjects, getServices } from "@/content";

export default async function HomePage() {
  const [profile, featured, categories, services, experience] = await Promise.all([
    getProfile(),
    getProjects({ featured: true }),
    getCategories(),
    getServices(),
    getExperience()
  ]);

  return (
    <>
      <Hero profile={profile} />
      <div className="tilt-band">
        <Marquee items={[...services.map((s) => s.title), "Workshops"]} />
      </div>
      <Manifesto text={profile.manifesto} />
      <SelectedWork projects={featured} categories={categories} />
      <AboutSnapshot profile={profile} services={services} />
      <Pinboard services={services} />
      <Experience items={experience} />
    </>
  );
}
