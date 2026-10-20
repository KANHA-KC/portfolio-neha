import Link from "next/link";
import WorkList from "@/components/work/WorkList";
import { projectsData } from "@/data/portfolioData";

export const metadata = {
  title: "Work",
  description: "Selected UX & product design case studies by Neha Ondhia — fintech, healthtech and enterprise design systems."
};

export default function WorkPage() {
  return (
    <section className="page work-page">
      <header className="page-head">
        <p className="eyebrow">Index — {projectsData.length} case studies</p>
        <h1 className="page-title">
          Selected <em>work</em>
          <sup>({String(projectsData.length).padStart(2, "0")})</sup>
        </h1>
        <p className="page-lede">
          A handful of projects where research, systems thinking and a lot of sticky notes turned into products people
          rely on every day.
        </p>
        <span className="hand page-hand">hover a row — something peeks out ↓</span>
      </header>
      <WorkList />
      <aside className="nda-note">
        <span className="sticker sticker--gold">psst</span>
        <p>
          Some of my favourite work lives behind NDAs. Happy to walk you through it on a call —{" "}
          <Link href="/contact" className="link-underline">just ask</Link>.
        </p>
      </aside>
    </section>
  );
}
