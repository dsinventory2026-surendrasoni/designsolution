/**
 * robots.js — Dynamic robots.txt generation via Next.js App Router
 *
 * Accessible at: https://www.dsgroupofcompanies.in/robots.txt
 *
 * Strategy:
 * - Allow all public-facing pages for search engine and AI crawlers
 * - Block admin, private dashboard, and internal API routes
 * - Explicit sitemap declaration
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
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.dsgroupofcompanies.in/sitemap.xml",
    host: "https://www.dsgroupofcompanies.in",
  };
}
