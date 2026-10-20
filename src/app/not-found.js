import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf">
      <p className="eyebrow">Error 404</p>
      <h1 className="nf-title">
        Oops<em>.</em>
      </h1>
      <p className="nf-copy">
        This page wandered off the user journey. Even the best flows have dead ends — let’s get you back on the happy
        path.
      </p>
      <span className="hand nf-hand">(I’d have designed a better 404 for your product, promise)</span>
      <Link href="/" className="btn btn--teal">Back home →</Link>
    </section>
  );
}
