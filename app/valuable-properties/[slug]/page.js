"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, MapPin, BedDouble, Bath, Car, Maximize2,
  Calendar, ShieldCheck, PhoneCall, MessageSquare, Check,
  ArrowLeft, Share2, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ValuablePropertyDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/valuable-properties/${slug}`);
        const data = await res.json();

        if (data.success && data.data) {
          setProperty(data.data);

          // Fetch related properties
          const relRes = await fetch(`/api/valuable-properties?exclude=${slug}&limit=3`);
          const relData = await relRes.json();
          if (relData.success) {
            setRelated(relData.data || []);
          }
        }
      } catch (error) {
        console.error("Failed to load valuable property details:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030810] text-white flex flex-col justify-center items-center">
        <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider uppercase text-slate-400">Loading Valuable Property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#030810] text-white flex flex-col justify-center items-center px-4">
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Property Not Found</h2>
          <p className="text-xs text-slate-400 mb-6">The valuable property listing you are looking for is unavailable or unpublished.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    ...(property.heroBanner ? [property.heroBanner] : []),
    ...(property.thumbnail ? [property.thumbnail] : []),
    ...(property.gallery || []),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  const mainImage = galleryImages[activeImage] || "/placeholder-property.jpg";
  const whatsappNum = property.whatsappNumber ? property.whatsappNumber.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = whatsappNum ? `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi, I am interested in ${property.projectName}`)}` : `https://wa.me/?text=${encodeURIComponent(`Hi, I am interested in ${property.projectName}`)}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#030810] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">Valuable Properties</span>
            <span>/</span>
            <span className="text-slate-200 truncate max-w-[200px]">{property.projectName}</span>
          </div>
        </div>

        {/* Hero Banner & Title Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" /> Valuable Property
                </span>
                {property.status && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {property.status}
                  </span>
                )}
                {property.builderName && (
                  <span className="text-xs text-slate-400 font-medium">by <strong className="text-slate-200">{property.builderName}</strong></span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {property.projectName}
              </h1>

              {property.location && (
                <p className="text-sm sm:text-base text-slate-300 flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{property.location}</span>
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="lg:text-right bg-slate-900/60 p-4 rounded-2xl border border-amber-400/20 shadow-xl backdrop-blur-md">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Starting Price</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
                {property.price || "Price on Request"}
              </div>
              {property.offerPrice && (
                <div className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1 lg:justify-end">
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
            <div className="lg:col-span-3 h-[380px] sm:h-[480px] rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl group">
              <img src={mainImage} alt={property.projectName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              {property.shortDescription && (
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <p className="text-sm text-slate-200 italic max-w-2xl bg-black/50 p-3 rounded-xl backdrop-blur-md border border-white/10">{property.shortDescription}</p>
                </div>
              )}
            </div>

            {/* Thumbnails Sidebar */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[480px] scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-28 h-20 lg:w-full lg:h-28 rounded-2xl overflow-hidden shrink-0 transition-all border-2 ${activeImage === idx ? "border-amber-400 scale-[0.98]" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
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
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <Maximize2 className="w-5 h-5 text-amber-400 mb-2" />
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Area</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{property.area}</span>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <BedDouble className="w-5 h-5 text-amber-400 mb-2" />
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Bedrooms</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <Bath className="w-5 h-5 text-amber-400 mb-2" />
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Bathrooms</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{property.bathrooms}</span>
                  </div>
                )}
                {property.parking && (
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <Car className="w-5 h-5 text-amber-400 mb-2" />
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Parking</span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{property.parking}</span>
                  </div>
                )}
              </div>

              {/* Full Description Section */}
              {property.fullDescription && (
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-400" /> Project Overview
                  </h3>
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {property.fullDescription}
                  </div>
                </div>
              )}

              {/* Key Features & Highlights */}
              {property.features && property.features.length > 0 && (
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Key Features & Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" /> Luxury Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-800/30 border border-slate-800 text-center">
                        <span className="text-xs font-bold text-slate-200 block">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {property.specifications && property.specifications.length > 0 && (
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-800/30 border border-slate-800/60 text-xs">
                        <span className="text-slate-400 font-semibold">{spec.label}</span>
                        <span className="text-white font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Meta Info (RERA, Possession, Builder) */}
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800">Builder & Regulatory Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {property.builderName && (
                    <div>
                      <span className="block text-slate-400 font-semibold mb-1">Developer</span>
                      <span className="text-white font-bold text-sm">{property.builderName}</span>
                    </div>
                  )}
                  {property.possessionDate && (
                    <div>
                      <span className="block text-slate-400 font-semibold mb-1">Possession Date</span>
                      <span className="text-white font-bold text-sm">{property.possessionDate}</span>
                    </div>
                  )}
                  {property.reraNumber && (
                    <div>
                      <span className="block text-slate-400 font-semibold mb-1">RERA Registration</span>
                      <span className="text-amber-400 font-mono font-bold">{property.reraNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Google Map */}
              {property.googleMap && (
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" /> Location Map
                  </h3>
                  <div className="h-72 rounded-2xl overflow-hidden border border-slate-800">
                    <iframe
                      src={property.googleMap}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Property Location Map"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact Card */}
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-400/30 backdrop-blur-xl shadow-2xl space-y-5">
                  <div className="text-center pb-4 border-b border-slate-800">
                    <h4 className="text-lg font-bold text-white">Interested in this project?</h4>
                    <p className="text-xs text-slate-400 mt-1">Connect with our dedicated luxury property advisor</p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    {property.contactNumber && (
                      <a
                        href={`tel:${property.contactNumber}`}
                        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, #C9A96E, #b8933a)", boxShadow: "0 4px 20px rgba(201,169,110,0.3)" }}
                      >
                        <PhoneCall className="w-4 h-4" /> Call {property.contactNumber}
                      </a>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/30"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  </div>

                  {/* Lead Enquiry Form */}
                  <form onSubmit={handleEnquirySubmit} className="space-y-3 pt-4 border-t border-slate-800">
                    <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider text-center">Schedule Site Visit</span>

                    {submitted ? (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <p className="text-xs font-bold text-emerald-300">Enquiry Received!</p>
                        <p className="text-[11px] text-slate-400 mt-1">Our team will get in touch shortly.</p>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-amber-400"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Phone Number"
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-amber-400"
                        />
                        <input
                          type="email"
                          placeholder="Email Address (Optional)"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-amber-400"
                        />
                        <textarea
                          rows={2}
                          placeholder="Preferred date or specific query..."
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-amber-400"
                        />

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-800 border border-amber-400/30 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                        >
                          {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 text-amber-400" />}
                          <span>{submitting ? "Submitting..." : "Send Request"}</span>
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Valuable Properties */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">More Valuable Properties</h3>
                <p className="text-xs text-slate-400 mt-1">Explore other luxury featured real estate opportunities</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/valuable-properties/${item.slug}`}
                  className="group rounded-3xl overflow-hidden bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.thumbnail || item.heroBanner || "/placeholder-property.jpg"}
                      alt={item.projectName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-amber-400/90 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Valuable
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">{item.projectName}</h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-400">{item.price || "Price on Request"}</span>
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">View Details →</span>
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
