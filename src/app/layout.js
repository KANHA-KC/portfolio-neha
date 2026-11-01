import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import JsonLd from "@/components/JsonLd";
import { getProfile, getProjects } from "@/content";
import { SITE_URL, personSchema, websiteSchema } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap"
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap"
});

export async function generateMetadata() {
  const p = await getProfile();
  const title = `${p.name} — ${p.role}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${p.name}` },
    description: p.intro,
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
    icons: { icon: "/brand/monogram.png", apple: "/brand/monogram.png" },
    openGraph: {
      title,
      description: p.headline || p.intro,
      url: "/",
      siteName: `${p.name} — Portfolio`,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/brand/logo.png", alt: `${p.name} logo` }]
    },
    twitter: { card: "summary_large_image", title, description: p.headline || p.intro, images: ["/brand/logo.png"] }
  };
}

export const viewport = {
  themeColor: "#FCFAF6"
};

export default async function RootLayout({ children }) {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Preloader />
        <Cursor />
        <Nav profile={profile} workCount={projects.length} />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <JsonLd data={[personSchema(profile), websiteSchema(profile)]} />
      </body>
    </html>
  );
}
