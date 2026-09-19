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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] selection:bg-[#FF7900] selection:text-white font-sans">
      {/* Sticky Header Navbar */}
      <Navbar siteConfig={siteConfig} />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#FF7900] transition-colors py-2 px-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* SECTION 1: FORM FILLUP SECTION */}
        <section className="max-w-3xl mx-auto mb-12">
          {submitted ? (
            /* SUBMIT SUCCESSFULLY SCREEN */
            <div className="rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-white border border-emerald-200 shadow-xl animate-fade-up">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Submit Successfully
                </span>
                <h2 className="text-3xl font-extrabold font-outfit text-[#111827]">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="mt-2 text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#FF7900]">{submittedData?.name}</span>! Your enquiry details have been forwarded to our team (<span className="text-[#FF7900] font-semibold">dsinventory2026@gmail.com</span>) and saved in our system. Our advisor will reach out to you shortly.
                </p>
              </div>

              {/* Submitted Details Summary Card */}
              <div className="rounded-2xl bg-[#F8FAFC] p-6 text-left border border-[#E5E7EB] space-y-2 text-xs text-[#4B5563] max-w-lg mx-auto">
                <div className="font-bold text-[#FF7900] uppercase tracking-wider pb-2 border-b border-[#E5E7EB]">
                  Summary of your Submission:
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Mobile:</span>
                  <span className="font-semibold text-[#111827]">{submittedData?.phone}</span>
                </div>
                {submittedData?.email && (
                  <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Email:</span>
                    <span className="font-semibold text-[#111827]">{submittedData?.email}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Category:</span>
                  <span className="font-semibold text-[#FF7900]">{submittedData?.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Budget Range:</span>
                  <span className="font-semibold text-emerald-600">{submittedData?.budget}</span>
                </div>
                {submittedData?.message && (
                  <div className="pt-1.5">
                    <span className="text-[#6B7280] block mb-1">Message:</span>
                    <p className="bg-white p-3 rounded-xl border border-[#E5E7EB] text-[#111827]">{submittedData?.message}</p>
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
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-700/20 transition-all"
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
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#4B5563] bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] transition-all shadow-sm"
                >
                  Submit Another Enquiry
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#FF7900] hover:bg-[#F16E00] shadow-md shadow-[#FF7900]/25 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Home Page</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ENQUIRY FORM */
            <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E5E7EB] shadow-xl">
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/25 text-xs font-bold uppercase tracking-wider mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Enquiry Form</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-[#111827]">
                  Tell Us Your Property Requirements
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
                  Fill out the form below. Details will be forwarded to <span className="text-[#FF7900] font-semibold">dsinventory2026@gmail.com</span> and saved in our database.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. NAME & PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                      Full Name <span className="text-[#FF7900]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF7900] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                      Mobile / WhatsApp Number <span className="text-[#FF7900]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF7900] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* 2. EMAIL ADDRESS & CATEGORY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                      Email Address <span className="text-[#9CA3AF] text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF7900] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                      Property Category / Interest
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] focus:outline-none focus:border-[#FF7900] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Residential">Residential Luxury Apartments</option>
                      <option value="Commercial">Commercial Office & Retail Suites</option>
                      <option value="Plots">Freehold & Residential Plots</option>
                      <option value="Construction">Turnkey Villa Construction</option>
                      <option value="New Launches">New Launch Projects</option>
                    </select>
                  </div>
                </div>

                {/* 3. BUDGET SECTION */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#FF7900] mb-2 flex items-center justify-between">
                    <span>Investment Budget Range <span className="text-[#FF7900]">*</span></span>
                    <span className="text-[10px] text-[#6B7280] font-normal">Select your target budget</span>
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
                              ? "bg-[#FF7900] text-white border-[#FF7900] shadow-md font-extrabold scale-[1.02]"
                              : "bg-[#F8FAFC] text-[#4B5563] border-[#E5E7EB] hover:border-[#FF7900]/40 hover:bg-white"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                    Specific Requirements / Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us your preferred location, size requirement, expected possession timeline, or any specific question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF7900] focus:bg-white transition-all"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 shadow-md shadow-[#FF7900]/25 transition-all text-white bg-[#FF7900] hover:bg-[#F16E00]"
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

                <p className="text-[11px] text-center text-[#9CA3AF]">
                  🔒 Your contact information is kept strictly confidential and shared only with DS Group official advisors.
                </p>
              </form>
            </div>
          )}
        </section>

        {/* SECTION 2: DS GROUP VIP ADVISORY INFO (Form ke baad dikhega) */}
        <section className="relative rounded-3xl p-8 sm:p-12 mt-12 overflow-hidden border border-orange-500/20 shadow-2xl grain-overlay" style={{ background: "linear-gradient(135deg, rgba(31,41,55,0.95), rgba(15,28,52,0.95))" }}>
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
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
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Verified</h4>
                    <p className="text-[10px] text-slate-400">RERA Approved Properties</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero Brokerage</h4>
                    <p className="text-[10px] text-slate-400">Direct Builder Pricing</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
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
                <PhoneCall className="w-4 h-4 text-orange-400" />
                <span>Direct Hotline</span>
              </h3>

              <div className="space-y-3 text-xs">
                <a href="tel:+917743000070" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-white/10 transition-all">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Call Sales Manager</div>
                    <div className="font-bold text-white">+91 77430 00070</div>
                  </div>
                </a>

                <a href="mailto:dsinventory2026@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-white/10 transition-all">
                  <Mail className="w-4 h-4 text-orange-400" />
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
