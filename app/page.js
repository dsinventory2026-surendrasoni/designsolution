// app/page.js
// Server Component - fetches live data from MongoDB and passes to client components

import { headers } from "next/headers";
import HomeClient from "@/components/HomeClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import { propertiesData as staticProps } from "@/data/propertiesData";
import { faqData } from "@/components/FAQSection";
import JsonLd from "@/components/seo/JsonLd";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  getFAQSchema,
} from "@/lib/seo";

// ─── Homepage Metadata ────────────────────────────────────────────────────────
// Overrides the layout.js defaults with targeted brand & local real estate search terms.
export const metadata = {
  title: "DS Group of Companies | Luxury Real Estate & Property in Sector 85 Gurgaon",
  description:
    "DS Group of Companies is the leading real estate consultant and property finder in Sector 85 Gurgaon. Explore luxury flats, 3 BHK apartments, commercial spaces, plots, Godrej Air, and Pyramid Heights in Gurugram.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in",
  },
  openGraph: {
    title: "DS Group of Companies | Luxury Real Estate & Property in Sector 85 Gurgaon",
    description:
      "Explore luxury residential flats, commercial properties, and turnkey construction in Sector 85 Gurugram with DS Group of Companies. 18+ years of engineering excellence.",
    url: "https://www.dsgroupofcompanies.in",
    siteName: "DS Group of Companies",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.dsgroupofcompanies.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DS Group of Companies — Real Estate Consultant Sector 85 Gurgaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Group of Companies | Real Estate in Sector 85 Gurgaon",
    description:
      "Premier luxury residential, commercial, and plot investments in Gurugram. Connect with DS Group of Companies today.",
    images: ["https://www.dsgroupofcompanies.in/images/logo.png"],
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
      {/* Server-rendered — fully crawlable by Google, Bing, & AI search engines */}
      <JsonLd
        schema={[
          getOrganizationSchema(),
          getLocalBusinessSchema(),
          getWebSiteSchema(),
          getFAQSchema(faqData),
        ].filter(Boolean)}
      />

      {/* ─── Client Application Shell ─────────────────────────────────────── */}
      <HomeClient
        siteConfigData={siteConfigData}
        propertiesData={propertiesData}
      />
    </>
  );
}
