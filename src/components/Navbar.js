"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { MessageSquare, PhoneCall, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar({ activeCategory, onSelectCategory, onOpenContactModal, siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home",         href: "/#hero",        isCategory: false },
    { name: "Residential",  href: "/#portfolio",   isCategory: true,  category: "Residential" },
    { name: "Commercial",   href: "/#portfolio",   isCategory: true,  category: "Commercial" },
    { name: "Plots",        href: "/#portfolio",   isCategory: true,  category: "Plots" },
    { name: "Construction", href: "/#portfolio",   isCategory: true,  category: "Construction" },
    { name: "New Launches", href: "/#portfolio",   isCategory: true,  category: "New Launches" },
    { name: "Services",     href: "/#services",    isCategory: false },
    { name: "Testimonials", href: "/#testimonials",isCategory: false },
  ];

  const handleNavClick = (link) => {
    if (link.isCategory && onSelectCategory) onSelectCategory(link.category);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-2.5 shadow-2xl"
            : "bg-slate-950/85 backdrop-blur-md py-3.5 border-b border-slate-800/40"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">

            {/* FAR LEFT: Official DS Group Logo */}
            <a
              href="/#hero"
              className="flex items-center gap-3 group flex-shrink-0 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={siteConfig.brand.logoUrl}
                alt="DS Group of Companies"
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xl"
              />
              <div className="flex flex-col leading-none">
                <span
                  className="text-base sm:text-lg font-extrabold tracking-tight text-white font-outfit"
                >
                  DS GROUP
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.24em] font-semibold uppercase mt-1 text-[var(--champagne)]">
                  OF COMPANIES
                </span>
              </div>
            </a>

            {/* CENTER: Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8 gap-0.5 xl:gap-1.5">
              {navLinks.map((link) => {
                const isActive = link.isCategory && activeCategory === link.category;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className="relative px-3 py-2 text-xs font-semibold transition-all duration-200 group whitespace-nowrap"
                    style={{
                      color: isActive ? "var(--champagne)" : "rgba(226,232,240,0.85)",
                    }}
                  >
                    <span className="relative z-10 hover:text-white transition-colors duration-200">
                      {link.name}
                    </span>
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                      style={{
                        width: isActive ? "70%" : "0%",
                        background: "var(--champagne)",
                      }}
                    />
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px opacity-0 group-hover:opacity-60 group-hover:w-[60%] w-0 transition-all duration-200"
                      style={{ background: "var(--champagne)" }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* FAR RIGHT: Action CTAs */}
            <div className="hidden lg:flex items-center justify-end gap-3 flex-shrink-0">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#34D399",
                }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{siteConfig.contact.whatsappNumber}</span>
              </a>

              <Link
                href="/enquire"
                className="btn-champagne flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase whitespace-nowrap shadow-lg"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </Link>
            </div>

            {/* MOBILE: Hamburger Menu */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#34D399",
                }}
                title="WhatsApp DS Group"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg transition-all duration-200 focus:outline-none"
                style={{
                  background: "rgba(11,22,41,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: isMobileMenuOpen ? "var(--champagne)" : "#e2e8f0",
                }}
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm flex flex-col transition-transform duration-400 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--navy-deepest)", borderLeft: "1px solid rgba(201,169,110,0.12)" }}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={siteConfig.brand.logoUrl}
                alt="DS Group of Companies"
                className="w-10 h-10 object-contain drop-shadow-md"
              />
              <div>
                <div className="text-sm font-extrabold text-white font-outfit">DS GROUP</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-[var(--champagne)]">OF COMPANIES</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 px-3 text-slate-400">
              Navigation
            </p>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = link.isCategory && activeCategory === link.category;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap"
                    style={{
                      background: isActive ? "rgba(201,169,110,0.1)" : "transparent",
                      color: isActive ? "var(--champagne)" : "rgba(226,232,240,0.8)",
                      border: isActive ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t border-white/10 space-y-3">
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#34D399",
              }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us ({siteConfig.contact.whatsappNumber})</span>
            </a>

            <Link
              href="/enquire"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-champagne w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
