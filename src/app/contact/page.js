import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import ContactKeys from "@/components/ContactKeys";
import LocalTime from "@/components/LocalTime";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getProfile } from "@/content";
import { absolute } from "@/lib/seo";

export async function generateMetadata() {
  const p = await getProfile();
  const description = `Hire ${p.name} for UX, logo design, branding and graphic design projects. Based in ${p.location}, working worldwide.`;
  return {
    title: "Contact — Hire a UX & Brand Designer",
    description,
    alternates: { canonical: "/contact" },
    openGraph: { title: `Contact ${p.name}`, description, url: "/contact" }
  };
}

export default async function ContactPage() {
  const site = await getProfile();
  return (
    <div className="page contact">
      <section className="contact-head">
        <div className="contact-head-text">
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
        <p className="eyebrow">Contact</p>
        <h1 className="page-title contact-title">
          Say <em>hi</em>
          <span className="contact-wave" aria-hidden="true">👋</span>
        </h1>
        <p className="page-lede">
          A new product, a tricky redesign, a logo or a whole brand that needs love — or just a coffee chat about
          design. My inbox is open.
        </p>
        </div>
        <ContactKeys email={site.email} socials={site.socials} resume={site.resume} />
      </section>

      <div className="contact-grid">
        <ContactForm email={site.email} />

        <aside className="contact-side">
          <div className="contact-card contact-card--teal">
            <p className="footer-label">Prefer email?</p>
            <CopyEmail email={site.email} />
          </div>
          <div className="contact-card contact-card--aqua">
            <p className="footer-label">Right now in {site.location.split(",")[0]}</p>
            <LocalTime prefix="It’s" timezone={site.timezone} />
            <span className="hand">usually replying with chai in hand</span>
          </div>
        </aside>
      </div>
      <JsonLd data={{ "@type": "ContactPage", url: absolute("/contact"), name: `Contact ${site.name}`, mainEntity: { "@id": absolute("/#person") } }} />
    </div>
  );
}
