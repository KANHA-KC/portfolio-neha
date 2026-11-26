import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import Experience from "@/components/home/Experience";
import HoverPeek from "@/components/HoverPeek";
import { peekImage, peekSlug } from "@/lib/peek";
import JsonLd from "@/components/JsonLd";
import { absolute, categoryPath, clip, SITE_OG_IMAGES } from "@/lib/seo";
import { getCategories, getExperience, getProfile, getProjects } from "@/content";
import AboutKpis from "@/components/AboutKpis";
import { TOTALS } from "@/content/totals";

export async function generateMetadata() {
  const p = await getProfile();
  return {
    title: { absolute: `About ${p.name} — ${p.role}` },
    description: clip(p.intro),
    alternates: { canonical: "/about" },
    openGraph: { title: `About ${p.name}`, description: clip(p.intro), url: "/about", type: "profile", images: SITE_OG_IMAGES }
  };
}

function tidyTypography(text) {
  return String(text)
    .replace(/\b(in|from|to|at|by|of|for|on)\s+(\d{4}[–-]?\d{0,4}\.?)/gi, "$1\u00A0$2")
    .replace(/\b(to|from)\s+(\d{4}\.?)/gi, "$1\u00A0$2")
    .replace(/\s+([^\s]{1,10}\s+[^\s]{1,10}[.!?])$/, (m, g) => "\u00A0" + g.replace(/\s+/, "\u00A0"))
    .replace(/\s+([^\s]+[.!?])$/, "\u00A0$1");
}

// "*word*" in CMS copy → handwritten accent. "[[Name]]" or "[[Name|slug]]" → hover photo from /public/story/<slug>.*
const rich = (text) => {
  const str = String(text)
    .replace(/(?<!\[\[)\b(half marathons?)\b(?!\]\])/gi, "[[$1]]")
    .replace(/(?<!\[\[)\b(travel)\b(?!\]\])/gi, "[[$1]]")
    .replace(/(?<!\[\[)\b(chai)\b(?!\]\])/gi, "[[$1]]");
  const lines = str.split("\n");
  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {tidyTypography(line)
        .split(/(\*[^*]+\*|\[\[[^\]]+\]\])/)
        .map((part, i) => {
          if (part.startsWith("[[") && part.endsWith("]]")) {
            const [label, slug] = part.slice(2, -2).split("|").map((x) => x.trim());
            const imageSrc = peekImage(slug || peekSlug(label));
            // Ratan Tata photo: show its bottom edge so the empty ceiling is cropped, not zoomed
            const position = imageSrc.includes("ratan-tata") ? "center bottom" : undefined;
            return <HoverPeek key={i} src={imageSrc} alt={label} position={position}>{label}</HoverPeek>;
          }
          return part.length > 2 && part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part;
        })}
    </Fragment>
  ));
};

// Logos in /public/tools, named by slug ("Kling AI" → kling-ai.svg). Unknown tools get an initial.
const TOOL_LOGOS = new Set(["photoshop", "illustrator", "indesign", "figma", "wix-com", "claude", "chatgpt", "recraft", "kling-ai", "leonardo-ai", "midjourney", "adobe-firefly", "gemini"]);
const toolSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// "Figma (learning)" → { name: "Figma", note: "learning" }
const parseTool = (t) => {
  const m = String(t).match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m ? { name: m[1], note: m[2] } : { name: String(t), note: "" };
};


