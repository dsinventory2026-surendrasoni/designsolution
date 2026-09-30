import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ValuablePropertyClient from "@/components/ValuablePropertyClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getPropertyPageSchema } from "@/lib/seo";

import connectDB from "@/lib/mongodb";
import ValuableProperty from "@/lib/models/ValuableProperty";
import { propertiesData as fallbackProperties } from "@/data/propertiesData";

const SITE_URL = "https://www.dsgroupofcompanies.in";

async function fetchPropertyData(slug) {
  if (!slug) return { property: null, related: [] };

  // 1. First attempt: direct DB query (fast, no self-referential HTTP loop)
  try {
    await connectDB();
    const cleanSlug = slug.toLowerCase();
    const property = await ValuableProperty.findOne({
      slug: cleanSlug,
      publishStatus: "Published",
    }).lean();

    if (property) {
      const plainProp = JSON.parse(JSON.stringify(property));
      let related = [];
      try {
        const relatedDocs = await ValuableProperty.find({
          slug: { $ne: cleanSlug },
          publishStatus: "Published",
        })
          .sort({ priority: -1, createdAt: -1 })
          .limit(3)
          .lean();
        related = JSON.parse(JSON.stringify(relatedDocs));
      } catch {
        // non-fatal
      }
      return { property: plainProp, related };
    }
  } catch (dbErr) {
    console.warn("Direct DB fetch in property SSR failed, attempting API fallback:", dbErr.message);
  }

  // 2. Fallback attempt: internal API route
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/valuable-properties/${slug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return { property: data.data, related: [] };
      }
    }
  } catch (error) {
    console.error("API fallback error in property SSR:", error);
  }

  // 3. Fallback attempt: static propertiesData
  const staticMatch = fallbackProperties.find(
    (p) => p.id === slug || p.id.toLowerCase() === slug.toLowerCase()
  );
  if (staticMatch) {
    const formatted = {
      _id: staticMatch.id,
      id: staticMatch.id,
      slug: staticMatch.id,
      projectName: staticMatch.title,
      propertyType: staticMatch.category || "Residential",
      location: staticMatch.location || "Sector 85, Gurgaon",
      price: staticMatch.price || "Price on Request",
      offerPrice: "",
      area: staticMatch.size || "",
      bedrooms: staticMatch.type || "3 BHK",
      bathrooms: "3",
      parking: "2 Covered",
      status: staticMatch.status || "Available",
      shortDescription: staticMatch.shortDescription || "",
      fullDescription: staticMatch.description || staticMatch.shortDescription || "",
      thumbnail: staticMatch.images?.[0] || "",
      heroBanner: staticMatch.images?.[0] || "",
      gallery: staticMatch.images || [],
      amenities: staticMatch.amenities || [],
      specifications: staticMatch.specifications || [],
      builderName: "DS Group",
      reraNumber: "HRERA Approved",
      possessionDate: staticMatch.possessionDate || "Ready to Move",
      contactNumber: "7743000070",
      whatsappNumber: "7743000070",
    };
    const related = fallbackProperties
      .filter((p) => p.id !== staticMatch.id)
      .slice(0, 3)
      .map((p) => ({
        _id: p.id,
        slug: p.id,
        projectName: p.title,
        location: p.location,
        price: p.price,
        thumbnail: p.images?.[0] || "",
        heroBanner: p.images?.[0] || "",
        propertyType: p.category,
      }));
    return { property: formatted, related };
  }

  return { property: null, related: [] };
}

export async function generateStaticParams() {
  const params = [];
  try {
    await connectDB();
    const dbProps = await ValuableProperty.find({ publishStatus: "Published" }, "slug").lean();
    if (dbProps && dbProps.length > 0) {
      for (const p of dbProps) {
        if (p.slug && p.slug.length >= 3) params.push({ slug: p.slug });
      }
    }
  } catch {
    // non-fatal
  }
  for (const p of fallbackProperties) {
    if (p.id && !params.some((x) => x.slug === p.id)) {
      params.push({ slug: p.id });
    }
  }
  return params;
}

// ─── Dynamic SEO Metadata Generation ──────────────────────────────────────────

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const { property } = await fetchPropertyData(slug);

  if (!property) {
    return {
      title: "Property Not Found | DS Group of Companies",
      description: "The requested property listing could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${property.projectName} | ${property.location || "Gurgaon"} | DS Group of Companies`;
  const description =
    property.shortDescription ||
    `${property.projectName} in ${property.location || "Gurgaon"}. Explore pricing, floor plans, amenities, and site visit options with DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon.`;
  const ogImage = property.heroBanner || property.thumbnail || `${SITE_URL}/images/logo.png`;
  const canonicalUrl = `${SITE_URL}/valuable-properties/${slug}`;

  return {
    title,
    description,
    keywords: [
      property.projectName,
      property.location || "Gurgaon",
      "properties for sale in Gurgaon",
      "property dealer in Gurgaon",
      "property consultant in Gurgaon",
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
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${property.projectName} — DS Group of Companies Gurgaon`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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

// ─── Server Component Page ───────────────────────────────────────────────────

export default async function ValuablePropertyDetailsPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const { property, related } = await fetchPropertyData(slug);

  if (!property) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Valuable Properties", href: "/valuable-properties" },
    { name: property.projectName, href: `/valuable-properties/${slug}` },
  ];

  return (
    <>
      {/* ─── Structured Data / JSON-LD ─────────────────────────────────── */}
      <JsonLd
        schema={[
          getBreadcrumbSchema(breadcrumbItems),
          getPropertyPageSchema(property),
        ].filter(Boolean)}
      />

      {/* ─── Client Interactive Interface ─────────────────────────────── */}
      <ValuablePropertyClient property={property} related={related} />
    </>
  );
}
