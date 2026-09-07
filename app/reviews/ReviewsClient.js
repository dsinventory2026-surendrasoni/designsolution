"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  Star,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function ReviewsClient({ siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const widgetContainerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Remove existing script if any
    const existing = document.querySelector(
      'script[src*="cdn.trustindex.io/loader.js?cef0ad48048c864d7f3689ae2c7"]'
    );
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.trustindex.io/loader.js?cef0ad48048c864d7f3689ae2c7";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    const timer = setTimeout(() => {
      setScriptLoaded(true);
    }, 3500);

    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    return () => {
      clearTimeout(timer);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#030810] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar siteConfig={siteConfig} />

      <main className="flex-grow pt-24 sm:pt-28 pb-16">
        {/* ─── HERO HEADER SECTION ─── */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-6 pb-12 text-center">
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Google Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            What Our Clients Say <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              About DS Group
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
            Genuine experiences from homeowners, commercial investors, and property
            buyers across Gurugram and Delhi NCR. We take immense pride in delivering
            excellence, transparency, and lifelong relationships.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xl font-bold text-white">4.9 / 5.0</span>
              <span className="text-xs text-slate-400">Google Rating</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <Users className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xl font-bold text-white">500+</span>
              <span className="text-xs text-slate-400">Happy Clients</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <Award className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xl font-bold text-white">18+ Years</span>
              <span className="text-xs text-slate-400">NCR Market Trust</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="text-xl font-bold text-white">100%</span>
              <span className="text-xs text-slate-400">Verified Titles</span>
            </div>
          </div>

          {/* Direct CTA to leave review */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://share.google/hLdZvtAcwQF1QTMpl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </section>

        {/* ─── TRUSTINDEX WIDGET CONTAINER ─── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="relative rounded-2xl bg-slate-900/40 border border-slate-800/80 p-4 sm:p-8 backdrop-blur-sm shadow-2xl min-h-[420px]">
            {/* Widget injection container */}
            <div
              ref={widgetContainerRef}
              id="cef0ad48048c864d7f3689ae2c7"
              data-widget-id="cef0ad48048c864d7f3689ae2c7"
              className="ti-widget w-full min-h-[380px]"
            >
              {!scriptLoaded && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                  <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <p className="text-sm font-medium text-slate-300">
                    Loading Google Reviews...
                  </p>
                  <p className="text-xs text-slate-500">
                    Connecting to live Google Business Profile
                  </p>
                </div>
              )}
            </div>

            {/* Direct fallback / info link */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Reviews are aggregated live from our verified Google Business Profile.</span>
              </div>
              <a
                href="https://share.google/hLdZvtAcwQF1QTMpl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
              >
                <span>View all reviews on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA BANNER ─── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/20 p-8 sm:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Experience the DS Group Benchmark Firsthand
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
                Whether you are searching for high-yield commercial landmarks, luxury residences,
                or premium residential plots in Gurugram, our dedicated advisors are here to assist you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all hover:scale-105"
                >
                  <span>Explore Featured Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/enquire"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
                >
                  <span>Schedule a Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
