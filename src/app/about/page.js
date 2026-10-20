import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Experience from "@/components/home/Experience";
import { loves } from "@/data/portfolioData";

export const metadata = {
  title: "About",
  description: "Neha Ondhia is a UX & product designer in Mumbai who designs calm, accessible products — research first, pixels second."
};

const principles = [
  { t: "Listen before drawing", d: "The first week of any project is mostly questions. The best design decisions are hiding in what people already told you." },
  { t: "Accessible by default", d: "Contrast, focus states and plain language aren’t a final checklist — they shape the very first sketch." },
  { t: "Systems over screens", d: "I design the rules behind the pixels so teams can keep shipping good work long after I’ve left the room." }
];

const tints = ["#FFF3DC", "#EDF7F4", "#FBECE6", "#E7EFF0", "#C8E8E2", "#F8CC78", "#EDA18A", "#9ED4CB"];

export default function AboutPage() {
  return (
    <div className="page about">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About</p>
          <h1 className="page-title about-title">
            Hello, I’m <em>Neha</em>
            <span className="about-wave" aria-hidden="true">✿</span>
          </h1>
          <p className="page-lede">
            I’m a UX & product designer based in Mumbai. I’ve spent the last few years helping fintech, healthcare and
            enterprise teams turn tangled, high-stakes flows into products that feel calm and obvious.
          </p>
          <span className="hand about-hand">currently: consulting independently & always sketching</span>
        </div>

        <div className="about-photo">
          <span className="tape tape--tl" />
          <span className="tape tape--tr" />
          <div className="about-photo-bg" aria-hidden="true" />
          <Image
            src="/brand/neha-cutout.webp"
            alt="Neha Ondhia smiling, wearing a camel coat, with long dark hair dipped in teal"
            width={653}
            height={870}
            preload
            sizes="(max-width: 760px) 80vw, 36vw"
          />
          <span className="sticker sticker--gold about-sticker-a">hi there!</span>
          <span className="sticker sticker--aqua about-sticker-b">the teal is on brand</span>
        </div>
      </section>

      <section className="about-story">
        <Reveal as="p" className="story-big">
          I started out as an <em>interaction designer</em> obsessing over the tiny moments between taps. Somewhere along
          the way I fell for the messy, human side — interviews, card sorts, the moment someone says
          <span className="hand"> “oh, that’s what I wanted!”</span>
        </Reveal>
        <div className="story-cols">
          <Reveal as="p" delay={80}>
            Today I lead projects end to end: framing the problem with stakeholders, running research, prototyping in
            Figma and code, and building the design systems that keep it all consistent. I’m happiest in the gap between
            design and engineering, where good intentions usually get lost.
          </Reveal>
          <Reveal as="p" delay={160}>
            Outside of work you’ll find me hunting for hand-lettered shop signs, filling notebooks with diagrams nobody
            asked for, and mentoring younger designers who are just finding their voice.
          </Reveal>
        </div>
      </section>

      <section className="principles" aria-labelledby="pr-title">
        <header className="section-head">
          <p className="eyebrow"><span className="eyebrow-num">(✦)</span> How I work</p>
          <h2 id="pr-title" className="section-title">Three little <em>rules</em></h2>
        </header>
        <div className="principle-list">
          {principles.map((p, i) => (
            <Reveal key={p.t} className={`principle principle--${i + 1}`} delay={i * 100}>
              <span className="principle-n">0{i + 1}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="tilt-band tilt-band--paprika">
        <Marquee reverse items={["Research", "Empathy", "Systems", "Clarity", "Kindness", "Craft"]} />
      </div>

      <section className="loves" aria-labelledby="loves-title">
        <h2 id="loves-title" className="section-title">
          Things I <em>love</em>
          <span className="hand section-hand">in no particular order</span>
        </h2>
        <ul className="loves-cloud">
          {loves.map((l, i) => (
            <li key={l} style={{ "--bg": tints[i % tints.length], "--r": `${(i % 2 ? 1 : -1) * (2 + (i % 4))}deg` }}>
              {l}
            </li>
          ))}
        </ul>
      </section>

      <Experience id="about-exp-title" />

      <section className="about-cta">
        <p className="hand">Still reading? Let’s just talk.</p>
        <Link href="/contact" className="btn btn--paprika" data-cursor="yay">
          Say hello <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
