"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  PhoneCall, Mail, CheckCircle2, Award,
  Star, ChevronDown, ChevronUp, Users, Building2,
  Clock, Sparkles, ShieldCheck, Landmark, Scale, Palette,
  Compass, TrendingUp, HeartHandshake, MapPin, ExternalLink,
  ChevronRight, ArrowRight, UserCheck, Check
} from "lucide-react";

/* ────────────────────────────────────────────────
   LinkedIn SVG
──────────────────────────────────────────────── */
const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.32a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
  </svg>
);

/* ────────────────────────────────────────────────
   TEAM CARD COMPONENT
   - Full image card
   - Name & Designation inside bottom of image
   - Tap/click expands rich details directly underneath
──────────────────────────────────────────────── */
function LuxuryTeamCard({ emp, isExpanded, onToggle }) {
  // Normalize skills, projects, certifications from array or comma-separated string
  const skills = useMemo(() => {
    if (Array.isArray(emp.skills)) return emp.skills.filter(Boolean);
    if (typeof emp.skills === "string") return emp.skills.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  }, [emp.skills]);

  const projects = useMemo(() => {
    if (Array.isArray(emp.projects)) return emp.projects.filter(Boolean);
    if (typeof emp.projects === "string") return emp.projects.split(",").map(p => p.trim()).filter(Boolean);
    return [];
  }, [emp.projects]);

  const certifications = useMemo(() => {
    if (Array.isArray(emp.certifications)) return emp.certifications.filter(Boolean);
    if (typeof emp.certifications === "string") return emp.certifications.split(",").map(c => c.trim()).filter(Boolean);
    return [];
  }, [emp.certifications]);

  const isFounder = emp.isFounder || emp.name === "Surendra Soni";
  const experience = emp.experience || (isFounder ? "18+ Years" : "10+ Years");
  const phone = emp.phone || "";
  const email = emp.email || "";
  const linkedin = emp.linkedin || "";

  return (
    <div
      className={`group rounded-[28px] overflow-hidden transition-all duration-500 flex flex-col ${
        isExpanded ? "ring-2 ring-[#FF7900] shadow-2xl scale-[1.01]" : "hover:shadow-2xl hover:-translate-y-1.5"
      }`}
      style={{
        background: "#0D1524",
        border: isFounder ? "2px solid rgba(255, 121, 0, 0.55)" : "1.5px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isExpanded
          ? "0 25px 60px -15px rgba(255, 121, 0, 0.3)"
          : isFounder
          ? "0 15px 40px -10px rgba(255, 121, 0, 0.2)"
          : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* ── FULL IMAGE SECTION ─────────────────────────────────── */}
      <div
        onClick={onToggle}
        className="relative h-[480px] sm:h-[520px] w-full overflow-hidden cursor-pointer select-none"
      >
        {/* Full Bleed Image */}
        <img
          src={emp.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85"}
          alt={emp.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isExpanded ? "scale-105" : "group-hover:scale-108"
          }`}
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/40 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
            style={{
              background: isFounder
                ? "linear-gradient(135deg, #FF7900, #EA580C)"
                : "rgba(17, 24, 39, 0.85)",
              border: isFounder ? "1px solid #FF7900" : "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {isFounder ? "Founder & MD" : emp.department || "Specialist"}
          </span>

          {experience && (
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold text-white bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
              {experience}
            </span>
          )}
        </div>

        {/* ── BOTTOM INSIDE IMAGE: NAME & DESIGNATION SECTION ────── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10"
          style={{
            background: "linear-gradient(180deg, rgba(10, 14, 23, 0) 0%, rgba(10, 14, 23, 0.85) 30%, rgba(10, 14, 23, 0.98) 100%)",
          }}
        >
          {/* Department & Status tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
              {emp.department || "Core Team"}
            </span>
          </div>

          {/* Full Name */}
          <h3
            className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-orange-300 transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {emp.name}
          </h3>

          {/* Designation */}
          <p className="text-sm font-semibold text-[#FF7900] mt-1 tracking-wide">
            {emp.designation}
          </p>

          {/* Tap Indicator Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 group-hover:text-white transition-colors">
              {isExpanded ? (
                <>
                  <span>Hide Details</span>
                  <ChevronUp className="w-4 h-4 text-[#FF7900]" />
                </>
              ) : (
                <>
                  <span>Tap for Details</span>
                  <ChevronDown className="w-4 h-4 text-[#FF7900] group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </span>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isExpanded
                  ? "bg-[#FF7900] text-white rotate-180"
                  : "bg-white/10 text-white group-hover:bg-[#FF7900] group-hover:text-white"
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPANDED DETAILS SECTION (SHOWN RIGHT UNDERNEATH IMAGE) ── */}
      {isExpanded && (
        <div
          className="p-6 sm:p-7 border-t space-y-5 animate-fadeIn"
          style={{
            background: "linear-gradient(180deg, #0A0F1A 0%, #070B13 100%)",
            borderTopColor: "rgba(255, 121, 0, 0.4)",
          }}
        >
          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap gap-2.5" onClick={(e) => e.stopPropagation()}>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-orange-500 border border-white/15 hover:border-orange-500 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FF7900]" />
                <span>{phone}</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-orange-500 border border-white/15 hover:border-orange-500 transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF7900]" />
                <span>Email</span>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-colors shadow-xs"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          {/* Bio / Description */}
          {emp.bio && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Professional Bio</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-white/[0.03] p-4 rounded-xl border border-white/5">
                {emp.bio}
              </p>
            </div>
          )}

          {/* Skills / Specialties */}
          {skills && skills.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" />
                <span>Core Expertise &amp; Skills</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((sk, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-orange-500/15 text-orange-300 border border-orange-500/30"
                  >
                    <Check className="w-3 h-3 text-[#FF7900]" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects Handled */}
          {projects && projects.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Key Landmark Projects</span>
              </div>
              <div className="space-y-1.5">
                {projects.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
                    <span className="font-semibold">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Accreditations &amp; Certifications</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {certifications.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <div className="pt-2 text-center">
            <button
              onClick={onToggle}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   MAIN TEAM PAGE VIEW
   - Filter section removed as requested
   - 4-box metrics counter removed as requested
   - Direct live connection to MongoDB About Us config
──────────────────────────────────────────────── */
export default function AboutTeamView({ siteConfig: propSiteConfig }) {
  const cfg = propSiteConfig || staticSiteConfig;

  // DIRECT CONNECTION TO MONGODB ABOUT CONFIG:
  // If MongoDB config has employees, use it directly so any changes in Admin reflect immediately!
  const employees = useMemo(() => {
    if (cfg?.about?.employees && cfg.about.employees.length > 0) {
      return cfg.about.employees;
    }
    return staticSiteConfig?.team || [];
  }, [cfg]);

  // Expanded card state (tracks which employee card is expanded to show details underneath)
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <main
      className="text-[#111827] min-h-screen pt-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F2 25%, #FFFDF8 60%, #FFFFFF 100%)",
      }}
    >
      {/* ── AMBIENT WARM ORANGE GLOWS ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle at 50% 10%, rgba(255, 121, 0, 0.14) 0%, rgba(254, 215, 170, 0.22) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-[800px] -right-40 w-96 h-96 rounded-full pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(255, 121, 0, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle Dot Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 121, 0, 0.9) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── BREADCRUMBS & PORTAL SWITCHER ────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#FF7900] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange-300" />
            <Link href="/about" className="hover:text-[#FF7900] transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange-300" />
            <span className="text-[#FF7900] font-bold">Team Directory</span>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/about/company"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-orange-50 border border-slate-200 transition-all shadow-xs"
            >
              🏢 Company Profile
            </Link>
            <Link
              href="/about/owner"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-orange-50 border border-slate-200 transition-all shadow-xs"
            >
              👤 Founder Profile
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO HEADER ──────────────────────────────────────────── */}
      <section className="relative z-10 pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/35 text-[#FF7900] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>Multidisciplinary Specialist Directory</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          The Masterminds Behind <span style={{ color: "#FF7900" }}>DS Group</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          Behind every iconic residential tower, approved plotted township, and turnkey commercial development stands a dedicated team of engineers, architects, legal counsels, and property strategists. Tap on any team member to view their complete dossier.
        </p>
      </section>

      {/* ── TEAM CARDS GRID (FULL IMAGE WITH BOTTOM OVERLAY + EXPANSION UNDERNEATH) ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {employees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {employees.map((emp, idx) => {
              const cardId = emp.id || emp._id || `emp-${idx}`;
              return (
                <LuxuryTeamCard
                  key={cardId}
                  emp={emp}
                  isExpanded={expandedId === cardId}
                  onToggle={() => handleToggle(cardId)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-xl mx-auto p-8">
            <Users className="w-12 h-12 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No team members found
            </h3>
            <p className="text-xs text-slate-500">
              Please add employee profiles in the Admin Dashboard under About Us Management.
            </p>
          </div>
        )}
      </section>

      {/* ── DUAL ACTION BANNER: CONSULT SPECIALISTS OR JOIN TEAM ──── */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center text-white"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1F2937 60%, #111827 100%)",
            border: "1.5px solid rgba(255, 121, 0, 0.4)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35), 0 0 40px rgba(255, 121, 0, 0.12)",
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
            Expert Advisory Channels
          </span>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Connect Directly with Our Senior Specialists
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you need structural drawings verification, HRERA title diligence, or high-value investment advisory, our specialists are ready to assist you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/enquire"
              className="px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-950 transition-all shadow-lg hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
            >
              Book Specialist Consultation
            </Link>
            <a
              href="https://wa.me/917743000070?text=Hello%20DS%20Group%20Team%2C%20I%20would%20like%20to%20consult%20with%20your%20property%20specialists."
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
            >
              WhatsApp Advisory Desk →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
