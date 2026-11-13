// Shared SEO helpers: absolute URLs and schema.org (JSON-LD) builders.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const absolute = (path = "/") => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

// Search results show ~155 characters; cut longer text at a word boundary.
export const clip = (text = "", max = 155) => {
  const t = String(text).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max - 1)).replace(/[,;:—–-]$/, "") + "…";
};

// Pages that set their own `openGraph` replace the layout's, so they re-add the generated site card (app/opengraph-image.js).
export const SITE_OG_IMAGES = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Neha Ondhia — portfolio" }];

export const categoryPath = (slug) => `/work/category/${slug}`;
export const projectPath = (slug) => `/work/${slug}`;

export function personSchema(profile) {
  return {
    "@type": "Person",
    "@id": absolute("/#person"),
    name: profile.name,
    jobTitle: profile.role,
    description: profile.intro,
    url: absolute("/"),
    email: profile.email ? `mailto:${profile.email}` : undefined,
    image: profile.portrait?.src ? absolute(profile.portrait.src) : undefined,
    address: profile.location ? { "@type": "PostalAddress", addressLocality: profile.location.split(",")[0].trim(), addressCountry: profile.location.split(",").pop().trim() } : undefined,
    sameAs: profile.socials.map((s) => s.href).filter(Boolean),
    knowsAbout: ["UX design", "Product design", "Logo design", "Brand identity", "Graphic design", "Design systems", "Accessibility"]
  };
}

export function websiteSchema(profile) {
  return {
    "@type": "WebSite",
    "@id": absolute("/#website"),
    url: absolute("/"),
    name: `${profile.name} — Portfolio`,
    description: profile.headline || profile.intro,
    inLanguage: "en",
    publisher: { "@id": absolute("/#person") }
  };
}

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absolute(it.href) }))
  };
}

export function projectSchema(project) {
  return {
    "@type": "CreativeWork",
    "@id": absolute(`${projectPath(project.slug)}#work`),
    name: project.title,
    headline: project.title,
    description: project.summary || project.subtitle,
    url: absolute(projectPath(project.slug)),
    image: (project.cover || project.thumbnail)?.src ? absolute((project.cover || project.thumbnail).src) : undefined,
    genre: project.categoryTitle,
    keywords: [project.categoryTitle, ...project.tags].filter(Boolean).join(", "),
    dateCreated: project.year || undefined,
    creator: { "@id": absolute("/#person") },
    sourceOrganization: project.client && project.client !== "Client name" ? { "@type": "Organization", name: project.client } : undefined
  };
}

export function collectionSchema({ name, description, path, projects }) {
  return {
    "@type": "CollectionPage",
    name,
    description,
    url: absolute(path),
    isPartOf: { "@id": absolute("/#website") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absolute(projectPath(p.slug)), name: p.title }))
    }
  };
}
