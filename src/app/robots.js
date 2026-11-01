import { absolute } from "@/lib/seo";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/")
  };
}
