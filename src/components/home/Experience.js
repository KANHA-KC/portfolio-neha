import Reveal from "@/components/Reveal";

export default function Experience({ items, id = "exp-title" }) {
  return (
    <section className="experience" aria-labelledby={id}>
      <header className="section-head">
        <h2 id={id} className="section-title">
          A few <em>chapters</em>
        </h2>
      </header>
      <ol className="exp-list">
        {items.map((x, i) => (
          <Reveal as="li" key={x.company + x.period} className="exp-row" delay={i * 80}>
            <span className="exp-year">{x.period}</span>
            <span className="exp-role">{x.role}</span>
            <span className="exp-company">{x.company}</span>
            <span className="exp-loc">{x.highlight || x.location}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
