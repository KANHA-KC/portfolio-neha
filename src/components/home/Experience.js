import Reveal from "@/components/Reveal";

export default function Experience({ items, id = "exp-title", num = "(05)" }) {
  return (
    <section className="experience" aria-labelledby={id}>
      <header className="section-head">
        <p className="eyebrow">
          <span className="eyebrow-num">{num}</span> Where I’ve been
        </p>
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
            <span className="exp-loc">{x.location}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
