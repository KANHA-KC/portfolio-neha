import Link from "next/link";

// Centred intro under the hero: who Neha is, the numbers, and the two calls to action.
export default function HeroIntro({ profile }) {
  return (
    <section className="hero-intro" aria-label="Introduction">
      <p className="hero-intro-lead">
        Self-taught. Agency-sharpened.
        <br />
        Designing since before AI.
      </p>
      <p className="hero-intro-aside">
        <span className="hero-intro-aside--desktop">(Eons ago, when my thumb and index finger were inseparable from CTRL+Z.)</span>
        <span className="hero-intro-aside--mobile">(Back when CTRL+Z was my best friend.)</span>
      </p>
      <p className="hero-intro-stats">
        <span><b>5+</b> years</span>
        <span aria-hidden="true">·</span>
        <span><b>50</b> brands</span>
        <span aria-hidden="true">·</span>
        <span><b>20+</b> industries</span>
      </p>
      <div className="hero-intro-actions">
        <Link href="/work" className="btn btn--aqua" data-cursor="peek" data-surface="light">
          See the work <span aria-hidden="true">↘</span>
        </Link>
        <a
          href={profile.resume || "/resume.pdf"}
          download="Neha-Ondhia-Resume.pdf"
          className="btn btn--outline"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="download"
        >
          Download résumé <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
