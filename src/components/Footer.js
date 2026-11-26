"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryPath } from "@/lib/seo";
import ContactKeys from "@/components/ContactKeys";

export default function Footer({ site, categories = [] }) {
  const pathname = usePathname();
  const isContact = pathname === "/contact";

  return (
    <footer id="footer" className={`footer ${isContact ? "footer--contact" : ""}`}>
      {!isContact && (
        <div className="footer-top">
          <div className="footer-title-row">
            <h2 className="footer-title">
              That&apos;s the end of the{" "}
              <span className="footer-end-wrap">
                <em>portfolio.</em>
                <span className="hand footer-hand" aria-hidden="true">
                  (Sad, I know.)
                </span>
              </span>
            </h2>
          </div>
          <div className="footer-reach">
            <div className="footer-reach-text">
              <p className="footer-lede">
                But the conversation doesn’t have to be. If something here caught your eye, let’s talk it over a cup of chai.
              </p>
            </div>
            <div className="footer-keys">
              <ContactKeys email={site?.email} socials={site?.socials} resume={site?.resume} />
            </div>
          </div>
        </div>
      )}

      <div className="footer-grid">
        {/* Neon up-arrow button sitting on the divider line; "back to top" circles round it on hover */}
        {!isContact && (
          <a href="#main" className="to-top-orb" aria-label="Back to top">
            <svg className="to-top-ring" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="to-top-path" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" />
              </defs>
              <text>
                <textPath href="#to-top-path" textLength="290" lengthAdjust="spacing">
                  BACK TO TOP · BACK TO TOP ·
                </textPath>
              </text>
            </svg>
            <span className="to-top-core" data-surface="light" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
              </svg>
            </span>
          </a>
        )}
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
          {site?.socials?.filter((s) => !/calendly|chai|chat/i.test(`${s.label} ${s.href}`)).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label} ↗
            </a>
          ))}
          {!site?.socials?.some((s) => /email|mail/i.test(s.label)) && (
            <a href={`mailto:${site?.email || "nehaondhiadesign@gmail.com"}`}>
              Email ↗
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
        {/* Contact has no footer headline (and so no round button): keep the text link there */}
        {isContact && <a href="#main" className="to-top">Back to top ↗</a>}
      </div>
    </footer>
  );
}
