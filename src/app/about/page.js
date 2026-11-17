import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Experience from "@/components/home/Experience";
import Breadcrumbs from "@/components/Breadcrumbs";
import HoverPeek from "@/components/HoverPeek";
import { peekImage, peekSlug } from "@/lib/peek";
import JsonLd from "@/components/JsonLd";
import { absolute, categoryPath, clip, SITE_OG_IMAGES } from "@/lib/seo";
import { getCategories, getExperience, getProfile } from "@/content";

export async function generateMetadata() {
  const p = await getProfile();
  return {
    title: { absolute: `About ${p.name} — ${p.role}` },
    description: clip(p.intro),
    alternates: { canonical: "/about" },
    openGraph: { title: `About ${p.name}`, description: clip(p.intro), url: "/about", type: "profile", images: SITE_OG_IMAGES }
  };
}

// "*word*" in CMS copy → handwritten accent. "[[Name]]" or "[[Name|slug]]" → hover photo from /public/story/<slug>.*
const rich = (text) =>
  String(text)
    .split(/(\*[^*]+\*|\[\[[^\]]+\]\])/)
    .map((part, i) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const [label, slug] = part.slice(2, -2).split("|").map((x) => x.trim());
        const imageSrc = peekImage(slug || peekSlug(label));
        return <HoverPeek key={i} src={imageSrc} alt={label}>{label}</HoverPeek>;
      }
      return part.length > 2 && part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part;
    });

// Logos in /public/tools, named by slug ("Kling AI" → kling-ai.svg). Unknown tools get an initial.
const TOOL_LOGOS = new Set(["photoshop", "illustrator", "indesign", "figma", "wix-com", "claude", "chatgpt", "recraft", "kling-ai", "leonardo-ai", "midjourney", "adobe-firefly", "gemini"]);
const toolSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// "Figma (learning)" → { name: "Figma", note: "learning" }
const parseTool = (t) => {
  const m = String(t).match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m ? { name: m[1], note: m[2] } : { name: String(t), note: "" };
};


