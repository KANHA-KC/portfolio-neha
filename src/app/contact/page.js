import ContactKeys from "@/components/ContactKeys";
import JsonLd from "@/components/JsonLd";
import { getProfile } from "@/content";
import { absolute, clip, SITE_OG_IMAGES } from "@/lib/seo";

export async function generateMetadata() {
  const p = await getProfile();
  const description = clip(`Hire ${p.name} for logo design, brand identity, packaging, illustration and marketing projects. Based in ${p.location}, working worldwide.`);
  return {
    title: "Contact — Hire a Brand & Graphic Designer",
    description,
    alternates: { canonical: "/contact" },
    openGraph: { title: `Contact ${p.name}`, description, url: "/contact", images: SITE_OG_IMAGES }
  };
}

export default async function ContactPage() {
  const site = await getProfile();
  return (
    <div className="page contact">
      <section className="contact-head">
        <div className="contact-head-text">
          <h1 className="page-title contact-title">
            Say <em>hi</em>
            <span className="contact-wave" aria-hidden="true">👋</span>
          </h1>
          <p className="page-lede">
            Vacant seat in your team, need a new brand identity, a logo, illustration,<br className="contact-lede-br" />{" "}
            or a chai chat about design. My inbox is open.
          </p>
        </div>
      </section>

      <div className="contact-keys">
        <ContactKeys email={site.email} socials={site.socials} resume={site.resume} />
      </div>
      <JsonLd data={{ "@type": "ContactPage", url: absolute("/contact"), name: `Contact ${site.name}`, mainEntity: { "@id": absolute("/#person") } }} />
    </div>
  );
}
