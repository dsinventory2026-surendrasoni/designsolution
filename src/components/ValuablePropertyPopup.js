"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MapPin, Sparkles, Tag } from "lucide-react";

export default function ValuablePropertyPopup() {
  const [property, setProperty] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const duration = 12000; // 12 seconds auto-hide

  useEffect(() => {
    // Check if user dismissed popup during this session
    if (typeof window !== "undefined") {
      const closed = sessionStorage.getItem("valuable_popup_closed");
      if (closed === "1") {
        return;
      }
    }

    // Fetch active popup property
    async function fetchPopupProperty() {
      try {
        const res = await fetch("/api/valuable-properties/popup");
        const data = await res.json();
        if (data.success && data.data) {
          setProperty(data.data);
          setIsVisible(true);
        }
      } catch (err) {
        console.error("Error fetching valuable property popup:", err);
      }
    }

    fetchPopupProperty();
  }, []);

  // Timer logic with hover pause
  useEffect(() => {
    if (!isVisible || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("valuable_popup_closed", "1");
    }
  };

  if (!property || !isVisible) return null;

  const thumbnail = property.thumbnail || property.heroBanner || "/placeholder-property.jpg";
  const targetUrl = `/valuable-properties/${property.slug}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl pointer-events-auto"
        >
          <div
            className="relative overflow-hidden rounded-[18px] p-3.5 sm:p-4 transition-all duration-300 group"
            style={{
              background: "linear-gradient(135deg, rgba(10, 22, 40, 0.92) 0%, rgba(15, 29, 50, 0.94) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(201, 169, 110, 0.4)",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 169, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Top subtle shine / ambient glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full opacity-25 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #C9A96E, transparent)" }}
            />

            <div className="flex items-center gap-3.5 sm:gap-4 relative z-10">
              {/* Thumbnail */}
              <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-amber-400/30 shadow-lg">
                <img
                  src={thumbnail}
                  alt={property.projectName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 bg-amber-400/90 text-slate-950 font-extrabold text-[9px] uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> NEW
                </div>
              </div>

              {/* Middle Information */}
              <div className="flex-1 min-w-0 pr-6 sm:pr-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    <Sparkles className="w-2.5 h-2.5" /> VALUABLE PROPERTY
                  </span>
                  {property.offerPrice && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <Tag className="w-2.5 h-2.5" /> SPECIAL OFFER
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                  {property.projectName}
                </h3>

                {property.location && (
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </p>
                )}

                {property.shortDescription && (
                  <p className="text-[11px] text-slate-400 line-clamp-1 italic mt-0.5 hidden sm:block">
                    "{property.shortDescription}"
                  </p>
                )}

                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">
                    {property.price || "Price on Request"}
                  </span>
                  {property.offerPrice && (
                    <span className="text-[11px] text-slate-400 line-through">
                      {property.offerPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button & Close */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                <Link
                  href={targetUrl}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide text-slate-950 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #C9A96E 0%, #E6C88B 50%, #B8933A 100%)",
                    boxShadow: "0 4px 15px rgba(201, 169, 110, 0.4)",
                  }}
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
