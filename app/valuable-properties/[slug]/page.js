import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ValuablePropertyClient from "@/components/ValuablePropertyClient";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getPropertyPageSchema } from "@/lib/seo";

const SITE_URL = "https://www.dsgroupofcompanies.in";

async function fetchPropertyData(slug) {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/valuable-properties/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return { property: null, related: [] };
    const data = await res.json();

    if (!data.success || !data.data) return { property: null, related: [] };

    const property = data.data;

    // Fetch related properties
    let related = [];
    try {
      const relRes = await fetch(
        `${baseUrl}/api/valuable-properties?exclude=${slug}&limit=3`,
        { cache: "no-store" }
      );
      if (relRes.ok) {
        const relData = await relRes.json();
        if (relData.success) {
          related = relData.data || [];
        }
      }
    } catch {
      // Related fetch failure is non-fatal
    }

    return { property, related };
  } catch (error) {
    console.error("Error fetching property data in SSR:", error);
    return { property: null, related: [] };
  }
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

  const title = `${property.projectName} | ${property.location || "Gurugram"} | DS Group`;
  const description =
    property.shortDescription ||
    `${property.projectName} in ${property.location || "Gurugram"}. Explore pricing, specifications, amenities, and site visit options with DS Group of Companies.`;
  const ogImage = property.heroBanner || property.thumbnail || `${SITE_URL}/images/logo.png`;
  const canonicalUrl = `${SITE_URL}/valuable-properties/${slug}`;

  return {
    title,
    description,
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
          alt: `${property.projectName} — DS Group of Companies`,
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
    { name: "Valuable Properties", href: "/#portfolio" },
    { name: property.projectName, href: `/valuable-properties/${slug}` },
  ];

  return (
    <>
      {/* ─── Structured Data / JSON-LD ─────────────────────────────────── */}
      <JsonLd
        schema={[
          getBreadcrumbSchema(breadcrumbItems),
          getPropertyPageSchema(property),
        ]}
      />

      {/* ─── Client Interactive Interface ─────────────────────────────── */}
      <ValuablePropertyClient property={property} related={related} />
    </>
  );
}
