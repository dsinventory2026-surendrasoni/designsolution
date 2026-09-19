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
      <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: "4/3" }}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}
        />

        {/* Hover shimmer overlay — orange tint */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, rgba(255,121,0,0.08) 0%, transparent 60%)" }} />

        {/* Top-left: Category label */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "rgba(17,24,39,0.85)",
              color: "#FF9A3C",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,121,0,0.25)",
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
              background: "linear-gradient(135deg, #FF7900, #F16E00)",
              color: "#FFFFFF",
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
            background: "rgba(17,24,39,0.85)",
            color: "#E2E8F0",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Maximize2 className="w-3 h-3 text-[#FF7900]" />
          <span>{property.size}</span>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
        {/* Property Title */}
        <h3
          className="text-base sm:text-lg font-bold line-clamp-1 transition-colors duration-200 text-[#111827] group-hover:text-[#FF7900]"
          style={{ fontFamily: "var(--font-outfit)", lineHeight: 1.3 }}
        >
          {property.title}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FF7900]" />
          <span className="text-xs text-[#6B7280] font-medium truncate">{property.location}</span>
        </div>

        {/* Short description */}
        <p className="mt-3 text-sm text-[#6B7280] leading-relaxed line-clamp-2 font-normal flex-grow">
          {property.shortDescription}
        </p>

        {/* Divider */}
        <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-end justify-between gap-3">
          {/* Price */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280] mb-0.5">Starting Price</span>
            <span
              className="text-xl font-extrabold text-[#FF7900]"
              style={{ fontFamily: "var(--font-outfit)" }}
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
                color: "#10B981",
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
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 group/btn shadow-sm"
              style={{
                background: "#FF7900",
                color: "#FFFFFF",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#F16E00";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#FF7900";
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
