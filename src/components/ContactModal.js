"use client";

import { useState } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { X, Send, PhoneCall, CheckCircle2, Building2 } from "lucide-react";

export default function ContactModal({ isOpen, onClose, siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Residential",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up">
      <div
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-auto grain-overlay overflow-hidden"
        style={{ background: "var(--navy-deep)", border: "1px solid rgba(201,169,110,0.25)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-outfit text-white">Inquiry Received!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-amber-400">{formData.name}</span>. Our senior real estate advisor will call you shortly at <span className="font-semibold text-white">{formData.phone}</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>DS Group Consultation</span>
              </div>
              <h3 className="text-2xl font-bold font-outfit text-white">Schedule a Site Visit</h3>
              <p className="mt-1 text-xs text-slate-400">
                Direct consultation with our architectural & sales leadership team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-xs font-medium input-dark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs font-medium input-dark"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Property Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs font-medium input-dark cursor-pointer"
                  >
                    <option value="Residential" className="bg-slate-900">Residential Flat</option>
                    <option value="Commercial" className="bg-slate-900">Commercial Suite</option>
                    <option value="Plots" className="bg-slate-900">Freehold Plot</option>
                    <option value="Construction" className="bg-slate-900">Turnkey Villa</option>
                    <option value="New Launches" className="bg-slate-900">New Launch Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-xs font-medium input-dark"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Specific Requirements / Message</label>
                <textarea
                  rows="3"
                  placeholder="Tell us your preferred size, budget range, or site visit date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-xs font-medium input-dark"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-champagne w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2.5 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
