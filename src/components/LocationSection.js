"use client";

import { useRef, useState, useEffect } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { MapPin, PhoneCall, Mail, Clock, MessageSquare, Navigation, Building2 } from "lucide-react";

export default function LocationSection({ onOpenContactModal, siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const { contact } = siteConfig;
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
    <section
      id="location"
      ref={sectionRef}
      className="py-24 sm:py-32 navy-bg text-white relative overflow-hidden grain-overlay border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className="max-w-3xl text-center mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="eyebrow-label mb-4">
            <span>Corporate Headquarters</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Visit Our <span className="champagne-gradient-text">Head Office</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            We invite you to meet our engineering team, review 3D architectural models, and inspect original land title documents at our corporate suites.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Glass Contact Card (5 cols) */}
          <div
            className="lg:col-span-5 p-8 sm:p-10 rounded-3xl flex flex-col justify-between space-y-8"
            style={{
              background: "var(--navy-mid)",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
            }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg, #1e40af, #C9A96E)" }}
                >
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-white">DS Group HQ</h3>
                  <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">Sector 85 Corporate Corridor</span>
                </div>
              </div>

              {/* Address Highlight Box */}
              <div
                className="p-5 rounded-2xl space-y-2"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Office Address</span>
                    <p className="text-base font-bold text-white mt-1">
                      {contact.address.plot}, {contact.address.tower}, {contact.address.floor}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {contact.address.fullAddress}, {contact.address.city}, {contact.address.state} - {contact.address.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone, Email, Hours */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5 text-sm text-slate-300">
                  <div
                    className="p-2.5 rounded-xl text-amber-400"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone / WhatsApp</span>
                    <span className="font-bold text-white text-base">{contact.phonePrimary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-slate-300">
                  <div
                    className="p-2.5 rounded-xl text-amber-400"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Corporate Email</span>
                    <span className="font-bold text-white">{contact.emailPrimary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-slate-300">
                  <div
                    className="p-2.5 rounded-xl text-emerald-400"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Working Hours</span>
                    <span className="text-xs font-medium text-slate-300">{contact.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800">
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${contact.address.fullAddress}, Gurugram`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-champagne py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Map Container (7 cols) */}
          <div
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl relative min-h-[420px] flex"
            style={{ border: "1px solid rgba(201,169,110,0.2)" }}
          >
            <iframe
              title="DS Group Headquarters Map"
              src={siteConfig.googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-3xl filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
