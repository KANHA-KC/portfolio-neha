import Link from "next/link";
import Logo from "@/components/Logo";
import CopyEmail from "@/components/CopyEmail";
import { getCategories, getProfile } from "@/content";
import { categoryPath } from "@/lib/seo";

export default async function Footer() {
  const [site, categories] = await Promise.all([getProfile(), getCategories()]);
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="footer-title-row">
          <h2 className="footer-title">
            That&apos;s the end of the <em>portfolio.</em> <span className="footer-smile" aria-hidden="true">🙂</span>
          </h2>
          <span className="hand footer-hand" aria-hidden="true">
            (Sad, I know.)
          </span>
        </div>
        <div className="footer-reach">
          <div className="footer-reach-text">
            <p className="footer-lede">
              But the conversation doesn’t have to be. If something here caught your eye, let’s talk it over a cup of chai.
            </p>
            <div className="footer-actions">
              <div className="footer-book">
                <a href={site.calendly || "https://calendly.com/nehaondhia/chai-chat"} target="_blank" rel="noopener noreferrer" className="btn btn--aqua" data-cursor="book">
                  Book a chai chat <span aria-hidden="true">↗</span>
                </a>
                <span className="hand footer-book-note">(20 minutes, no pressure)</span>
              </div>
              <div className="footer-write">
                <CopyEmail quiet email={site.email || "nehaondhia6@gmail.com"} />
              </div>
            </div>
          </div>
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
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {site.name}</span>
        <span>Designed with empathy & strong opinions about spacing.</span>
        <a href="#main" className="to-top">Back to top ↑</a>
      </div>
    </footer>
  );
}
