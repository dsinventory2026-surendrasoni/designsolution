// app/page.js
// Server Component - fetches live data from MongoDB and passes to client components

import { headers } from "next/headers";
import HomeClient from "@/components/HomeClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import { propertiesData as staticProps } from "@/data/propertiesData";
import JsonLd from "@/components/seo/JsonLd";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
} from "@/lib/seo";

// ─── Homepage Metadata ────────────────────────────────────────────────────────
// Overrides the layout.js defaults with homepage-specific values.
export const metadata = {
  title: "DS Group of Companies | Premium Real Estate & Property in Gurugram",
  description:
    "DS Group of Companies — Premier real estate developer in Gurugram offering luxury residential apartments, commercial office spaces, freehold plots, and turnkey construction services in Sector 85 and surrounding areas.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in",
  },
  openGraph: {
    title: "DS Group of Companies | Premium Real Estate & Property in Gurugram",
    description:
      "Explore premium residential, commercial, plot and new launch properties in Gurugram with DS Group of Companies. 18+ years of engineering excellence.",
    url: "https://www.dsgroupofcompanies.in",
    type: "website",
  },
};

// ─── Data Fetchers ────────────────────────────────────────────────────────────

async function fetchSiteConfig() {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/admin/siteconfig`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success) return data.data;
    return staticConfig;
  } catch {
    return staticConfig;
  }
}

async function fetchProperties() {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/admin/properties`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success) return data.data;
    return staticProps;
  } catch {
    return staticProps;
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function Home() {
  const [siteConfigData, propertiesData] = await Promise.all([
    fetchSiteConfig(),
    fetchProperties(),
  ]);

  return (
    <>
      {/* ─── Structured Data / JSON-LD ───────────────────────────────────── */}
      {/* Server-rendered — fully crawlable by Google without JavaScript     */}
      <JsonLd
        schema={[
          getOrganizationSchema(),
          getLocalBusinessSchema(),
          getWebSiteSchema(),
        ]}
      />

      {/* ─── Client Application Shell ─────────────────────────────────────── */}
      <HomeClient
        siteConfigData={siteConfigData}
        propertiesData={propertiesData}
      />
    </>
  );
}
