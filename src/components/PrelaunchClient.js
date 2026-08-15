"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Rocket,
  Sparkles,
  Building2,
  MapPin,
  CheckCircle2,
  PhoneCall,
  AreaChart,
  Layers,
  Info,
  ChevronDown,
  Play,
  Share2,
  Check,
  Compass,
  Maximize2,
  X,
  Clock,
  Shield,
  Tag,
  Flame,
} from "lucide-react";

const NINEZERO_GALLERY = [
  {
    url: "/images/prelaunch/ninezero_exterior_1786780397467.jpg",
    title: "Architectural Elevation",
    caption: "3 Ultra-Luxury Towers on 4.5 Acre Masterplan in Sector 90",
  },
  {
    url: "/images/prelaunch/ninezero_living_room_1786780472271.jpg",
    title: "Spacious Living Interiors",
    caption: "Expansive 3BHK + 3T Residences (~1,850 Sq. Ft.)",
  },
  {
    url: "/images/prelaunch/ninezero_balcony_1786780680375.jpg",
    title: "Private Panoramic Balcony",
    caption: "Thoughtfully Designed Outdoor Living Deck",
  },
  {
    url: "/images/prelaunch/ninezero_lobby_1786780769185.jpg",
    title: "Grand Entrance Experience",
    caption: "Majestic Double-Height Reception & Core Planning",
  },
];

const FAQS = [
  {
    q: "What is NINEZERO?",
    a: "NINEZERO | LIV 90 is an exclusive premium residential development spread across a 4.5-acre land parcel, featuring 3 towers with a low-density core planning of just 4 apartments per core.",
  },
  {
    q: "Where is NINEZERO located?",
    a: "NINEZERO is located in Sector 90, Gurugram, strategically positioned bang on CPR (Central Peripheral Road) & 84 Metre Road, in close proximity to Dwarka Expressway with seamless NH-48 connectivity.",
  },
  {
    q: "What configurations are available?",
    a: "The project exclusively offers Premium 3BHK + 3T residences with well-proportioned spatial planning.",
  },
  {
    q: "What is the approximate residence size?",
    a: "Each residence is approximately 1,850 Sq. Ft., crafted around expansive and functional living spaces.",
  },
  {
    q: "What is the current Pre-Launch price?",
    a: "Special Pre-Launch pricing starts at ₹2.5 Cr Onwards (All Inclusive; PLC & GST Extra). This is an exclusive window before the upcoming official launch price of ₹2.75 Cr++.",
  },
  {
    q: "What is the EOI amount?",
    a: "The Expression of Interest (EOI) amount is ₹5 Lakh for securing priority allotment.",
  },
  {
    q: "How many towers are available during Pre-Launch?",
    a: "Only 2 towers are available during the current Pre-Launch phase. The 3rd tower will be released during the official launch.",
  },
];

