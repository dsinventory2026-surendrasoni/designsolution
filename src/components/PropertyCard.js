"use client";

import { siteConfig } from "@/data/siteConfig";
import { MapPin, Maximize2, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";

const STATUS_STYLES = {
  "Available":          "badge-available",
  "New Launch":         "badge-new-launch",
  "Under Construction": "badge-under-construction",
};

export default function PropertyCard({ property, onViewDetails }) {
  const whatsappUrl = `https://wa.me/917743000070?text=${encodeURIComponent(
    `Hello DS Group of Companies, I am interested in: "${property.title}" (${property.size}, ${property.price}, ${property.location}). Please share more details.`
  )}`;

  return (
    <div
      className="card-property group flex flex-col h-full cursor-pointer"
      onClick={() => onViewDetails && onViewDetails(property)}
    >
      {/* ─── Image ─── */}
      <div className="relative overflow-hidden bg-slate-900" style={{ aspectRatio: "4/3" }}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark gradient overlay — stronger on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)" }}
        />

        {/* Hover shimmer overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.04) 0%, transparent 60%)" }} />

        {/* Top-left: Category label */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "rgba(3,8,16,0.82)",
              color: "rgba(232,201,138,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}
          >
            {property.category}
          </span>
        </div>

        {/* Top-right: Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[property.status] || "badge-available"}`}
            style={{ backdropFilter: "blur(8px)" }}
          >
            {property.status}
          </span>
        </div>

        {/* Bottom-left: Featured tag */}
        {property.featured && (
          <div
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
            style={{
              background: "linear-gradient(135deg, #C9A96E, #A8845A)",
              color: "#030810",
            }}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Featured</span>
          </div>
        )}

        {/* Bottom-right: Size */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold"
          style={{
            background: "rgba(3,8,16,0.82)",
            color: "#94A3B8",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Maximize2 className="w-3 h-3" style={{ color: "var(--champagne)" }} />
          <span>{property.size}</span>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Property Title */}
        <h3
          className="text-base sm:text-lg font-bold line-clamp-1 transition-colors duration-200 group-hover:text-blue-700"
          style={{ fontFamily: "var(--font-outfit)", color: "#0F172A", lineHeight: 1.3 }}
        >
          {property.title}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--champagne)" }} />
          <span className="text-xs text-slate-500 font-medium truncate">{property.location}</span>
        </div>

        {/* Short description */}
        <p className="mt-3.5 text-sm text-slate-500 leading-relaxed line-clamp-2 font-normal flex-grow">
          {property.shortDescription}
        </p>

        {/* Thin divider */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
          {/* Price */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-0.5">Starting Price</span>
            <span
              className="text-xl font-extrabold"
              style={{ fontFamily: "var(--font-outfit)", color: "var(--navy-deep)" }}
            >
              {property.price}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                color: "#34D399",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.08)"}
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails && onViewDetails(property);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 group/btn"
              style={{
                background: "var(--navy-deep)",
                color: "#F5F3EE",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--navy-light)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--navy-deep)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
