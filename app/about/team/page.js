// app/about/team/page.js
import AboutTeamView from "@/components/AboutTeamView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { siteConfig as fallbackConfig } from "@/data/siteConfig";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    console.error("Error fetching config for /about/team:", err);
    return fallbackConfig;
  }
}

export async function generateMetadata() {
  const config = await getConfig();
  const brand = config?.brand || fallbackConfig.brand;

  return {
    title: `Our Team & Employee Directory | ${brand.name} Sector 85 Gurgaon`,
    description: `Meet the multidisciplinary team of engineers, architects, legal advisors, and sales executives behind ${brand.name} in Gurugram.`,
    keywords: [
      "DS Group employees",
      "DS Group team directory",
      "real estate consultants Gurgaon",
      "DS Group architects engineers",
      "DS Group management Gurgaon",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about/team",
    },
  };
}

export default async function AboutTeamPage() {
  const config = await getConfig();
  return (
    <>
      <Navbar siteConfig={config} />
      <AboutTeamView siteConfig={config} />
      <Footer siteConfig={config} />
    </>
  );
}
