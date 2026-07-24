"use client";

import { useEffect, useRef, Fragment } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { Sparkles, ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

export default function Hero({ onFilterSearch, onOpenContactModal, heroData, siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Programmatically enforce muted property to satisfy strict browser autoplay policies
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay was prevented by browser:", error);
        });
      }
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ─── Video Showcase (DOM Element, Full Width & Height) ─── */}
      <video
        key={heroData?.videoUrl || "default-video"}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroData?.videoUrl || "/videos/hero3.mp4"} type="video/mp4" />
      </video>

      {/* ─── Subtle Legibility Gradient Overlay for Text ─── */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]" />

      {/* ─── Premium Text Content (Placed over video via relative z-index) ─── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-28 md:mt-40">

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(201,169,110,0.35)] bg-[rgba(6,13,31,0.65)] text-xs font-semibold uppercase tracking-[0.25em] text-[var(--champagne)] mb-5 shadow-2xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[var(--champagne)] animate-pulse" />
          <span>{heroData?.eyebrowBadge || "DS GROUP OF COMPANIES"}</span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-2xl mb-5 max-w-4xl"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {heroData?.headline || "Crafting Iconic Spaces & Timeless Luxury"}
        </h1>

        {/* Subheadline Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl font-normal leading-relaxed drop-shadow-md mb-9">
          {heroData?.subheadline || "Pioneering premier residential residences, commercial landmarks, and turnkey architectural construction with 18+ years of uncompromised excellence."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={heroData?.primaryBtnLink || "#portfolio"}
            className="btn-champagne w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            <span>{heroData?.primaryBtnText || "Explore Portfolio"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-xs font-bold tracking-widest uppercase text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-3 shadow-lg"
          >
            <PhoneCall className="w-4 h-4 text-[var(--champagne)]" />
            <span>{heroData?.secondaryBtnText || "Contact Our Experts"}</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10 text-slate-300/80 text-xs font-medium tracking-wide border-t border-white/10 pt-6">
          {(heroData?.trustBadges?.length ? heroData.trustBadges : [
            { label: "18+ Years Excellence" },
            { label: "45+ Projects Delivered" },
            { label: "3200+ Happy Families" },
          ]).map((badge, idx) => (
            <Fragment key={badge.label || idx}>
              {idx > 0 && <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-500" />}
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--champagne)]" />
                <span>{badge.label}</span>
              </div>
            </Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
