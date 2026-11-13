import Link from "next/link";
import Logo from "@/components/Logo";
import LocalTime from "@/components/LocalTime";
import CopyEmail from "@/components/CopyEmail";
import { getCategories, getProfile } from "@/content";
import { categoryPath } from "@/lib/seo";

export default async function Footer() {
  const [site, categories] = await Promise.all([getProfile(), getCategories()]);
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-title">
          That’s the end of
          <br />
          the <em>portfolio.</em> <span className="footer-smile" aria-hidden="true">🙂</span>
        </h2>
        <span className="hand footer-hand" aria-hidden="true">
          (Sad, I know.)
        </span>
        <p className="footer-lede">
          But the conversation doesn’t have to be. If something here caught your eye, let’s talk it over a cup of chai.
        </p>
        <div className="footer-cta">
          {site.calendly ? (
            <div className="footer-book">
              <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn--aqua" data-cursor="book">
                Book a chai chat <span aria-hidden="true">↗</span>
              </a>
              <span className="hand footer-book-note">(20 minutes, no pressure)</span>
            </div>
          ) : null}
        </div>
        <div className="footer-write">
          <span className="footer-or">or write to me:</span>
          <CopyEmail email={site.email} quiet />
        </div>
      </div>

      <div className="footer-grid">
        <nav aria-label="Footer">
          <p className="footer-label">Pages</p>
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav aria-label="Disciplines">
          <p className="footer-label">Disciplines</p>
          {categories.map((c) => (
            <Link key={c.slug} href={categoryPath(c.slug)}>{c.title}</Link>
          ))}
        </nav>
        <div>
          <p className="footer-label">Elsewhere</p>
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
        <div>
          <p className="footer-label">Based in</p>
          <span>{site.location}</span>
          <LocalTime prefix="Local time" timezone={site.timezone} />
        </div>
        <div className="footer-colophon">
          <p className="footer-label">Colophon</p>
          <span>Set in Cralika, Plus Jakarta Sans & Caveat. Built with Next.js & GSAP.</span>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        <Logo variant="wordmark" height="min(36vw, 520px)" color="var(--teal-2)" />
      </div>
      <div className="footer-bottom">
        <span>© {site.name}</span>
        <span>Designed with empathy & strong opinions about spacing.</span>
        <a href="#main" className="to-top">Back to top ↑</a>
      </div>
    </footer>
  );
}
