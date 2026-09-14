/**
 * robots.js — Dynamic robots.txt generation via Next.js App Router
 *
 * Accessible at: https://www.dsgroupofcompanies.in/robots.txt
 *
 * Strategy:
 * - Allow all public-facing pages for search engine and AI crawlers
 * - Block admin, private dashboard, and internal API routes
 * - Explicit canonical sitemap declaration
 */

export default function robots() {
  const disallowedPaths = ["/admin", "/admin/*", "/api", "/api/*"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: disallowedPaths,
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: disallowedPaths,
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: disallowedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/"],
        disallow: disallowedPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/"],
        disallow: disallowedPaths,
      },
    ],
    sitemap: "https://www.dsgroupofcompanies.in/sitemap.xml",
    host: "https://www.dsgroupofcompanies.in",
  };
}
