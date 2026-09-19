"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { propertyCategories as staticPropertyCategories, propertySizes, propertiesData as staticPropertiesData } from "@/data/propertiesData";
import PropertyCard from "./PropertyCard";
import { Filter, RotateCcw, Building2, Layers, Search, ChevronDown } from "lucide-react";

export default function FeaturedPortfolio({
  activeCategory = "All",
  onSelectCategory,
  onViewDetails,
  heroFilterState,
  propertiesData: propPropertiesData,
}) {
  const propertiesData = propPropertiesData || staticPropertiesData;
  const propertyCategories = propPropertiesData
    ? ["All", ...Array.from(new Set(propPropertiesData.map((p) => p.category)))]
    : staticPropertyCategories;
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (activeCategory) setSelectedCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (heroFilterState) {
      if (heroFilterState.category) setSelectedCategory(heroFilterState.category);
      if (heroFilterState.size) setSelectedSize(heroFilterState.size);
      if (heroFilterState.keyword) setSearchKeyword(heroFilterState.keyword);
    }
  }, [heroFilterState]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (onSelectCategory) onSelectCategory(cat);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("all");
    setSelectedPrice("all");
    setSearchKeyword("");
    if (onSelectCategory) onSelectCategory("All");
  };

  const filteredProperties = useMemo(() => {
    return propertiesData.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedSize !== "all") {
        if (selectedSize === "600" && p.numericSize !== 600) return false;
        if (selectedSize === "800" && p.numericSize !== 800) return false;
        if (selectedSize === "1000" && p.numericSize !== 1000) return false;
        if (selectedSize === "1200" && p.numericSize !== 1200) return false;
        if (selectedSize === "1500" && p.numericSize < 1500) return false;
      }
      if (selectedPrice !== "all") {
        if (selectedPrice === "under80" && p.numericPrice >= 80) return false;
        if (selectedPrice === "80to150" && (p.numericPrice < 80 || p.numericPrice > 150)) return false;
        if (selectedPrice === "above150" && p.numericPrice <= 150) return false;
      }
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSize, selectedPrice, searchKeyword]);

  const featuredProperties = filteredProperties.filter(p => p.featured);
  const regularProperties = filteredProperties.filter(p => !p.featured);
  const showFeaturedLayout = selectedCategory === "All" && !searchKeyword && selectedSize === "all" && selectedPrice === "all" && featuredProperties.length >= 2;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 sm:py-32 text-[#111827] relative overflow-hidden border-y border-[#FED7AA]/40"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Subtle Warm Orange Glow Highlights */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Section Header ─── */}
        <div
          className="max-w-2xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 bg-orange-500/10 text-[#FF7900] border border-orange-500/20">
            <span>Featured Real Estate Portfolio</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08]"
            style={{ fontFamily: "var(--font-outfit)", color: "#111827" }}
          >
            Explore Premium Properties <span className="text-[#FF7900]">&</span> Projects
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
            Browse our portfolio of luxury residences, corporate commercial suites, freehold plots, and construction projects in Sector 85, Gurugram.
          </p>
        </div>

        {/* ─── Category Tabs ─── */}
        <div
          className="mt-12 overflow-x-auto scrollbar-none transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: "150ms",
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex gap-1 min-w-max">
            {propertyCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="relative px-5 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap rounded-lg"
                  style={{
                    background: isActive ? "#FF7900" : "transparent",
                    color: isActive ? "#FFFFFF" : "#4B5563",
                    border: isActive ? "1px solid #FF7900" : "1px solid transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) { e.currentTarget.style.color = "#111827"; e.currentTarget.style.background = "#FFFFFF"; }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) { e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.background = "transparent"; }
                  }}
                >
                  {cat}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ background: "#FFFFFF", opacity: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {/* Underline rule */}
          <div className="mt-0 h-px" style={{ background: "#E5E7EB" }} />
        </div>

        {/* ─── Filter Bar ─── */}
        <div
          className="mt-8 p-4 sm:p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center transition-all duration-700"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "250ms",
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {/* Category */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
            <div className="relative flex items-center">
              <Building2 className="absolute left-3 w-4 h-4 pointer-events-none text-[#FF7900]" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs font-bold rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#FF7900] transition-colors"
                style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#111827" }}
              >
                {propertyCategories.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#FFFFFF", color: "#111827" }}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-3.5 h-3.5 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Size / Area</label>
            <div className="relative flex items-center">
              <Layers className="absolute left-3 w-4 h-4 pointer-events-none text-[#FF7900]" />
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs font-bold rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#FF7900] transition-colors"
                style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#111827" }}
              >
                {propertySizes.map((sz) => (
                  <option key={sz.value} value={sz.value} style={{ background: "#FFFFFF", color: "#111827" }}>{sz.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-3.5 h-3.5 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Budget */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Budget Range</label>
            <div className="relative flex items-center">
              <Filter className="absolute left-3 w-4 h-4 pointer-events-none text-[#FF7900]" />
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs font-bold rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#FF7900] transition-colors"
                style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#111827" }}
              >
                <option value="all" style={{ background: "#FFFFFF", color: "#111827" }}>All Budgets</option>
                <option value="under80" style={{ background: "#FFFFFF", color: "#111827" }}>Under ₹80 Lakh</option>
                <option value="80to150" style={{ background: "#FFFFFF", color: "#111827" }}>₹80 Lakh – ₹1.5 Cr</option>
                <option value="above150" style={{ background: "#FFFFFF", color: "#111827" }}>Above ₹1.5 Cr</option>
              </select>
              <ChevronDown className="absolute right-3 w-3.5 h-3.5 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Search + Reset */}
          <div className="lg:col-span-3 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Keyword Search</label>
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-3.5 h-3.5 pointer-events-none text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-[#FF7900] transition-colors placeholder-slate-400"
                  style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#111827" }}
                />
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="flex-shrink-0 p-2.5 rounded-xl transition-all duration-200 mt-4 text-slate-500 hover:text-[#111827]"
              style={{ background: "#F1F5F9", border: "1px solid #E5E7EB" }}
              onMouseEnter={e => e.currentTarget.style.background = "#E2E8F0"}
              onMouseLeave={e => e.currentTarget.style.background = "#F1F5F9"}
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredProperties.length}</span> {filteredProperties.length === 1 ? "property" : "properties"}
            {selectedCategory !== "All" && <span> in <span className="font-bold text-[#FF7900]">{selectedCategory}</span></span>}
          </p>
        </div>

        {/* ─── Results Grid ─── */}
        <div className="mt-8">
          {filteredProperties.length > 0 ? (
            showFeaturedLayout ? (
              <FeaturedLayout
                featuredProperties={featuredProperties}
                regularProperties={regularProperties}
                onViewDetails={onViewDetails}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} onViewDetails={onViewDetails} />
                ))}
              </div>
            )
          ) : (
            <EmptyState selectedCategory={selectedCategory} onReset={resetFilters} />
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturedLayout({ featuredProperties, regularProperties, onViewDetails }) {
  const [hero, ...rest] = featuredProperties;

  return (
    <div className="space-y-8">
      {/* Hero + 2 side cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Large hero featured card */}
        <div className="lg:col-span-7">
          <PropertyCard property={hero} onViewDetails={onViewDetails} />
        </div>
        {/* Side featured cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
          {rest.slice(0, 2).map((p) => (
            <PropertyCard key={p.id} property={p} onViewDetails={onViewDetails} />
          ))}
        </div>
      </div>

      {/* Remaining properties — 3 column grid */}
      {[...rest.slice(2), ...regularProperties].length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...rest.slice(2), ...regularProperties].map((property) => (
            <PropertyCard key={property.id} property={property} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ selectedCategory, onReset }) {
  return (
    <div
      className="text-center py-20 px-6 rounded-2xl max-w-lg mx-auto"
      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <Building2 className="w-12 h-12 mx-auto mb-5" style={{ color: "rgba(255,121,0,0.4)" }} />
      <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-outfit)" }}>
        No Matching Properties Found
      </h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
        We couldn't find any properties matching{" "}
        {selectedCategory !== "All" && (
          <span>category <strong className="text-slate-700">"{selectedCategory}"</strong> and the </span>
        )}
        selected filters.
      </p>
      <button
        onClick={onReset}
        className="btn-champagne mt-7 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide"
      >
        Reset All Filters
      </button>
    </div>
  );
}
