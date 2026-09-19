import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import InventoryDetailClient from "@/components/InventoryDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const item = await Inventory.findOne({ slug, publishStatus: "Published" }).lean();

  if (!item) {
    return {
      title: "Property Not Found | DS Group of Companies",
      description: "The requested property listing was not found.",
    };
  }

  const title = item.seoTitle || `${item.title} in ${item.sector || item.location || "Gurugram"} | DS Group`;
  const description = item.seoDescription || item.shortDesc || `Explore ${item.title}, a premier ${item.propertyType || item.category} property in ${item.location || item.city}. Contact DS Group for pricing and private site visits.`;
  const image = item.thumbnail || (item.images && item.images[0]) || "/images/og-image.jpg";

  return {
    title,
    description,
    keywords: item.seoKeywords ? item.seoKeywords.split(",").map((k) => k.trim()) : [
      item.title,
      `${item.category} in Gurgaon`,
      item.propertyType || "Property",
      item.sector || "Sector 85 Gurgaon",
      "DS Group inventory",
    ],
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: item.title }],
      type: "article",
    },
  };
}

export default async function InventorySlugPage({ params }) {
  const { slug } = await params;
  await connectDB();

  const rawItem = await Inventory.findOne({ slug, publishStatus: "Published" }).lean();

  if (!rawItem) {
    notFound();
  }

  const inventory = JSON.parse(JSON.stringify(rawItem));

  // Fetch related inventories from same category
  const rawRelated = await Inventory.find({
    category: inventory.category,
    slug: { $ne: inventory.slug },
    publishStatus: "Published",
  })
    .limit(3)
    .lean();

  const related = JSON.parse(JSON.stringify(rawRelated));

  return <InventoryDetailClient inventory={inventory} related={related} />;
}
