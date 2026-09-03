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

export const metadata = {
  title: "Valuable Properties in Sector 85 Gurgaon | DS Group of Companies",
  description:
    "Explore handpicked, high-value residential & commercial properties in Sector 85, New Gurgaon. HRERA verified listings with maximum ROI potential.",
  alternates: {
    canonical: "https://www.dsgroupofcompanies.in/valuable-properties",
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-10">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Valuable Properties</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Luxury Real Estate</span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Valuable Properties in Sector 85 Gurgaon
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore hand-selected prime residential and commercial investment opportunities in New Gurgaon. 100% HRERA verified with complete legal due diligence by DS Group of Companies.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <article
                key={property.id || property.slug}
                className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all group shadow-xl hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-800 relative">
                  {property.thumbnail ? (
                    <img
                      src={property.thumbnail}
                      alt={property.projectName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                      <Building2 className="w-12 h-12" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow">
                    {property.status}
                  </span>

                  {/* Property Type Badge */}
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30 text-[11px] font-semibold">
                    {property.propertyType}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {property.projectName}
                    </h2>

                    {/* Short Description */}
                    {property.shortDescription && (
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                        {property.shortDescription}
                      </p>
                    )}

                    {/* Features row */}
                    <div className="flex items-center gap-4 py-3 border-t border-b border-slate-800/80 text-xs text-slate-300 mb-4">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-amber-400" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-amber-400" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                      )}
                      {property.area && (
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>{property.area}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-medium block">Price</span>
                      <div className="text-base font-extrabold text-amber-400">
                        {property.price}
                      </div>
                    </div>

                    <Link
                      href={`/valuable-properties/${property.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10"
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
