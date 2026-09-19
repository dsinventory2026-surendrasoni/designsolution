"use client";

import Link from "next/link";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  UserCheck, Award, PhoneCall, Mail, MessageSquare,
  Sparkles, Calendar, ArrowRight, ExternalLink, ShieldCheck,
  CheckCircle2, Building2, Quote, TrendingUp, Landmark,
  Compass, ChevronRight
} from "lucide-react";

const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.32a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
  </svg>
);

export default function AboutOwnerView({ siteConfig: propSiteConfig }) {
  const cfg = propSiteConfig || staticSiteConfig;
  const contact = cfg?.contact || staticSiteConfig.contact;

  const owner = cfg?.about?.ownerDetails || {
    name: cfg?.owner?.name || "Surendra Soni",
    designation: cfg?.owner?.designation || "Founder & Managing Director",
    photo: cfg?.owner?.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: cfg?.owner?.bio || "With over 18 years of visionary leadership in real estate development, construction engineering, and architectural masterplanning, Surendra Soni founded DS Group of Companies on the principle that every structure must stand as a testament to trust, quality, and timeless design. Under his stewardship, DS Group has evolved into one of Gurugram's premier real estate conglomerates, delivering landmark residential towers, Grade-A commercial complexes, approved plot townships, and turnkey construction projects.",
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

  const executiveStats = [
    { label: "Industry Leadership", value: owner.experienceYears || "18+ Years", sub: "Pioneering NCR Real Estate" },
    { label: "Landmark Projects", value: "45+", sub: "Residential & Commercial" },
    { label: "Delivered Footprint", value: "2.5M+", sub: "Square Feet Masterplanned" },
    { label: "Satisfied Clients", value: "3,200+", sub: "Homeowners & Investors" },
  ];

  const leadershipPillars = [
    {
      icon: ShieldCheck,
      title: "100% Statutory Integrity",
      desc: "Championing zero-litigation land parcels, transparent HRERA approvals, and ethical builder-buyer contracts.",
    },
    {
      icon: Building2,
      title: "Engineering Precision",
      desc: "Supervising structural grade testing, BIS seismic compliance, and premium Grade-A raw materials in every build.",
    },
    {
      icon: Compass,
      title: "Masterplanned Locations",
      desc: "Targeting high-growth corridors across Sector 85, Dwarka Expressway, and Southern Peripheral Road.",
    },
    {
      icon: TrendingUp,
      title: "Generational Wealth Creation",
      desc: "Ensuring every square foot purchased yields sustainable capital appreciation and long-term asset value.",
    },
  ];

  return (
    <main
      className="text-[#111827] min-h-screen pt-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF7ED 0%, #FFF1DE 18%, #FFF9F2 45%, #FFFFFF 85%, #FFF7ED 100%)",
      }}
    >
      {/* ── Ambient Warm Orange Glow Mesh ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-80"
        style={{
          background: "radial-gradient(circle at 50% 15%, rgba(255, 121, 0, 0.18) 0%, rgba(254, 215, 170, 0.35) 40%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-[600px] -right-32 w-96 h-96 rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(255, 121, 0, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[1100px] -left-32 w-96 h-96 rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(251, 146, 60, 0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Subtle Geometric Dot Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 121, 0, 0.9) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── BREADCRUMBS & PORTAL NAVIGATION ────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#FF7900] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange-300" />
            <Link href="/about" className="hover:text-[#FF7900] transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange-300" />
            <span className="text-[#FF7900] font-bold">About Owner</span>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/about/company"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white/80 hover:bg-orange-50 border border-orange-200/80 transition-all shadow-xs"
            >
              🏢 Company Profile
            </Link>
            <Link
              href="/about/team"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#FF7900] hover:bg-[#F16E00] transition-all shadow-xs"
            >
              👥 Meet Team Directory →
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO HEADER ────────────────────────────────────────────── */}
      <section className="relative z-10 pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/35 text-[#FF7900] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
          <span>Executive Leadership Profile</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Architect of Legacies, <span style={{ color: "#FF7900" }}>Pioneer of Trust</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          Meet Surendra Soni — visionary founder and managing director steering DS Group of Companies across Gurugram’s most transformative real estate developments.
        </p>
      </section>

      {/* ── MAIN OWNER DETAILS ───────────────────────────────────── */}
      <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">

        {/* Executive Profile Showcase Card with Warm Orange Tinted Glass */}
        <section
          className="rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 247, 237, 0.94) 55%, rgba(254, 243, 199, 0.55) 100%)",
            border: "1.5px solid rgba(255, 121, 0, 0.35)",
            boxShadow: "0 20px 60px -15px rgba(255, 121, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Subtle Orange Glow behind photo */}
          <div
            className="absolute top-10 left-10 w-64 h-64 rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(255, 121, 0, 0.5) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Photo with Verified Badge */}
          <div className="relative shrink-0">
            <div
              className="w-56 h-72 sm:w-64 sm:h-84 rounded-2xl overflow-hidden shadow-xl relative bg-slate-100"
              style={{
                border: "3px solid #FF7900",
                boxShadow: "0 15px 35px -5px rgba(255, 121, 0, 0.35)",
              }}
            >
              <img
                src={owner.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"}
                alt={`${owner.name} - Founder & Managing Director DS Group of Companies`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div
              className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-lg whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #FF7900 0%, #EA580C 100%)",
                boxShadow: "0 4px 15px rgba(255, 121, 0, 0.5)",
              }}
            >
              Founder & MD · DS Group
            </div>
          </div>

          {/* Bio & Vision */}
          <div className="flex-1 min-w-0 space-y-5 text-center md:text-left relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 text-[#FF7900] border border-orange-500/30 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
                <span>{owner.experienceYears || "18+ Years"} Real Estate Leadership</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {owner.name || "Surendra Soni"}
              </h2>
              <p className="text-sm sm:text-base font-bold text-[#FF7900] mt-1 tracking-wide">
                {owner.designation || "Founder & Managing Director"}
              </p>
            </div>

            {/* Quote */}
            {owner.quote && (
              <blockquote
                className="p-5 rounded-2xl text-sm text-slate-800 italic leading-relaxed border-l-4 shadow-xs"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(254, 243, 199, 0.6) 100%)",
                  borderLeftColor: "#FF7900",
                  borderTop: "1px solid rgba(255, 121, 0, 0.15)",
                  borderRight: "1px solid rgba(255, 121, 0, 0.15)",
                  borderBottom: "1px solid rgba(255, 121, 0, 0.15)",
                }}
              >
                <Quote className="w-5 h-5 text-orange-400 mb-1 inline-block -mr-1" /> &ldquo;{owner.quote}&rdquo;
              </blockquote>
            )}

            {/* Bio */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line font-normal">
              {owner.bio}
            </p>

            {/* Direct Contact Buttons */}
            <div className="pt-3 flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href={`https://wa.me/${(owner.whatsapp || "917743000070").replace(/\D/g, "")}?text=Hello%20Surendra%20Ji%2C%20I%20would%20like%20to%20consult%20regarding%20DS%20Group%20properties.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white uppercase tracking-wider transition-all shadow-md hover:scale-105 hover:shadow-orange-500/30"
                style={{ background: "linear-gradient(135deg, #FF7900 0%, #EA580C 100%)" }}
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Surendra Soni
              </a>

              {owner.phone && (
                <a
                  href={`tel:${owner.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-orange-50 border border-orange-200 transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF7900]" /> {owner.phone}
                </a>
              )}

              {owner.email && (
                <a
                  href={`mailto:${owner.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-orange-50 border border-orange-200 transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF7900]" /> {owner.email}
                </a>
              )}

              {owner.linkedin && (
                <a
                  href={owner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200 transition-colors shadow-xs"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" /> LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── EXECUTIVE IMPACT METRICS (Orange Accent Grid) ────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {executiveStats.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 237, 0.95) 100%)",
                border: "1.5px solid rgba(255, 121, 0, 0.25)",
                boxShadow: "0 10px 30px -10px rgba(255, 121, 0, 0.12)",
              }}
            >
              <div
                className="text-3xl sm:text-4xl font-extrabold text-[#FF7900] leading-none"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {st.value}
              </div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-2">
                {st.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {st.sub}
              </div>
            </div>
          ))}
        </section>

        {/* ── LEADERSHIP PHILOSOPHY & TENETS ──────────────────────── */}
        <section
          className="rounded-3xl p-8 sm:p-10 space-y-6"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 240, 0.9) 100%)",
            border: "1.5px solid rgba(255, 121, 0, 0.25)",
            boxShadow: "0 15px 40px -10px rgba(255, 121, 0, 0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-[#FF7900]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                Leadership Principles &amp; Governance
              </h2>
              <p className="text-xs text-slate-600">The core values driving every DS Group development in Gurugram</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {leadershipPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/90 border border-orange-200/80 hover:border-orange-500/40 hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 text-[#FF7900] flex items-center justify-center group-hover:bg-[#FF7900] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#111827]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-12 font-normal">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Honors, Recognitions & Milestones */}
        {owner.achievements && owner.achievements.length > 0 && (
          <section
            className="rounded-3xl p-8 sm:p-10 space-y-6"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 237, 0.92) 100%)",
              border: "1.5px solid rgba(255, 121, 0, 0.25)",
              boxShadow: "0 15px 40px -10px rgba(255, 121, 0, 0.1)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#FF7900]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  Executive Honors &amp; Leadership Recognitions
                </h2>
                <p className="text-xs text-slate-600">Awards and regional real estate advisory contributions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              {owner.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-orange-200/80 hover:border-[#FF7900] hover:shadow-lg transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#FF7900] bg-orange-50 px-3 py-1 rounded-full border border-orange-200 group-hover:bg-[#FF7900] group-hover:text-white transition-colors">
                      {ach.year}
                    </span>
                    <Award className="w-4 h-4 text-[#FF7900]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111827] leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── VIP CONSULTATION CTA ─────────────────────────────────── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1F2937 60%, #111827 100%)",
            border: "1.5px solid rgba(255, 121, 0, 0.4)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 121, 0, 0.15)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle, #FF7900 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-orange-500/20 text-[#FF7900] border border-orange-500/40 mb-3">
            VIP Advisory Channel
          </span>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Schedule a Direct Consultation with Surendra Soni
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            High-net-worth investors, landowners, and commercial enterprises can schedule an exclusive private meeting with our Managing Director at Sector 85 Gurugram.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/enquire"
              className="px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-950 transition-all shadow-lg hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
            >
              Request Executive Meeting
            </Link>
            <Link
              href="/about/team"
              className="px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
            >
              Meet Our Specialist Team →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

