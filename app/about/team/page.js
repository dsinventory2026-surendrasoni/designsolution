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
    title: `Our Team & Leadership | ${brand.name} Gurgaon`,
    description: `Meet the team of real estate specialists, property consultants, and engineers behind ${brand.name} — trusted property dealer in Gurgaon.`,
    keywords: [
      "DS Group of Companies",
      "DS Group team",
      "real estate consultants Gurgaon",
      "property dealer in Gurgaon",
      "property consultant in Gurgaon",
      "DS Group management Gurgaon",
      "Sector 85 Gurgaon",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/about/team",
    },
    openGraph: {
      title: `Our Team & Leadership | ${brand.name} Gurgaon`,
      description: `Meet the team of real estate consultants and engineers behind ${brand.name}.`,
      url: "https://www.dsgroupofcompanies.in/about/team",
      siteName: "DS Group of Companies",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Our Team | ${brand.name}`,
      description: `Meet the real estate specialists at DS Group of Companies Gurgaon.`,
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
