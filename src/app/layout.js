import localFont from "next/font/local";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { getProfile, getProjects } from "@/content";

const cralika = localFont({
  src: [
    {
      path: "../fonts/Cralika.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/Cralika-Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ],
  variable: "--font-cralika",
  display: "swap"
});

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: title, template: `%s — ${p.name}` },
    description: p.intro,
    authors: [{ name: p.name }],
    icons: { icon: "/brand/monogram.png" },
    openGraph: { title, description: p.headline, type: "website", locale: "en_US", images: ["/brand/logo.png"] }
  };
}

export const viewport = {
  themeColor: "#FCFAF6"
};

export default async function RootLayout({ children }) {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <html lang="en" className={`${cralika.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Preloader />
        <Cursor />
        <Nav profile={profile} workCount={projects.length} />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
