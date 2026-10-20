import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import Pinboard from "@/components/home/Pinboard";
import Experience from "@/components/home/Experience";
import Marquee from "@/components/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="tilt-band">
        <Marquee items={["UX Research", "Product Design", "Design Systems", "Accessibility", "Interaction", "Prototyping", "Workshops"]} />
      </div>
      <Manifesto />
      <SelectedWork />
      <Pinboard />
      <Experience />
    </>
  );
}
