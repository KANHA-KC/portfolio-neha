import Link from "next/link";
import Logo from "@/components/Logo";
import LocalTime from "@/components/LocalTime";
import CopyEmail from "@/components/CopyEmail";
import { site } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="eyebrow eyebrow--light">Got a messy problem?</p>
        <h2 className="footer-title">
          Let’s make
          <br />
          something <em>kind.</em>
        </h2>
        <span className="hand footer-hand" aria-hidden="true">
          (I reply within a day ✿)
        </span>
        <div className="footer-cta">
          <CopyEmail />
          <Link href="/contact" className="btn btn--aqua" data-cursor="say hi">
            Start a project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <p className="footer-label">Pages</p>
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
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
          <LocalTime prefix="Local time" />
        </div>
        <div className="footer-colophon">
          <p className="footer-label">Colophon</p>
          <span>Set in Fraunces, Plus Jakarta Sans & Caveat. Built with Next.js & GSAP.</span>
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
