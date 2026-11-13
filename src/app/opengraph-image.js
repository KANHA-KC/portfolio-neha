import { ImageResponse } from "next/og";
import { getProfile } from "@/content";
import { OG_COLORS as C, OG_SIZE, ogFonts } from "@/lib/og";

export const alt = "Neha Ondhia — portfolio";
export const size = OG_SIZE;
export const contentType = "image/png";

// Site-wide share card, used by every page that doesn't have its own.
export default async function Image() {
  const p = await getProfile();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: C.teal, color: C.canvas, padding: "72px 80px", fontFamily: "Cralika" }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: C.pearl }}>{p.location}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, lineHeight: 1, letterSpacing: -4 }}>{p.name}</div>
          <div style={{ display: "flex", fontSize: 52, fontStyle: "italic", color: C.gold, marginTop: 18 }}>{p.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: C.aqua }}>Logo design · Brand identity · Packaging · UX</div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
