// Hyphenated words ("budget-friendly") never split across lines: the whole word wraps instead.
const keepCompounds = (text) =>
  String(text)
    .split(/(\S+-\S+)/)
    .map((part, i) => (i % 2 ? <span key={i} style={{ whiteSpace: "nowrap" }}>{part}</span> : part));

export default function ProjectHero({ project: p, num, meta }) {
  return (
    <header className="case-hero">
      <div className={`case-hero-top${num ? "" : " case-hero-top--plain"}`}>
        {num && <span className="case-num">{num}</span>}
        <div>
          <p className="eyebrow eyebrow--ink">
            {p.workedOn || Array.from(new Set([p.categoryTitle, ...p.tags])).filter(Boolean).join(" · ")}
          </p>
          <h1 className="case-title">{p.title}</h1>
          {(p.brief || p.subtitle || p.summary) && (
            <p className="case-sub">
              {/* a line break in the CMS text starts a new line on the page */}
              {String(p.brief || p.subtitle || p.summary)
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {keepCompounds(line)}
                  </span>
                ))}
            </p>
          )}
        </div>
      </div>
      <dl className="case-meta">
        {meta
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
    </header>
  );
}
