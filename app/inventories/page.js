import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import InventoriesClient from "@/components/InventoriesClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";
import { inventoriesData as fallbackInventories } from "@/data/inventoriesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;
  const saleType = params?.saleType;

  let titlePrefix = "Verified Real Estate Inventories";
  if (saleType === "Rent") {
    titlePrefix = "Properties & Flats for Rent in Gurgaon";
  } else if (saleType === "Sale") {
    titlePrefix = "Properties, Flats & Plots for Sale in Gurgaon";
  } else if (category && category !== "All") {
    titlePrefix = `${category} Properties for Sale & Rent in Gurgaon`;
  }

  const description = saleType === "Rent"
    ? "Explore verified 2 BHK & 3 BHK rental flats and apartments across Sector 81, 85, 89, 90, 92 Gurugram. Direct owner listings and instant site visits with DS Group of Companies."
    : saleType === "Sale"
    ? "Browse exclusive residential flats, builder floors, and freehold plots for sale in Gurgaon across Sector 84, 85, 86, 88A, 92, 95, and 104. Verified pricing by DS Group of Companies."
    : "Browse verified residential apartments, builder floors, and plots available for sale and rent across Gurgaon, New Gurgaon, Sector 84, 85, 86, 89, 90, 92, 95. DS Group of Companies.";

  return {
    title: `${titlePrefix} | DS Group of Companies`,
    description,
    keywords: [
      "properties for sale in Gurgaon",
      "flats for rent in Gurgaon",
      "2 BHK flats for rent Gurgaon",
      "3 BHK flats for sale Gurgaon",
      "residential plots in Gurgaon",
      "Sector 85 Gurgaon property",
      "Sector 86 Gurgaon flats",
      "Sector 89 Gurgaon apartments",
      "Sector 92 Gurgaon plots",
      "Sector 95 Gurgaon plots",
      "Dwarka Expressway property",
      "property dealer in Gurgaon",
      "DS Group of Companies",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/inventories",
    },
    openGraph: {
      title: `${titlePrefix} | DS Group of Companies`,
      description,
      url: "https://www.dsgroupofcompanies.in/inventories",
      siteName: "DS Group of Companies",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${titlePrefix} | DS Group of Companies`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function InventoriesPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "All";
  const saleType = params?.saleType || "All";

  let inventories = [];

  try {
    await connectDB();
    const query = { publishStatus: "Published" };
    if (category && category !== "All") {
      query.category = category;
    }
    if (saleType && saleType !== "All") {
      query.saleType = saleType;
    }

    const rawInventories = await Inventory.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    inventories = JSON.parse(JSON.stringify(rawInventories));
  } catch (error) {
    console.error("Error fetching inventories from DB:", error);
  }

  // Fallback to static inventory data if MongoDB returned no results
  if (!inventories || inventories.length === 0) {
    inventories = fallbackInventories.filter((item) => {
      const matchCategory = category === "All" || item.category === category;
      const matchSaleType = saleType === "All" || item.saleType === saleType;
      return matchCategory && matchSaleType;
    });
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Inventories", href: "/inventories" },
    ...(saleType !== "All" ? [{ name: `For ${saleType}`, href: `/inventories?saleType=${encodeURIComponent(saleType)}` }] : []),
    ...(category !== "All" ? [{ name: category, href: `/inventories?category=${encodeURIComponent(category)}` }] : []),
  ]);

  return (
    <>
      <JsonLd schema={[breadcrumbSchema].filter(Boolean)} />
      <InventoriesClient
        initialInventories={inventories}
        initialCategory={category}
        initialSaleType={saleType}
      />
    </>
  );
}
