import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import InventoriesClient from "@/components/InventoriesClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;
  const categoryText = category && category !== "All" ? `${category} Properties` : "Properties & Real Estate Inventories";

  return {
    title: `${categoryText} for Sale & Rent in Gurgaon | DS Group of Companies`,
    description: `Browse verified ${categoryText.toLowerCase()} available for sale and rent across Gurgaon, New Gurgaon, Sector 85, 89, 90, and 92. DS Group of Companies — your trusted property dealer and real estate consultant in Gurgaon.`,
    keywords: [
      "properties for sale in Gurgaon",
      "flats for sale in Gurgaon",
      "flats for rent in Gurgaon",
      "2 BHK flats in Gurgaon",
      "3 BHK flats in Gurgaon",
      "commercial property Gurgaon",
      "plots for sale in Gurgaon",
      "property dealer in Gurgaon",
      "DS Group of Companies",
    ],
    alternates: {
      canonical: "https://www.dsgroupofcompanies.in/inventories",
    },
    openGraph: {
      title: `${categoryText} in Gurgaon | DS Group of Companies`,
      description: `Verified ${categoryText.toLowerCase()} for sale and rent in Gurgaon. DS Group of Companies — property dealer in Gurgaon.`,
      url: "https://www.dsgroupofcompanies.in/inventories",
      siteName: "DS Group of Companies",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryText} in Gurgaon | DS Group of Companies`,
      description: `Browse verified ${categoryText.toLowerCase()} in Gurgaon with DS Group of Companies.`,
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
  await connectDB();
  const params = await searchParams;
  const category = params?.category || "All";
  const saleType = params?.saleType || "All";

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

  // Convert MongoDB _id and dates to plain JSON
  const inventories = JSON.parse(JSON.stringify(rawInventories));

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Inventories", href: "/inventories" },
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
