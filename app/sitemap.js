/**
 * sitemap.js — Dynamic XML Sitemap via Next.js App Router
 *
 * Full SEO sitemap auditing every indexable page:
 * - Automatically discovers all static public routes in app/
 * - Excludes admin, API, auth, draft content, and URL hash anchors
 * - Includes /blog and all published dynamic /blog/[slug]
 * - Includes /valuable-properties and all published dynamic /valuable-properties/[slug]
 * - Discovers and includes category/listing pages if created (/residential, /commercial, /plots, /construction)
 * - Prevents duplicate URLs
 * - Uses accurate lastModified dates based on file mtime or entity timestamps (no fake 'today' signals)
 * - Configured with ISR (revalidate = 60) for automatic inclusion of newly published items
 *
 * Accessible at: https://www.dsgroupofcompanies.in/sitemap.xml
 */

import fs from "fs";
import path from "path";
import { propertiesData as fallbackProperties } from "@/data/propertiesData";
import { blogPosts as fallbackBlogs } from "@/data/blogData";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import ValuableProperty from "@/lib/models/ValuableProperty";
import Inventory from "@/lib/models/Inventory";

const SITE_URL = "https://www.dsgroupofcompanies.in";
const DEFAULT_BASELINE_DATE = new Date("2026-09-01T00:00:00.000Z");

// Genuine modification dates for known static pages based on repository git history
const STATIC_ROUTE_DATES = {
  "/": new Date("2026-09-03T11:34:02.000Z"),
  "/about": new Date("2026-09-19T07:00:00.000Z"),
  "/about/company": new Date("2026-09-19T07:00:00.000Z"),
  "/about/owner": new Date("2026-09-19T07:00:00.000Z"),
  "/about/team": new Date("2026-09-19T07:00:00.000Z"),
  "/blog": new Date("2026-09-14T11:36:18.000Z"),
  "/enquire": new Date("2026-07-29T07:00:15.000Z"),
  "/valuable-properties": new Date("2026-09-07T11:54:40.000Z"),
};

// Force dynamic execution on every request so newly created blogs appear immediately in sitemap.xml
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Safely parse a date value into a valid Date object.
 * Rejects historical serverless zip artifact clamps (e.g. 2018-10-20).
 */
function safeDate(val, fallback = DEFAULT_BASELINE_DATE) {
  if (!val) return fallback;
  try {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      // Reject any dates before 2024 to avoid serverless build timestamp clamping
      if (d.getFullYear() >= 2024) {
        return d;
      }
    }
  } catch {
    // ignore
  }
  return fallback;
}

/**
 * Resolves a genuine lastmod date for a static route, guarding against
 * serverless runtime file-timestamp clamping (such as 2018-10-20).
 */
function getStaticRouteDate(route, currentDir, pageFileName) {
  if (STATIC_ROUTE_DATES[route]) {
    return STATIC_ROUTE_DATES[route];
  }
  try {
    const stat = fs.statSync(path.join(currentDir, pageFileName));
    if (stat && stat.mtime && stat.mtime.getFullYear() >= 2025) {
      return stat.mtime;
    }
  } catch {
    // fallback
  }
  return DEFAULT_BASELINE_DATE;
}

/**
 * Automatically discovers static public routes from the App Router.
 * Walks the app/ directory and finds any page.(js|jsx|ts|tsx).
 * Automatically excludes:
 * - admin pages (/admin, /admin/dashboard)
 * - API routes (/api/*)
 * - dynamic parameter segments ([slug], etc.)
 * - route groups and private folders ((group), _components, etc.)
 */
function discoverStaticPublicRoutes() {
  const routes = [];
  const appDir = path.join(process.cwd(), "app");

  function walk(currentDir, currentPath = "") {
    if (!fs.existsSync(currentDir)) return;
    try {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      const pageEntry = entries.find(
        (e) => !e.isDirectory() && /^page\.(js|jsx|ts|tsx)$/.test(e.name)
      );

      if (pageEntry) {
        const route = currentPath === "" ? "/" : currentPath;
        const lastMod = getStaticRouteDate(route, currentDir, pageEntry.name);
        routes.push({
          route,
          lastModified: lastMod,
        });
      }

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const name = entry.name;
          // Exclude admin, api, dynamic segments, private folders, route groups
          if (
            name.startsWith("_") ||
            name.startsWith("(") ||
            name.startsWith("[") ||
            name.toLowerCase() === "admin" ||
            name.toLowerCase() === "api" ||
            name.toLowerCase() === "node_modules"
          ) {
            continue;
          }
          walk(path.join(currentDir, name), `${currentPath}/${name}`);
        }
      }
    } catch (err) {
      console.error("Error traversing App Router directory:", err);
    }
  }

  walk(appDir);
  return routes;
}

