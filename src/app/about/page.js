import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Experience from "@/components/home/Experience";
import { getExperience, getProfile, getServices } from "@/content";

export async function generateMetadata() {
  const p = await getProfile();
  return { title: "About", description: p.intro };
}

const tints = ["#FFF3DC", "#EDF7F4", "#FBECE6", "#E7EFF0", "#C8E8E2", "#F8CC78", "#EDA18A", "#9ED4CB"];

export default async function AboutPage() {
  const [profile, services, experience] = await Promise.all([getProfile(), getServices(), getExperience()]);
  const [lead, ...rest] = profile.bio;
  const groups = [
    { key: "ux", title: "UX & Product", tag: "the thinking", items: services.filter((s) => s.group === "ux") },
    { key: "brand", title: "Brand & Identity", tag: "the making", items: services.filter((s) => s.group === "brand") }
  ];

  return (
    <div className="page about">
      {/* ---- hello ---- */}
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About — {profile.role}</p>
          <h1 className="page-title about-title">
            Hello, I’m <em>{profile.firstName}</em>
            <span className="about-wave" aria-hidden="true">✿</span>
          </h1>
          <p className="page-lede">{profile.intro}</p>
          <span className="hand about-hand">{profile.availability.toLowerCase()} — say hi!</span>
        </div>

        <div className="about-photo">
          <span className="tape tape--tl" />
          <span className="tape tape--tr" />
          <div className="about-photo-bg" aria-hidden="true" />
          <Image
            src={profile.portrait?.src || "/brand/neha-cutout.webp"}
            alt={`${profile.name}, smiling`}
            width={653}
            height={870}
            preload
            sizes="(max-width: 900px) 80vw, 36vw"
          />
          <span className="sticker sticker--gold about-sticker-a">hi there!</span>
          <span className="sticker sticker--aqua about-sticker-b">the teal is on brand</span>
        </div>
      </section>

      {/* ---- two hats ---- */}
      <section className="hats-section" aria-labelledby="hats-title">
        <header className="section-head">
          <p className="eyebrow"><span className="eyebrow-num">(01)</span> What I do</p>
          <h2 id="hats-title" className="section-title">
            I wear <em>two hats</em>
            <span className="hand section-hand">(sometimes at the same time)</span>
          </h2>
        </header>
        <div className="hats-big">
          {groups.map((g, gi) => (
            <Reveal key={g.key} className={`hat-big hat-big--${g.key}`} delay={gi * 140}>
              <span className="hat-tag hand">{g.tag}</span>
              <h3>{g.title}</h3>
              <ol>
                {g.items.map((s, i) => (
                  <li key={s.title}>
                    <span className="hat-n">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <b>{s.title}</b>
                      <p>{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href={`/work#type=${g.key === "ux" ? "ux-ui" : "branding"}`} className="link-underline">
                See {g.title.toLowerCase()} work →
              </Link>
            </Reveal>
          ))}
          <span className="hats-plus" aria-hidden="true">+</span>
        </div>
      </section>

      {/* ---- story ---- */}
      {lead && (
        <section className="about-story">
          <p className="eyebrow"><span className="eyebrow-num">(02)</span> The longer story</p>
          <Reveal as="p" className="story-big">{lead}</Reveal>
          {rest.length > 0 && (
            <div className="story-cols">
              {rest.map((para, i) => (
                <Reveal as="p" key={i} delay={80 * (i + 1)}>{para}</Reveal>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ---- principles ---- */}
      {profile.principles.length > 0 && (
        <section className="principles" aria-labelledby="pr-title">
          <header className="section-head">
            <p className="eyebrow"><span className="eyebrow-num">(03)</span> How I work</p>
            <h2 id="pr-title" className="section-title">A few little <em>rules</em></h2>
          </header>
          <div className="principle-list">
            {profile.principles.map((p, i) => (
              <Reveal key={p.title} className={`principle principle--${(i % 3) + 1}`} delay={i * 100}>
                <span className="principle-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="tilt-band tilt-band--paprika">
        <Marquee reverse items={["Research", "Empathy", "Logos", "Systems", "Clarity", "Kindness", "Craft"]} />
      </div>

      {/* ---- toolbox + loves ---- */}
      <section className="desk" aria-label="Tools and things I love">
        {profile.tools.length > 0 && (
          <div className="desk-tools">
            <h2 className="section-title">My <em>toolbox</em></h2>
            <ul className="tool-list">
              {profile.tools.map((t, i) => (
                <li key={t} style={{ "--r": `${((i * 37) % 9) - 4}deg` }}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {profile.loves.length > 0 && (
          <div className="loves">
            <h2 className="section-title">
              Things I <em>love</em>
              <span className="hand section-hand">in no particular order</span>
            </h2>
            <ul className="loves-cloud">
              {profile.loves.map((l, i) => (
                <li key={l} style={{ "--bg": tints[i % tints.length], "--r": `${(i % 2 ? 1 : -1) * (2 + (i % 4))}deg` }}>{l}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <Experience items={experience} id="about-exp-title" num="(04)" />

      <section className="about-cta">
        <p className="hand">Still reading? Let’s just talk.</p>
        <Link href="/contact" className="btn btn--paprika" data-cursor="yay">
          Say hello <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
