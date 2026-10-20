import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"]
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

export const metadata = {
  title: {
    default: "Neha Ondhia — UX & Product Designer",
    template: "%s — Neha Ondhia"
  },
  description:
    "Neha Ondhia is a UX & product designer in Mumbai crafting research-led, accessible digital products across fintech, healthtech and enterprise SaaS.",
  keywords: ["UX Designer", "Product Designer", "Design Systems", "User Research", "Accessibility", "Mumbai"],
  authors: [{ name: "Neha Ondhia" }],
  icons: { icon: "/brand/monogram.png" },
  openGraph: {
    title: "Neha Ondhia — UX & Product Designer",
    description: "Designing human things for digital places.",
    type: "website",
    locale: "en_US",
    images: ["/brand/logo.png"]
  }
};

export const viewport = {
  themeColor: "#FCFAF6"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Preloader />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
