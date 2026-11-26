"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import TopBanner from "@/components/TopBanner";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { surfaceIsDark } from "@/lib/surface";

const baseLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Nav({ profile }) {
  const links = baseLinks;
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false); // is the section right under the bar dark (teal)?
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  // Easter egg: 4+ quick clicks on the logo replay the intro loader.
  const markClicks = useRef({ n: 0, t: 0 });
  const onMarkClick = (e) => {
    const now = performance.now();
    const c = markClicks.current;
    c.n = now - c.t < 700 ? c.n + 1 : 1;
    c.t = now;
    if (c.n >= 4) {
      e.preventDefault();
      c.n = 0;
      window.dispatchEvent(new Event("intro:replay"));
    }
  };

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    // Look at what's just under the bar's bottom edge (skipping the bar itself and the cursor).
    const probe = () => {
      frame = 0;
      // Height, not position: the bar may be mid-slide (hidden on scroll down) when this runs.
      const h = headerRef.current?.querySelector(".nav-inner")?.offsetHeight ?? 64;
      setOverDark(surfaceIsDark(window.innerWidth / 2, Math.min(h + 2, window.innerHeight - 1), ".nav, .tc"));
    };
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 240 && y > last);
      last = y;
      if (!frame) frame = requestAnimationFrame(probe);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        overlayRef.current.querySelectorAll(".menu-link"),
        { yPercent: 110, rotate: 4 },
        { yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.07, ease: "expo.out", delay: 0.15 }
      );
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu when the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // The home, about, contact, and project heroes are teal, so the bar uses light ink until it gets its cream background on scroll.
  const isProjectPage = pathname.startsWith("/work/") && !pathname.startsWith("/work/category");
  const heroDark = (pathname === "/" || pathname === "/contact" || pathname === "/about" || isProjectPage) && !scrolled;
  // Scrolled over a dark section: the bar turns to deep-teal glass with light ink instead of the light glass.
  const glassDark = scrolled && overDark && !open;
  const onDark = (heroDark || glassDark) && !open;

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header ref={headerRef} className={`nav ${hidden && !open ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""} ${onDark ? "nav--on-dark" : ""} ${glassDark ? "nav--glass-dark" : ""}`}>
      {pathname === "/" && <TopBanner />}
      <div className="nav-inner">
        <Link href="/" className="nav-mark" aria-label={`${profile.name} — home`} data-cursor="home" onClick={onMarkClick}>
          <Logo variant="monogram" height={32} gradient />
        </Link>

        <nav aria-label="Main" className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${l.href === "/contact" ? "nav-link--contact" : ""} ${isActive(l.href) ? "is-active" : ""}`}
            >
              <span className="roll-wrap"><span className="roll">{l.label}</span></span>
            </Link>
          ))}
          <a
            href={profile.resume || "/resume.pdf"}
            download="Neha-Ondhia-Resume.pdf"
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="roll-wrap"><span className="roll">Resume</span></span>
          </a>
        </nav>

        <button
          type="button"
          className={`menu-btn ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-btn-label" aria-hidden="true">{open ? "Close" : "Menu"}</span>
          <span className="menu-btn-dots" aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      <div id="menu-overlay" ref={overlayRef} className={`menu-overlay ${open ? "is-open" : ""}`} inert={!open}>
        <nav aria-label="Mobile" className="menu-list">
          {[{ href: "/", label: "Home" }, ...links].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="menu-item">
              <span className="menu-link">
                {l.label}
              </span>
            </Link>
          ))}
          <a
            href={profile.resume || "/resume.pdf"}
            download="Neha-Ondhia-Resume.pdf"
            onClick={() => setOpen(false)}
            className="menu-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-link">
              Resume
            </span>
          </a>
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="menu-socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
            ))}
          </div>
        </div>
        <Logo variant="monogram" height="40vw" className="menu-bg-mark" />
      </div>
    </header>
  );
}
