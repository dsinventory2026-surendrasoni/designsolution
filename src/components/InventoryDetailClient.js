"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home, Building2, MapPin, BedDouble, Bath, Car, Maximize2, Minimize2,
  PhoneCall, MessageSquare, Sparkles, ShieldCheck, ArrowLeft,
  Share2, CheckCircle2, Calendar, Compass, Layers, Check,
  Send, ChevronRight, ChevronLeft, Eye, Tag, Heart, ZoomIn, X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function InventoryDetailClient({ inventory, related = [] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const images = [
    ...(inventory.thumbnail ? [inventory.thumbnail] : []),
    ...(inventory.images || []),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  const mainImage = images[activeImage] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

  // Lock body scroll and handle keyboard & browser back button for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Push dummy history entry so phone/browser back button closes zoom instead of leaving page
    window.history.pushState({ lightbox: true }, "");

    const handlePopState = () => {
      setIsLightboxOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === "ArrowRight") setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, images.length]);

  const whatsappNum = inventory.whatsappNumber
    ? inventory.whatsappNumber.replace(/[^0-9]/g, "")
    : "917743000070";
  const whatsappMsg = `Hi DS Group, I am interested in property inventory: "${inventory.title}" (Ref: ${inventory.slug}). Please provide more details and site visit availability.`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappMsg)}`;

  const callNumber = inventory.contactPhone || "+917743000070";

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Send enquiry to API
      await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...enquiryForm,
          propertyTitle: inventory.title,
          propertySlug: inventory.slug,
          category: inventory.category,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventories", href: "/inventories" },
    { label: inventory.category, href: `/inventories?category=${encodeURIComponent(inventory.category)}` },
    { label: inventory.title },
  ];

  return (
    <div
      className="min-h-screen flex flex-col text-[#111827] selection:bg-[#FF7900] selection:text-white font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative z-10">
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={breadcrumbItems} theme="light" />
        </div>

        {/* Header Title & Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25">
                  <Sparkles className="w-3.5 h-3.5" /> {inventory.category}
                </span>
                {inventory.saleType && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white">
                    For {inventory.saleType}
                  </span>
                )}
                {inventory.propertyType && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#FF7900] border border-orange-200">
                    {inventory.propertyType}
                  </span>
                )}
                {inventory.status && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {inventory.status}
                  </span>
                )}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {inventory.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                <MapPin className="w-4 h-4 text-[#FF7900] shrink-0" />
                <span>{[inventory.sector, inventory.location, inventory.city, inventory.state].filter(Boolean).join(", ")}</span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-left sm:text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#FF7900]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {inventory.price || "Price on Request"}
                </div>
                {inventory.pricePerSqft && (
                  <div className="text-xs font-medium text-slate-500">
                    {inventory.pricePerSqft} {inventory.negotiable ? "· Negotiable" : ""}
                  </div>
                )}
              </div>

              <button
                onClick={handleShare}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery & Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT 2 COLUMNS: Visuals + Specs + Description + Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Display Frame — adjusts cleanly according to frame */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 aspect-[16/10] relative group select-none">
              <img
                src={mainImage}
                alt={`${inventory.title} — ${[inventory.sector, inventory.location, "Gurgaon"].filter(Boolean).join(", ")} | DS Group of Companies`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

              {/* Top Left Badges: RERA + Photo Counter */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20 pointer-events-none">
                {inventory.reraNumber && (
                  <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-sm">
                    RERA: {inventory.reraNumber}
                  </div>
                )}
                {images.length > 1 && (
                  <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <Eye className="w-3.5 h-3.5 text-[#FF7900]" />
                    <span>{activeImage + 1} / {images.length}</span>
                  </div>
                )}
              </div>

              {/* Top Right Click to Zoom Pill */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-[#FF7900] backdrop-blur-md text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 shadow-md cursor-pointer hover:border-[#FF7900]"
                  title="Click to Zoom Fullscreen"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-orange-400 group-hover:text-white" />
                  <span>Click to Zoom</span>
                </button>
              </div>

              {/* Previous / Next Arrow Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#FF7900] text-white backdrop-blur-md border border-white/20 transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#FF7900] text-white backdrop-blur-md border border-white/20 transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden shrink-0 transition-all border-2 cursor-pointer bg-slate-900 ${
                      activeImage === idx
                        ? "border-[#FF7900] scale-95 shadow-md"
                        : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${inventory.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Property Key Overview Specifications */}
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-md">
              <h2
                className="text-xl font-extrabold text-[#111827] mb-6 flex items-center gap-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <Layers className="w-5 h-5 text-[#FF7900]" />
                Property Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { label: "Category", value: inventory.category, icon: Building2 },
                  { label: "Property Type", value: inventory.propertyType, icon: Home },
                  { label: "Bedrooms", value: inventory.bedrooms, icon: BedDouble },
                  { label: "Bathrooms", value: inventory.bathrooms, icon: Bath },
                  { label: inventory.areaType ? `${inventory.areaType}` : "Super / Carpet Area", value: inventory.area, icon: Maximize2 },
                  { label: "Facing", value: inventory.facing, icon: Compass },
                  { label: "Floor / Total", value: [inventory.floor, inventory.totalFloors ? `of ${inventory.totalFloors}` : ""].filter(Boolean).join(" "), icon: Layers },
                  { label: "Furnishing", value: inventory.furnishing, icon: Home },
                  { label: "Parking", value: inventory.parking, icon: Car },
                  { label: "Possession Status", value: inventory.possession || inventory.status, icon: Calendar },
                  { label: "RERA Registration", value: inventory.reraNumber || "Approved", icon: ShieldCheck },
                  { label: "Transaction Type", value: `For ${inventory.saleType || "Sale"}`, icon: Tag },
                ].filter((item) => item.value).map((spec) => (
                  <div key={spec.label} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                      <spec.icon className="w-3.5 h-3.5 text-[#FF7900]" />
                      <span>{spec.label}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            {(inventory.fullDesc || inventory.shortDesc) && (
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-md space-y-4">
                <h2
                  className="text-xl font-extrabold text-[#111827]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  About This Property
                </h2>
                <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                  {inventory.fullDesc || inventory.shortDesc}
                </div>
              </div>
            )}

            {/* Amenities Section */}
            {inventory.amenities && inventory.amenities.length > 0 && (
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-md">
                <h2
                  className="text-xl font-extrabold text-[#111827] mb-6 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Sparkles className="w-5 h-5 text-[#FF7900]" />
                  Key Amenities &amp; Features
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {inventory.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50/50 border border-orange-100 text-xs font-bold text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF7900] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights Section */}
            {inventory.highlights && inventory.highlights.length > 0 && (
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-md">
                <h2
                  className="text-xl font-extrabold text-[#111827] mb-6 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF7900]" />
                  Project Highlights
                </h2>

                <ul className="space-y-3">
                  {inventory.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-[#FF7900] mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT 1 COLUMN: Sticky Direct Contact & Enquiry Card */}
          <div className="space-y-6">
            <div className="sticky top-28 p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Inquiries</span>
                <h3 className="text-2xl font-black text-[#111827]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Book Site Visit &amp; Inquire
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect directly with DS Group senior property specialists.
                </p>
              </div>

              {/* Direct Quick Action CTAs */}
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Instant WhatsApp Enquiry</span>
                </a>

                <a
                  href={`tel:${callNumber.replace(/\s+/g, "")}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all"
                >
                  <PhoneCall className="w-5 h-5 text-[#FF7900]" />
                  <span>Call: {callNumber}</span>
                </a>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200" />
                <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase">Or Submit Callback Form</span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {/* Contact Lead Form */}
              {submitted ? (
                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#FF7900] mx-auto" />
                  <h4 className="font-bold text-[#111827] text-sm">Enquiry Received!</h4>
                  <p className="text-xs text-slate-600">
                    Our property advisor will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Surendra Sharma"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF7900]/30 focus:border-[#FF7900] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98123 45678"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF7900]/30 focus:border-[#FF7900] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF7900]/30 focus:border-[#FF7900] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Message / Questions</label>
                    <textarea
                      rows={3}
                      placeholder="I am interested in scheduling a site visit for this property..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF7900]/30 focus:border-[#FF7900] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#FF7900] hover:bg-[#F16E00] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? "Submitting..." : "Request Callback"}</span>
                  </button>
                </form>
              )}

              {/* Trust Badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="w-5 h-5 text-[#FF7900] shrink-0" />
                <span>100% Clear Title &amp; Direct Developer Assistance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Inventories Section */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF7900]">Similar Opportunities</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-outfit)" }}>
                  More {inventory.category} Inventories
                </h2>
              </div>
              <Link
                href={`/inventories?category=${encodeURIComponent(inventory.category)}`}
                className="text-xs font-bold text-[#FF7900] hover:text-[#F16E00] flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id || rel.slug}
                  href={`/inventories/${rel.slug}`}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-950 relative flex items-center justify-center">
                    <img
                      src={rel.thumbnail || (rel.images && rel.images[0]) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 opacity-30 pointer-events-none"
                    />
                    <img
                      src={rel.thumbnail || (rel.images && rel.images[0]) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"}
                      alt={`${rel.title} — ${[rel.sector, rel.location, "Gurgaon"].filter(Boolean).join(", ")} | DS Group`}
                      className="relative z-1 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs z-10">
                      {rel.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-[#FF7900] transition-colors line-clamp-1 text-sm mb-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                        {[rel.sector, rel.location].filter(Boolean).join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="font-extrabold text-[#FF7900] text-sm">{rel.price || "Contact Us"}</span>
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ChevronRight className="w-3 h-3 text-[#FF7900]" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links Navigation Helper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/inventories" className="font-bold text-[#FF7900] hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to All Inventories
              </Link>
              <span>•</span>
              <Link href="/valuable-properties" className="hover:text-slate-900 transition-colors">
                Valuable Properties
              </Link>
              <span>•</span>
              <Link href="/blog" className="hover:text-slate-900 transition-colors">
                Gurgaon Real Estate Guides
              </Link>
            </div>
            <div>
              <span>Need immediate assistance? Call </span>
              <a href={`tel:${callNumber.replace(/\s+/g, "")}`} className="font-bold text-slate-900 hover:text-[#FF7900]">
                {callNumber}
              </a>
            </div>
          </div>
        </div>
        {/* Fullscreen High-Resolution Lightbox Modal with prominent CUT / CLOSE Button */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar with Big Cut / Close Button */}
            <div
              className="flex items-center justify-between text-white z-10 gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-0.5 min-w-0 flex-1 pr-2">
                <h3 className="text-sm sm:text-lg font-bold text-white truncate">{inventory.title}</h3>
                <p className="text-xs text-slate-300">
                  Photo {activeImage + 1} of {images.length} · {[inventory.sector, inventory.city].filter(Boolean).join(", ")}
                </p>
              </div>

              {/* VERY PROMINENT CUT / CLOSE BUTTON */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7900] hover:bg-[#E06A00] text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(255,121,0,0.6)] border-2 border-white transition-all active:scale-95 cursor-pointer shrink-0"
                title="Cut / Close (Wapas Project Details Par Aayein)"
              >
                <X className="w-5 h-5 stroke-[3]" />
                <span>✕ Cut / Close</span>
              </button>
            </div>

            {/* Lightbox Image Stage (Clicking image stays; clicking background closes) */}
            <div
              className="relative flex-1 flex items-center justify-center p-2 sm:p-4 min-h-0 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={mainImage}
                alt={`${inventory.title} photo ${activeImage + 1}`}
                className="max-w-full max-h-[75vh] object-contain drop-shadow-2xl rounded-2xl select-none"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-[#FF7900] text-white border border-white/20 transition-all shadow-2xl cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-[#FF7900] text-white border border-white/20 transition-all shadow-2xl cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Controls: Thumbnails + Bottom Close Pill */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-3 z-10 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.length > 1 ? (
                <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-slate-900 cursor-pointer ${
                        activeImage === idx ? "border-[#FF7900] scale-105" : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : <div />}

              {/* Secondary Close Button for easy access on mobile */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold border border-white/30 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Wapas Details Par Aayein</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
