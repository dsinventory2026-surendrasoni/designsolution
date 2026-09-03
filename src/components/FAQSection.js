"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, Sparkles, Building, MapPin, ShieldCheck, Home } from "lucide-react";

export const faqData = [
  {
    category: "Brand & Company",
    question: "Who is DS Group of Companies in Gurgaon?",
    answer: "DS Group of Companies is a premier real estate development, property consulting, and turnkey construction group headquartered in Sector 85, Gurugram. Founded by Mr. Surendra Soni, the company brings 18+ years of engineering excellence and over 45 completed landmark projects across luxury residential, Grade-A commercial, and freehold plot developments.",
  },
  {
    category: "Brand & Company",
    question: "Where is DS Group located and how can I contact you?",
    answer: "Our corporate headquarters is located at Plot Sector 85, Tower 7, 3rd Floor, Corporate Business District, Gurugram, Haryana 122004. You can reach our senior advisors via phone or WhatsApp at +91 77430 00070 or email info@dsgroupofcompanies.in.",
  },
  {
    category: "Brand & Company",
    question: "What services does DS Group provide?",
    answer: "DS Group provides comprehensive end-to-end real estate services including: Property Consultation & Due Diligence, Residential Luxury Apartment Sales, Grade-A Commercial & Retail Shop Sales, Freehold Residential Plot Sales, Turnkey Villa Construction, Architectural Interior/Exterior Design, and Large-Scale Masterplanning Infrastructure.",
  },
  {
    category: "Sector 85 Gurgaon",
    question: "Why is Sector 85 Gurgaon considered a top real estate investment destination?",
    answer: "Sector 85 Gurugram offers direct connectivity to the Dwarka Expressway and NH-48, an upcoming Metro corridor, wide 60m and 84m sector roads, established social infrastructure (schools, multispecialty hospitals), and strong capital appreciation driven by premium residential projects like Godrej Air, SS The Leaf, and Pyramid Heights.",
  },
  {
    category: "Sector 85 Gurgaon",
    question: "Who is the best property dealer and real estate consultant in Sector 85 Gurgaon?",
    answer: "DS Group of Companies is recognized as the leading property finder and real estate consultant in Sector 85 Gurgaon, offering 100% verified listings, zero brokerage on select direct builder inventory, transparent documentation, and on-ground project tours.",
  },
  {
    category: "Sector 85 Gurgaon",
    question: "Can DS Group assist with buying or reselling flats in Godrej Air Sector 85 Gurgaon?",
    answer: "Yes, DS Group actively manages verified resale, new booking, and rental inventories for Godrej Air Sector 85 Gurgaon, offering competitive pricing, authentic floor plan evaluations, and seamless registry assistance.",
  },
  {
    category: "Sector 85 Gurgaon",
    question: "What is the price range of luxury apartments in Sector 85 Gurgaon?",
    answer: "Luxury 2 BHK, 3 BHK, and 4 BHK apartments in Sector 85 Gurgaon generally range from ₹95 Lakhs to ₹3.20 Crores depending on carpet area, builder pedigree (e.g. Godrej Air, DS Crown, SS The Leaf), floor level, and furnishing status.",
  },
  {
    category: "Luxury Residential",
    question: "What features define luxury apartments developed and offered by DS Group?",
    answer: "Our luxury residential portfolio features imported Italian marble flooring, double-glazed acoustic UPVC windows, VRV centralized air conditioning, double-height entrance lobbies, high-speed elevators, smart home automation, EV charging bays, and resort-grade clubhouses with infinity pools.",
  },
  {
    category: "Luxury Residential",
    question: "Are ready-to-move flats available with immediate possession in Gurugram?",
    answer: "Yes, DS Group maintains a curated inventory of ready-to-move luxury apartments with valid Occupation Certificates (OC), Completion Certificates (CC), and verified title deeds ready for immediate registry and move-in.",
  },
  {
    category: "Commercial & Plots",
    question: "What types of commercial properties are available in Sector 85 Gurgaon?",
    answer: "We offer Grade-A corporate office suites, high-street double-height retail shops, anchor food court spaces, and SCO (Shop-Cum-Office) commercial plots with high footfall potential and projected rental yields of 7% to 10% per annum.",
  },
  {
    category: "Commercial & Plots",
    question: "Can I buy freehold residential plots in Sector 85 Gurgaon with immediate registry?",
    answer: "Yes, DS Group offers government-sanctioned, freehold residential plots in gated enclaves in Sector 85 Gurugram with clear title deeds, underground electricity, paved roads, and immediate building permission.",
  },
  {
    category: "Legal & RERA",
    question: "Are all real estate projects represented by DS Group RERA approved?",
    answer: "Yes, 100% of projects represented, marketed, or developed by DS Group comply strictly with Haryana Real Estate Regulatory Authority (HRERA) guidelines, ensuring buyers receive complete legal protection and transparency.",
  },
];

export default function FAQSection({ onOpenContactModal }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Brand & Company", "Sector 85 Gurgaon", "Luxury Residential", "Commercial & Plots", "Legal & RERA"];

  const filteredFaqs = activeCategory === "All"
    ? faqData
    : faqData.filter((item) => item.category === activeCategory);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs" className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Real Estate & Property <span className="champagne-gradient-text">Knowledge Hub</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Everything you need to know about buying luxury homes, commercial spaces, freehold plots, and Sector 85 Gurgaon properties with DS Group.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-amber-400 text-slate-950 shadow-lg scale-105"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-950 border-amber-500/40 shadow-2xl shadow-amber-500/5"
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-white font-outfit">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900 pt-4 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center max-w-xl mx-auto space-y-4 shadow-2xl">
          <h3 className="text-base font-bold text-white font-outfit">
            Have a Specific Question About a Gurgaon Property?
          </h3>
          <p className="text-xs text-slate-400">
            Our real estate specialists in Sector 85 are available for immediate phone & WhatsApp consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/917743000070?text=Hello%20DS%20Group,%20I%20have%20a%20question%20regarding%20Gurgaon%20real%20estate."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <button
              onClick={onOpenContactModal}
              className="w-full sm:w-auto btn-champagne px-6 py-3 rounded-xl text-xs uppercase tracking-wider"
            >
              Book Callback
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