// An illustrated flower in the brand palette: hand-inked, irregular petals (neon → cyan), a golden-spiral seed
// head (like the intro loader), a curling stem and a few sparkles. Sways, breathes and blooms on hover (CSS only).
const PHI_ANGLE = 2.39996; // golden angle, radians
const jitter = (i, k) => Math.sin(i * 12.9898 + k * 78.233) * 0.5 + 0.5; // stable pseudo-random 0..1
function Bloom({ className }) {
  const cx = 60, cy = 52;
  const petal = (len, w) => `M0 0 C ${-w} ${-len * 0.28}, ${-w * 0.9} ${-len * 0.82}, 0 ${-len} C ${w * 0.9} ${-len * 0.82}, ${w} ${-len * 0.28}, 0 0 Z`;
  const ring = (n, base, w, cls, offset) =>
    Array.from({ length: n }, (_, i) => {
      const len = base * (0.86 + jitter(i, offset) * 0.28);
      const tilt = (360 / n) * i + offset + (jitter(i, offset + 3) - 0.5) * 9;
      return (
        <g key={`${cls}${i}`} transform={`translate(${cx} ${cy}) rotate(${tilt.toFixed(1)})`}>
          <g className={`bloom-petal ${cls}`} style={{ "--i": i }}>
            <path d={petal(len, w)} />
            <path className="bloom-sketch" d={petal(len * 0.96, w * 0.8)} transform="rotate(4)" />
          </g>
        </g>
      );
    });
  const seeds = Array.from({ length: 55 }, (_, i) => {
    const a = i * PHI_ANGLE, d = 1.9 * Math.sqrt(i + 0.6);
    return <circle key={i} cx={(cx + d * Math.cos(a)).toFixed(2)} cy={(cy + d * Math.sin(a)).toFixed(2)} r={(0.55 + i / 70).toFixed(2)} className={i % 3 ? "bloom-seed" : "bloom-seed bloom-seed--alt"} />;
  });
  const spark = (x, y, s, k) => (
    <g key={k} transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="bloom-spark" style={{ "--k": k }} d="M0 -6 C0.6 -1.2 1.2 -0.6 6 0 C1.2 0.6 0.6 1.2 0 6 C-0.6 1.2 -1.2 0.6 -6 0 C-1.2 -0.6 -0.6 -1.2 0 -6 Z" />
    </g>
  );
  return (
    <svg className={`bloom ${className || ""}`} viewBox="0 0 120 140" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bloom-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c7db0a" />
          <stop offset="1" stopColor="#b8f9ff" />
        </linearGradient>
      </defs>
      <g className="bloom-plant">
        <path className="bloom-stem" d="M60 66 C 58 86, 66 100, 60 112 C 55 122, 58 130, 62 137" />
        <path className="bloom-leaf" d="M61 104 C 70 92, 86 92, 94 98 C 84 108, 70 110, 61 104 Z" />
        <path className="bloom-leaf-vein" d="M63 103 C 72 99, 82 98, 91 98" />
        <g className="bloom-head">
          {ring(13, 40, 9.5, "bloom-petal--back", 7)}
          {ring(11, 33, 8.5, "bloom-petal--front", 0)}
          <circle className="bloom-disc" cx={cx} cy={cy} r="15" />
          <g className="bloom-seeds">{seeds}</g>
          <circle className="bloom-disc-ring" cx={cx} cy={cy} r="16.5" />
        </g>
      </g>
      {spark(104, 18, 1, 0)}
      {spark(14, 30, 0.7, 1)}
      {spark(100, 80, 0.55, 2)}
    </svg>
  );
}

// The "at a glance" row: lifetime totals (shared with the home intro).
// The hover lines name real examples from the CMS.
function glance(projects) {
  const clients = [...new Set(projects.map((p) => p.client || p.title).filter(Boolean))];
  const sectors = [...new Set(projects.map((p) => p.sector).filter(Boolean))];
  const { years, brands, industries } = TOTALS;
  return [
    { ...years, detail: "agency & freelance" },
    { ...brands, detail: clients.length ? `incl. ${clients.slice(0, 3).join(", ")}` : "" },
    { ...industries, detail: sectors.length ? `${sectors.slice(0, 2).join(", ")} & more` : "" }
  ].filter(Boolean);
}

