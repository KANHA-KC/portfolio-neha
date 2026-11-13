import { getCategories, getProjects } from "@/content";
import { absolute, categoryPath, projectPath } from "@/lib/seo";

// Built from CMS content, so new projects and disciplines are listed automatically.
export default async function sitemap() {
  const [projects, categories] = await Promise.all([getProjects(), getCategories()]);
  return [
    { url: absolute("/"), changeFrequency: "monthly", priority: 1 },
    { url: absolute("/work"), changeFrequency: "weekly", priority: 0.9 },
    { url: absolute("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/contact"), changeFrequency: "yearly", priority: 0.6 },
    ...categories.map((c) => ({ url: absolute(categoryPath(c.slug)), changeFrequency: "weekly", priority: 0.8 })),
    ...projects.map((p) => ({
      url: absolute(projectPath(p.slug)),
      changeFrequency: "monthly",
      priority: p.featured ? 0.8 : 0.7,
      ...((p.cover || p.thumbnail)?.src && { images: [absolute((p.cover || p.thumbnail).src)] })
    }))
  ];
}
