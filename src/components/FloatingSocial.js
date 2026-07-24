"use client";

import { useState } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { MessageSquare, PhoneCall, Share2, X } from "lucide-react";

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
  </svg>
);

const XTwitterIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function FloatingSocial({ siteConfig: propSiteConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeSiteConfig = propSiteConfig || staticSiteConfig;
  const { socialLinks, contact } = activeSiteConfig;

  return (
    <aside aria-label="Quick Contact Controls" className="fixed right-5 bottom-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {isOpen && (
        <div className="flex flex-col items-end gap-3 mb-1 animate-slide-up">
          {/* WhatsApp */}
          <div className="flex items-center gap-2.5 group">
            <span className="px-3 py-1 rounded-md text-[11px] font-bold text-white bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              WhatsApp
            </span>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-white/20" />
            </a>
          </div>

          {/* Call */}
          <div className="flex items-center gap-2.5 group">
            <span className="px-3 py-1 rounded-md text-[11px] font-bold text-white bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Call Us
            </span>
            <a
              href={`tel:${contact.phonePrimary}`}
              className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110"
              title="Call Us"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-2.5 group">
            <span className="px-3 py-1 rounded-md text-[11px] font-bold text-white bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Instagram
            </span>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Facebook */}
          <div className="flex items-center gap-2.5 group">
            <span className="px-3 py-1 rounded-md text-[11px] font-bold text-white bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Facebook
            </span>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
          </div>

          {/* Twitter / X */}
          <div className="flex items-center gap-2.5 group">
            <span className="px-3 py-1 rounded-md text-[11px] font-bold text-white bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              X / Twitter
            </span>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl border border-slate-700 flex items-center justify-center transition-all hover:scale-110"
              title="X / Twitter"
            >
              <XTwitterIcon />
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full btn-champagne shadow-2xl flex items-center justify-center transition-all duration-300 focus:outline-none hover:scale-105"
        style={{
          boxShadow: isOpen ? "0 0 25px rgba(201,169,110,0.5)" : "0 10px 30px rgba(0,0,0,0.4)"
        }}
        aria-label="Toggle Quick Contact Options"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Share2 className="w-6 h-6 stroke-[2.5]" />}
      </button>
    </aside>
  );
}
