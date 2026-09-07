"use client";

import Link from "next/link";
import { Star, ShieldCheck, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 font-medium">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">5.0 / 5.0</span>
              <span className="text-slate-500">on Google</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Verified Profile</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 font-medium text-slate-600">
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
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <span className="text-slate-300">|</span>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-amber-600 transition-colors"
            >
              <span>View Dedicated Reviews Page</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
