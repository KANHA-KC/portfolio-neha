import { LogoCloud } from "@/components/ui/logo-cloud-2";

// Images are cropped to the logo. Height is set optically: wide wordmarks get shorter, compact
// marks taller, so every logo carries a similar visual weight. `t` fine-tunes heavy/light marks.
const LOGOS = [
  { name: "Amazon", file: "amazon", w: 860, h: 258 },
  { name: "Apollo Hospitals", file: "apollo-hospitals", w: 681, h: 500 },
  { name: "HDFC Life", file: "hdfc-life", w: 778, h: 500, t: 0.95 },
  { name: "Salesforce", file: "salesforce", w: 583, h: 408 },
  { name: "Landmark Infratech", file: "landmark-infratech", w: 851, h: 500, t: 1.05 },
  { name: "TCS", file: "tcs", w: 582, h: 359, t: 0.8 },
  { name: "Dabur Chyawanprash", file: "dabur-chyawanprash", w: 694, h: 409 },
  { name: "Airtel Business", file: "airtel-business", w: 859, h: 274 },
  { name: "Lighthouse Canton", file: "lighthouse-canton", w: 859, h: 210 },
  { name: "Drink Prime", file: "drink-prime", w: 701, h: 500 },
  { name: "Sterling", file: "sterling", w: 860, h: 310 },
  { name: "Orion Uptown", file: "orion-uptown", w: 859, h: 230 }
].map((l) => ({
  src: `/logo-marquee/${l.file}.png`,
  alt: l.name,
  width: l.w,
  height: l.h,
  scale: Math.pow(l.w / l.h / 1.7, -0.45) * (l.t ?? 1)
}));

export default function BrandLogos() {
  return <LogoCloud logos={LOGOS} />;
}
