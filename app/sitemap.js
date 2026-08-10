/**
 * sitemap.js — Dynamic XML Sitemap via Next.js App Router
 *
 * Accessible at: https://www.dsgroupofcompanies.in/sitemap.xml
 *
 * Included:
 * - Static pages: homepage, enquire
 * - Dynamic: /valuable-properties/[slug] (fetched from API at build/ISR time)
 *
 * Excluded:
 * - /admin, /admin/dashboard (private)
 * - /api/* (not indexable)
 * - /new-launches/[slug] (directory exists but no property pages yet)
 */

const SITE_URL = "https://www.dsgroupofcompanies.in";

export default async function sitemap() {
  // ─── Static Pages ──────────────────────────────────────────────────────────
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/enquire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ─── Dynamic: Valuable Properties ─────────────────────────────────────────
  let valuablePropertyPages = [];
  try {
    const res = await fetch(`${SITE_URL}/api/valuable-properties`, {
      next: { revalidate: 3600 }, // revalidate every hour
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        valuablePropertyPages = data.data
          .filter((p) => p.slug) // only include entries with a slug
          .map((p) => ({
            url: `${SITE_URL}/valuable-properties/${p.slug}`,
            lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
          }));
      }
    }
  } catch {
    // If the API is unreachable at build time, omit dynamic pages gracefully.
    // The sitemap will still include static pages.
  }

  return [...staticPages, ...valuablePropertyPages];
}
