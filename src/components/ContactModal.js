"use client";

import { useState } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { X, Send, MessageSquare, CheckCircle2, Building2 } from "lucide-react";

const WHATSAPP_NUMBER = "917743000070";

export default function ContactModal({ isOpen, onClose, siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Residential",
    budget: "₹50 Lakhs - ₹1 Crore",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Contact Popup Modal",
        }),
      });
    } catch (err) {
      console.error("Error submitting contact modal:", err);
    }

    setLoading(false);
    setSubmitted(true);

    const waMessage = [
      `🏢 *DS Group of Companies — New Enquiry*`,
      ``,
      `👤 *Name:* ${formData.name}`,
      `📞 *Mobile:* ${formData.phone}`,
      formData.email ? `📧 *Email:* ${formData.email}` : null,
      `🏠 *Interest:* ${formData.category}`,
      `💰 *Budget Range:* ${formData.budget}`,
      formData.message ? `💬 *Message:* ${formData.message}` : null,
      ``,
      `_(Submitted via DS Group Website)_`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up">
      <div
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl text-[#111827] my-auto bg-white border border-[#E5E7EB] overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-[#6B7280] hover:text-[#111827] hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm animate-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-outfit text-[#111827]">Submit Successfully!</h3>
            <p className="text-xs text-[#4B5563] max-w-xs mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#FF7900]">{formData.name}</span>! Your enquiry details have been saved & emailed to <span className="text-[#FF7900] font-semibold">dsinventory2026@gmail.com</span>. Redirecting to WhatsApp...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7900]/10 border border-[#FF7900]/25 text-[#FF7900] text-[10px] font-bold uppercase tracking-widest mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>DS Group Consultation</span>
              </div>
              <h3 className="text-2xl font-bold font-outfit text-[#111827]">Schedule a Site Visit</h3>
              <p className="mt-1 text-xs text-[#6B7280]">
                Direct consultation with our architectural & sales leadership team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-xs font-medium bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#FF7900] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs font-medium bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#FF7900] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">Property Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs font-medium bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] focus:border-[#FF7900] focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Residential">Residential Flat</option>
                    <option value="Commercial">Commercial Suite</option>
                    <option value="Plots">Freehold Plot</option>
                    <option value="Construction">Turnkey Villa</option>
                    <option value="New Launches">New Launch Project</option>
                  </select>
                </div>
              </div>

              {/* BUDGET SECTION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FF7900] mb-1">Budget Range *</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs font-medium bg-[#F8FAFC] border border-[#E5E7EB] text-[#FF7900] font-semibold focus:border-[#FF7900] focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                    <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                    <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                    <option value="₹1 Crore - ₹2 Crores">₹1 Crore - ₹2 Crores</option>
                    <option value="₹2 Crores +">₹2 Crores +</option>
                    <option value="Flexible / Open">Flexible / Open</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs font-medium bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#FF7900] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4B5563] mb-1">Specific Requirements / Message</label>
                <textarea
                  rows="3"
                  placeholder="Tell us your preferred size, location, or site visit date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-xs font-medium bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#FF7900] focus:bg-white focus:outline-none transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 mt-2 bg-[#FF7900] hover:bg-[#F16E00] text-white shadow-md shadow-[#FF7900]/25 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Submitting..." : "Submit Inquiry"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
