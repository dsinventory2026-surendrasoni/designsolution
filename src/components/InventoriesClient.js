"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Home, Building2, MapPin, BedDouble, Bath, Car, Maximize2,
  PhoneCall, MessageSquare, Sparkles, Search, Filter,
  Compass, Layers, ShieldCheck, ArrowRight, X, ExternalLink,
  ChevronRight, Tag, SlidersHorizontal, CheckCircle2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function InventoriesClient({ initialInventories = [], initialCategory = "All", initialSaleType = "All" }) {
  const [inventories, setInventories] = useState(initialInventories);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSaleType, setSelectedSaleType] = useState(initialSaleType);
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInventory, setSelectedInventory] = useState(null);

  // Categories & Filters
  const categories = ["All", "Residential", "Commercial", "Plots"];
  const saleTypes = ["All", "Sale", "Rent", "Lease"];
  const propertyTypes = ["All", "Apartment", "Villa", "Independent House", "Office", "Shop", "Showroom", "Plot", "Builder Floor"];

  // Filtered Inventories
  const filteredInventories = useMemo(() => {
    return inventories.filter((item) => {
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchSaleType = selectedSaleType === "All" || item.saleType === selectedSaleType;
      const matchPropertyType = selectedPropertyType === "All" || item.propertyType === selectedPropertyType;
      const matchSearch =
        !searchQuery.trim() ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sector?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.propertyType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bedrooms?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSaleType && matchPropertyType && matchSearch;
    });
  }, [inventories, selectedCategory, selectedSaleType, selectedPropertyType, searchQuery]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventories", href: "/inventories" },
    ...(selectedCategory !== "All" ? [{ label: selectedCategory }] : []),
  ];

  return (
    <div
      className="min-h-screen flex flex-col text-[#111827] selection:bg-[#FF7900] selection:text-white font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative z-10">
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={breadcrumbItems} theme="light" />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FF7900] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
              <span>Verified Property Directory</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Exclusive <span style={{ color: "#FF7900" }}>Inventories</span> &amp; Listings
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore 100% verified residential apartments, luxury villas, commercial offices, and freehold plots across prime corridors of Gurugram &amp; NCR.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-orange-100 shadow-xl max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by sector, location, property type, BHK (e.g. Sector 85, 3 BHK)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7900]/30 focus:border-[#FF7900] text-slate-800 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Category Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl w-full md:w-auto overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-[#FF7900] text-white shadow-md shadow-orange-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Filter Pills: Sale Type & Property Type */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mr-1">Sale Type:</span>
                {saleTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedSaleType(type)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      selectedSaleType === type
                        ? "bg-orange-100 text-[#FF7900] border border-[#FF7900]/30"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Showing:</span>
                <span className="font-bold text-[#FF7900] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  {filteredInventories.length} Properties
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredInventories.length === 0 ? (
            <div className="text-center py-20 px-4 bg-white/60 rounded-3xl border border-dashed border-slate-300 max-w-2xl mx-auto">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Properties Found</h3>
              <p className="text-slate-500 text-sm mb-6">
                We couldn&apos;t find any inventories matching your current filter criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSaleType("All");
                  setSelectedPropertyType("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 bg-[#FF7900] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#F16E00] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInventories.map((item) => {
                const thumbnail = item.thumbnail || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop";
                const whatsappMsg = `Hi DS Group, I am interested in property inventory: "${item.title}" (${item.price || 'Price on Request'}). Please share more details.`;
                const whatsappLink = item.whatsappNumber
                  ? `https://wa.me/${item.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`
                  : `https://wa.me/917743000070?text=${encodeURIComponent(whatsappMsg)}`;

                return (
                  <div
                    key={item._id || item.slug}
                    className="group bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
                  >
                    {/* Card Media Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-md backdrop-blur-xs">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.saleType && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF7900] text-white shadow-md">
                              For {item.saleType}
                            </span>
                          )}
                          {item.status && item.status !== "Available" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-white backdrop-blur-xs">
                              {item.status}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Price Tag on Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <div className="text-white font-extrabold text-xl sm:text-2xl drop-shadow-md" style={{ fontFamily: "var(--font-outfit)" }}>
                            {item.price || "Price on Request"}
                          </div>
                          {item.pricePerSqft && (
                            <div className="text-white/80 text-[11px] font-medium drop-shadow-xs">
                              {item.pricePerSqft}
                            </div>
                          )}
                        </div>
                        {item.propertyType && (
                          <span className="px-2.5 py-1 rounded-lg bg-black/50 text-white/90 text-xs font-semibold backdrop-blur-sm">
                            {item.propertyType}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <Link href={`/inventories/${item.slug}`}>
                          <h3
                            className="text-lg font-extrabold text-[#111827] hover:text-[#FF7900] transition-colors line-clamp-1 mb-2"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {item.title}
                          </h3>
                        </Link>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
                          <span className="line-clamp-1">
                            {[item.sector, item.location, item.city].filter(Boolean).join(", ") || "Gurugram, Haryana"}
                          </span>
                        </div>

                        {/* Property Specs Pill Grid */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center mb-4">
                          {item.bedrooms ? (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Bedrooms</span>
                              <span className="text-xs font-bold text-slate-800">{item.bedrooms}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Type</span>
                              <span className="text-xs font-bold text-slate-800">{item.propertyType || "Property"}</span>
                            </div>
                          )}

                          {item.area ? (
                            <div className="flex flex-col items-center border-x border-slate-100">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Area</span>
                              <span className="text-xs font-bold text-slate-800">{item.area}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center border-x border-slate-100">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                              <span className="text-xs font-bold text-slate-800">{item.status || "Active"}</span>
                            </div>
                          )}

                          <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Furnishing</span>
                            <span className="text-xs font-bold text-slate-800">{item.furnishing || "Unfurnished"}</span>
                          </div>
                        </div>

                        {/* Short Description */}
                        {item.shortDesc && (
                          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                            {item.shortDesc}
                          </p>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="pt-2 flex items-center gap-2">
                        <Link
                          href={`/inventories/${item.slug}`}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
