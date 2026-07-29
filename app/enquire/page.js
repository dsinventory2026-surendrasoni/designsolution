"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Send,
  Building2,
  CheckCircle2,
  PhoneCall,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

export default function EnquirePage() {
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
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Enquire Page Form",
        }),
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        setSubmitted(true);
        setSubmittedData(formData);
      } else {
        setErrorMsg(result.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Sticky Header Navbar */}
      <Navbar siteConfig={siteConfig} />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors py-1 px-3 rounded-lg bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* SECTION 1: FORM FILLUP SECTION (Form pehle dikhega) */}
        <section className="max-w-3xl mx-auto mb-12">
          {submitted ? (
            /* SUBMIT SUCCESSFULLY SCREEN */
            <div className="rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-slate-900 border border-emerald-500/40 shadow-2xl animate-fade-up">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Submit Successfully
                </span>
                <h2 className="text-3xl font-extrabold font-outfit text-white">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-amber-400">{submittedData?.name}</span>! Your enquiry details have been forwarded to our team (<span className="text-amber-400 font-semibold">dsinventory2026@gmail.com</span>) and saved in our system. Our advisor will reach out to you shortly.
                </p>
              </div>

              {/* Submitted Details Summary Card */}
              <div className="rounded-2xl bg-slate-950 p-6 text-left border border-slate-800 space-y-2 text-xs text-slate-300 max-w-lg mx-auto">
                <div className="font-bold text-amber-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                  Summary of your Submission:
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Mobile:</span>
                  <span className="font-semibold text-white">{submittedData?.phone}</span>
                </div>
                {submittedData?.email && (
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-semibold text-white">{submittedData?.email}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-amber-400">{submittedData?.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Budget Range:</span>
                  <span className="font-semibold text-emerald-400">{submittedData?.budget}</span>
                </div>
                {submittedData?.message && (
                  <div className="pt-1">
                    <span className="text-slate-400 block mb-1">Message:</span>
                    <p className="bg-slate-900 p-2.5 rounded-lg text-slate-200">{submittedData?.message}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/917743000070?text=${encodeURIComponent(
                    `Hi DS Group, I just submitted an enquiry on your website for ${submittedData?.category} (Budget: ${submittedData?.budget}). My name is ${submittedData?.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      category: "Residential",
                      budget: "₹50 Lakhs - ₹1 Crore",
                      message: "",
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  Submit Another Enquiry
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Home Page</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ENQUIRY FORM */
            <div className="rounded-3xl p-6 sm:p-10 bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Enquiry Form</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
                  Tell Us Your Property Requirements
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  Fill out the form below. Details will be forwarded to <span className="text-amber-400 font-medium">dsinventory2026@gmail.com</span> and saved in our database.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. NAME & PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Mobile / WhatsApp Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                {/* 2. EMAIL ADDRESS & CATEGORY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-slate-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Property Category / Interest
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                    >
                      <option value="Residential">Residential Luxury Apartments</option>
                      <option value="Commercial">Commercial Office & Retail Suites</option>
                      <option value="Plots">Freehold & Residential Plots</option>
                      <option value="Construction">Turnkey Villa Construction</option>
                      <option value="New Launches">New Launch Projects</option>
                    </select>
                  </div>
                </div>

                {/* 3. BUDGET SECTION (Special requested section) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center justify-between">
                    <span>Investment Budget Range <span className="text-amber-400">*</span></span>
                    <span className="text-[10px] text-slate-400 font-normal">Select your target budget</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      "Under ₹25 Lakhs",
                      "₹25 Lakhs - ₹50 Lakhs",
                      "₹50 Lakhs - ₹1 Crore",
                      "₹1 Crore - ₹2 Crores",
                      "₹2 Crores +",
                      "Flexible / Open",
                    ].map((bOption) => {
                      const isSelected = formData.budget === bOption;
                      return (
                        <button
                          type="button"
                          key={bOption}
                          onClick={() => setFormData({ ...formData, budget: bOption })}
                          className={`py-3 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-extrabold scale-[1.02]"
                              : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {bOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. MESSAGE / REQUIREMENTS */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Specific Requirements / Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us your preferred location, size requirement, expected possession timeline, or any specific question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-champagne w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl transition-all"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  🔒 Your contact information is kept strictly confidential and shared only with DS Group official advisors.
                </p>
              </form>
            </div>
          )}
        </section>

        {/* SECTION 2: DS GROUP VIP ADVISORY INFO (Form ke baad dikhega) */}
        <section className="relative rounded-3xl p-8 sm:p-12 mt-12 overflow-hidden border border-amber-500/20 shadow-2xl grain-overlay" style={{ background: "linear-gradient(135deg, rgba(11,22,41,0.95), rgba(15,28,52,0.95))" }}>
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>DS Group VIP Advisory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-white leading-tight tracking-tight">
                Exclusive Real Estate & Construction Consultation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Get personalized property recommendations, site visit bookings, price insights, and turnkey construction assistance directly from our senior architecture and real estate specialists.
              </p>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Verified</h4>
                    <p className="text-[10px] text-slate-400">RERA Approved Properties</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero Brokerage</h4>
                    <p className="text-[10px] text-slate-400">Direct Builder Pricing</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Quick Response</h4>
                    <p className="text-[10px] text-slate-400">Within 30 Minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="lg:col-span-4 rounded-2xl p-6 bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Direct Hotline</span>
              </h3>

              <div className="space-y-3 text-xs">
                <a href="tel:+917743000070" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 transition-all">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Call Sales Manager</div>
                    <div className="font-bold text-white">+91 77430 00070</div>
                  </div>
                </a>

                <a href="mailto:dsinventory2026@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 transition-all">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Email Enquiries</div>
                    <div className="font-bold text-white">dsinventory2026@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
