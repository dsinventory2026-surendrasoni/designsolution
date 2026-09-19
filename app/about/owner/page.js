// app/about/owner/page.js
import AboutOwnerView from "@/components/AboutOwnerView";
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
    console.error("Error fetching config for /about/owner:", err);
    return fallbackConfig;
  }
}

export async function generateMetadata() {
  const config = await getConfig();
  const owner = config?.about?.ownerDetails || {};
  const brand = config?.brand || fallbackConfig.brand;

  return {
    title: `About Founder & MD ${owner.name || "Surendra Soni"} | ${brand.name}`,
    description: owner.bio
      ? owner.bio.slice(0, 160)
      : `Meet Surendra Soni, Founder & Managing Director of DS Group of Companies in Sector 85 Gurugram.`,
    keywords: [
      "Surendra Soni real estate",
      "DS Group owner details",
      "Surendra Soni Gurgaon builder",
      "DS Group founder managing director",
      "Surendra Soni Sector 85",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about/owner",
    },
  };
}

export default async function AboutOwnerPage() {
  const config = await getConfig();
  return (
    <>
      <Navbar siteConfig={config} />
      <AboutOwnerView siteConfig={config} />
      <Footer siteConfig={config} />
    </>
  );
}
