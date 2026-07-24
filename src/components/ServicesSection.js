"use client";

import { useState, useRef, useEffect } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  Building2,
  Palette,
  Layers,
  HardHat,
  Home,
  Briefcase,
  MapPin,
  Compass,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  X
} from "lucide-react";

// Icon Resolver Component
const renderServiceIcon = (iconName) => {
  const props = { className: "w-6 h-6 stroke-[1.8]" };
  switch (iconName) {
    case "Building2": return <Building2 {...props} />;
    case "Palette": return <Palette {...props} />;
    case "Layers": return <Layers {...props} />;
    case "HardHat": return <HardHat {...props} />;
    case "Home": return <Home {...props} />;
    case "Briefcase": return <Briefcase {...props} />;
    case "MapPin": return <MapPin {...props} />;
    case "Compass": return <Compass {...props} />;
    case "ShieldCheck": return <ShieldCheck {...props} />;
    default: return <Building2 {...props} />;
  }
};

export default function ServicesSection({ onOpenContactModal, services: propServices, siteConfig: propSiteConfig }) {
  const [selectedService, setSelectedService] = useState(null);
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

  const siteConfig = propSiteConfig || staticSiteConfig;
  const services = propServices || siteConfig.services;
  const featuredService = services[0];
  const remainingServices = services.slice(1);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 sm:py-32 navy-bg text-white relative overflow-hidden grain-overlay"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, rgba(3,8,16,0) 70%)"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="max-w-3xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="eyebrow-label mb-4">
            <span>Built Environment Expertise</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            End-to-End Solutions Under <span className="champagne-gradient-text">One Vision</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl">
            From initial masterplanning and civil construction to turnkey interior design, plot sales, and commercial leasing—DS Group delivers uncompromised architectural precision.
          </p>
        </div>

        {/* Asymmetric Services Grid Layout */}
        <div className="mt-14 space-y-6">
          {/* Featured Top Service Card */}
          <div
            className="group relative p-8 sm:p-10 rounded-2xl transition-all duration-500 overflow-hidden"
            style={{
              background: "var(--navy-mid)",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
            }}
          >
            {/* Background Accent Glow */}
            <div
              className="absolute top-0 right-0 w-96 h-96 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--champagne) 0%, transparent 70%)" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg, #1e40af, #C9A96E)" }}
                  >
                    {renderServiceIcon(featuredService.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color: "var(--champagne)" }}>
                      FLAGSHIP CAPABILITY • 01
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                      {featuredService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-3xl">
                  {featuredService.fullDescription}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <button
                  onClick={() => setSelectedService(featuredService)}
                  className="btn-champagne py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Explore Infrastructure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/917743000070?text=${encodeURIComponent(`Hello DS Group, I would like to inquire about your flagship "${featuredService.title}" services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy py-3.5 px-6 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Direct Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Remaining 8 Services in 2/4 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {remainingServices.map((service, idx) => {
              const numStr = (idx + 2).toString().padStart(2, "0");
              return (
                <div
                  key={service.id}
                  className="group card-service p-6 flex flex-col justify-between"
                  style={{
                    background: "var(--navy-mid)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}
                >
                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(201,169,110,0.08)",
                          border: "1px solid rgba(201,169,110,0.2)",
                          color: "var(--champagne)"
                        }}
                      >
                        {renderServiceIcon(service.iconName)}
                      </div>
                      <span
                        className="text-xs font-extrabold tracking-widest text-slate-600 font-outfit"
                      >
                        {numStr}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-outfit">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group/btn"
                    >
                      <span className="group-hover/btn:underline decoration-amber-400/50">Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={`https://wa.me/917743000070?text=${encodeURIComponent(`Hello DS Group, I am inquiring about "${service.title}".`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      title="WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white my-auto animate-scale-in">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {renderServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                  {selectedService.badge}
                </span>
                <h3 className="text-xl font-bold font-outfit text-white">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
              {selectedService.fullDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-slate-800">
              <a
                href={`https://wa.me/917743000070?text=${encodeURIComponent(`Hello DS Group, I would like to consult regarding ${selectedService.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Advisory</span>
              </a>

              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenContactModal();
                }}
                className="flex-1 btn-champagne py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
