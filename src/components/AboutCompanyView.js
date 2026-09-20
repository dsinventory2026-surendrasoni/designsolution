"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  Building2, Target, Eye, ShieldCheck, MapPin, PhoneCall,
  Mail, Calendar, Sparkles, Tag, CheckCircle2, Clock,
  ArrowRight, ExternalLink, Image as ImageIcon, Briefcase,
  TrendingUp, Star, Users, Award, Quote, Zap, Globe,
  Home, BarChart3, Shield, HeartHandshake, Landmark, BadgeCheck
} from "lucide-react";

/* ─── Animated Counter Hook ─── */
function useCounter(target, duration = 2000, startWhen = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startWhen) return;
    let start = null;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [startWhen, target, duration]);
  return count;
}

/* ─── Individual Animated Stat ─── */
function AnimatedStat({ value, label, suffix = "", prefix = "", startWhen }) {
  const num = useCounter(value, 1800, startWhen);
  const rawNum = parseInt(value.replace(/\D/g, "")) || 0;
  const displayNum = startWhen ? num : 0;
  const hasSuffix = value.includes("+");
  const hasPercent = value.includes("%");

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-orange-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div
        className="text-5xl font-black leading-none tracking-tight"
        style={{ fontFamily: "var(--font-outfit)", color: "#FF7900" }}
      >
        {prefix}{displayNum}{hasSuffix ? "+" : ""}{hasPercent ? "%" : ""}{suffix}
      </div>
      <div className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500 text-center leading-snug">
        {label}
      </div>
    </div>
  );
}

