// app/about/owner/page.js
import AboutOwnerView from "@/components/AboutOwnerView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";
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
    console.error("Error fetching config for /about/owner:", err);
    return fallbackConfig;
  }
}

export async function generateMetadata() {
  const config = await getConfig();
  const owner = config?.about?.ownerDetails || {};
  const brand = config?.brand || fallbackConfig.brand;

  return {
    title: `Surendra Soni | Founder & Managing Director | ${brand.name} Gurgaon`,
    description: owner.bio
      ? owner.bio.slice(0, 160)
      : `Meet Surendra Soni, Founder & Managing Director of DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon.`,
    keywords: [
      "Surendra Soni",
      "Surendra Soni real estate",
      "DS Group owner details",
      "Surendra Soni Gurgaon builder",
      "DS Group founder managing director",
      "property dealer in Gurgaon",
      "DS Group of Companies",
      "Surendra Soni Sector 85",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about/owner",
    },
    openGraph: {
      title: `Surendra Soni — Founder & MD | ${brand.name} Gurgaon`,
      description: owner.bio ? owner.bio.slice(0, 160) : `Meet Surendra Soni, Founder & MD of DS Group of Companies Gurgaon.`,
      url: "https://www.dsgroupofcompanies.in/about/owner",
      siteName: "DS Group of Companies",
      locale: "en_IN",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `Surendra Soni | ${brand.name}`,
      description: `Founder & Managing Director of DS Group of Companies Gurgaon.`,
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

export default async function AboutOwnerPage() {
  const config = await getConfig();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Surendra Soni – Founder & MD", href: "/about/owner" },
  ]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.dsgroupofcompanies.in/about/owner#person",
    name: "Surendra Soni",
    jobTitle: "Founder & Managing Director",
    worksFor: {
      "@type": "Organization",
      name: "DS Group of Companies",
      url: "https://www.dsgroupofcompanies.in",
      "@id": "https://www.dsgroupofcompanies.in/#organization",
    },
    url: "https://www.dsgroupofcompanies.in/about/owner",
    image: "https://www.dsgroupofcompanies.in/uploads/surendra-1789897616340.png",
    description:
      "Surendra Soni is the Founder and Managing Director of DS Group of Companies, leading real estate consultancy, investment advisory, and property development in Gurugram, Haryana with over 18 years of industry expertise.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District",
      addressLocality: "Sector 85, Gurugram",
      addressRegion: "Haryana",
      postalCode: "122004",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Gurugram Real Estate",
      "Property Valuation & Investment",
      "HRERA Regulatory Compliance",
      "New Gurgaon Residential & Commercial Corridors",
      "Dwarka Expressway Infrastructure",
    ],
  };

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, personSchema].filter(Boolean)} />
      <Navbar siteConfig={config} />
      <AboutOwnerView siteConfig={config} />
      <Footer siteConfig={config} />
    </>
  );
}
