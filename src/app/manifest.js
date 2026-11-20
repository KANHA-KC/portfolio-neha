import { getProfile } from "@/content";

export default async function manifest() {
  const p = await getProfile();
  return {
    name: `${p.name} — ${p.role}`,
    short_name: p.name,
    description: p.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F4F4",
    theme_color: "#056E7F",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
}
