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
    title: `About Company | ${brand.name} — Property Dealer & Real Estate Consultant in Gurgaon`,
    description: company.story
      ? company.story.slice(0, 160)
      : `Learn about ${brand.name}, trusted property dealer and real estate consultant in Gurgaon offering residential flats, commercial properties, and plots.`,
    keywords: company.seoKeywords || [
      "DS Group of Companies",
      "DS Group of Companies about company",
      "property dealer in Gurgaon",
      "property consultant in Gurgaon",
      "real estate company in Gurgaon",
      "DS Group history story",
      "Sector 85 Gurgaon",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about/company",
    },
    openGraph: {
      title: `About Company | ${brand.name} — Gurgaon`,
      description: company.story ? company.story.slice(0, 160) : `Learn about ${brand.name}, trusted property dealer and real estate consultant in Gurgaon.`,
      url: "https://www.dsgroupofcompanies.in/about/company",
      siteName: "DS Group of Companies",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `About Company | ${brand.name}`,
      description: `Learn about ${brand.name}, trusted property dealer in Gurgaon.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
