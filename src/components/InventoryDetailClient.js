"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home, Building2, MapPin, BedDouble, Bath, Car, Maximize2,
  PhoneCall, MessageSquare, Sparkles, ShieldCheck, ArrowLeft,
  Share2, CheckCircle2, Calendar, Compass, Layers, Check,
  Send, ChevronRight, Eye, Tag, Heart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function InventoryDetailClient({ inventory, related = [] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const images = [
    ...(inventory.thumbnail ? [inventory.thumbnail] : []),
    ...(inventory.images || []),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  const mainImage = images[activeImage] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

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
            {/* Main Image Display */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-black aspect-[16/10] relative group">
              <img
                src={mainImage}
                alt={inventory.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              {inventory.reraNumber && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  RERA: {inventory.reraNumber}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden shrink-0 transition-all ${
                      activeImage === idx
                        ? "ring-3 ring-[#FF7900] scale-95 shadow-md"
                        : "opacity-70 hover:opacity-100 border border-slate-200"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
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
                  { label: "Super / Carpet Area", value: inventory.area, icon: Maximize2 },
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
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={rel.thumbnail || (rel.images && rel.images[0]) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs">
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
      </main>

      <Footer />
    </div>
  );
}
