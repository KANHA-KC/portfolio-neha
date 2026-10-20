import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import LocalTime from "@/components/LocalTime";
import { site } from "@/data/portfolioData";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Neha Ondhia for UX & product design projects, consulting and collaborations."
};

export default function ContactPage() {
  return (
    <div className="page contact">
      <section className="contact-head">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title contact-title">
          Say <em>hi</em>
          <span className="contact-wave" aria-hidden="true">👋</span>
        </h1>
        <p className="page-lede">
          New product, a tricky redesign, a design system that needs love, or just a coffee chat about research —
          my inbox is open.
        </p>
      </section>

      <div className="contact-grid">
        <ContactForm />

        <aside className="contact-side">
          <div className="contact-card contact-card--teal">
            <p className="footer-label">Prefer email?</p>
            <CopyEmail />
          </div>
          <div className="contact-card contact-card--gold">
            <p className="footer-label">Find me</p>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                {s.label} ↗
              </a>
            ))}
          </div>
          <div className="contact-card contact-card--aqua">
            <p className="footer-label">Right now in {site.location.split(",")[0]}</p>
            <LocalTime prefix="It’s" />
            <span className="hand">usually replying with chai in hand</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
