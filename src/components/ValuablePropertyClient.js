"use client";

/**
 * ValuablePropertyClient.js
 *
 * Client-side interactive shell for the /valuable-properties/[slug] page.
 * This component handles:
 * - Image gallery with active state
 * - Site visit enquiry form (local state only)
 * - WhatsApp CTA
 * - Related properties display
 *
 * It receives `property` and `related` as props from the server component (page.js),
 * which enables server-side rendering of the main content for SEO.
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, MapPin, BedDouble, Bath, Car, Maximize2,
  Calendar, ShieldCheck, PhoneCall, MessageSquare, Check,
  ArrowLeft, Sparkles, Send, CheckCircle2, RefreshCw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function ValuablePropertyClient({ property, related = [] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const galleryImages = [
    ...(property.heroBanner ? [property.heroBanner] : []),
    ...(property.thumbnail ? [property.thumbnail] : []),
    ...(property.gallery || []),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  const mainImage = galleryImages[activeImage] || "/placeholder-property.jpg";
  const whatsappNum = property.whatsappNumber ? property.whatsappNumber.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = whatsappNum
    ? `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi, I am interested in ${property.projectName}`)}`
    : `https://wa.me/?text=${encodeURIComponent(`Hi, I am interested in ${property.projectName}`)}`;

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Valuable Properties", href: "/#portfolio" },
    { label: property.projectName },
  ];

  return (
    <div
      className="min-h-screen flex flex-col text-[#111827] selection:bg-[#FF7900] selection:text-white font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Subtle Warm Orange Glow Highlights */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-24 pb-16 relative z-10">
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumbs items={breadcrumbItems} theme="light" />
        </div>

        {/* Hero Banner & Title Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25">
                  <Sparkles className="w-3.5 h-3.5" /> Valuable Property
                </span>
                {property.status && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {property.status}
                  </span>
                )}
                {property.builderName && (
                  <span className="text-xs text-[#6B7280] font-medium">by <strong className="text-[#111827]">{property.builderName}</strong></span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
                {property.projectName}
              </h1>

              {property.location && (
                <p className="text-sm sm:text-base text-[#6B7280] flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-[#FF7900] shrink-0" />
                  <span>{property.location}</span>
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="lg:text-right bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-sm">
              <span className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">Starting Price</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FF7900] mt-1">
                {property.price || "Price on Request"}
              </div>
              {property.offerPrice && (
                <div className="text-xs text-emerald-600 mt-1 font-semibold flex items-center gap-1 lg:justify-end">
                  <span>Offer Price: {property.offerPrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Featured Image */}
            <div className="lg:col-span-3 h-[380px] sm:h-[480px] rounded-3xl overflow-hidden relative border border-[#E5E7EB] shadow-md group bg-white">
              <img
                src={mainImage}
                alt={`${property.projectName} — ${property.location || "Gurugram"}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              {property.shortDescription && (
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <p className="text-sm text-white italic max-w-2xl bg-black/60 p-3.5 rounded-xl backdrop-blur-md border border-white/20">{property.shortDescription}</p>
                </div>
              )}
            </div>

            {/* Thumbnails Sidebar */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[480px] scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-28 h-20 lg:w-full lg:h-28 rounded-2xl overflow-hidden shrink-0 transition-all border-2 ${activeImage === idx ? "border-[#FF7900] ring-2 ring-[#FF7900]/30 scale-[0.98]" : "border-transparent opacity-75 hover:opacity-100"}`}
                  aria-label={`View image ${idx + 1} of ${property.projectName}`}
                >
                  <img
                    src={img}
                    alt={`${property.projectName} gallery image ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details & Sticky Form Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content Area */}
            <div className="lg:col-span-2 space-y-10">
              {/* Highlights Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.area && (
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
                    <Maximize2 className="w-5 h-5 text-[#FF7900] mb-2" />
                    <span className="block text-[11px] text-[#6B7280] font-bold uppercase">Area</span>
                    <span className="text-sm font-extrabold text-[#111827] mt-0.5 block">{property.area}</span>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
                    <BedDouble className="w-5 h-5 text-[#FF7900] mb-2" />
                    <span className="block text-[11px] text-[#6B7280] font-bold uppercase">Bedrooms</span>
                    <span className="text-sm font-extrabold text-[#111827] mt-0.5 block">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
                    <Bath className="w-5 h-5 text-[#FF7900] mb-2" />
                    <span className="block text-[11px] text-[#6B7280] font-bold uppercase">Bathrooms</span>
                    <span className="text-sm font-extrabold text-[#111827] mt-0.5 block">{property.bathrooms}</span>
                  </div>
                )}
                {property.parking && (
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
                    <Car className="w-5 h-5 text-[#FF7900] mb-2" />
                    <span className="block text-[11px] text-[#6B7280] font-bold uppercase">Parking</span>
                    <span className="text-sm font-extrabold text-[#111827] mt-0.5 block">{property.parking}</span>
                  </div>
                )}
              </div>

              {/* Full Description Section */}
              {property.fullDescription && (
                <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] mb-4 pb-3 border-b border-[#E5E7EB] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#FF7900]" /> Project Overview
                  </h2>
                  <div className="text-sm text-[#4B5563] leading-relaxed whitespace-pre-line">
                    {property.fullDescription}
                  </div>
                </div>
              )}

              {/* Key Features & Highlights */}
              {property.features && property.features.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] mb-4 pb-3 border-b border-[#E5E7EB] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF7900]" /> Key Features & Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                        <Check className="w-4 h-4 text-[#FF7900] shrink-0" />
                        <span className="text-xs font-semibold text-[#111827]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] mb-4 pb-3 border-b border-[#E5E7EB] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#FF7900]" /> Luxury Amenities
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-center hover:border-[#FF7900]/40 transition-colors">
                        <span className="text-xs font-bold text-[#111827] block">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {property.specifications && property.specifications.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] mb-4 pb-3 border-b border-[#E5E7EB]">Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs">
                        <span className="text-[#6B7280] font-semibold">{spec.label}</span>
                        <span className="text-[#111827] font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Meta Info (RERA, Possession, Builder) */}
              <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
                <h2 className="text-xl font-bold text-[#111827] mb-4 pb-3 border-b border-[#E5E7EB]">Builder & Regulatory Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {property.builderName && (
                    <div>
                      <span className="block text-[#6B7280] font-semibold mb-1">Developer</span>
                      <span className="text-[#111827] font-bold text-sm">{property.builderName}</span>
                    </div>
                  )}
                  {property.possessionDate && (
                    <div>
                      <span className="block text-[#6B7280] font-semibold mb-1">Possession Date</span>
                      <span className="text-[#111827] font-bold text-sm">{property.possessionDate}</span>
                    </div>
                  )}
                  {property.reraNumber && (
                    <div>
                      <span className="block text-[#6B7280] font-semibold mb-1">RERA Registration</span>
                      <span className="text-[#FF7900] font-mono font-bold">{property.reraNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Google Map */}
              {property.googleMap && (
                <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
                  <h2 className="text-xl font-bold text-[#111827] mb-4 pb-3 border-b border-[#E5E7EB] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FF7900]" /> Location Map
                  </h2>
                  <div className="h-72 rounded-2xl overflow-hidden border border-[#E5E7EB]">
                    <iframe
                      src={property.googleMap}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title={`${property.projectName} Location Map`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact Card */}
                <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl space-y-5">
                  <div className="text-center pb-4 border-b border-[#E5E7EB]">
                    <h3 className="text-lg font-bold text-[#111827]">Interested in this project?</h3>
                    <p className="text-xs text-[#6B7280] mt-1">Connect with our dedicated luxury property advisor</p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    {property.contactNumber && (
                      <a
                        href={`tel:${property.contactNumber}`}
                        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.02] shadow-md shadow-[#FF7900]/25"
                        style={{ background: "#FF7900" }}
                      >
                        <PhoneCall className="w-4 h-4" /> Call {property.contactNumber}
                      </a>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-700/20"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  </div>

                  {/* Lead Enquiry Form */}
                  <form onSubmit={handleEnquirySubmit} className="space-y-3 pt-4 border-t border-[#E5E7EB]">
                    <span className="block text-xs font-bold text-[#111827] uppercase tracking-wider text-center">Schedule Site Visit</span>

                    {submitted ? (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                        <p className="text-xs font-bold text-emerald-700">Enquiry Received!</p>
                        <p className="text-[11px] text-[#6B7280] mt-1">Our team will get in touch shortly.</p>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#FF7900] focus:bg-white transition-colors"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Phone Number"
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#FF7900] focus:bg-white transition-colors"
                        />
                        <input
                          type="email"
                          placeholder="Email Address (Optional)"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#FF7900] focus:bg-white transition-colors"
                        />
                        <textarea
                          rows={2}
                          placeholder="Preferred date or specific query..."
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#FF7900] focus:bg-white transition-colors"
                        />

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#FF7900] hover:bg-[#F16E00] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#FF7900]/25"
                        >
                          {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 text-white" />}
                          <span>{submitting ? "Submitting..." : "Send Request"}</span>
                        </button>
                      </>
                    )}
                  </form>
                </div>

                {/* Back link */}
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#FF7900] transition-colors py-2 px-3 rounded-xl bg-white border border-[#E5E7EB] shadow-sm w-full justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Valuable Properties */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">More Valuable Properties</h2>
                <p className="text-xs text-[#6B7280] mt-1">Explore other luxury featured real estate opportunities in Gurugram</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/valuable-properties/${item.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-[#E5E7EB] hover:border-[#FF7900]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.thumbnail || item.heroBanner || "/placeholder-property.jpg"}
                      alt={`${item.projectName} — ${item.location || "Gurugram"}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#FF7900] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">
                      Valuable
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#111827] group-hover:text-[#FF7900] transition-colors truncate">{item.projectName}</h3>
                    <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF7900] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex justify-between items-center">
                      <span className="text-xs font-bold text-[#FF7900]">{item.price || "Price on Request"}</span>
                      <span className="text-xs text-[#6B7280] group-hover:text-[#111827] transition-colors font-medium">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
