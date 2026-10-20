import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

// Home-page "hello" section: a taped polaroid, the intro, and two overlapping index cards for the two disciplines.
export default function AboutSnapshot({ profile, services }) {
  const ux = services.filter((s) => s.group === "ux");
  const brand = services.filter((s) => s.group === "brand");

  return (
    <section className="snap" aria-labelledby="snap-title">
      <div className="snap-photo">
        <span className="tape tape--tl" />
        <span className="tape tape--tr" />
        <div className="snap-polaroid">
          <div className="snap-photo-bg" aria-hidden="true" />
          <Image
            src={profile.portrait?.src || "/brand/neha-cutout.webp"}
            alt={`${profile.name}, smiling`}
            width={653}
            height={870}
            sizes="(max-width: 900px) 70vw, 30vw"
          />
          <span className="hand snap-caption">me, probably thinking about kerning</span>
        </div>
      </div>

      <div className="snap-copy">
        <p className="eyebrow">
          <span className="eyebrow-num">(03)</span> Hello again
        </p>
        <h2 id="snap-title" className="section-title">
          Half researcher,
          <br />
          half <em>brand nerd</em>
        </h2>
        <Reveal as="p" className="snap-intro">{profile.intro}</Reveal>

        <div className="hats">
          <Reveal className="hat hat--ux">
            <span className="hat-tag hand">the thinking</span>
            <h3>UX & Product</h3>
            <ul>{ux.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
          </Reveal>
          <Reveal className="hat hat--brand" delay={120}>
            <span className="hat-tag hand">the making</span>
            <h3>Brand & Identity</h3>
            <ul>{brand.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
          </Reveal>
        </div>

        <div className="snap-actions">
          <Link href="/about" className="btn btn--teal" data-cursor="hi!">
            The longer story <span aria-hidden="true">→</span>
          </Link>
          <span className="snap-avail">
            <span className="pulse" aria-hidden="true" />
            {profile.availability}
          </span>
        </div>
      </div>
    </section>
  );
}
