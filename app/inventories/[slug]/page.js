import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import InventoryDetailClient from "@/components/InventoryDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getInventoryPageSchema } from "@/lib/seo";

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

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Inventories", href: "/inventories" },
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
