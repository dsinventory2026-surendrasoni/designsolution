"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  Star,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import TrustindexWidget from "@/components/TrustindexWidget";

export default function ReviewsClient({ siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] selection:bg-[#FF7900] selection:text-white font-sans">
      <Navbar siteConfig={siteConfig} />

      <main className="flex-grow pt-24 sm:pt-28 pb-16">
        {/* ─── HERO HEADER SECTION ─── */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-6 pb-12 text-center">
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF7900]/5 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF7900]/10 border border-[#FF7900]/25 text-[#FF7900] text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Google Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] mb-5 leading-tight">
            What Our Clients Say <br className="hidden sm:inline" />
            <span className="text-[#FF7900]">
              About DS Group
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#6B7280] leading-relaxed mb-8">
            Genuine experiences from homeowners, commercial investors, and property
            buyers across Gurugram and Delhi NCR. We take immense pride in delivering
            excellence, transparency, and lifelong relationships.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10">
            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-[#FF7900] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF7900] text-[#FF7900]" />
                ))}
              </div>
              <span className="text-xl font-extrabold text-[#111827]">4.9 / 5.0</span>
              <span className="text-xs text-[#6B7280]">Google Rating</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col items-center justify-center">
              <Users className="w-5 h-5 text-[#FF7900] mb-1" />
              <span className="text-xl font-extrabold text-[#111827]">500+</span>
              <span className="text-xs text-[#6B7280]">Happy Clients</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col items-center justify-center">
              <Award className="w-5 h-5 text-[#FF7900] mb-1" />
              <span className="text-xl font-extrabold text-[#111827]">18+ Years</span>
              <span className="text-xs text-[#6B7280]">NCR Market Trust</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-xl font-extrabold text-[#111827]">100%</span>
              <span className="text-xs text-[#6B7280]">Verified Titles</span>
            </div>
          </div>

          {/* Direct CTA to leave review */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://share.google/hLdZvtAcwQF1QTMpl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF7900] hover:bg-[#F16E00] text-white font-bold text-sm shadow-md shadow-[#FF7900]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Star className="w-4 h-4 fill-white text-white" />
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] font-semibold text-sm shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </section>

        {/* ─── TRUSTINDEX WIDGET CONTAINER ─── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="relative rounded-3xl bg-white border border-[#E5E7EB] p-4 sm:p-8 shadow-sm min-h-[420px]">
            <TrustindexWidget />

            {/* Direct fallback / info link */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Reviews are aggregated live from our verified Google Business Profile.</span>
              </div>
              <a
                href="https://share.google/hLdZvtAcwQF1QTMpl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF7900] hover:text-[#F16E00] flex items-center gap-1 font-bold transition-colors"
              >
                <span>View all reviews on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA BANNER ─── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="relative overflow-hidden rounded-3xl bg-[#111827] border border-[#1F2937] p-8 sm:p-12 text-center text-white shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Experience the DS Group Benchmark Firsthand
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
                Whether you are searching for high-yield commercial landmarks, luxury residences,
                or premium residential plots in Gurugram, our dedicated advisors are here to assist you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF7900] hover:bg-[#F16E00] text-white font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-[#FF7900]/30"
                >
                  <span>Explore Featured Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/enquire"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                >
                  <span>Schedule a Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
