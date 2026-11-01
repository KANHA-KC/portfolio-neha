import { getProfile } from "@/content";

export default async function manifest() {
  const p = await getProfile();
  return {
    name: `${p.name} — ${p.role}`,
    short_name: p.name,
    description: p.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#FCFAF6",
    theme_color: "#0B4F5E",
    icons: [{ src: "/brand/monogram.png", sizes: "227x127", type: "image/png" }]
  };
}