export default async function AboutPage() {
  const [profile, experience, categories, projects] = await Promise.all([getProfile(), getExperience(), getCategories(), getProjects()]);
  const kpis = glance(projects);
  const story = profile.story;
  const kits = [
    { key: "design", title: "Design Toolkit", items: profile.designTools },
    { key: "ai", title: "Ai Toolkit", items: profile.aiTools }
  ];

  return (
    <div className="page about">
      {/* ---- hello ---- */}
      <section className="about-hero">
        <div className="about-hero-copy">
          <h1 className="page-title about-title">
            <span className="about-title-line">Hello,</span>
            <span className="about-title-line">
              I’m <em>{profile.firstName}</em>
              <Bloom className="about-wave" />
            </span>
          </h1>
          <p className="page-lede about-lede">
            {/* set line breaks, as Neha wants them read */}
            <span className="about-lede-line">A self-taught illustrator and brand designer based in India.</span>{" "}
            <span className="about-lede-line">Agency-sharpened and designing since before AI. I work</span>{" "}
            <span className="about-lede-line">across illustration, brand identity, and graphic design to</span>{" "}
            <span className="about-lede-line">give ideas a distinct personality and bring brands to life.</span>
          </p>
          {profile.availability && <span className="hand about-hand">{profile.availability.toLowerCase()} — say hi!</span>}
          <AboutKpis items={kpis} />
        </div>

        <div className="about-photo">
          <div className="about-hair-note hand" aria-hidden="true">
            <span className="about-hair-text">
              teal hair color is a<br /><mark className="about-hair-mark">design decision</mark>
            </span>
            <svg className="about-hair-arrow" viewBox="0 0 160 140" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* curve down from the note to the teal hair ends: white, with a soft shadow */}
              <g stroke="#fff" strokeWidth="2.6" strokeOpacity="0.9">
                <path d="M 12 6 C 6 70, 60 118, 146 120" />
                <path d="M 126 106 L 148 120 L 126 134" />
              </g>
            </svg>
          </div>
          <Image
            className="about-print"
            src="/brand/neha-mountains.webp"
            alt={`${profile.name} sitting on a boulder by a river, snowy mountains behind`}
            width={798}
            height={1033}
            preload
            sizes="(max-width: 900px) 80vw, 36vw"
          />
          <div className="about-badge" aria-hidden="true">
            <svg className="about-badge-ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="58" />
              <defs>
                <path id="about-badge-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text>
                <textPath href="#about-badge-ring" textLength="272" lengthAdjust="spacing">
                  {`${profile.role.replace(/,\s*|\s+and\s+/g, " · ")} · `}
                </textPath>
              </text>
            </svg>
            <div className="about-badge-mark">
              <Logo variant="monogram" height="clamp(20px, 2.2vw, 28px)" color="var(--teal)" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- story ---- */}
      {story.length > 0 && (
        <section className="story" aria-labelledby="story-title">
          <div className="story-side">
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
            <h2 id="together-title" className="section-title">
              How it <em>feels</em>
            </h2>
          </header>
          <Reveal className="notepad">
            <div className="notepad-rings" aria-hidden="true">
              {Array.from({ length: 22 }, (_, i) => <span key={i} />)}
            </div>
            <div className="notepad-page">
              {profile.workProcess.length > 0 && (
                <div className="notepad-steps">
                  <span className="hand notepad-tag">the method</span>
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
                </div>
              )}
              {profile.workWith.length > 0 && (
                <aside className="notepad-stickies" aria-label="What it’s like to work with me">
                  <p className="hand notepad-stickies-label">what it’s like to work with me</p>
                  <ul>
                    {profile.workWith.map((w, i) => (
                      <li key={w.title} className={`sticky sticky--${(i % 3) + 1}`}>
                        <b>{w.title}</b>
                        <p>{w.description}</p>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* ---- toolbox ---- */}
      <section className="desk" aria-label="Tools">
        {kits.some((k) => k.items.length) && (
          <div className="desk-tools">
            {kits.filter((k) => k.items.length).map((kit) => (
              <div key={kit.key} className={`toolkit toolkit--${kit.key}`}>
                <h3 className="toolkit-title">
                  {kit.title}
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

      <Experience items={experience} id="about-exp-title" />

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
