"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Home, Building2, MapPin, BedDouble, Bath, Car, Maximize2,
  PhoneCall, MessageSquare, Sparkles, Search, Filter,
  Compass, Layers, ShieldCheck, ArrowRight, X, ExternalLink,
  ChevronRight, Tag, SlidersHorizontal, CheckCircle2,
  BadgePercent, KeyRound, ArrowUpRight, HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function InventoriesClient({
  initialInventories = [],
  initialCategory = "All",
  initialSaleType = "All"
}) {
  const [inventories] = useState(initialInventories);
  const [selectedSaleType, setSelectedSaleType] = useState(initialSaleType);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Keep state synced if URL parameters change
  useEffect(() => {
    if (initialSaleType && initialSaleType !== "All") {
      setSelectedSaleType(initialSaleType);
    }
    if (initialCategory && initialCategory !== "All") {
      setSelectedCategory(initialCategory);
    }
  }, [initialSaleType, initialCategory]);

  // Handle Sale Type switch and update URL seamlessly
  const handleSaleTypeChange = useCallback((type) => {
    setSelectedSaleType(type);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (type === "All") {
        url.searchParams.delete("saleType");
      } else {
        url.searchParams.set("saleType", type);
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // Handle Category switch and update URL seamlessly
  const handleCategoryChange = useCallback((cat) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // Compute counts
  const totalCount = inventories.length;
  const saleCount = useMemo(() => inventories.filter((i) => i.saleType === "Sale").length, [inventories]);
  const rentCount = useMemo(() => inventories.filter((i) => i.saleType === "Rent").length, [inventories]);

  // Dynamic Categories available in dataset
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    inventories.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return Array.from(set);
  }, [inventories]);

  // Dynamic Property Types available
  const propertyTypes = useMemo(() => {
    const set = new Set(["All"]);
    inventories.forEach((i) => {
      if (i.propertyType) set.add(i.propertyType);
    });
    return Array.from(set);
  }, [inventories]);

  // Filtered Inventories
  const filteredInventories = useMemo(() => {
    return inventories.filter((item) => {
      const matchSaleType = selectedSaleType === "All" || item.saleType === selectedSaleType;
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchPropertyType = selectedPropertyType === "All" || item.propertyType === selectedPropertyType;

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.slug?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.sector?.toLowerCase().includes(q) ||
        item.city?.toLowerCase().includes(q) ||
        item.propertyType?.toLowerCase().includes(q) ||
        item.bedrooms?.toLowerCase().includes(q) ||
        item.area?.toLowerCase().includes(q) ||
        item.areaType?.toLowerCase().includes(q) ||
        item.price?.toLowerCase().includes(q) ||
        item.shortDesc?.toLowerCase().includes(q);

      return matchSaleType && matchCategory && matchPropertyType && matchSearch;
    });
  }, [inventories, selectedSaleType, selectedCategory, selectedPropertyType, searchQuery]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventories", href: "/inventories" },
    ...(selectedSaleType !== "All" ? [{ label: `For ${selectedSaleType}` }] : []),
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FF7900] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
              <span>Verified Property Directory · Gurugram, Haryana</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Verified <span style={{ color: "#FF7900" }}>Property Inventories</span> in Gurgaon
            </h1>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Explore 100% genuine and verified apartments, builder floors, and residential plots available for{" "}
              <strong className="text-slate-900 font-bold">Sale &amp; Rent</strong> across prime corridors of New Gurgaon, Dwarka Expressway, Golf Course Extension, and Sohna Road.
            </p>
          </div>

          {/* Primary Automatic Sell & Rent Filter Switch Bar */}
          <div className="mt-8 max-w-3xl mx-auto flex items-center justify-center">
            <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-orange-100 shadow-lg flex items-center gap-2 w-full sm:w-auto">
              {/* All Listings Tab */}
              <button
                type="button"
                onClick={() => handleSaleTypeChange("All")}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                  selectedSaleType === "All"
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>All Listings</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedSaleType === "All" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}>
                  {totalCount}
                </span>
              </button>

              {/* For Sale Tab */}
              <button
                type="button"
                onClick={() => handleSaleTypeChange("Sale")}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                  selectedSaleType === "Sale"
                    ? "bg-[#FF7900] text-white shadow-md shadow-orange-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <BadgePercent className="w-4 h-4" />
                <span>For Sale</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedSaleType === "Sale" ? "bg-white/20 text-white" : "bg-orange-50 text-[#FF7900]"
                }`}>
                  {saleCount}
                </span>
              </button>

              {/* For Rent Tab */}
              <button
                type="button"
                onClick={() => handleSaleTypeChange("Rent")}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                  selectedSaleType === "Rent"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>For Rent</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedSaleType === "Rent" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"
                }`}>
                  {rentCount}
                </span>
              </button>
            </div>
          </div>

          {/* Search & Sub-Filter Bar */}
          <div className="mt-6 p-4 sm:p-5 bg-white/90 backdrop-blur-md rounded-3xl border border-orange-100 shadow-xl max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by project, sector (e.g. Sector 85, 92, 95), BHK (1, 2, 3 BHK), or price..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7900]/30 focus:border-[#FF7900] text-slate-800 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Category Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl w-full md:w-auto overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-[#FF7900] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Filter Line */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Property Type Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mr-1">Type:</span>
                {propertyTypes.map((ptype) => (
                  <button
                    key={ptype}
                    type="button"
                    onClick={() => setSelectedPropertyType(ptype)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all text-xs ${
                      selectedPropertyType === ptype
                        ? "bg-orange-100 text-[#FF7900] border border-[#FF7900]/30"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {ptype}
                  </button>
                ))}
              </div>

              {/* Active Results Count & Reset */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Showing:</span>
                <span className="font-bold text-[#FF7900] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  {filteredInventories.length} {filteredInventories.length === 1 ? "Property" : "Properties"}
                </span>
                {(selectedSaleType !== "All" || selectedCategory !== "All" || selectedPropertyType !== "All" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      handleSaleTypeChange("All");
                      handleCategoryChange("All");
                      setSelectedPropertyType("All");
                      setSearchQuery("");
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-[#FF7900] underline ml-1"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Listings Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredInventories.length === 0 ? (
            <div className="text-center py-20 px-4 bg-white/60 rounded-3xl border border-dashed border-slate-300 max-w-2xl mx-auto">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Matching Properties Found</h3>
              <p className="text-slate-500 text-sm mb-6">
                We couldn&apos;t find any inventories matching your current filter criteria. Try resetting filters or searching for another sector.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleSaleTypeChange("All");
                  handleCategoryChange("All");
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
              {filteredInventories.map((item, index) => {
                const thumbnail =
                  item.thumbnail ||
                  (item.images && item.images[0]) ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop";

                const isRental = item.saleType === "Rent";
                const propertyUrl = `/inventories/${item.slug}`;

                const whatsappMsg = `Hi DS Group, I am interested in property: "${item.title}" (${item.price || "Price on Request"}). View: https://www.dsgroupofcompanies.in${propertyUrl}. Please share floor plan & visit timing.`;
                const whatsappNum = item.whatsappNumber ? item.whatsappNumber.replace(/[^0-9]/g, "") : "917743000070";
                const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappMsg)}`;

                return (
                  <article
                    key={item._id || item.slug || index}
                    className="group bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
                  >
                    {/* Card Media Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={thumbnail}
                        alt={`${item.title} — ${[item.sector, item.location, "Gurugram"].filter(Boolean).join(", ")} | DS Group of Companies`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        {/* Sale / Rent Badge */}
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-xs ${
                            isRental
                              ? "bg-emerald-600 text-white"
                              : "bg-[#FF7900] text-white"
                          }`}
                        >
                          {isRental ? "For Rent" : "For Sale"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs">
                            {item.category}
                          </span>
                          {item.status && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-white backdrop-blur-xs">
                              {item.status}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Price Tag on Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                        <div>
                          <div
                            className="text-white font-extrabold text-xl sm:text-2xl drop-shadow-md"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {item.price || "Price on Request"}
                          </div>
                          {item.pricePerSqft && (
                            <div className="text-white/85 text-[11px] font-medium drop-shadow-xs">
                              {item.pricePerSqft}
                            </div>
                          )}
                        </div>
                        {item.propertyType && (
                          <span className="px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                            {item.propertyType}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title - SEO Friendly Clickable Link */}
                        <Link href={propertyUrl} className="block">
                          <h2
                            className="text-lg font-extrabold text-[#111827] group-hover:text-[#FF7900] transition-colors line-clamp-1 mb-2"
                            style={{ fontFamily: "var(--font-outfit)" }}
                            title={item.title}
                          >
                            {item.title}
                          </h2>
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
                          {/* Col 1: Bedrooms / Type */}
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {item.bedrooms ? "BHK / Conf." : "Type"}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800">
                              {item.bedrooms || item.propertyType || "Property"}
                            </span>
                          </div>

                          {/* Col 2: Area & Area Type */}
                          <div className="flex flex-col items-center border-x border-slate-100 px-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 line-clamp-1">
                              {item.areaType || "Area"}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                              {item.area || "Contact"}
                            </span>
                          </div>

                          {/* Col 3: Furnishing / Status */}
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {item.furnishing ? "Furnishing" : "Status"}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800">
                              {item.furnishing || item.status || "Available"}
                            </span>
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
                          href={propertyUrl}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-[#FF7900] text-white text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                          title="Chat on WhatsApp about this property"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* SEO Content Section: Gurugram Corridors & Real Estate Guide */}
          <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-white/95 border border-orange-100 shadow-sm space-y-8">
            <div className="max-w-4xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7900]">
                Gurgaon Real Estate Insights
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Comprehensive Guide to Buying &amp; Renting Properties in Gurugram
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Whether you are seeking an affordable 1 BHK or 2 BHK rental apartment near Cyber Hub and IMT Manesar, or looking to invest in high-appreciation freehold residential plots and luxury condominiums along Dwarka Expressway, DS Group of Companies curates authentic, verified properties across Gurugram.
              </p>
            </div>

            {/* Prime Sectors Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FF7900]" />
                  <span>New Gurgaon (Sectors 81 to 95)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prime residential hub featuring DLF The Ultima, SS Almeria, SS Linden Floors, Pyramid Urban Homes, and GLS Avenue 51 with direct access to NH-48 and Cloverleaf flyover.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#FF7900]" />
                  <span>Dwarka Expressway (Sectors 88A &amp; 104)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-speed 16-lane expressway connecting Delhi IGI Airport. Home to luxury developments including ATS Triumph and Ansal Heights with world-class clubhouse amenities.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF7900]" />
                  <span>Golf Course Ext. &amp; Sohna Road</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ultra-luxury enclaves such as Central Park Resorts (Sector 48) and Aatma Wellness (Sector 63A) offering resort living, holistic wellness facilities, and high rental yields.
                </p>
              </div>
            </div>

            {/* Quick Internal Links & Consultation CTA */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Need customized assistance? Call our senior consultants at{" "}
                <a href="tel:+917743000070" className="text-[#FF7900] font-bold hover:underline">
                  +91 7743000070
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/enquire"
                  className="px-5 py-2.5 rounded-xl bg-[#FF7900] hover:bg-[#F16E00] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Submit Property Requirement
                </Link>
                <Link
                  href="/valuable-properties"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  View Featured Projects
                </Link>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
