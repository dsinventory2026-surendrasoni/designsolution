/**
 * robots.js — Dynamic robots.txt generation via Next.js App Router
 *
 * Accessible at: https://www.dsgroupofcompanies.in/robots.txt
 *
 * Strategy:
 * - Allow all public-facing pages for search engine crawlers
 * - Block admin, private dashboard, and API routes
 * - CSS, JS, images are NOT blocked (critical for rendering)
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin",
          "/admin/",
          "/admin/dashboard",
          "/admin/dashboard/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.dsgroupofcompanies.in/sitemap.xml",
    host: "https://www.dsgroupofcompanies.in",
  };
}
