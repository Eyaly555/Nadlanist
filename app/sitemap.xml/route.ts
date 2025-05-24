import { getAllPostSlugs } from "@/lib/blog";
import { NextResponse } from "next/server";
import { ApiProject } from "../projects/api-project.types";
import { getAllProjects } from '@/lib/supabase/services/projectService';

export async function GET() {
  const baseUrl = "https://nadlanist.ai";

  // נתיבים סטטיים
  const staticPaths = [
    "/",
    "/blog",
    "/buyers",
    "/sellers",
    "/developers",
    "/contact",
    "/privacy",
    "/terms",
    "/thank-you",
    "/vision",
    "/dashboard",
  ];

  // שליפת כל הסלגים של הבלוג
  const slugs = await getAllPostSlugs();
  const dynamicPaths = slugs.map(({ params }) => `/blog/${params.slug}`);

  // =============================================================================
  // הוספת הפרויקטים ל-sitemap (100 הראשונים)
  // =============================================================================
  let projects: ApiProject[] = [];
  try {
    projects = await getAllProjects();
  } catch {}
  const projectPaths = projects.slice(0, 100).map((p) => `/projects/${p.id}`);
  // =============================================================================

  // בנה את חלק ה-<url> לכל הנתיבים
  const allPaths = [...staticPaths, ...dynamicPaths, ...projectPaths];
  const urls = allPaths
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/blog" ? "0.9" : "0.6"}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
} 