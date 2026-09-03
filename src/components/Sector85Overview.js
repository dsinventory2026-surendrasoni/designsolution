"use client";

import { useState } from "react";
import {
  MapPin,
  Building,
  Sparkles,
  TrendingUp,
  Compass,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Shield,
  Layers,
  Award,
  Trees,
} from "lucide-react";

export default function Sector85Overview({ onOpenContactModal, siteConfig }) {
  const [activeTab, setActiveTab] = useState("overview");

  const projectsInSector85 = [
    {
      name: "Godrej Air Sector 85",
      type: "Luxury Residential Apartments",
      tag: "Air Purification Tech",
      price: "₹1.40 Cr - ₹2.50 Cr",
      specs: "2, 3 & 4 BHK Luxury Flats",
      highlight: "CTFA 2.0 air purification technology, lush green oxygen zones, and ultra-modern clubhouse.",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      name: "Pyramid Heights Sector 85",
      type: "Modern Residential Living",
      tag: "High Value Investment",
      price: "₹65 L - ₹1.10 Cr",
      specs: "1 & 2 BHK Efficient Homes",
      highlight: "Optimal layout efficiency, gated security, commercial convenience plaza, and high rental yield.",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    {
      name: "SS The Leaf Sector 85",
      type: "Ultra-Luxury Residences",
      tag: "Green Forest Theme",
      price: "₹1.60 Cr - ₹3.20 Cr",
      specs: "3 & 4 BHK Penthouses & Flats",
      highlight: "9-acre landscaped expanse, 360-degree panoramic views, infinity pool, and golf putting green.",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    {
      name: "Orris Aster Court Sector 85",
      type: "Ready to Move Luxury",
      tag: "Immediate Possession",
      price: "₹95 L - ₹1.85 Cr",
      specs: "2, 3 & 4 BHK Apartments",
      highlight: "Centrally located with direct access to 84m wide sector road, established resident community, and club.",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    {
      name: "DS Crown Heights (DS Group)",
      type: "Signature Luxury Residence",
      tag: "DS Group Flagship",
      price: "₹1.25 Cr - ₹2.10 Cr",
      specs: "3 & 4 BHK Luxury Suites",
      highlight: "Engineered with Italian marble, double-glazed acoustic facades, VRV air conditioning, and EV docks.",
      badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    },
  ];

  const connectivityPoints = [
    {
      title: "Dwarka Expressway Link",
      time: "3 Minutes",
      desc: "Instant signal-free connectivity to Delhi, IGI Airport Terminal 3, and Dwarka.",
    },
    {
      title: "NH-48 (Delhi-Jaipur Highway)",
      time: "5 Minutes",
      desc: "Direct multi-lane access to Rajiv Chowk, Cyber City, and Hero Honda Chowk.",
    },
    {
      title: "Upcoming Metro Corridor",
      time: "Direct Access",
      desc: "Approved Gurugram Metro Extension line running parallel along the sector road.",
    },
    {
      title: "Top Schools & Hospitals",
      time: "2-10 Minutes",
      desc: "Close to DPS Sector 84, MatriKiran, Care Hospitals, and Medeor Hospital.",
    },
  ];

  return (
    <section id="sector85-guide" className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden grain-overlay border-t border-slate-800/80">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl text-center mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Prime Real Estate Hotspot</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Sector 85 Gurgaon: <span className="champagne-gradient-text">The Epicenter of Luxury Living</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Positioned along the vibrant Dwarka Expressway corridor, Sector 85 Gurugram represents the gold standard for luxury residential living, commercial growth, and high capital appreciation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {[
            { id: "overview", label: "Location & Growth", icon: TrendingUp },
            { id: "projects", label: "Sector 85 Projects", icon: Building },
            { id: "connectivity", label: "Connectivity & Map", icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20 scale-105"
                    : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & INVESTMENT POTENTIAL */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-up">
            <div className="lg:col-span-7 space-y-6 rounded-3xl p-8 sm:p-10 bg-slate-900/80 border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                  Market Dynamics & Real Estate Trends
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white leading-snug">
                  Why Investors & Homebuyers Choose Sector 85 Gurgaon
                </h3>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed font-normal">
                  Sector 85 in New Gurugram has emerged as one of the most lucrative real estate investment corridors in Delhi NCR. With wide 60-meter and 84-meter sector arterial roads, underground utility cabling, planned green belts, and immediate access to the Dwarka Expressway, property values here have recorded consistent double-digit annual appreciation.
                </p>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Whether you are looking for ready-to-move luxury apartments in <span className="text-amber-400 font-semibold">Godrej Air</span> or <span className="text-amber-400 font-semibold">Orris Aster Court</span>, high-return mid-segment flats in <span className="text-amber-400 font-semibold">Pyramid Heights</span>, or custom construction with <span className="text-amber-400 font-semibold">DS Group</span>, Sector 85 offers complete urban convenience with zero compromise on luxury.
                </p>
              </div>

              {/* Key Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-2xl font-extrabold text-amber-400 block font-outfit">18%+</span>
                  <span className="text-[11px] text-slate-400 font-medium">Annual Capital Growth</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-2xl font-extrabold text-emerald-400 block font-outfit">4.5% - 6%</span>
                  <span className="text-[11px] text-slate-400 font-medium">Rental Yield Average</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-extrabold text-blue-400 block font-outfit">100%</span>
                  <span className="text-[11px] text-slate-400 font-medium">RERA & Title Clear</span>
                </div>
              </div>
            </div>

            {/* Right Column: Why DS Group in Sector 85 */}
            <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>#1 Local Property Authority</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  DS Group: Your Trusted Property Finder in Sector 85
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Headquartered right here in Sector 85 Gurugram, DS Group of Companies offers unmatched local real estate expertise. We facilitate direct builder transactions, zero-brokerage advisory, resale verification, and turnkey villa development.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Direct Deals with Top Builders in Sector 85",
                    "Complete Title Search & Legal Verification",
                    "Resale & Ready-to-Move Inventory with OC/CC",
                    "Custom 3D Villa Construction & Turnkey Handover",
                    "High Rental Yield Commercial & Retail Space Advisory",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <a
                  href="https://wa.me/917743000070?text=Hello%20DS%20Group,%20I%20am%20interested%20in%20properties%20in%20Sector%2085%20Gurgaon."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-champagne w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Consult Sector 85 Specialist</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS SHOWCASE IN SECTOR 85 */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsInSector85.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl p-6 bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${proj.badgeColor}`}>
                        {proj.tag}
                      </span>
                      <span className="text-xs font-bold text-amber-400 font-outfit">{proj.price}</span>
                    </div>

                    <h4 className="text-lg font-bold font-outfit text-white group-hover:text-amber-400 transition-colors">
                      {proj.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">{proj.specs} • {proj.type}</p>

                    <p className="text-xs text-slate-300 mt-4 leading-relaxed line-clamp-3">
                      {proj.highlight}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Sector 85, Gurugram</span>
                    <a
                      href={`https://wa.me/917743000070?text=Hi%20DS%20Group,%20I%20would%20like%20details%20and%20pricing%20for%20${encodeURIComponent(proj.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center max-w-2xl mx-auto">
              <p className="text-xs text-slate-300">
                Looking for exclusive floor plans, resale units, or prelaunch deals in Sector 85 Gurgaon?
              </p>
              <button
                onClick={onOpenContactModal}
                className="mt-3 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Request Complete Project Brochure & Price List
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CONNECTIVITY & LOCATION HIGHLIGHTS */}
        {activeTab === "connectivity" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-up">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
                Unrivaled Connectivity Across Delhi NCR
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sector 85 boasts a strategic geographical advantage, linking directly with the newly operational Dwarka Expressway, Southern Peripheral Road (SPR), and Delhi-Gurgaon NH-48.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {connectivityPoints.map((point, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{point.title}</h4>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        {point.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-800 h-[380px] shadow-2xl relative">
              <iframe
                title="Sector 85 Gurugram Map View"
                src={siteConfig?.googleMapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.587877297893!2d76.97444158498421!3d28.459496468453303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d59265f299%3A0xb249f3e9a5bf32ed!2sSector%2085%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
