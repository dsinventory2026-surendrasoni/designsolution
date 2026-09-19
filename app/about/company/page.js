// app/about/company/page.js
import AboutCompanyView from "@/components/AboutCompanyView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { siteConfig as fallbackConfig } from "@/data/siteConfig";

export const revalidate = 60;

async function getConfig() {
  try {
    await connectDB();
    const configDoc = await getOrCreateConfig();
    const config = JSON.parse(JSON.stringify(configDoc));
    if (config?.contact && !config.contact.address) {
      config.contact.address = {
        plot: config.contact.addressPlot || "Plot Sector 85",
        tower: config.contact.addressTower || "Tower 7",
        floor: config.contact.addressFloor || "3rd Floor",
        city: config.contact.addressCity || "Gurugram",
        state: config.contact.addressState || "Haryana",
        pincode: config.contact.addressPincode || "122004",
        country: config.contact.addressCountry || "India",
      };
    }
    return config;
  } catch (err) {
    console.error("Error fetching config for /about/company:", err);
    return fallbackConfig;
  }
}

export async function generateMetadata() {
  const config = await getConfig();
  const company = config?.about?.companyDetails || {};
  const brand = config?.brand || fallbackConfig.brand;

  return {
    title: `About Company | ${brand.name} — Sector 85 Gurgaon`,
    description: company.story
      ? company.story.slice(0, 160)
      : `Learn about ${brand.name}, premier luxury real estate developer and construction firm in Sector 85 Gurugram.`,
    keywords: company.seoKeywords || [
      "DS Group of Companies about company",
      "real estate company Sector 85 Gurgaon",
      "luxury property developer Gurugram",
      "DS Group history story",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about/company",
    },
  };
}

export default async function AboutCompanyPage() {
  const config = await getConfig();
  return (
    <>
      <Navbar siteConfig={config} />
      <AboutCompanyView siteConfig={config} />
      <Footer siteConfig={config} />
    </>
  );
}
