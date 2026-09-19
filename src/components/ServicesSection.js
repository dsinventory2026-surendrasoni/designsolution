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
      className="py-24 sm:py-32 text-[#111827] relative overflow-hidden border-y border-[#FED7AA]/40"
      style={{
        background: "linear-gradient(180deg, #FFFBF8 0%, #FFF4ED 50%, #FFFBF8 100%)",
      }}
    >
      {/* Subtle Warm Orange Glow Highlights */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF7900]/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF7900]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="max-w-3xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="eyebrow-label-light mb-4 bg-orange-500/10 border border-orange-500/20 text-[#FF7900]">
            <span>Built Environment Expertise</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            End-to-End Solutions Under <span className="text-[#FF7900]">One Vision</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            From initial masterplanning and civil construction to turnkey interior design, plot sales, and commercial leasing—DS Group delivers uncompromised architectural precision.
          </p>
        </div>

        {/* Asymmetric Services Grid Layout */}
        <div className="mt-14 space-y-6">
          {/* Featured Top Service Card */}
          <div
            className="group relative p-8 sm:p-10 rounded-2xl transition-all duration-500 overflow-hidden bg-white"
            style={{
              border: "1px solid #FED7AA",
              boxShadow: "0 10px 30px rgba(255,121,0,0.06)"
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                    style={{ background: "linear-gradient(135deg, #FF7900, #F16E00)" }}
                  >
                    {renderServiceIcon(featuredService.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#FF7900]">
                      FLAGSHIP CAPABILITY • 01
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-outfit">
                      {featuredService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl">
                  {featuredService.fullDescription}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <button
                  onClick={() => setSelectedService(featuredService)}
                  className="py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-white shadow-sm transition-all"
                  style={{ background: "#FF7900" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F16E00"}
                  onMouseLeave={e => e.currentTarget.style.background = "#FF7900"}
                >
                  <span>Explore Infrastructure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/917743000070?text=${encodeURIComponent(`Hello DS Group, I would like to inquire about your flagship "${featuredService.title}" services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#111827] hover:border-[#FF7900] shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
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
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                  }}
                >
                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(255,121,0,0.08)",
                          border: "1px solid rgba(255,121,0,0.2)",
                          color: "#FF7900"
                        }}
                      >
                        {renderServiceIcon(service.iconName)}
                      </div>
                      <span
                        className="text-xs font-extrabold tracking-widest text-slate-400 font-outfit"
                      >
                        {numStr}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#FF7900] transition-colors font-outfit">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-bold text-slate-600 hover:text-[#111827] flex items-center gap-1.5 transition-colors group/btn"
                    >
                      <span className="group-hover/btn:underline decoration-[#FF7900]/50">Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF7900] group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={`https://wa.me/917743000070?text=${encodeURIComponent(`Hello DS Group, I am inquiring about "${service.title}".`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#111827] my-auto animate-scale-in">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-[#111827] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF7900]">
                {renderServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#FF7900] uppercase tracking-widest block">
                  {selectedService.badge}
                </span>
                <h3 className="text-xl font-bold font-outfit text-[#111827]">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              {selectedService.fullDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-[#E5E7EB]">
              <a
                href={`https://wa.me/917743000070?text=${encodeURIComponent(`Hello DS Group, I would like to consult regarding ${selectedService.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Advisory</span>
              </a>

              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenContactModal();
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold text-white flex items-center justify-center gap-2 transition-all"
                style={{ background: "#FF7900" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F16E00"}
                onMouseLeave={e => e.currentTarget.style.background = "#FF7900"}
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
