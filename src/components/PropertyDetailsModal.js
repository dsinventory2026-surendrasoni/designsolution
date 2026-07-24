"use client";

import { useState } from "react";
import { X, MapPin, Maximize2, CheckCircle2, MessageSquare, PhoneCall, Calendar, ShieldCheck, ChevronRight } from "lucide-react";

export default function PropertyDetailsModal({ property, onClose, onOpenContactModal }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const whatsappPropertyUrl = `https://wa.me/917743000070?text=${encodeURIComponent(
    `Hello DS Group of Companies, I would like to inquire about the property details for: "${property.title}" (${property.size}, Price: ${property.price}, Location: ${property.location}).`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-up">
      <div
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl text-white my-auto flex flex-col max-h-[92vh] grain-overlay"
        style={{ background: "var(--navy-deep)", border: "1px solid rgba(201,169,110,0.25)" }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              {property.category} • {property.type}
            </span>
            <h2 className="text-lg sm:text-2xl font-bold font-outfit text-white leading-tight">
              {property.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 flex-1">
          {/* Gallery Section */}
          <div className="space-y-3">
            {/* Main Featured Display Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-amber-500/30">
                {property.status}
              </div>
            </div>

            {/* Gallery Thumbnails Strip */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? "border-amber-400 scale-105" : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
              <span className="text-xl font-extrabold text-amber-400 font-outfit">{property.price}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Size / Area</span>
              <span className="text-base font-bold text-white font-outfit">{property.size}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Possession</span>
              <span className="text-xs font-bold text-slate-200 mt-1 block">{property.possessionDate || "Ready"}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
              <span className="text-xs font-medium text-slate-300 truncate mt-1 block">{property.location}</span>
            </div>
          </div>

          {/* Detailed Specifications & Description Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Description & Amenities */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white font-outfit mb-2">Project Overview</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {property.description}
                </p>
              </div>

              {/* Key Amenities */}
              {property.amenities && (
                <div>
                  <h3 className="text-base font-bold text-white font-outfit mb-3">Key Highlights & Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Cols: Specifications Table */}
            <div className="lg:col-span-5 space-y-6">
              {property.specifications && (
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h3 className="text-base font-bold text-white font-outfit mb-1">Architectural Specs</h3>
                  <div className="space-y-2">
                    {property.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between gap-4 text-xs py-1.5 border-b border-slate-800/60 last:border-0">
                        <span className="text-slate-400 font-semibold">{spec.label}</span>
                        <span className="text-slate-200 font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Fixed Footer CTAs */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappPropertyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenContactModal();
            }}
            className="flex-1 btn-champagne py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book Site Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
