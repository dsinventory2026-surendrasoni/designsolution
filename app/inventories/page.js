import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import InventoriesClient from "@/components/InventoriesClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;
  const categoryText = category && category !== "All" ? `${category} Properties` : "Properties & Real Estate Inventories";

  return {
    title: `${categoryText} for Sale & Rent in Gurugram | DS Group of Companies`,
    description: `Explore verified ${categoryText.toLowerCase()} available for sale, rent, and lease across Sector 85, Dwarka Expressway, and New Gurugram. Direct developer deals with zero brokerage.`,
    keywords: [
      "properties for sale gurugram",
      "real estate inventories sector 85",
      "flats in gurgaon",
      "commercial property dwarka expressway",
      "plots in gurgaon",
      "DS Group inventory",
      "ready to move flats gurugram",
    ],
    openGraph: {
      title: `${categoryText} in Gurugram | DS Group`,
      description: `Verified ${categoryText.toLowerCase()} for sale and rent in Sector 85 & Dwarka Expressway Gurugram.`,
      url: "https://dsgroupofcompanies.com/inventories",
      type: "website",
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

  return (
    <InventoriesClient
      initialInventories={inventories}
      initialCategory={category}
      initialSaleType={saleType}
    />
  );
}
