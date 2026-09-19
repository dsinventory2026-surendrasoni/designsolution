"use client";

import Link from "next/link";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  Building2, UserCheck, Users, ArrowRight, ShieldCheck,
  Sparkles, Award, MapPin, PhoneCall, Image as ImageIcon
} from "lucide-react";

export default function AboutHubView({ siteConfig: propSiteConfig }) {
  const cfg = propSiteConfig || staticSiteConfig;
  const brand = cfg?.brand || staticSiteConfig.brand;
  const contact = cfg?.contact || staticSiteConfig.contact;
  const company = cfg?.about?.companyDetails || {};
  const owner = cfg?.about?.ownerDetails || {};
  const employees = cfg?.about?.employees || [];

  const portals = [
    {
      id: "company",
      title: "Company Details & Profile",
      tag: "🏢 Corporate Overview",
      href: "/about/company",
      description:
        "Comprehensive heritage, mission, vision, statutory HRERA/CIN compliance, corporate headquarters details in Sector 85 Gurgaon, dynamic SEO keywords, and exclusive multi-photo office gallery.",
      highlights: [
        `Established in ${company.establishedYear || 2008}`,
        "HRERA Registered & Clear Title Projects",
        "Corporate Headquarters in Sector 85 Gurugram",
        "Multi-photo Office & Headquarters Gallery",
      ],
      cta: "Explore Company Details →",
      accent: "from-amber-500/20 to-amber-600/5",
      border: "border-orange-500/30 hover:border-orange-400",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/30",
    },
    {
      id: "owner",
      title: "Founder & Managing Director",
      tag: "👤 Executive Profile",
      href: "/about/owner",
      description:
        `Exclusive profile of ${owner.name || "Surendra Soni"}, visionary founder with ${owner.experienceYears || "18+ Years"} in NCR real estate development, executive philosophy, honors, recognitions, and direct VIP consultation channels.`,
      highlights: [
        `${owner.name || "Surendra Soni"} · Founder & MD`,
        `${owner.experienceYears || "18+ Years"} Industry Leadership`,
        "National & Regional Real Estate Awards",
        "Direct WhatsApp & Phone Consultation",
      ],
      cta: "View Founder Profile →",
      accent: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/30 hover:border-blue-400",
      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    },
    {
      id: "team",
      title: "Employee & Specialist Directory",
      tag: "👥 Specialists & Staff",
      href: "/about/team",
      description:
        `Directory of ${employees.length > 0 ? employees.length : "15+"} engineers, architects, legal advisors, and luxury property consultants driving innovation across Gurugram with individual bios, photos, and direct contacts.`,
      highlights: [
        "Department-wise Specialist Filter",
        "Structural Engineers, Architects & Legal Experts",
        "Direct Specialist Phone, Email & LinkedIn",
        "Complete Work Experience & Bio Descriptions",
      ],
      cta: "Browse Team Directory →",
      accent: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30 hover:border-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
  ];

  return (
    <main className="bg-[#F8FAFC] text-[#111827] min-h-screen">

      {/* ── HERO BANNER ──────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden text-center"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, #1F2937 0%, #111827 70%, #0D1117 100%)",
          borderBottom: "1px solid rgba(255,121,0,0.15)"
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,121,0,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF7900] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Corporate Portal</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            About DS Group of Companies
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Select one of the three dedicated portals below to view specific, detailed information regarding our company heritage, executive leadership, or multidisciplinary specialist directory.
          </p>
        </div>
      </section>

      {/* ── 3 DEDICATED PORTAL TILES ──────────────────────────────── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {portals.map((p) => {
            const isOwner = p.id === "owner";
            const isTeam = p.id === "team";
            return (
              <div
                key={p.id}
                className="rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden"
                style={{
                  background: isOwner
                    ? "linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 40%, #FFEDD5 100%)"
                    : isTeam
                    ? "linear-gradient(135deg, #FFFFFF 0%, #FFFBF5 60%, #FFF7ED 100%)"
                    : "#FFFFFF",
                  border: isOwner
                    ? "2px solid rgba(255, 121, 0, 0.45)"
                    : "1px solid rgba(229, 231, 235, 0.9)",
                  boxShadow: isOwner
                    ? "0 12px 35px -5px rgba(255, 121, 0, 0.18)"
                    : "0 8px 30px -5px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Ambient orange highlight for Owner card */}
                {isOwner && (
                  <div
                    className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none opacity-40"
                    style={{
                      background: "radial-gradient(circle, #FF7900 0%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />
                )}

                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-4"
                    style={{
                      background: isOwner ? "rgba(255, 121, 0, 0.18)" : "rgba(255, 121, 0, 0.1)",
                      color: "#FF7900",
                      borderColor: "rgba(255, 121, 0, 0.35)",
                    }}
                  >
                    {p.tag}
                  </span>

                  <h2 className="text-2xl font-bold text-[#111827] mb-3 group-hover:text-[#FF7900] transition-colors">
                    {p.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {p.description}
                  </p>

                  <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-200/80">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={p.href}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white transition-all shadow-md group-hover:scale-[1.02]"
                  style={{
                    background: isOwner
                      ? "linear-gradient(135deg, #FF7900, #EA580C)"
                      : "#FF7900",
                    boxShadow: isOwner ? "0 4px 15px rgba(255, 121, 0, 0.35)" : "none",
                  }}
                >
                  <span>{p.cta}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    </main>
  );
}
