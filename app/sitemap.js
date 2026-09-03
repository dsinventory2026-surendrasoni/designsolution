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

const SITE_URL = "https://www.dsgroupofcompanies.in";

// ISR: revalidate sitemap every 60s so newly published blogs & properties appear automatically
export const revalidate = 60;

/**
 * Automatically discovers static public routes from the App Router.
 * Walks the app/ directory and finds any page.(js|jsx|ts|tsx).
 * Automatically excludes:
 * - admin pages (/admin, /admin/dashboard)
 * - API routes (/api/*)
 * - authentication routes
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

      const hasPage = entries.some(
        (e) => !e.isDirectory() && /^page\.(js|jsx|ts|tsx)$/.test(e.name)
      );

      if (hasPage) {
        routes.push(currentPath === "" ? "/" : currentPath);
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
  const now = new Date();
  const urlMap = new Map();

  // Helper to add unique entry to sitemap, preventing duplicate URLs
  const addEntry = (entry) => {
    if (!entry || !entry.url) return;
    // Strip trailing slash (except root) and eliminate any hash anchors
    let cleanUrl = entry.url.split("#")[0].trim();
    if (cleanUrl !== SITE_URL && cleanUrl.endsWith("/")) {
      cleanUrl = cleanUrl.slice(0, -1);
    }
    // Prevent duplicate entries
    if (!urlMap.has(cleanUrl)) {
      urlMap.set(cleanUrl, {
        ...entry,
        url: cleanUrl,
      });
    }
  };

  // ─── 1. Homepage & Core Discovered Static Pages ──────────────────────────────
  const discoveredRoutes = discoverStaticPublicRoutes();

  // Route-specific priority and frequency mapping
  for (const route of discoveredRoutes) {
    if (route === "/") {
      addEntry({
        url: SITE_URL,
        lastModified: now,
        changeFrequency: "daily",
        priority: 1.0,
      });
    } else if (route === "/blog") {
      addEntry({
        url: `${SITE_URL}/blog`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
      });
    } else if (route === "/valuable-properties") {
      addEntry({
        url: `${SITE_URL}/valuable-properties`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    } else if (
      route === "/enquire" ||
      route === "/prelaunch" ||
      route.startsWith("/prelaunch/")
    ) {
      addEntry({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    } else if (
      route === "/residential" ||
      route === "/commercial" ||
      route === "/plots" ||
      route === "/construction"
    ) {
      // Important category listing pages if they exist as dedicated routes
      addEntry({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    } else {
      // Any other newly discovered public page
      addEntry({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Ensure core static routes are always present even if filesystem discovery is restricted
  const coreFallbackRoutes = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/enquire`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/prelaunch`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/prelaunch/ninezero`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/valuable-properties`, changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const item of coreFallbackRoutes) {
    if (!urlMap.has(item.url)) {
      addEntry({
        url: item.url,
        lastModified: now,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      });
    }
  }

  // ─── 2. Dynamic Valuable Properties ──────────────────────────────────────────
  let dynamicProperties = [];
  try {
    await connectDB();
    const dbProps = await ValuableProperty.find({ publishStatus: "Published" })
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    if (dbProps && dbProps.length > 0) {
      dynamicProperties = dbProps
        .filter((p) => p.slug)
        .map((p) => ({
          url: `${SITE_URL}/valuable-properties/${p.slug}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.85,
        }));
    }
  } catch (error) {
    console.error("Error querying valuable properties from DB for sitemap:", error);
    // API fallback
    try {
      const res = await fetch(`${SITE_URL}/api/valuable-properties?limit=1000`, {
        next: { revalidate: 60 },
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
      // API not reachable
    }
  }

  // Fallback to static properties if no dynamic properties were resolved
  if (dynamicProperties.length === 0) {
    dynamicProperties = fallbackProperties.map((p) => ({
      url: `${SITE_URL}/valuable-properties/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  }

  for (const prop of dynamicProperties) {
    addEntry(prop);
  }

  // ─── 3. Dynamic Blog Posts ──────────────────────────────────────────────────
  let dynamicBlogs = [];
  try {
    await connectDB();
    const dbBlogs = await Blog.find({ isPublished: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    if (dbBlogs && dbBlogs.length > 0) {
      dynamicBlogs = dbBlogs
        .filter((b) => b.slug)
        .map((b) => ({
          url: `${SITE_URL}/blog/${b.slug}`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error("Error querying blogs from DB for sitemap:", error);
    // API fallback
    try {
      const res = await fetch(`${SITE_URL}/api/admin/blogs`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          dynamicBlogs = data.data
            .filter((b) => b.isPublished !== false && b.slug)
            .map((b) => ({
              url: `${SITE_URL}/blog/${b.slug}`,
              lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
              changeFrequency: "weekly",
              priority: 0.8,
            }));
        }
      }
    } catch {
      // API not reachable
    }
  }

  // Fallback to static blog data if no dynamic blogs were resolved
  if (dynamicBlogs.length === 0) {
    dynamicBlogs = fallbackBlogs
      .filter((b) => b.slug)
      .map((b) => ({
        url: `${SITE_URL}/blog/${b.slug}`,
        lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  }

  for (const blog of dynamicBlogs) {
    addEntry(blog);
  }

  return Array.from(urlMap.values());
}
