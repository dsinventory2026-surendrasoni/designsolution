import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import InventoryDetailClient from "@/components/InventoryDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getInventoryPageSchema } from "@/lib/seo";
import { inventoriesData as fallbackInventories } from "@/data/inventoriesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let item = null;

  try {
    await connectDB();
    item = await Inventory.findOne({ slug, publishStatus: "Published" }).lean();
  } catch (error) {
    console.error("Error fetching inventory for metadata:", error);
  }

  if (!item) {
    item = fallbackInventories.find((inv) => inv.slug === slug);
  }

  if (!item) {
    return {
      title: "Property Not Found | DS Group of Companies",
      description: "The requested property listing was not found.",
    };
  }

  const title = item.seoTitle || `${item.title} in ${item.sector || item.location || "Gurgaon"} | DS Group of Companies`;
  const description = item.seoDescription || item.shortDesc || `Explore ${item.title}, a verified ${item.propertyType || item.category || "property"} in ${item.sector || item.location || "Gurgaon"}. DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon.`;
  const image = item.thumbnail || (item.images && item.images[0]) || "/images/logo.png";
  const canonicalUrl = `https://www.dsgroupofcompanies.in/inventories/${slug}`;

  return {
    title,
    description,
    keywords: item.seoKeywords ? item.seoKeywords.split(",").map((k) => k.trim()) : [
      item.title,
      `${item.category || "Property"} in Gurgaon`,
      item.propertyType || "Property",
      item.sector || "Sector 85 Gurgaon",
      `For ${item.saleType || "Sale"} in Gurgaon`,
      "property dealer in Gurgaon",
      "flats in Gurgaon",
      "DS Group of Companies",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "DS Group of Companies",
      images: [{ url: image, alt: `${item.title} - DS Group of Companies Gurgaon` }],
      type: "article",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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

export default async function InventorySlugPage({ params }) {
  const { slug } = await params;
  let rawItem = null;
  let rawRelated = [];

  try {
    await connectDB();
    rawItem = await Inventory.findOne({ slug, publishStatus: "Published" }).lean();

    if (rawItem) {
      rawRelated = await Inventory.find({
        category: rawItem.category,
        slug: { $ne: rawItem.slug },
        publishStatus: "Published",
      })
        .limit(3)
        .lean();
    }
  } catch (error) {
    console.error("Error querying inventory slug page:", error);
  }

  // Fallback to static inventory data if DB item not found
  if (!rawItem) {
    rawItem = fallbackInventories.find((inv) => inv.slug === slug);
    if (rawItem) {
      rawRelated = fallbackInventories
        .filter((inv) => (inv.category === rawItem.category || inv.saleType === rawItem.saleType) && inv.slug !== rawItem.slug)
        .slice(0, 3);
    }
  }

  if (!rawItem) {
    notFound();
  }

  const inventory = JSON.parse(JSON.stringify(rawItem));
  const related = JSON.parse(JSON.stringify(rawRelated));

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Inventories", href: "/inventories" },
    ...(inventory.saleType ? [{ name: `For ${inventory.saleType}`, href: `/inventories?saleType=${encodeURIComponent(inventory.saleType)}` }] : []),
    ...(inventory.category ? [{ name: inventory.category, href: `/inventories?category=${encodeURIComponent(inventory.category)}` }] : []),
    { name: inventory.title, href: `/inventories/${inventory.slug}` },
  ]);

  const inventorySchema = getInventoryPageSchema(inventory);

  return (
    <>
      <JsonLd schema={[breadcrumbSchema, inventorySchema].filter(Boolean)} />
      <InventoryDetailClient inventory={inventory} related={related} />
    </>
  );
}
