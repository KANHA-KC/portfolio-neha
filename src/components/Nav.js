"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import LocalTime from "@/components/LocalTime";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/data/portfolioData";

const links = [
  { href: "/work", label: "Work", n: "03" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`nav ${hidden && !open ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-mark" aria-label="Neha Ondhia — home" data-cursor="home">
          <Logo variant="monogram" height={30} />
          <span className="nav-name">
            Neha Ondhia
            <em>{site.role}</em>
          </span>
        </Link>

        <div className="nav-time">
          <LocalTime />
        </div>

        <nav aria-label="Main" className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link ${isActive(l.href) ? "is-active" : ""}`}>
              <span className="roll-wrap"><span className="roll">{l.label}</span></span>
              {l.n && <sup>{l.n}</sup>}
            </Link>
          ))}
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
          {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="menu-item">
              <span className="menu-link">
                <small>0{i + 1}</small>
                {l.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <div className="menu-socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
            ))}
          </div>
          <LocalTime />
        </div>
        <Logo variant="monogram" height="40vw" className="menu-bg-mark" />
      </div>
    </header>
  );
}
