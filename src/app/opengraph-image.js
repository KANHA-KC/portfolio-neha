import { ImageResponse } from "next/og";
import { getProfile } from "@/content";
import { OG_COLORS as C, OG_SIZE, ogFonts, ogImageSrc } from "@/lib/og";

export const alt = "Neha Ondhia - Brand, Graphic Designer, Illustrator";
export const size = OG_SIZE;
export const contentType = "image/png";

// Site-wide share card, used by every page that doesn't have its own.
export default async function Image() {
  const [p, logo] = await Promise.all([getProfile(), ogImageSrc("/brand/icon-192.png")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#027989", color: C.canvas, padding: "64px 80px", fontFamily: "Montreal" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: C.pearl }}>{p.location}</div>
          {logo ? <img src={logo} alt="" width={112} height={112} style={{ borderRadius: 20 }} /> : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 124, lineHeight: 1, letterSpacing: -4 }}>{p.name}</div>
          <div style={{ display: "flex", fontSize: 48, fontFamily: "Montreal", fontStyle: "italic", color: "#c7db0a", marginTop: 18 }}>Brand, Graphic Designer, Illustrator</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: C.aqua }}>Logo design · Brand identity · Packaging · UX</div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
