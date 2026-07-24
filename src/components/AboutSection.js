"use client";

import { useRef, useState, useEffect } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { CheckCircle2, Quote, Target, Eye, Calendar, Award, Building, Sparkles } from "lucide-react";

export default function AboutSection({ siteConfig: propSiteConfig }) {
  const { owner, brand } = propSiteConfig || staticSiteConfig;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className="max-w-3xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="eyebrow-label-light mb-4">
            <span>Our Heritage & Vision</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            A Legacy of Architectural Distinction <span className="champagne-gradient-text">&</span> Trust
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
            For nearly two decades, DS Group of Companies has been a landmark builder in luxury residential masterplanning, commercial corporate towers, approved plot developments, and heavy civil construction.
          </p>
        </div>

        {/* 2-Column Main Split: Company Story & Founder Card */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Company Story, Mission & Vision (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 border-l-2 border-slate-900/10 pl-6">
              <h3 className="text-2xl font-bold text-slate-900 font-outfit">
                Pioneering Urban Skylines in Sector 85
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded with a resolute commitment to engineering precision and design integrity, DS Group of Companies has grown into one of the region's premier real estate developers. We specialize in transforming raw land into thriving, sustainable communities and state-of-the-art business hubs.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every project executed under our banner undergoes rigorous quality audits, structural strength testing, environmental clearances, and 100% legal title verifications prior to handover.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-2xl text-white shadow-xl flex flex-col justify-between"
                style={{ background: "var(--navy-mid)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white font-outfit">Our Mission</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    To build world-class, enduring real estate assets that elevate lifestyles, maximize investor returns, and set benchmark standards in structural engineering.
                  </p>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl text-white shadow-xl flex flex-col justify-between"
                style={{ background: "var(--navy-mid)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white font-outfit">Our Vision</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    To be the most trusted and customer-revered real estate group, recognized for innovation, environmental sustainability, and timely delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Principles Checklist */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Our Core Principles</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["100% Clear Titles", "RERA Approved", "Architectural Mastery", "Grade-A Materials", "Timely Handover", "Client Transparency"].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Managing Director Showcase (5 Cols) */}
          <div className="lg:col-span-5">
            <div
              className="relative p-7 sm:p-8 rounded-3xl text-white shadow-2xl space-y-6 grain-overlay overflow-hidden"
              style={{
                background: "var(--navy-deep)",
                border: "1px solid rgba(201,169,110,0.25)"
              }}
            >
              {/* Decorative Quotation Accent */}
              <div className="absolute top-4 right-4 text-amber-500/10 pointer-events-none">
                <Quote className="w-24 h-24 stroke-[1]" />
              </div>

              {/* Founder Header */}
              <div className="flex items-center gap-4 relative z-10">
                <img
                  src={owner.photo}
                  alt={owner.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400/80 shadow-lg"
                />
                <div>
                  <h4 className="text-xl font-bold font-outfit text-white">{owner.name}</h4>
                  <p className="text-xs font-semibold text-amber-400 tracking-wide uppercase mt-0.5">{owner.designation}</p>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[10px] font-semibold text-amber-300 mt-1 border border-amber-500/20">
                    DS Group Founder
                  </span>
                </div>
              </div>

              {/* Founder Quote */}
              <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed border-l-2 border-amber-400 pl-4 py-1 relative z-10">
                "{owner.quote}"
              </blockquote>

              {/* Founder Bio snippet */}
              <p className="text-xs text-slate-400 leading-relaxed font-normal relative z-10">
                {owner.bio}
              </p>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-800 relative z-10">
                {owner.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-xl font-extrabold text-amber-400 font-outfit block">{stat.value}</span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
