import Reveal from "@/components/Reveal";
import { experienceData } from "@/data/portfolioData";

export default function Experience({ id = "exp-title" }) {
  return (
    <section className="experience" aria-labelledby={id}>
      <header className="section-head">
        <p className="eyebrow">
          <span className="eyebrow-num">(04)</span> Where I’ve been
        </p>
        <h2 id={id} className="section-title">
          A few <em>chapters</em>
        </h2>
      </header>
      <ol className="exp-list">
        {experienceData.map((x, i) => (
          <Reveal as="li" key={x.company + x.year} className="exp-row" delay={i * 80}>
            <span className="exp-year">{x.year}</span>
            <span className="exp-role">{x.role}</span>
            <span className="exp-company">{x.company}</span>
            <span className="exp-loc">{x.location}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
