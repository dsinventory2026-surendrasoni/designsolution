"use client";

import { Star, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import TrustindexWidget from "@/components/TrustindexWidget";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";

export default function GoogleReviewsSection({ siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const googleReviewUrl = "https://share.google/hLdZvtAcwQF1QTMpl";

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Verified Google Reviews</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            What Our Valued Clients Say{" "}
            <span className="champagne-gradient-text">About DS Group</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Genuine ratings and verified testimonials from homeowners, investors, and
            commercial clients across Gurugram. Synchronized live from our official
            Google Business Profile.
          </p>

          {/* Quick Metrics Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm font-medium">
              <div className="flex text-[#FF7900]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FF7900] text-[#FF7900]" />
                ))}
              </div>
              <span className="font-bold text-slate-900">5.0 / 5.0</span>
              <span className="text-slate-500">on Google</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-700 font-medium">100% Verified Profile</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm font-medium text-slate-600">
              <span>Automatic Live Sync</span>
            </div>
          </div>
        </div>

        {/* Trustindex Live Reviews Container */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-8 shadow-xl shadow-slate-200/50">
          <TrustindexWidget />
        </div>

        {/* Section Footer / Direct Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Reviews update automatically when published to our Google Business Profile.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={googleReviewUrl}
              target="_blank"
              style={{
                background: "rgba(31, 41, 55, 0.7)",
                border: "1px solid rgba(255,255,255,0.07)"
              }}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-orange-400 hover:text-orange-300 transition-colors px-4 py-2 rounded-xl"
            >
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
