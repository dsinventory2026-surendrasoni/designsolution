// app/page.js
// Server Component - fetches live data from MongoDB and passes to client components

import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPortfolio from "@/components/FeaturedPortfolio";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import LocationSection from "@/components/LocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import HomeClient from "@/components/HomeClient";
import { siteConfig as staticConfig } from "@/data/siteConfig";
import { propertiesData as staticProps } from "@/data/propertiesData";

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

export default async function Home() {
  const [siteConfigData, propertiesData] = await Promise.all([
    fetchSiteConfig(),
    fetchProperties(),
  ]);

  return (
    <HomeClient
      siteConfigData={siteConfigData}
      propertiesData={propertiesData}
    />
  );
}
