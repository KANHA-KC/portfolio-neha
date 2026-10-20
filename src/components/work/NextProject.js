import Link from "next/link";

export default function NextProject({ next }) {
  return (
    <Link
      href={`/work/${next.slug}`}
      className="case-next"
      data-cursor="next"
      style={{ "--next-wash": next.palette.wash, "--next-spark": next.palette.spark }}
    >
      <span className="eyebrow">Next — {next.categoryTitle}</span>
      <span className="case-next-title">{next.title}</span>
      <span className="case-next-arrow" aria-hidden="true">→</span>
    </Link>
  );
}
