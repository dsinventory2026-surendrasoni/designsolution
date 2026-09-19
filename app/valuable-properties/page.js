import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import ValuableProperty from "@/lib/models/ValuableProperty";
import { propertiesData as fallbackProperties } from "@/data/propertiesData";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
} from "lucide-react";

import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Valuable Properties for Sale in Gurgaon & New Gurgaon | DS Group of Companies",
  description:
    "Explore handpicked, high-value residential and commercial properties in Gurgaon, New Gurgaon, and Sector 85. HRERA verified listings with maximum ROI potential by DS Group of Companies — trusted property dealer and real estate consultant in Gurgaon.",
  keywords: [
    "valuable properties in Gurgaon",
    "properties for sale in Gurgaon",
    "luxury flats Gurgaon",
    "commercial property Gurgaon",
    "property dealer in Gurgaon",
    "property consultant in Gurgaon",
    "Sector 85 Gurgaon properties",
    "DS Group of Companies",
  ],
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/valuable-properties",
  },
  openGraph: {
    title: "Valuable Properties for Sale in Gurgaon & New Gurgaon | DS Group of Companies",
    description:
      "Explore handpicked, high-value residential and commercial properties in Gurgaon, New Gurgaon, and Sector 85. HRERA verified listings by DS Group of Companies.",
    url: "https://www.dsgroupofcompanies.in/valuable-properties",
    siteName: "DS Group of Companies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.dsgroupofcompanies.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Valuable Properties in Gurgaon — DS Group of Companies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valuable Properties for Sale in Gurgaon | DS Group of Companies",
    description:
      "Explore handpicked residential and commercial properties in Gurgaon. HRERA verified listings with DS Group of Companies.",
    images: ["https://www.dsgroupofcompanies.in/images/logo.png"],
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

export const revalidate = 60; // ISR: revalidate every 60s

async function getValuableProperties() {
  try {
    await connectDB();
    const dbProperties = await ValuableProperty.find({ publishStatus: "Published" })
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    if (dbProperties && dbProperties.length > 0) {
      return dbProperties.map((p) => ({
        id: p._id?.toString() || p.slug,
        slug: p.slug,
        projectName: p.projectName,
        thumbnail: p.thumbnail || p.heroBanner || "",
        propertyType: p.propertyType || "Apartment",
        location: p.location || "Sector 85, Gurgaon",
        price: p.price || "Price on Request",
        offerPrice: p.offerPrice || "",
        area: p.area || "",
        bedrooms: p.bedrooms || "",
        bathrooms: p.bathrooms || "",
        shortDescription: p.shortDescription || "",
        builderName: p.builderName || "DS Group",
        reraNumber: p.reraNumber || "",
        status: p.status || "Available",
      }));
    }
  } catch (error) {
    console.error("Error fetching valuable properties from DB, falling back to static data:", error);
  }

  // Fallback to static properties data
  return fallbackProperties.map((p) => ({
    id: p.id,
    slug: p.id,
    projectName: p.title,
    thumbnail: p.images?.[0] || "",
    propertyType: p.category || "Residential",
    location: p.location || "Sector 85, Gurgaon",
    price: p.price || "Price on Request",
    offerPrice: "",
    area: p.size || "",
    bedrooms: "3 BHK",
    bathrooms: "3",
    shortDescription: p.shortDescription || "",
    builderName: "DS Group",
    reraNumber: "",
    status: p.status || "Available",
  }));
}

export default async function ValuablePropertiesPage() {
  const properties = await getValuableProperties();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Valuable Properties", href: "/valuable-properties" },
  ]);

  return (
    <div
      className="min-h-screen text-[#111827] selection:bg-[#FF7900] selection:text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Subtle Warm Orange Glow Highlights */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <Navbar />
      <JsonLd schema={[breadcrumbSchema].filter(Boolean)} />

      <main className="pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#FF7900] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FF7900] font-semibold">Valuable Properties</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Luxury Real Estate</span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Valuable Properties for Sale in Gurgaon &amp; New Gurgaon
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore hand-selected prime residential and commercial investment opportunities across Gurgaon and New Gurgaon. 100% HRERA verified with complete legal due diligence by DS Group of Companies.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <article
                key={property.id || property.slug}
                className="rounded-3xl overflow-hidden bg-white border border-[#E5E7EB] hover:border-[#FF7900]/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  {property.thumbnail ? (
                    <img
                      src={property.thumbnail}
                      alt={`${property.projectName} — ${property.location || "Gurgaon"} | DS Group of Companies`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <Building2 className="w-12 h-12" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF7900] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    {property.status}
                  </span>

                  {/* Property Type Badge */}
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#FF7900] border border-orange-200 text-[11px] font-semibold">
                    {property.propertyType}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF7900] flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#FF7900] transition-colors mb-2 leading-snug"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {property.projectName}
                    </h2>

                    {/* Short Description */}
                    {property.shortDescription && (
                      <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                        {property.shortDescription}
                      </p>
                    )}

                    {/* Features row */}
                    <div className="flex items-center gap-4 py-3 border-t border-b border-[#E5E7EB] text-xs text-slate-600 mb-4">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-[#FF7900]" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-[#FF7900]" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                      )}
                      {property.area && (
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#FF7900]" />
                          <span>{property.area}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-medium block">Price</span>
                      <div className="text-base font-extrabold text-[#FF7900]">
                        {property.price}
                      </div>
                    </div>

                    <Link
                      href={`/valuable-properties/${property.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF7900] text-white text-xs font-bold hover:bg-[#F16E00] transition-colors shadow-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
