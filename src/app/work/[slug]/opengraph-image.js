import { ImageResponse } from "next/og";
import { getProfile, getProject } from "@/content";
import { OG_COLORS as C, OG_SIZE, ogFonts } from "@/lib/og";

export const alt = "Project preview";
export const size = OG_SIZE;
export const contentType = "image/png";

// Per-project share card: the uploaded cover (or thumbnail) when there is one, otherwise a branded title card.
export default async function Image({ params }) {
  const { slug } = await params;
  const [profile, found] = await Promise.all([getProfile(), getProject(slug)]);
  const p = found?.project;
  const photo = (p?.cover || p?.thumbnail)?.src;
  const pal = p?.palette || { wash: C.canvas, ink: C.teal, spark: C.gold };

  return new ImageResponse(
    photo ? (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.teal }}>
        <img src={photo} alt="" width={1200} height={630} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", padding: "40px 64px", background: "linear-gradient(transparent, rgba(6,54,65,0.92))", color: C.canvas, fontFamily: "Cralika" }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.05 }}>{p.title}</div>
          <div style={{ display: "flex", fontSize: 28, color: C.aqua, marginTop: 10 }}>{`${p.categoryTitle} · ${profile.name}`}</div>
        </div>
      </div>
    ) : (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: pal.wash, color: pal.ink, padding: "72px 80px", fontFamily: "Cralika" }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>{p?.categoryTitle || "Portfolio"}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 1, letterSpacing: -3, color: C.teal }}>{p?.title || profile.name}</div>
          {p?.subtitle ? <div style={{ display: "flex", fontSize: 40, fontStyle: "italic", marginTop: 20 }}>{p.subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: pal.spark }}>{`${profile.name} — ${profile.role}`}</div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