export default async function AboutPage() {
  const [profile, experience, categories] = await Promise.all([getProfile(), getExperience(), getCategories()]);
  const story = profile.story;
  const kits = [
    { key: "design", title: "Design", tag: "the craft", items: profile.designTools },
    { key: "ai", title: "AI", tag: "the new sidekicks", items: profile.aiTools }
  ];

  return (
    <div className="page about">
      {/* ---- hello ---- */}
      <section className="about-hero">
        <div className="about-hero-copy">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <p className="eyebrow">About — {profile.role}</p>
          <h1 className="page-title about-title">
            <span className="about-title-line">Hello,</span>
            <span className="about-title-line">
              I’m <em>{profile.firstName}</em>
              <span className="about-wave" aria-hidden="true">✿</span>
            </span>
          </h1>
          <p className="page-lede about-lede">{profile.intro}</p>
          {profile.availability && <span className="hand about-hand">{profile.availability.toLowerCase()} — say hi!</span>}
        </div>

        <div className="about-photo">
          <div className="about-sun" aria-hidden="true" />
          <div className="about-arch" aria-hidden="true" />
          <Image
            src={profile.portrait?.src || "/brand/neha-cutout.webp"}
            alt={`${profile.name}, smiling`}
            width={653}
            height={870}
            preload
            sizes="(max-width: 900px) 80vw, 36vw"
          />
          <svg className="about-badge" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="about-badge-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="58" />
            <text>
              <textPath href="#about-badge-ring" textLength="272" lengthAdjust="spacing">
                {`${profile.role.replace(/,\s*|\s+and\s+/g, " · ")} · `}
              </textPath>
            </text>
            <text className="about-badge-mark" x="60" y="60" textAnchor="middle" dominantBaseline="central">✿</text>
          </svg>
          <span className="sticker sticker--gold about-sticker-a">hi there!</span>
          <span className="sticker sticker--aqua about-sticker-b">the teal is on brand</span>
        </div>
      </section>

      {/* ---- story ---- */}
      {story.length > 0 && (
        <section className="story" aria-labelledby="story-title">
          <div className="story-side">
            <p className="eyebrow"><span className="eyebrow-num">(01)</span> The longer story</p>
            {profile.storyTitle && (
              <h2 id="story-title" className="story-title">{rich(profile.storyTitle)}</h2>
            )}
            {profile.storyStats.length > 0 && (
              <ul className="story-stats">
                {profile.storyStats.map((s, i) => (
                  <Reveal as="li" key={s.label} className={`story-stat story-stat--${(i % 4) + 1}`} delay={i * 90}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
          <div className="story-body">
            {story.map((para, i) => (
              <Reveal as="p" key={i} delay={i ? 60 : 0}>{rich(para)}</Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---- working together ---- */}
      {(profile.workWith.length > 0 || profile.workProcess.length > 0) && (
        <section className="together" aria-labelledby="together-title">
          <header className="section-head">
            <p className="eyebrow"><span className="eyebrow-num">(02)</span> Working together</p>
            <h2 id="together-title" className="section-title">
              How it <em>feels</em>
              <span className="hand section-hand">(and how it gets made)</span>
            </h2>
          </header>
          <div className="together-grid">
            {profile.workWith.length > 0 && (
              <Reveal className="together-card together-card--vibe">
                <span className="hand together-tag">the vibe</span>
                <h3>What it’s like to work with me</h3>
                <ul className="vibe-list">
                  {profile.workWith.map((w) => (
                    <li key={w.title}>
                      <span className="vibe-tick" aria-hidden="true">✓</span>
                      <p><b>{w.title}.</b> {w.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {profile.workProcess.length > 0 && (
              <Reveal className="together-card together-card--process" delay={140}>
                <span className="hand together-tag">the method</span>
                <h3>How I work</h3>
                <ol className="process-steps">
                  {profile.workProcess.map((step, i) => (
                    <li key={step.title}>
                      <span className="process-n">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <b>{step.title}</b>
                        <p>{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <div className="tilt-band tilt-band--paprika">
        <Marquee
          reverse
          sep="·"
          items={profile.marquee?.length ? profile.marquee : [
            "Logo Design",
            "Brand Identity",
            "Corporate Collateral",
            "Social Media Graphics",
            "Print & Digital Media",
            "Packaging & Labels",
            "Presentation Design",
            "Signage & Spatial Visuals"
          ]}
        />
      </div>

      {/* ---- toolbox ---- */}
      <section className="desk" aria-label="Tools">
        {kits.some((k) => k.items.length) && (
          <div className="desk-tools">
            <h2 className="section-title">My <em>toolbox</em></h2>
            {kits.filter((k) => k.items.length).map((kit) => (
              <div key={kit.key} className={`toolkit toolkit--${kit.key}`}>
                <h3 className="toolkit-title">
                  {kit.title} <span className="hand">{kit.tag}</span>
                </h3>
                <ul className="tool-list">
                  {kit.items.map((t, i) => {
                    const { name, note } = parseTool(t);
                    const slug = toolSlug(name);
                    return (
                      <li key={t} style={{ "--r": `${((i * 37) % 7) - 3}deg` }}>
                        {TOOL_LOGOS.has(slug) ? (
                          <Image className="tool-logo" src={`/tools/${slug}.svg`} alt="" width={26} height={26} unoptimized />
                        ) : (
                          <span className="tool-logo tool-logo--initial" aria-hidden="true">{name[0]}</span>
                        )}
                        <span>{name}</span>
                        {note && <span className="tool-note hand">{note}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <Experience items={experience} id="about-exp-title" num="(03)" />

      <section className="about-cta">
        <p className="hand">Still reading? Let’s just talk.</p>
        <Link href="/contact" className="btn btn--paprika" data-cursor="yay">
          Say hello <span aria-hidden="true">→</span>
        </Link>
      </section>

      <JsonLd data={{ "@type": "ProfilePage", url: absolute("/about"), name: `About ${profile.name}`, mainEntity: { "@id": absolute("/#person") } }} />
    </div>
  );
}