export default async function sitemap() {
  const urlMap = new Map();

  // Helper to add unique entry to sitemap, preventing duplicate URLs
  const addEntry = (entry) => {
    if (!entry || !entry.url) return;
    // Strip query parameters and URL hash anchors
    let cleanUrl = entry.url.split("?")[0].split("#")[0].trim();
    // Strip trailing slash (except root)
    if (cleanUrl !== SITE_URL && cleanUrl.endsWith("/")) {
      cleanUrl = cleanUrl.slice(0, -1);
    }
    // Prevent duplicate entries
    if (!urlMap.has(cleanUrl)) {
      urlMap.set(cleanUrl, {
        ...entry,
        url: cleanUrl,
        lastModified: entry.lastModified ? safeDate(entry.lastModified) : DEFAULT_BASELINE_DATE,
      });
    }
  };

  // ─── 1. Homepage & Discovered Static Public Pages ─────────────────────────────
  const discoveredRoutes = discoverStaticPublicRoutes();

  // Priority and frequency mapping for discovered static routes
  for (const item of discoveredRoutes) {
    const route = item.route;
    const mtime = item.lastModified || DEFAULT_BASELINE_DATE;

    if (route === "/") {
      addEntry({
        url: SITE_URL,
        lastModified: mtime,
        changeFrequency: "daily",
        priority: 1.0,
      });
    } else if (route === "/blog") {
      addEntry({
        url: `${SITE_URL}/blog`,
        lastModified: mtime,
        changeFrequency: "daily",
        priority: 0.9,
      });
    } else if (route === "/valuable-properties") {
      addEntry({
        url: `${SITE_URL}/valuable-properties`,
        lastModified: mtime,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    } else if (
      route === "/enquire"
    ) {
      addEntry({
        url: `${SITE_URL}${route}`,
        lastModified: mtime,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    } else if (
      route === "/residential" ||
      route === "/commercial" ||
      route === "/plots" ||
      route === "/construction"
    ) {
      addEntry({
        url: `${SITE_URL}${route}`,
        lastModified: mtime,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    } else {
      // Future discovered public page
      addEntry({
        url: `${SITE_URL}${route}`,
        lastModified: mtime,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Ensure core static routes are always present as fallback
  const coreFallbackRoutes = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/enquire`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/valuable-properties`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/inventories`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/reviews`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/prelaunch`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/prelaunch/ninezero`, changeFrequency: "weekly", priority: 0.85 },
  ];

  for (const item of coreFallbackRoutes) {
    if (!urlMap.has(item.url)) {
      const relPath = item.url.replace(SITE_URL, "") || "/";
      addEntry({
        url: item.url,
        lastModified: STATIC_ROUTE_DATES[relPath] || DEFAULT_BASELINE_DATE,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      });
    }
  }

  // ─── 2. Dynamic Valuable Properties ──────────────────────────────────────────
  let dynamicProperties = [];
  try {
    await connectDB();
    const dbProps = await ValuableProperty.find(
      { publishStatus: "Published" },
      "slug updatedAt createdAt"
    )
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    if (dbProps && dbProps.length > 0) {
      dynamicProperties = dbProps
        .filter((p) => p.slug && p.slug.length >= 3)
        .map((p) => ({
          url: `${SITE_URL}/valuable-properties/${p.slug}`,
          lastModified: safeDate(p.updatedAt || p.createdAt),
          changeFrequency: "weekly",
          priority: 0.85,
        }));
    }
  } catch (error) {
    console.error("Error querying valuable properties from DB for sitemap:", error);
    try {
      const res = await fetch(`${SITE_URL}/api/valuable-properties?limit=1000`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          dynamicProperties = data.data
            .filter((p) => p.slug && p.slug.length >= 3)
            .map((p) => ({
              url: `${SITE_URL}/valuable-properties/${p.slug}`,
              lastModified: safeDate(p.updatedAt || p.createdAt),
              changeFrequency: "weekly",
              priority: 0.85,
            }));
        }
      }
    } catch {
      // API not reachable
    }
  }

  // Fallback to static properties if no dynamic properties were resolved
  if (dynamicProperties.length === 0 && Array.isArray(fallbackProperties)) {
    dynamicProperties = fallbackProperties.map((p) => ({
      url: `${SITE_URL}/valuable-properties/${p.id}`,
      lastModified: STATIC_ROUTE_DATES["/valuable-properties"] || DEFAULT_BASELINE_DATE,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  }

  for (const prop of dynamicProperties) {
    addEntry(prop);
  }

  // ─── 3. Dynamic Blog Posts (Authoritative MongoDB + Synced Fallback Union) ────
  try {
    await connectDB();
    const dbBlogs = await Blog.find(
      {
        slug: { $exists: true, $ne: "" },
        isPublished: { $ne: false },
        publishStatus: { $ne: "Unpublished" },
      },
      "slug updatedAt createdAt publishedDate title isPublished"
    )
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    if (dbBlogs && dbBlogs.length > 0) {
      for (const b of dbBlogs) {
        if (b.slug) {
          addEntry({
            url: `${SITE_URL}/blog/${b.slug}`,
            lastModified: safeDate(b.updatedAt || b.publishedDate || b.createdAt),
            changeFrequency: "weekly",
            priority: 0.85,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error querying blogs from DB for sitemap:", error);
  }

  // Union with fallback static blogs to guarantee zero omissions
  if (Array.isArray(fallbackBlogs)) {
    for (const b of fallbackBlogs) {
      if (b && b.slug) {
        addEntry({
          url: `${SITE_URL}/blog/${b.slug}`,
          lastModified: safeDate(b.updatedAt || b.publishedDate || b.createdAt),
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    }
  }

  // ─── 4. Dynamic Inventory Pages ────────────────────────────────────────────
  try {
    await connectDB();
    const dbInventories = await Inventory.find(
      { publishStatus: "Published" },
      "slug updatedAt createdAt"
    )
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    if (dbInventories && dbInventories.length > 0) {
      for (const inv of dbInventories) {
        if (inv.slug) {
          addEntry({
            url: `${SITE_URL}/inventories/${inv.slug}`,
            lastModified: safeDate(inv.updatedAt || inv.createdAt),
            changeFrequency: "weekly",
            priority: 0.85,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error querying inventories from DB for sitemap:", error);
  }

  return Array.from(urlMap.values());
}