export default function PrelaunchClient({ siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi DS Group, I am inquiring about NINEZERO | LIV 90 (Sector 90, Gurugram). Please share priority allotment details, EOI process, and availability."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#030810] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar siteConfig={siteConfig} />

      {/* ─── STICKY TOP PRE-LAUNCH BANNER STRIP ─── */}
      <div className="pt-20 sm:pt-24 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold tracking-wider text-[11px] uppercase border border-amber-500/40 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Pre-Launch EOIs Open
          </span>
          <span className="text-slate-300 font-medium hidden sm:inline">|</span>
          <span className="text-slate-200 font-medium">
            Special Pre-Launch Price: <strong className="text-amber-400 font-bold">₹2.5 Cr Onwards</strong>
          </span>
          <span className="text-slate-400 text-[11px]">(vs Launch Price ₹2.75 Cr++)</span>
          <span className="text-slate-300 font-medium hidden md:inline">|</span>
          <span className="text-emerald-400 font-bold hidden md:inline">EOI: ₹5 Lakh</span>
        </div>
      </div>

      <main className="flex-grow">
        {/* Navigation & Share Row */}
        <div className="pt-8 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors py-2 px-3.5 rounded-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white py-2 px-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Share Project</span>
              </>
            )}
          </button>
        </div>

        {/* ─── 1. PROJECT OVERVIEW (MOVED TO TOP) ─── */}
        <section className="py-12 sm:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Image Side */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={NINEZERO_GALLERY[0].url}
                    alt="Introducing NINEZERO Sector 90 Gurugram"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                      NINEZERO | Sector 90, Gurugram
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Project Overview</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-white tracking-tight leading-tight">
                  Introducing <span className="champagne-gradient-text">NINEZERO</span>
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                  NINEZERO | LIV 90 is a premium residential development positioned in Sector 90, Gurugram, offering spacious 3BHK + 3T residences across a 4.5-acre development.
                </p>

                <p className="text-slate-400 text-sm leading-relaxed">
                  Engineered with an emphasis on low density and private living, the project features only 3 towers with just 4 apartments per core, ensuring exclusivity, optimal light, and privacy.
                </p>

                {/* 4 Visual Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-outfit">4.5</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Acres</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-outfit">3</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Towers</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-outfit">4</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Apts / Core</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-outfit">~1,850</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Sq. Ft.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. HERO / PRE-LAUNCH PRICING & BOOKING SECTION ─── */}
        <section className="relative py-16 sm:py-20 bg-[#060D1F] border-y border-white/[0.06] overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                {/* Pre-launch tags */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-extrabold uppercase tracking-widest">
                    <Flame className="w-3.5 h-3.5 text-red-400" /> The Biggest Launch of the Year
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Pre-Launch EOI Open
                  </span>
                </div>

                {/* Project Title */}
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-white tracking-tight leading-[1.08]">
                    NINEZERO <span className="text-slate-600 font-light">|</span>{" "}
                    <span className="champagne-gradient-text">LIV 90</span>
                  </h1>
                  <p className="mt-2 text-base sm:text-lg text-slate-400 font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" /> Sector 90, Gurugram
                  </p>
                </div>

                {/* Primary Headline & Subline */}
                <div className="space-y-2 border-l-2 border-amber-500/60 pl-4 py-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-outfit">
                    Premium Living. Ahead of the Launch.
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                    Premium 3BHK + 3T Residences in Sector 90, Gurugram.
                  </p>
                </div>

                {/* Compact Key Fact Badges */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>3BHK + 3T</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <AreaChart className="w-3.5 h-3.5 text-amber-400" />
                    <span>~1,850 Sq. Ft.</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>4.5 Acre Development</span>
                  </div>
                </div>

                {/* Limited Inventory Indicator */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    <strong>Limited Pre-Launch Inventory:</strong> Only 2 Towers Available in Current Phase.
                  </span>
                </div>
              </div>

              {/* Right: Featured Hero Card & Pricing */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Glow */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 text-center pb-5 border-b border-white/10">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-2">
                      Exclusive Commercial Terms
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
                      Pre-Launch Priority Pricing
                    </h2>
                  </div>

                  <div className="py-6 space-y-4">
                    {/* Special Pre-Launch Price Box */}
                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center relative overflow-hidden">
                      <div className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest mb-1">
                        Special Pre-Launch Price
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        ₹2.5 Cr*
                      </div>
                      <div className="text-xs text-slate-300 uppercase font-semibold mt-1">
                        Onwards (All Inclusive)
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">*PLC & GST Extra</div>
                    </div>

                    {/* Pricing Comparison Rows */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">Upcoming Launch Price</div>
                        <div className="text-sm font-bold text-red-400 line-through mt-0.5">₹2.75 Cr++</div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                        <div className="text-[10px] text-emerald-400 font-bold uppercase">EOI Amount</div>
                        <div className="text-base font-black text-emerald-300 mt-0.5">₹5 Lakh</div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 pt-2">
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 transition-all shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-[1.01]"
                    >
                      <PhoneCall className="w-4 h-4 fill-slate-950" />
                      <span>Enquire via WhatsApp</span>
                    </a>

                    <Link
                      href="/enquire"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-200 bg-white/5 border border-white/15 hover:bg-white/10 transition-all text-center"
                    >
                      Request Callback
                    </Link>
                  </div>

                  <p className="text-[11px] text-center text-slate-400 mt-4 leading-normal">
                    ⚡ First-Come, First-Served Basis. Secure your priority allotment today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. PROJECT HIGHLIGHTS ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Parameters</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white tracking-tight">
              Project Highlights
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Essential verified details of the NINEZERO development in Sector 90.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <Building2 className="w-8 h-8 text-amber-400 mb-4 stroke-[1.5]" />
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider mb-1">Configuration</div>
              <h3 className="text-xl font-extrabold text-white font-outfit">Premium 3BHK + 3T Residences</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Thoughtfully planned 3 bedroom layouts with 3 dedicated washrooms.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <AreaChart className="w-8 h-8 text-amber-400 mb-4 stroke-[1.5]" />
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider mb-1">Unit Area</div>
              <h3 className="text-xl font-extrabold text-white font-outfit">Approx. 1,850 Sq. Ft.</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Spacious residential layout designed for generous room proportions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <Layers className="w-8 h-8 text-amber-400 mb-4 stroke-[1.5]" />
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider mb-1">Site Extent</div>
              <h3 className="text-xl font-extrabold text-white font-outfit">4.5 Acre Development</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Masterplanned community in the heart of Sector 90 corporate growth corridor.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <Compass className="w-8 h-8 text-amber-400 mb-4 stroke-[1.5]" />
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider mb-1">Density & Privacy</div>
              <h3 className="text-xl font-extrabold text-white font-outfit">Only 3 Towers</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Low-density community layout ensuring ample open spaces and exclusivity.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <Shield className="w-8 h-8 text-amber-400 mb-4 stroke-[1.5]" />
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider mb-1">Core Architecture</div>
              <h3 className="text-xl font-extrabold text-white font-outfit">4 Apartments Per Core</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Dedicated core planning with minimal shared walls for enhanced comfort.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <Tag className="w-8 h-8 text-amber-400 mb-4 stroke-[1.5]" />
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider mb-1">Current Opportunity</div>
              <h3 className="text-xl font-extrabold text-white font-outfit">Pre-Launch EOI Open</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Special commercial opportunity with ₹5 Lakh EOI priority booking.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 4. RESIDENCE SECTION ─── */}
        <section className="py-20 bg-[#060D1F] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Side */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
                  <span>Residence Architecture</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-white tracking-tight leading-tight">
                  Designed Around <span className="champagne-gradient-text">Spacious Living</span>
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Every 3BHK + 3T residence at NINEZERO is configured across an expansive approximate footprint of 1,850 Sq. Ft., focusing on generous proportions, natural light, and refined living.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">
                      3 Dedicated Bedrooms + 3 Bathrooms Layout
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">
                      Generous ~1,850 Sq. Ft. Approximate Area
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">
                      Only 4 Residences Per Core for Enhanced Privacy
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl group relative">
                  <img
                    src={NINEZERO_GALLERY[1].url}
                    alt="Spacious 3BHK Living Room Interiors at NINEZERO"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-slate-200 border border-white/10 inline-block">
                      Spacious Living Conceptual Render (~1,850 Sq. Ft.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. ARCHITECTURE / DEVELOPMENT VISUAL SECTION ─── */}
        <section className="relative py-32 overflow-hidden border-y border-white/[0.08]">
          <div className="absolute inset-0">
            <img
              src={NINEZERO_GALLERY[0].url}
              alt="NINEZERO Sector 90 Architectural Vision"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030810]/95 via-[#030810]/85 to-[#030810]/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Rocket className="w-3.5 h-3.5" />
                <span>Modern Masterplan</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-white tracking-tight leading-tight">
                An Address Taking Shape in <span className="champagne-gradient-text">Sector 90</span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Positioned strategically along the emerging urban corridors of Gurugram, NINEZERO represents a harmonious union of architectural presence, low-density design, and expansive 4.5-acre development.
              </p>

              {/* Information labels */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-amber-300">
                  4.5 Acre Development
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-amber-300">
                  3 Towers
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-amber-300">
                  Premium Residences
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. LOCATION ADVANTAGE & MAP BLOCK ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white tracking-tight">
              Connected to Where Gurugram Is Moving
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Sector 90 offers seamless connectivity to prime business belts, airport corridors, and highways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Loc Card 1 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-outfit">CPR & 84 Metre Road</h3>
              <p className="mt-2 text-sm text-slate-300 font-medium">Bang on CPR & 84 Metre Road.</p>
              <p className="mt-2 text-xs text-slate-400">
                Direct frontage on arterial roads ensuring fast, congestion-free daily commute.
              </p>
            </div>

            {/* Loc Card 2 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-outfit">Dwarka Expressway</h3>
              <p className="mt-2 text-sm text-slate-300 font-medium">Strategically positioned near Dwarka Expressway.</p>
              <p className="mt-2 text-xs text-slate-400">
                Swift connectivity to IGI Airport, Delhi NCR, and Dwarka commercial hubs.
              </p>
            </div>

            {/* Loc Card 3 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-outfit">NH-48 Corridor</h3>
              <p className="mt-2 text-sm text-slate-300 font-medium">
                Excellent connectivity towards NH-48 and major NCR hubs.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Uninterrupted transit to Cyber City, Rajiv Chowk, and Manesar industrial zones.
              </p>
            </div>
          </div>

          {/* Styled Verified Location Map Container */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#060D1F] border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Sector 90 Vicinity</span>
                <h4 className="text-xl font-bold text-white font-outfit">NINEZERO Project Location Map</h4>
              </div>
              <a
                href="https://maps.google.com/?q=Sector+90+Gurugram"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs font-semibold text-slate-200 hover:text-amber-400 transition-colors inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
            <div className="mt-6 aspect-[21/9] min-h-[260px] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 relative">
              <iframe
                title="Sector 90 Gurugram Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14036.782046422894!2d76.9254394!3d28.413697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d5f303f2f81%3A0xb35a0f670e30ce6f!2sSector%2090%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 contrast-125 opacity-80"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ─── 7. CONNECTIVITY SECTION STRIP ─── */}
        <section className="py-12 bg-gradient-to-r from-[#060D1F] via-[#0B1629] to-[#060D1F] border-y border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Transit 01</div>
                <div className="text-sm sm:text-base font-extrabold text-white">CPR & 84 Metre Road</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Transit 02</div>
                <div className="text-sm sm:text-base font-extrabold text-white">Dwarka Expressway</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Transit 03</div>
                <div className="text-sm sm:text-base font-extrabold text-white">NH-48 Connectivity</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Location</div>
                <div className="text-sm sm:text-base font-extrabold text-white">Sector 90, Gurugram</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. PRE-LAUNCH OPPORTUNITY SECTION ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#0B1629] via-[#081124] to-[#030810] border-2 border-amber-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Background lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Early Advantage Window</span>
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight leading-tight">
                  Secure Your <span className="champagne-gradient-text">Pre-Launch Advantage</span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Only 2 towers are available during the current Pre-Launch phase. The 3rd tower will open during the official launch. Take advantage of early priority allotment before commercial release.
                </p>

                {/* Phasing alert box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    <strong>Pre-Launch Inventory Notice:</strong> Allotments are strictly on a first-come, first-served basis with priority queue established upon EOI submission.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Special Pre-Launch Price
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">₹2.5 Cr* Onwards</div>
                  <div className="text-[11px] text-slate-400 mt-1">All Inclusive | PLC & GST Extra</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] text-slate-400 uppercase">EOI Amount</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">₹5 Lakh</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="text-[10px] text-slate-400 uppercase">Launch Price</div>
                    <div className="text-xl font-bold text-red-400 line-through mt-0.5">₹2.75 Cr++</div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] text-center"
                >
                  <PhoneCall className="w-4 h-4 fill-slate-950" />
                  <span>Get Priority Allotment</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. PROJECT GALLERY WITH LIGHTBOX ─── */}
        <section className="py-24 bg-[#060D1F] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                  <span>Visual Showcase</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white tracking-tight">
                  Experience NINEZERO
                </h2>
                <p className="mt-2 text-slate-400 text-sm">
                  Explore photorealistic project renderings of the development.
                </p>
              </div>

              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                Click any image for fullscreen view
              </span>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Featured Large Image */}
              <div
                onClick={() => {
                  setActiveGalleryIndex(0);
                  setIsLightboxOpen(true);
                }}
                className="md:col-span-8 group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer aspect-[16/10] bg-slate-900"
              >
                <img
                  src={NINEZERO_GALLERY[0].url}
                  alt={NINEZERO_GALLERY[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-outfit">{NINEZERO_GALLERY[0].title}</h3>
                    <p className="text-xs text-slate-300 mt-1">{NINEZERO_GALLERY[0].caption}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Side Stack 1 */}
              <div
                onClick={() => {
                  setActiveGalleryIndex(1);
                  setIsLightboxOpen(true);
                }}
                className="md:col-span-4 group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer aspect-[16/10] md:aspect-auto bg-slate-900"
              >
                <img
                  src={NINEZERO_GALLERY[1].url}
                  alt={NINEZERO_GALLERY[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-outfit">{NINEZERO_GALLERY[1].title}</h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">{NINEZERO_GALLERY[1].caption}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Row 1 */}
              <div
                onClick={() => {
                  setActiveGalleryIndex(2);
                  setIsLightboxOpen(true);
                }}
                className="md:col-span-6 group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer aspect-[16/10] bg-slate-900"
              >
                <img
                  src={NINEZERO_GALLERY[2].url}
                  alt={NINEZERO_GALLERY[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-outfit">{NINEZERO_GALLERY[2].title}</h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">{NINEZERO_GALLERY[2].caption}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Row 2 */}
              <div
                onClick={() => {
                  setActiveGalleryIndex(3);
                  setIsLightboxOpen(true);
                }}
                className="md:col-span-6 group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer aspect-[16/10] bg-slate-900"
              >
                <img
                  src={NINEZERO_GALLERY[3].url}
                  alt={NINEZERO_GALLERY[3].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-outfit">{NINEZERO_GALLERY[3].title}</h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">{NINEZERO_GALLERY[3].caption}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LIGHTBOX MODAL ─── */}
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full max-h-[80vh] flex flex-col items-center">
              <img
                src={NINEZERO_GALLERY[activeGalleryIndex].url}
                alt={NINEZERO_GALLERY[activeGalleryIndex].title}
                className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <div className="mt-4 text-center">
                <h4 className="text-lg font-bold text-white font-outfit">
                  {NINEZERO_GALLERY[activeGalleryIndex].title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {NINEZERO_GALLERY[activeGalleryIndex].caption}
                </p>
              </div>

              {/* Thumbnail Selector in Lightbox */}
              <div className="flex gap-2.5 mt-6">
                {NINEZERO_GALLERY.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                      activeGalleryIndex === idx ? "border-amber-400 scale-105" : "border-white/20 opacity-50"
                    }`}
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── 10. PROJECT VIDEO SECTION ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Play className="w-3.5 h-3.5 fill-amber-400" />
              <span>Project Video</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white tracking-tight">
              See NINEZERO
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Explore the vision, architecture and lifestyle of NINEZERO.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] aspect-video bg-slate-900 group">
              <video
                src="/videos/hero3.mp4"
                poster="/images/prelaunch/ninezero_exterior_1786780397467.jpg"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
              />
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-black/40 pointer-events-none flex items-center justify-center transition-opacity group-hover:bg-black/30">
                  <div className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)] transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-slate-950 translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── 11. WHY NINEZERO (4-CARD SECTION) ─── */}
        <section className="py-20 bg-[#060D1F] border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white tracking-tight">
                Why NINEZERO?
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                Key foundational pillars defining the development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="p-6 rounded-3xl bg-[#030810] border border-white/10 space-y-3">
                <div className="text-2xl font-black text-amber-400 font-outfit">01</div>
                <h3 className="text-lg font-bold text-white font-outfit">Sector 90, Gurugram</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Prime positioning in Gurugram's rapidly expanding residential and corporate micro-market.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 rounded-3xl bg-[#030810] border border-white/10 space-y-3">
                <div className="text-2xl font-black text-amber-400 font-outfit">02</div>
                <h3 className="text-lg font-bold text-white font-outfit">Premium 3BHK + 3T Residences</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Expansive ~1,850 Sq. Ft. homes designed with low density (4 apartments per core).
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 rounded-3xl bg-[#030810] border border-white/10 space-y-3">
                <div className="text-2xl font-black text-amber-400 font-outfit">03</div>
                <h3 className="text-lg font-bold text-white font-outfit">4.5 Acre Development</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A grand masterplanned land parcel containing only 3 exclusive residential towers.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-6 rounded-3xl bg-[#030810] border border-white/10 space-y-3">
                <div className="text-2xl font-black text-amber-400 font-outfit">04</div>
                <h3 className="text-lg font-bold text-white font-outfit">Strategic Connectivity</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bang on CPR & 84 Metre Road, adjacent to Dwarka Expressway with seamless NH-48 access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. PRE-LAUNCH AVAILABILITY & INVENTORY ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#0B1629] to-[#060D1F] border border-white/15 shadow-2xl">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Phase Allotment Status
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white mt-1">
                Pre-Launch Inventory
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Current Phase</div>
                <div className="text-lg font-extrabold text-white mt-1">2 Towers Available</div>
                <p className="text-xs text-slate-300 mt-1">
                  Active pre-launch window with priority allotment queue.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Launch</div>
                <div className="text-lg font-extrabold text-slate-200 mt-1">3rd Tower Opens</div>
                <p className="text-xs text-slate-400 mt-1">
                  The final tower will be unlocked at official public launch pricing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">EOI Deposit</div>
                <div className="text-lg font-extrabold text-white mt-1">₹5 Lakh</div>
                <p className="text-xs text-slate-300 mt-1">Expression of interest booking amount.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pre-Launch Price</div>
                <div className="text-lg font-extrabold text-white mt-1">₹2.5 Cr Onwards</div>
                <p className="text-xs text-slate-400 mt-1">All Inclusive; PLC & GST Extra.</p>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-500 leading-relaxed italic border-t border-white/10 pt-4">
              * Disclaimer: Availability, pricing and launch information are subject to change. Please confirm current inventory and commercial terms with the sales team.
            </p>
          </div>
        </section>

        {/* ─── 13. FAQ SECTION ─── */}
        <section className="py-20 bg-[#060D1F] border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-extrabold font-outfit text-white mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-[#030810] border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base hover:text-amber-300 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 14. FINAL CTA SECTION ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-b from-[#0B1629] via-[#081124] to-[#030810] border border-amber-500/30 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Priority Assistance</span>
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
                Ready to Explore <span className="champagne-gradient-text">NINEZERO?</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Get project details and Pre-Launch availability from our team.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                >
                  <PhoneCall className="w-4 h-4 fill-slate-950" />
                  <span>WhatsApp Now</span>
                </a>

                <Link
                  href="/enquire"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-200 bg-white/5 border border-white/15 hover:bg-white/10 transition-all"
                >
                  Request Callback
                </Link>
              </div>

              <div className="pt-6 text-xs text-slate-400">
                Direct Sales Line: <strong className="text-white">{siteConfig.contact.phonePrimary}</strong> | Official DS Group Partner
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