export default function AboutCompanyView({ siteConfig: propSiteConfig }) {
  const cfg = propSiteConfig || staticSiteConfig;
  const brand = cfg?.brand || staticSiteConfig.brand;
  const contact = cfg?.contact || staticSiteConfig.contact;

  // Founder / Owner data – synced with Admin → About → Owner tab
  const ownerDetails = cfg?.about?.ownerDetails || {};
  const founderPhoto = ownerDetails?.photo || cfg?.owner?.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";
  const founderName = ownerDetails?.name || cfg?.owner?.name || "Surendra Soni";
  const founderDesignation = ownerDetails?.designation || cfg?.owner?.designation || "Founder & Managing Director";
  const founderQuote = ownerDetails?.quote || cfg?.owner?.quote || "Our vision has always been to create developments that combine architectural excellence, transparency, and long-term value — because every family that trusts us with their investment deserves nothing less than perfection.";

  const company = cfg?.about?.companyDetails || {
    story: "Founded with an uncompromising ambition to reshape the National Capital Region's architectural horizon, DS Group of Companies has emerged as Gurugram's preeminent developer and real estate advisory firm. Headquartered in the prime growth epicentre of Sector 85, we orchestrate landmark residential complexes, Grade-A commercial towers, approved freehold plot communities, and end-to-end turnkey construction with absolute transparency, statutory compliance, and engineering mastery.",
    mission: "To engineer iconic living and business destinations that deliver generational wealth, uncompromised structural integrity, and world-class luxury while maintaining 100% legal transparency and ethical advisory for every client.",
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
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    ],
    seoKeywords: [
      "DS Group of Companies",
      "Real Estate Developer Sector 85 Gurgaon",
      "Luxury flats Sector 85 Gurugram",
      "Commercial property Dwarka Expressway",
      "Freehold plots Gurgaon",
      "Turnkey construction Gurgaon",
      "Best property consultant Gurugram"
    ]
  };

  const officeImages = (company.images && company.images.length > 0)
    ? company.images
    : [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
      ];

  const fullAddress = contact?.address?.plot
    ? `${contact.address.plot}, ${contact.address.tower}, ${contact.address.floor}, ${contact.address.city}, Haryana - ${contact.address.pincode}`
    : `${contact?.addressPlot || "Plot Sector 85"}, ${contact?.addressTower || "Tower 7"}, ${contact?.addressFloor || "3rd Floor"}, ${contact?.addressCity || "Gurugram"}, Haryana - ${contact?.addressPincode || "122004"}`;

  /* ── Intersection observer for counter trigger ── */
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Gallery tab state ── */
  const [activeTab, setActiveTab] = useState("All");
  const galleryTabs = ["All", "Office", "Projects", "Construction"];

  /* ── Lightbox state ── */
  const [lightboxImg, setLightboxImg] = useState(null);

  const timeline = (company.timeline && company.timeline.length > 0)
    ? company.timeline
    : [
        { year: "2008", event: "Company Founded", desc: "DS Group established in Gurugram with a vision to redefine real estate." },
        { year: "2012", event: "First Residential Development", desc: "Landmark residential project launched in Sector 85, setting quality benchmarks." },
        { year: "2016", event: "Commercial Expansion", desc: "Entry into Grade-A commercial spaces along Dwarka Expressway." },
        { year: "2020", event: "Turnkey Construction Division", desc: "In-house EPC division launched for end-to-end construction delivery." },
        { year: "2024", event: "Multi-Sector Presence", desc: "Comprehensive portfolio spanning residential, commercial, and plotted developments." },
      ];

  const defaultWhyCards = [
    { icon: ShieldCheck, title: "Transparent Transactions", desc: "Every deal is documented, escrow-protected, and fully RERA compliant." },
    { icon: BadgeCheck, title: "RERA Compliant Projects", desc: "100% HRERA registered projects ensuring buyer protection and legal clarity." },
    { icon: MapPin, title: "Prime Locations", desc: "Projects along Dwarka Expressway and Southern Peripheral Road — NCR's growth corridor." },
    { icon: Award, title: "Construction Excellence", desc: "ISO-grade construction standards with in-house structural engineering teams." },
    { icon: HeartHandshake, title: "Customer Support", desc: "Dedicated relationship managers from booking to possession and beyond." },
    { icon: TrendingUp, title: "Long-Term Value Creation", desc: "Locations and asset classes curated for consistent capital appreciation." },
  ];

  const whyCards = (company.highlights && company.highlights.length > 0)
    ? company.highlights.map((h, i) => ({
        icon: defaultWhyCards[i % defaultWhyCards.length].icon,
        title: h.title,
        desc: h.description,
      }))
    : defaultWhyCards;

  const defaultStrengthIcons = [Calendar, Building2, Landmark, MapPin, Star, ShieldCheck];

  const strengthCards = (company.strengthCards && company.strengthCards.length > 0)
    ? company.strengthCards.map((card, i) => ({
        icon: defaultStrengthIcons[i % defaultStrengthIcons.length],
        label: card.label,
        value: card.value,
        sub: card.sub,
      }))
    : [
        { icon: Calendar, label: "Years in Business", value: "16+", sub: "Since 2008" },
        { icon: Building2, label: "Projects Delivered", value: "25+", sub: "Across NCR" },
        { icon: Landmark, label: "Construction Expertise", value: "EPC", sub: "End-to-End" },
        { icon: MapPin, label: "Strategic Locations", value: "8+", sub: "Prime Sectors" },
        { icon: Star, label: "Customer Satisfaction", value: "98%", sub: "Verified Feedback" },
        { icon: ShieldCheck, label: "Regulatory Certs", value: "100%", sub: "Compliance" },
      ];

  const defaultCoreValues = [
    { icon: ShieldCheck, title: "Integrity", desc: "Every transaction backed by full documentation and zero hidden clauses." },
    { icon: Eye, title: "Transparency", desc: "Escrow-protected bookings, RERA IDs visible on every project collateral." },
    { icon: Award, title: "Quality", desc: "ISO-grade materials, seismic-safe structures, luxury-finish standards." },
    { icon: Zap, title: "Innovation", desc: "PropTech integrations, virtual tours, and digital CRM for modern buyers." },
    { icon: HeartHandshake, title: "Customer First", desc: "Relationship-led advisory — your satisfaction defines our success." },
  ];

  const coreValuesList = (company.coreValues && company.coreValues.length > 0)
    ? company.coreValues.map((cv, i) => ({
        icon: defaultCoreValues[i % defaultCoreValues.length].icon,
        title: cv.title,
        desc: cv.description,
      }))
    : defaultCoreValues;

  const dynamicStats = (company.stats && company.stats.length > 0)
    ? company.stats
    : [
        { label: "Projects Delivered", value: "25+" },
        { label: "Happy Families", value: "500+" },
        { label: "Years Experience", value: "15+" },
        { label: "Regulatory Compliance", value: "100%" },
      ];

  const trustPoints = (company.trustPoints && company.trustPoints.length > 0)
    ? company.trustPoints
    : [
        "Compliance Driven", "Customer Focused", "Prime Locations",
        "End-to-End Solutions", "Transparent Operations"
      ];

  return (
    <main className="bg-white text-[#111827] min-h-screen pt-24">


      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: COMPANY INTRODUCTION — Two-Column
      ══════════════════════════════════════════════════════════════ */}

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT: Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-5">
              <Sparkles className="w-3 h-3" /> Our Story
            </div>

            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#111827] leading-tight mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {company.heroHeading || "Building Trust. Creating Landmarks. Delivering Value Since 2008."}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {company.story}
            </p>

            {/* Company Detail Pills */}
            <div className="space-y-3">
              {[
                { label: "Established Year", value: company.establishedYear || "2008" },
                { label: "Headquarters", value: company.headquarters || "Sector 85, Gurugram, Haryana" },
                { label: "Business Category", value: "Real Estate Development & Construction" },
                { label: "Market Presence", value: "Gurugram NCR — Dwarka Expressway Corridor" },
                { label: "Core Expertise", value: "Residential · Commercial · Plotted · Turnkey" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 py-3 border-b border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF7900] mt-2 flex-shrink-0" />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
                    <span className="text-sm font-semibold text-[#111827] sm:text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Animated Statistics Panel */}
          <div ref={statsRef}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-5">
              <BarChart3 className="w-3 h-3" /> At a Glance
            </div>

            <h3
              className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Our Numbers Speak For Us
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {dynamicStats.slice(0, 4).map((st, i) => (
                <AnimatedStat key={i} value={st.value || "0"} label={st.label || ""} startWhen={statsVisible} />
              ))}
            </div>

            {/* Premium badge strip */}
            <div
              className="mt-6 p-5 rounded-2xl flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg, #FFF9F4 0%, #FFEDE0 100%)",
                border: "1px solid rgba(255,121,0,0.2)"
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF7900] flex items-center justify-center flex-shrink-0 shadow-md">
                <BadgeCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#111827]">HRERA Registered Developer</div>
                <div className="text-xs text-slate-500 mt-0.5">Compliant across all active projects in Haryana</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2: COMPANY TIMELINE
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #FFFBF8 0%, #FFF4ED 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
              <TrendingUp className="w-3 h-3" /> Our Journey
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Journey of Growth
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
              From a single vision to a multi-sector real estate conglomerate — our milestones tell our story.
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden md:block relative">
            {/* Connector Line */}
            <div
              className="absolute top-10 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg, transparent, #FF7900, #FF7900, transparent)" }}
            />

            <div className="grid grid-cols-5 gap-4 relative">
              {timeline.map((item, idx) => (
                <div key={item.year} className="flex flex-col items-center text-center group">
                  {/* Dot */}
                  <div
                    className="w-5 h-5 rounded-full border-4 border-[#FF7900] bg-white shadow-lg z-10 mb-4 group-hover:scale-125 transition-transform duration-300"
                    style={{ boxShadow: "0 0 0 6px rgba(255,121,0,0.12)" }}
                  />

                  <div
                    className="p-4 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
                    style={{ borderTop: "3px solid #FF7900" }}
                  >
                    <div className="text-xl font-black text-[#FF7900] mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                      {item.year}
                    </div>
                    <div className="text-xs font-bold text-[#111827] mb-2 leading-snug">{item.event}</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7900] to-orange-200" />
            <div className="space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-[21px] top-4 w-4 h-4 rounded-full bg-[#FF7900] border-2 border-white shadow-md" />
                  <div className="p-5 rounded-2xl bg-white border border-orange-100 shadow-sm">
                    <div className="text-lg font-black text-[#FF7900] mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                      {item.year}
                    </div>
                    <div className="text-sm font-bold text-[#111827] mb-1">{item.event}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3: LEADERSHIP MESSAGE
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Users className="w-3 h-3" /> Leadership
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Message From the Founder
          </h2>
        </div>

        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ border: "1px solid rgba(255,121,0,0.15)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left: Founder Image Panel */}
            <div
              className="lg:col-span-2 relative flex flex-col items-center justify-center p-10 lg:p-12 text-center"
              style={{
                background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)"
              }}
            >
              {/* Subtle orange glow */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 80%, #FF7900, transparent 70%)" }}
              />

              <div className="relative z-10">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 shadow-2xl"
                  style={{ border: "4px solid #FF7900" }}
                >
                  <img
                    src={founderPhoto}
                    alt={`${founderName} - Founder DS Group`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-white font-extrabold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>
                  {founderName}
                </div>
                <div className="text-[#FF7900] text-sm font-semibold mt-1">
                  {founderDesignation}
                </div>
                <div className="text-slate-400 text-xs mt-1">
                  DS Group of Companies
                </div>

                {/* Digital Signature style */}
                <div className="mt-5 pt-5 border-t border-white/10">
                  <div
                    className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-1"
                  >
                    Digital Signature
                  </div>
                  <div
                    style={{
                      fontFamily: "cursive",
                      fontSize: "24px",
                      color: "#FF7900",
                      opacity: 0.9,
                      letterSpacing: "2px"
                    }}
                  >
                    {founderName}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quote Content */}
            <div className="lg:col-span-3 p-10 lg:p-12 bg-white flex flex-col justify-center">
              <Quote className="w-10 h-10 text-orange-200 mb-6 flex-shrink-0" />

              <blockquote
                className="text-xl sm:text-2xl font-semibold text-[#111827] leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                &quot;{founderQuote}&quot;
              </blockquote>

              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                {ownerDetails?.bio || `With over ${ownerDetails?.experienceYears || "18+"} years of visionary leadership in real estate development, construction engineering, and architectural masterplanning, ${founderName} founded DS Group of Companies on the principle that every structure must stand as a testament to trust, quality, and timeless design.`}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/about/owner"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:shadow-lg"
                  style={{ background: "#FF7900" }}
                >
                  Full Founder Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/enquire"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border border-orange-200 text-[#FF7900] bg-orange-50 hover:bg-orange-100 transition-all"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4: MISSION • VISION • VALUES
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #FFFBF8 0%, #FFF4ED 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
              <Star className="w-3 h-3" /> Philosophy
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Mission • Vision • Values
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
              The principles that guide every project, every team, and every client relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Mission */}
            <div
              className="rounded-3xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ border: "1px solid rgba(255,121,0,0.15)", borderTop: "4px solid #FF7900" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#FF7900]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111827] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {company.mission}
              </p>
            </div>

            {/* Vision */}
            <div
              className="rounded-3xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ border: "1px solid rgba(255,121,0,0.15)", borderTop: "4px solid #FF7900" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-[#FF7900]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111827] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {company.vision}
              </p>
            </div>

            {/* Core Values */}
            <div
              className="rounded-3xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ border: "1px solid rgba(255,121,0,0.15)", borderTop: "4px solid #FF7900" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                <Star className="w-6 h-6 text-[#FF7900]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111827] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                Core Values
              </h3>
              <div className="space-y-3">
                {coreValuesList.map((val) => (
                  <div key={val.title} className="flex items-start gap-3">
                    <val.icon className="w-4 h-4 text-[#FF7900] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-extrabold text-[#111827]">{val.title}</div>
                      <div className="text-[11px] text-slate-500 leading-snug">{val.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5: WHY DS GROUP
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
            <CheckCircle2 className="w-3 h-3" /> Why Choose Us
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Why Investors &amp; Homebuyers Choose DS Group
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-2xl mx-auto">
            Trust built over 16 years with hundreds of families and investors across Gurugram.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyCards.map((card, idx) => (
            <div
              key={card.title}
              className="group p-7 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              style={{ borderLeft: "4px solid #FF7900" }}
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 group-hover:bg-[#FF7900] group-hover:border-[#FF7900] transition-colors duration-300">
                <card.icon className="w-5 h-5 text-[#FF7900] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-extrabold text-[#111827] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6: CORPORATE STRENGTHS
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #FFFBF8 0%, #FFF4ED 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
              <Briefcase className="w-3 h-3" /> Enterprise Profile
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Corporate Strengths
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
              Key metrics that define our position as a leading NCR real estate conglomerate.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {strengthCards.map((card) => (
              <div
                key={card.label}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3 group-hover:bg-[#FF7900] group-hover:border-[#FF7900] transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-[#FF7900] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-2xl font-black text-[#FF7900]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {card.value}
                </div>
                <div className="text-[11px] font-bold text-[#111827] mt-1 leading-snug">{card.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7: HEAD OFFICE
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3 h-3" /> Visit Us
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Corporate Headquarters
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
            Our executive offices are conveniently located in Sector 85 — the heart of New Gurugram.
          </p>
        </div>

        {/* Office Banner Image */}
        <div className="rounded-3xl overflow-hidden mb-8 relative aspect-[21/6] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80"
            alt="DS Group Corporate Office - Sector 85 Gurugram"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#FF7900] mb-2">Executive Office</div>
              <div className="text-white font-extrabold text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>
                DS Group Corporate HQ
              </div>
              <div className="text-white/70 text-sm mt-1">Sector 85, Gurugram, Haryana — 122004</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Office Details Card */}
          <div className="rounded-3xl bg-white border border-slate-100 shadow-md p-8 space-y-5">
            <h3 className="text-lg font-extrabold text-[#111827] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
              Office Information
            </h3>

            {[
              { icon: MapPin, label: "Office Location", value: company.headquarters || fullAddress, color: "#FF7900" },
              { icon: Clock, label: "Business Hours", value: company.workingHours || contact?.workingHours || "Mon - Sat: 9:00 AM - 7:30 PM", color: "#059669" },
              { icon: PhoneCall, label: "Direct Office Call", value: company.phone || contact?.phonePrimary || "+91 77430 00070", color: "#FF7900", href: `tel:${(company.phone || contact?.phonePrimary || "+91 77430 00070").replace(/\s+/g, "")}` },
              { icon: Mail, label: "Official Email", value: company.email || contact?.emailPrimary || "info@dsgroupofcompanies.com", color: "#7C3AED", href: `mailto:${company.email || contact?.emailPrimary || "info@dsgroupofcompanies.com"}` },
              { icon: Calendar, label: "Consultation Availability", value: "By Appointment · Private Sessions Available", color: "#0284C7" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-[#111827] hover:text-[#FF7900] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm font-semibold text-[#111827]">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            <Link
              href="/enquire"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
            >
              Book Office Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Embedded Map */}
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-md min-h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6!2d77.02!3d28.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector+85+Gurugram!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DS Group Office Location - Sector 85 Gurugram"
            />
            {/* Map Overlay Branding */}
            <div
              className="absolute bottom-4 left-4 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{ background: "rgba(17,24,39,0.85)", backdropFilter: "blur(8px)" }}
            >
              📍 DS Group HQ · Sector 85, Gurugram
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8: GALLERY
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #FFFBF8 0%, #FFF4ED 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-4">
                <ImageIcon className="w-3 h-3" /> Visual Tour
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Office &amp; Headquarters Gallery
              </h2>
              <p className="mt-2 text-slate-500 text-base">Exclusive visual tour of our corporate spaces and project sites.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {galleryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={
                    activeTab === tab
                      ? { background: "#FF7900", color: "white", boxShadow: "0 4px 12px rgba(255,121,0,0.3)" }
                      : { background: "white", color: "#6B7280", border: "1px solid #E5E7EB" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {officeImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`group relative rounded-2xl overflow-hidden border border-orange-100 shadow-sm cursor-pointer ${idx === 0 ? "sm:col-span-2 sm:row-span-2 aspect-square" : "aspect-[4/3]"}`}
                onClick={() => setLightboxImg(imgUrl)}
              >
                <img
                  src={imgUrl}
                  alt={`DS Group Corporate Space ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-xs font-bold">DS Group Corporate Office · Sector 85</span>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full">
            <img
              src={lightboxImg}
              alt="DS Group Office"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-lg font-bold flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9: CERTIFICATIONS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3 h-3" /> Verified & Compliant
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#111827]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Statutory Credentials &amp; Certifications
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
            100% verified legal registrations, corporate identity, and HRERA licensing — full compliance at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              badge: "CIN",
              title: "Corporate Identity",
              value: company.cinNumber || "U70109HR2014PTC053210",
              status: "Active",
              desc: "Ministry of Corporate Affairs registered entity",
              color: "#0284C7",
              bgColor: "#EFF6FF"
            },
            {
              badge: "GST",
              title: "GST Registration",
              value: "06AAAC*****Z1",
              status: "Active",
              desc: "Goods & Services Tax compliant organization",
              color: "#059669",
              bgColor: "#F0FDF4"
            },
            {
              badge: "RERA",
              title: "HRERA Registration",
              value: company.reraRegistration || "HRERA-PKL-GGM-1234-2024",
              status: "Registered",
              desc: "Haryana Real Estate Regulatory Authority certified",
              color: "#FF7900",
              bgColor: "#FFF9F4"
            },
            {
              badge: "REG",
              title: "Company Registration",
              value: `Incorporated ${company.establishedYear || 2008}`,
              status: "Verified",
              desc: "Private Limited Company, Gurugram Jurisdiction",
              color: "#7C3AED",
              bgColor: "#F5F3FF"
            },
          ].map((cert) => (
            <div
              key={cert.badge}
              className="rounded-3xl p-6 bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Badge */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black"
                  style={{ background: cert.bgColor, color: cert.color, border: `2px solid ${cert.color}20` }}
                >
                  {cert.badge}
                </div>
                <div
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: cert.bgColor, color: cert.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: cert.color }} />
                  {cert.status}
                </div>
              </div>

              <div className="text-sm font-extrabold text-[#111827] mb-1">{cert.title}</div>
              <div className="text-xs font-mono font-semibold mb-2" style={{ color: cert.color }}>
                {cert.value}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{cert.desc}</p>

              {/* Verification stripe */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Compliance Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Keywords Section — preserved */}
        {company.seoKeywords && company.seoKeywords.length > 0 && (
          <div
            className="mt-8 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#FF7900]" />
              <h3 className="text-sm font-bold text-[#111827]">
                Target Real Estate Keywords &amp; Specializations
              </h3>
              <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-[#FF7900]">
                Live Google Indexed Categories
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {company.seoKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#FF7900] bg-orange-50 border border-orange-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 10: TRUST BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1F2937 50%, #111827 100%)",
          borderTop: "1px solid rgba(255,121,0,0.15)",
          borderBottom: "1px solid rgba(255,121,0,0.15)"
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-5">
            <Globe className="w-3 h-3" /> Trusted Developer
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Trusted Real Estate Development Partner in Gurgaon
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white text-sm font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FF7900] flex-shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA — PREMIUM LUXURY
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          className="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FFFBF8 0%, #FFF4ED 50%, #FFEDE0 100%)",
            border: "1px solid rgba(255,121,0,0.2)",
            boxShadow: "0 24px 80px rgba(255,121,0,0.12)"
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(255,121,0,0.12), transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(255,121,0,0.08), transparent 70%)" }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF7900] text-[11px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> Private Consultation
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-5"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Let&apos;s Discuss Your Next{" "}
              <span style={{ color: "#FF7900" }}>Property Investment</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Schedule a private consultation with our team and explore verified opportunities across Gurgaon.
              Our experts will guide you through the best options for your goals and budget.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/enquire"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/owner"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-[#111827] border-2 border-[#111827] bg-white hover:bg-[#111827] hover:text-white transition-all duration-200"
              >
                Contact Our Team
              </Link>
            </div>

            {/* Trust indicators below CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                RERA Registered
              </span>
              <span className="w-px h-4 bg-slate-200" />
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-[#FF7900]" />
                No Hidden Charges
              </span>
              <span className="w-px h-4 bg-slate-200" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                Free First Consultation
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
