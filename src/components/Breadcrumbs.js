import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// Visible breadcrumb trail + matching BreadcrumbList structured data.
// `items` = [{ name, href }, …]; the last item is the current page.
export default function Breadcrumbs({ items, className = "" }) {
  const trail = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`crumbs ${className}`}>
        <ol>
          {trail.map((it, i) => (
            <li key={it.href}>
              {i < trail.length - 1 ? <Link href={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
