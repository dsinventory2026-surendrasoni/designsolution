"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  Building2, UserCheck, Users, ChevronDown, ChevronUp,
  Target, Eye, Award, CheckCircle2, ShieldCheck,
  PhoneCall, Mail, MessageSquare, MapPin,
  Calendar, Sparkles, ArrowRight, ExternalLink, Tag,
  Briefcase, FileText, CheckCircle
} from "lucide-react";

const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.32a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
  </svg>
);

/* ─── Department Color Map ─────────────────────────────────────── */
const deptColors = {
  Leadership: { bg: "rgba(255,121,0,0.12)", border: "rgba(255,121,0,0.3)", text: "#FF7900" },
  Residential: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", text: "#60A5FA" },
  Commercial: { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", text: "#34D399" },
  "Architecture & Construction": { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)", text: "#F87171" },
  "Legal & Liaison": { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", text: "#FCD34D" },
  Marketing: { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)", text: "#FB923C" },
  Operations: { bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.25)", text: "#C084FC" },
};

export default function AboutUsClient({ siteConfig: propSiteConfig, initialActiveSection }) {
  const cfg = propSiteConfig || staticSiteConfig;
  const brand = cfg?.brand || staticSiteConfig.brand;
  const contact = cfg?.contact || staticSiteConfig.contact;

  // Extract from MongoDB about subdocument or fallback to staticConfig
  const companyDetails = cfg?.about?.companyDetails || {
    story: "Founded with an uncompromising ambition to reshape the National Capital Region's architectural horizon, DS Group of Companies has emerged as Gurugram's preeminent developer and real estate advisory firm. Headquartered in Sector 85, we orchestrate landmark residential complexes, Grade-A commercial towers, approved freehold plot communities, and turnkey construction with absolute transparency.",
    mission: "To engineer iconic living and business destinations that deliver generational wealth, uncompromised structural integrity, and world-class luxury while maintaining 100% legal transparency.",
    vision: "To be India's most trusted, tech-enabled real estate conglomerate, setting gold standards in sustainable construction, customer satisfaction, and architectural innovation.",
    establishedYear: brand?.establishedYear || 2008,
    headquarters: "Sector 85, Gurugram, Haryana 122004",
    reraRegistration: "HRERA-PKL-GGM-1234-2024",
    cinNumber: "U70109HR2014PTC053210",
    highlights: [
      { title: "RERA Certified Transparency", description: "100% clear titles, zero litigation land parcels, and strictly regulated escrow banking." },
      { title: "Turnkey Engineering Excellence", description: "In-house structural, architectural, and EPC project lifecycle execution teams." },
      { title: "Strategic NCR Footprint", description: "Prime residential and commercial projects along Dwarka Expressway and SPR Gurgaon." },
      { title: "Zero Brokerage Direct Bookings", description: "Direct developer partnerships ensuring maximum client cost savings and exclusive terms." }
    ],
    coreValues: [
      { title: "Integrity", description: "Uncompromised honesty, clear documentation, and ethical compliance in every transaction." },
      { title: "Mastery", description: "World-class architectural planning, seismic safety, and curated luxury finishes." },
      { title: "Partnership", description: "Long-term relationship model beyond sale with complete post-handover support." }
    ],
    seoKeywords: [
      "DS Group of Companies",
      "Real Estate Developer Sector 85 Gurgaon",
      "Surendra Soni real estate",
      "Luxury flats Sector 85 Gurugram",
      "Commercial property Dwarka Expressway",
      "Freehold plots Gurgaon",
      "Turnkey construction Gurgaon",
      "Best property consultant Gurugram"
    ],
    images: []
  };

  const ownerDetails = cfg?.about?.ownerDetails || {
    name: cfg?.owner?.name || "Surendra Soni",
    designation: cfg?.owner?.designation || "Founder & Managing Director",
    photo: cfg?.owner?.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: cfg?.owner?.bio || "Surendra Soni is a visionary entrepreneur and real estate strategist with over 18 years of pioneering leadership in North India's property development sector. Under his stewardship, DS Group of Companies has delivered ultra-luxury residential towers, high-street retail galleries, approved plotted developments, and industrial EPC contracts.",
    quote: cfg?.owner?.quote || "True luxury is not defined by ornate facades, but by uncompromised structural integrity, absolute legal transparency, and the peace of mind that comes from knowing your investment is built to endure for generations.",
    experienceYears: "18+ Years",
    phone: contact?.phonePrimary || "+91 77430 00070",
    email: contact?.emailPrimary || "surendra@dsgroupofcompanies.com",
    whatsapp: contact?.whatsappNumber || "7743000070",
    linkedin: "https://linkedin.com/in/surendra-soni",
    achievements: [
      { title: "Real Estate Excellence Award", year: "2024", description: "Recognized for outstanding contribution to luxury housing developments in New Gurugram." },
      { title: "NAREDCO Advisory Member", year: "2022", description: "Active contributor to regional real estate policy frameworks and builder-buyer trust models." },
      { title: "HRERA Transparency Standard", year: "2020", description: "First batch of developers in Sector 85 to receive early compliance accreditation." }
    ]
  };

  const employees = cfg?.about?.employees && cfg?.about?.employees.length > 0
    ? cfg.about.employees
    : (cfg?.team || []);

  // Dropdown Open/Close states: if on specific page, expand that section
  const [openSections, setOpenSections] = useState({
    company: initialActiveSection ? initialActiveSection === "company" : true,
    owner: initialActiveSection ? initialActiveSection === "owner" : true,
    employees: initialActiveSection ? initialActiveSection === "employees" : true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Team Department Filter
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = ["All", ...Array.from(new Set(employees.map((e) => e.department || "General")))];

  const filteredEmployees = selectedDept === "All"
    ? employees
    : employees.filter((e) => e.department === selectedDept);

  return (
    <main className="bg-[#111827] text-slate-100 min-h-screen">

      {/* ── HERO BANNER ──────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden text-center"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, #0d1e38 0%, #111827 70%, #0D1117 100%)",
          borderBottom: "1px solid rgba(255,121,0,0.15)"
        }}
      >
        {/* Subtle geometric grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,121,0,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Corporate Profile · Sector 85, Gurugram</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Pioneering Luxury & <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #F5E6C8 0%, #FF7900 60%, #9A7B3E 100%)" }}
            >
              Architectural Mastery in Gurgaon
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Welcome to <strong className="text-white font-semibold">DS Group of Companies</strong>. Explore our company heritage, meet our visionary founder Surendra Soni, and discover our multidisciplinary team of engineers, architects, and property advisors.
          </p>

          {/* Dedicated Sub-page navigation buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/about/company"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                initialActiveSection === "company"
                  ? "bg-orange-400 text-slate-950 border-amber-300 shadow-lg font-black"
                  : "border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20"
              }`}
            >
              🏢 1. About Company
            </Link>
            <Link
              href="/about/owner"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                initialActiveSection === "owner"
                  ? "bg-orange-400 text-slate-950 border-amber-300 shadow-lg font-black"
                  : "border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20"
              }`}
            >
              👤 2. About Owner
            </Link>
            <Link
              href="/about/team"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                initialActiveSection === "employees"
                  ? "bg-orange-400 text-slate-950 border-amber-300 shadow-lg font-black"
                  : "border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20"
              }`}
            >
              👥 3. About Team & Details ({employees.length})
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3 PREMIUM DROPDOWNS SECTION ──────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">

        {/* ════════════════════════════════════════════════════════════
            DROPDOWN 1: COMPANY DETAILS
        ════════════════════════════════════════════════════════════ */}
        <div
          id="section-company"
          className="rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl"
          style={{
            background: "rgba(10, 22, 42, 0.75)",
            border: openSections.company ? "1px solid rgba(255, 121, 0, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: openSections.company ? "0 10px 40px rgba(255, 121, 0, 0.08)" : "none",
          }}
        >
          {/* Header Button */}
          <button
            onClick={() => toggleSection("company")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors hover:bg-white/[0.02]"
            aria-expanded={openSections.company}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255,121,0,0.2), rgba(30,64,175,0.2))",
                  border: "1px solid rgba(255,121,0,0.3)"
                }}
              >
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    Section 01 · Corporate Profile
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/15 text-orange-300 border border-orange-500/30">
                    Est. {companyDetails.establishedYear || 2008}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Company Details & Vision
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 hidden sm:block">
                  Corporate heritage, mission, legal compliance, and strategic specialization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-orange-400 hidden sm:inline">
                {openSections.company ? "Collapse" : "Expand Details"}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-300 ${openSections.company ? "rotate-180 text-orange-400 border-orange-500/30" : "text-slate-400"}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* Collapsible Content */}
          {openSections.company && (
            <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-slate-800/80 space-y-8 animate-fadeIn">

              {/* Story / About Paragraph */}
              <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(15, 29, 53, 0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> About DS Group of Companies
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line font-light">
                  {companyDetails.story}
                </p>
              </div>

              {/* Mission & Vision Dual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className="rounded-2xl p-6 sm:p-7 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(30,58,102,0.4), rgba(12,24,44,0.7))",
                    border: "1px solid rgba(59,130,246,0.2)"
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Our Mission</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {companyDetails.mission}
                  </p>
                </div>

                <div
                  className="rounded-2xl p-6 sm:p-7 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(50,40,20,0.4), rgba(12,24,44,0.7))",
                    border: "1px solid rgba(255,121,0,0.25)"
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Our Vision</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {companyDetails.vision}
                  </p>
                </div>
              </div>

              {/* Legal & Corporate Credentials Table */}
              <div className="rounded-2xl p-6 bg-slate-900/90 border border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Corporate Credentials & Statutory Registration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Corporate Identity (CIN)</div>
                    <div className="text-sm font-bold text-white mt-1 font-mono">{companyDetails.cinNumber || "U70109HR2014PTC053210"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">HRERA Registration</div>
                    <div className="text-sm font-bold text-orange-400 mt-1 font-mono">{companyDetails.reraRegistration || "HRERA-PKL-GGM-1234-2024"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Corporate Headquarters</div>
                    <div className="text-sm font-bold text-white mt-1">{companyDetails.headquarters || "Sector 85, Gurugram"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Established Year</div>
                    <div className="text-sm font-bold text-white mt-1">{companyDetails.establishedYear || 2008}</div>
                  </div>
                </div>
              </div>

              {/* Dynamic SEO Keywords Badges (As requested by user for SEO power) */}
              {companyDetails.seoKeywords && companyDetails.seoKeywords.length > 0 && (
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,121,0,0.08), rgba(15,23,42,0.6))",
                    border: "1px solid rgba(255,121,0,0.2)"
                  }}
                >
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-orange-400" />
                      <h4 className="text-sm font-bold text-white">
                        Specialized Real Estate Keywords & Search Indexes
                      </h4>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-orange-400/80">
                      Indexed on Google & Bing
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Our corporate operations, property portfolios, and construction capabilities are categorized under these key sectors:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {companyDetails.seoKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-amber-200 border border-orange-500/20"
                        style={{ background: "rgba(255,121,0,0.1)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Corporate Highlights / Pillars */}
              {companyDetails.highlights && companyDetails.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {companyDetails.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-white">{h.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{h.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════
            DROPDOWN 2: OWNER / FOUNDER DETAILS
        ════════════════════════════════════════════════════════════ */}
        <div
          id="section-owner"
          className="rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255, 121, 0, 0.12) 0%, rgba(17, 24, 39, 0.85) 50%, rgba(10, 22, 42, 0.9) 100%)",
            border: openSections.owner ? "1.5px solid rgba(255, 121, 0, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: openSections.owner ? "0 10px 40px rgba(255, 121, 0, 0.15)" : "none",
          }}
        >
          {/* Header Button */}
          <button
            onClick={() => toggleSection("owner")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors hover:bg-white/[0.02]"
            aria-expanded={openSections.owner}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255,121,0,0.35), rgba(217,119,6,0.25))",
                  border: "1px solid rgba(255,121,0,0.5)"
                }}
              >
                <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    Section 02 · Executive Leadership
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/15 text-orange-300 border border-orange-500/30">
                    {ownerDetails.experienceYears || "18+ Years"} Experience
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Founder & Managing Director Profile
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 hidden sm:block">
                  Vision, leadership journey, achievements, and direct consultation connect
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-orange-400 hidden sm:inline">
                {openSections.owner ? "Collapse" : "Expand Details"}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-300 ${openSections.owner ? "rotate-180 text-orange-400 border-orange-500/30" : "text-slate-400"}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* Collapsible Content */}
          {openSections.owner && (
            <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-slate-800/80 space-y-8 animate-fadeIn">

              {/* Founder Profile Card */}
              <div
                className="rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 121, 0, 0.15) 0%, rgba(17,32,60,0.8) 50%, rgba(8,16,30,0.95) 100%)",
                  border: "1px solid rgba(255,121,0,0.35)"
                }}
              >
                {/* Photo with Frame */}
                <div className="relative shrink-0">
                  <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-orange-400/40 shadow-2xl relative">
                    <img
                      src={ownerDetails.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"}
                      alt={`${ownerDetails.name} - Founder & Managing Director DS Group of Companies`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-950 bg-orange-400 shadow-lg whitespace-nowrap">
                    Verified Founder
                  </div>
                </div>

                {/* Details & Quote */}
                <div className="flex-1 min-w-0 space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                      {ownerDetails.name || "Surendra Soni"}
                    </h3>
                    <p className="text-sm font-bold text-orange-400 tracking-wide mt-0.5">
                      {ownerDetails.designation || "Founder & Managing Director"}
                    </p>
                  </div>

                  {/* Vision Quote */}
                  {ownerDetails.quote && (
                    <blockquote
                      className="p-4 rounded-xl text-xs sm:text-sm text-slate-200 italic leading-relaxed border-l-2 border-orange-400"
                      style={{ background: "rgba(255,121,0,0.06)" }}
                    >
                      &ldquo;{ownerDetails.quote}&rdquo;
                    </blockquote>
                  )}

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light">
                    {ownerDetails.bio}
                  </p>

                  {/* Contact / Action Links */}
                  <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                    <a
                      href={`https://wa.me/${(ownerDetails.whatsapp || "917743000070").replace(/\D/g, "")}?text=Hello%20Surendra%20Ji%2C%20I%20would%20like%20to%20consult%20regarding%20DS%20Group%20properties.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider transition-all"
                      style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Founder
                    </a>

                    {ownerDetails.phone && (
                      <a
                        href={`tel:${ownerDetails.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-orange-400" /> {ownerDetails.phone}
                      </a>
                    )}

                    {ownerDetails.email && (
                      <a
                        href={`mailto:${ownerDetails.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-orange-400" /> Email
                      </a>
                    )}

                    {ownerDetails.linkedin && (
                      <a
                        href={ownerDetails.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements & Milestones List */}
              {ownerDetails.achievements && ownerDetails.achievements.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-400" /> Key Honors & Recognitions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {ownerDetails.achievements.map((ach, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-orange-400">{ach.year}</span>
                          <Award className="w-3.5 h-3.5 text-orange-500/60" />
                        </div>
                        <div className="text-sm font-bold text-white">{ach.title}</div>
                        <div className="text-xs text-slate-400 mt-1">{ach.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════
            DROPDOWN 3: EMPLOYEE / TEAM DETAILS
        ════════════════════════════════════════════════════════════ */}
        <div
          id="section-employees"
          className="rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl"
          style={{
            background: "rgba(10, 22, 42, 0.75)",
            border: openSections.employees ? "1px solid rgba(255, 121, 0, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: openSections.employees ? "0 10px 40px rgba(255, 121, 0, 0.08)" : "none",
          }}
        >
          {/* Header Button */}
          <button
            onClick={() => toggleSection("employees")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors hover:bg-white/[0.02]"
            aria-expanded={openSections.employees}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(255,121,0,0.2))",
                  border: "1px solid rgba(59,130,246,0.3)"
                }}
              >
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    Section 03 · Core Team Directory
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    {employees.length} Specialists
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Employee Details & Department Specialists
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 hidden sm:block">
                  Engineers, architects, legal advisors, and sales executives driving DS Group
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-orange-400 hidden sm:inline">
                {openSections.employees ? "Collapse" : "Expand Directory"}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-300 ${openSections.employees ? "rotate-180 text-orange-400 border-orange-500/30" : "text-slate-400"}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* Collapsible Content */}
          {openSections.employees && (
            <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-slate-800/80 space-y-6 animate-fadeIn">

              {/* Department Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedDept === dept
                        ? "bg-orange-500 text-slate-950 shadow-md font-black"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Employee Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEmployees.map((emp, idx) => {
                  const dc = deptColors[emp.department] || {
                    bg: "rgba(255,255,255,0.05)",
                    border: "rgba(255,255,255,0.1)",
                    text: "#e2e8f0"
                  };

                  return (
                    <div
                      key={emp.id || idx}
                      className="rounded-2xl p-5 bg-slate-900/90 border border-slate-800/80 hover:border-orange-400/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                    >
                      <div>
                        {/* Top: Avatar & Department */}
                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0 relative">
                            <img
                              src={emp.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                              alt={emp.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="text-base font-bold text-white truncate group-hover:text-orange-300 transition-colors">
                              {emp.name}
                            </h4>
                            <p className="text-xs font-semibold text-slate-400 truncate">
                              {emp.designation}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span
                                className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider"
                                style={{ background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}
                              >
                                {emp.department}
                              </span>
                              {emp.experience && (
                                <span className="text-[10px] text-slate-500 font-semibold">
                                  • {emp.experience}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bio / Work Description */}
                        {emp.bio && (
                          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                            {emp.bio}
                          </p>
                        )}

                        {/* Skills / Specialization Tags */}
                        {emp.skills && emp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {emp.skills.map((sk, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] text-slate-400 bg-white/5 border border-white/5"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Contact Actions Footer */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          {emp.phone && (
                            <a
                              href={`tel:${emp.phone.replace(/\s+/g, "")}`}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-orange-400 transition-colors"
                              title={`Call ${emp.name}`}
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {emp.email && (
                            <a
                              href={`mailto:${emp.email}`}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-orange-400 transition-colors"
                              title={`Email ${emp.name}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {emp.linkedin && (
                            <a
                              href={emp.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-blue-400 transition-colors"
                              title="LinkedIn Profile"
                            >
                              <LinkedInIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          DS Specialist
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredEmployees.length === 0 && (
                <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs">
                  No specialists found in the {selectedDept} department.
                </div>
              )}

            </div>
          )}
        </div>

      </section>

      {/* ── CONSULTATION CTA BANNER ──────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(30,64,175,0.2) 0%, rgba(255,121,0,0.2) 100%), #111827",
            border: "1px solid rgba(255,121,0,0.3)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Developer Advisory</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Looking to Invest or Build in Gurgaon?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Connect directly with Surendra Soni and our senior advisory team for vetted luxury apartments, commercial floors, and freehold plots in Sector 85.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/enquire"
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-950 transition-all shadow-xl hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
            >
              Schedule VIP Consultation
            </Link>
            <a
              href={`https://wa.me/${(contact?.whatsappNumber || "917743000070").replace(/\D/g, "")}?text=Hello%20DS%20Group%2C%20I%20visited%20your%20About%20Us%20page%20and%20would%20like%20more%20information.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Team
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
