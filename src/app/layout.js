import { Patrick_Hand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import JsonLd from "@/components/JsonLd";
import { getCategories, getProfile, getProjects } from "@/content";
import { SITE_URL, clip, personSchema, websiteSchema } from "@/lib/seo";

// Type system — PP Neue Montreal everywhere; Aubrey only for the big hero words.
const montreal = localFont({
  src: [
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-thin.otf", weight: "100", style: "normal" },
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-thin.otf", weight: "300", style: "normal" },
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-book.otf", weight: "400", style: "normal" },
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-italic.otf", weight: "400", style: "italic" },
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-semibolditalic.otf", weight: "600", style: "italic" },
    { path: "../fonts/pp-neue-montreal/ppneuemontreal-bold.otf", weight: "700", style: "normal" }
  ],
  variable: "--font-montreal",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"]
});

// Aubrey (the designer's own display face) only covers basic A–Z, digits and ASCII punctuation,
// so anything else falls back to Montreal (see --f-aubrey in globals.css).
const aubrey = localFont({
  src: "../fonts/aubrey/Aubrey-Display.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-aubrey",
  display: "swap"
});

// Handwritten notes font (Patrick Hand)
const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-patrick",
  display: "swap"
});

export async function generateMetadata() {
  const p = await getProfile();
  const title = `${p.name} — ${p.role}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${p.name}` },
    description: clip(p.intro),
    applicationName: `${p.name} Portfolio`,
    authors: [{ name: p.name, url: SITE_URL }],
    creator: p.name,
    keywords: [
      p.name,
      "UX designer Mumbai",
      "graphic designer India",
      "logo designer",
      "brand identity designer",
      "product designer portfolio",
      "UI UX portfolio",
      "packaging design",
      "design systems"
    ],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }
      ],
      apple: { url: "/brand/apple-icon.png", sizes: "180x180" }
    },
    openGraph: {
      title,
      description: clip(p.headline || p.intro),
      url: "/",
      siteName: `${p.name} — Portfolio`,
      type: "website",
      locale: "en_IN"
    },
    twitter: { card: "summary_large_image", title, description: clip(p.headline || p.intro) }
  };
}

export const viewport = {
  themeColor: "#F4F4F4"
};

export default async function RootLayout({ children }) {
  const [profile, projects, categories] = await Promise.all([getProfile(), getProjects(), getCategories()]);
  return (
    <html lang="en" className={`${montreal.variable} ${aubrey.variable} ${patrick.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Preloader />
        <Cursor />
        <Nav profile={profile} workCount={projects.length} />
        <main id="main">{children}</main>
        <Footer site={profile} categories={categories} />
        <div className="grain" aria-hidden="true" />
        <JsonLd data={[personSchema(profile), websiteSchema(profile)]} />
      </body>
    </html>
  );
}
