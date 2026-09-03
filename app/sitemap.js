/**
 * sitemap.js — Dynamic XML Sitemap via Next.js App Router
 *
 * Accessible at: https://www.dsgroupofcompanies.in/sitemap.xml
 */

import { propertiesData as fallbackProperties } from "@/data/propertiesData";

const SITE_URL = "https://www.dsgroupofcompanies.in";

export default async function sitemap() {
  const now = new Date();

  // ─── Static Core Pages ──────────────────────────────────────────────────────
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/enquire`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/prelaunch`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/prelaunch/ninezero`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // ─── Dynamic: Valuable Properties ─────────────────────────────────────────
  let dynamicProperties = [];
  try {
    const res = await fetch(`${SITE_URL}/api/valuable-properties`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        dynamicProperties = data.data
          .filter((p) => p.slug)
          .map((p) => ({
            url: `${SITE_URL}/valuable-properties/${p.slug}`,
            lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.85,
          }));
      }
    }
  } catch {
    // API not reachable during static build, use static data fallback
    dynamicProperties = fallbackProperties.map((p) => ({
      url: `${SITE_URL}/valuable-properties/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  }

  // If no dynamic properties were parsed from API, use fallback properties
  if (dynamicProperties.length === 0) {
    dynamicProperties = fallbackProperties.map((p) => ({
      url: `${SITE_URL}/valuable-properties/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  }

  return [...staticPages, ...dynamicProperties];
}
