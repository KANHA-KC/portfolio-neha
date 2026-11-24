"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CopyEmail from "@/components/CopyEmail";
import { categoryPath } from "@/lib/seo";

export default function Footer({ site, categories = [] }) {
  const pathname = usePathname();
  const isContact = pathname === "/contact";

  return (
    <footer id="footer" className={`footer ${isContact ? "footer--contact" : ""}`}>
      {!isContact && (
        <div className="footer-top">
          <div className="footer-title-row">
            <h2 className="footer-title">
              That&apos;s the end of the <em>portfolio.</em>
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
                  <a href={site?.calendly || "https://calendly.com/nehaondhia/chai-chat"} target="_blank" rel="noopener noreferrer" className="btn btn--aqua" data-cursor="book">
                    Book a chai chat <span aria-hidden="true">↗</span>
                  </a>
                  <span className="hand footer-book-note">(20 minutes, no pressure)</span>
                </div>
                <div className="footer-write">
                  <CopyEmail email={site?.email || "neha@nehaondhia.com"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          {site?.socials?.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label} ↗
            </a>
          ))}
          {!site?.socials?.some((s) => /email|mail/i.test(s.label)) && (
            <a href={`mailto:${site?.email || "neha@nehaondhia.com"}`}>
              Email ↗
            </a>
          )}
          {!site?.socials?.some((s) => /calendly|chat/i.test(s.label)) && (
            <a href={site?.calendly || "https://calendly.com/nehaondhia/chai-chat"} target="_blank" rel="noopener noreferrer">
              Book a chai chat ↗
            </a>
          )}
          {!site?.socials?.some((s) => /resume/i.test(s.label)) && (
            <a href={site?.resume || "/resume.pdf"} target="_blank" rel="noopener noreferrer" download="Neha-Ondhia-Resume.pdf">
              Resume ↗
            </a>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 {site?.name || "Neha Ondhia"}.</span>
        <span>Stealing is illegal, hiring is highly encouraged.</span>
        <a href="#main" className="to-top">Back to top ↗</a>
      </div>
    </footer>
  );
}
