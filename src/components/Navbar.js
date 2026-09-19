"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import {
  MessageSquare, PhoneCall, Menu, X, ChevronRight, ChevronDown,
  Home, Building, Briefcase, MapPin, HardHat, UserCheck, Users,
} from "lucide-react";

const projectsDropdown = [
  {
    name: "Residential",
    href: "/#portfolio",
    category: "Residential",
    icon: Home,
    desc: "Luxury 2/3/4 BHK flats & penthouses",
    tag: "High Demand",
  },
  {
    name: "Commercial",
    href: "/#portfolio",
    category: "Commercial",
    icon: Briefcase,
    desc: "Grade-A corporate offices & retail",
    tag: "High ROI",
  },
  {
    name: "Plots",
    href: "/#portfolio",
    category: "Plots",
    icon: MapPin,
    desc: "Approved freehold plot townships",
    tag: "Clear Title",
  },
  {
    name: "Construction",
    href: "/#portfolio",
    category: "Construction",
    icon: HardHat,
    desc: "Turnkey architectural construction",
    tag: "Turnkey",
  },
];

const aboutDropdown = [
  {
    name: "About Company",
    href: "/about/company",
    icon: Building,
    desc: "Story, Vision, Credentials & RERA",
    badge: "Est. 2008",
  },
  {
    name: "About Owner",
    href: "/about/owner",
    icon: UserCheck,
    desc: "Founder & MD Surendra Soni Profile",
    badge: "18+ Yrs",
  },
  {
    name: "About Team & Employees",
    href: "/about/team",
    icon: Users,
    desc: "Department Specialists & Directory",
    badge: "Directory",
  },
];

export default function Navbar({ activeCategory, onSelectCategory, onOpenContactModal, siteConfig: propSiteConfig }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Projects dropdown state
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimer = useRef(null);

  // About Us dropdown state
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const aboutDropdownRef = useRef(null);
  const aboutDropdownTimer = useRef(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProjectsOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Projects hover handlers
  const handleProjectsMouseEnter = () => {
    clearTimeout(dropdownTimer.current);
    setIsProjectsOpen(true);
  };
  const handleProjectsMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setIsProjectsOpen(false), 150);
  };

  // About Us hover handlers
  const handleAboutMouseEnter = () => {
    clearTimeout(aboutDropdownTimer.current);
    setIsAboutOpen(true);
  };
  const handleAboutMouseLeave = () => {
    aboutDropdownTimer.current = setTimeout(() => setIsAboutOpen(false), 150);
  };

  const otherNavLinks = [
    { name: "Valuable Properties", href: "/valuable-properties", isCategory: false },
    { name: "Services", href: "/#services", isCategory: false },
    { name: "Blog", href: "/blog", isCategory: false },
  ];

  const handleNavClick = (link) => {
    if (link.isCategory && onSelectCategory) onSelectCategory(link.category);
    setIsMobileMenuOpen(false);
  };

  const handleProjectClick = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
    setIsProjectsOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileProjectsOpen(false);
  };

  const isProjectActive = projectsDropdown.some((p) => p.category === activeCategory);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "glass-nav py-2.5 shadow-2xl"
            : "bg-[#111827]/85 backdrop-blur-md py-3.5 border-b border-slate-800/40"
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">

            {/* FAR LEFT: Official DS Group Logo */}
            <a
              href="/#hero"
              className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={siteConfig.brand.logoUrl}
                alt="DS Group of Companies - Real Estate Sector 85 Gurgaon"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xl"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-white font-outfit">
                  DS GROUP
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] md:text-[9px] tracking-[0.22em] font-semibold uppercase mt-0.5 sm:mt-1 text-[var(--champagne)]">
                  OF COMPANIES
                </span>
              </div>
            </a>

            {/* CENTER: Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8 gap-0.5 xl:gap-1.5">

              {/* 1. Home Link (Always First) */}
              <a
                href="/#hero"
                className="relative px-2.5 py-2 text-xs font-semibold transition-all duration-200 group whitespace-nowrap text-slate-200 hover:text-white"
              >
                <span className="relative z-10">Home</span>
              </a>

              {/* 2. Projects Dropdown (Enhanced Luxury White Background) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleProjectsMouseEnter}
                onMouseLeave={handleProjectsMouseLeave}
              >
                <button
                  onClick={() => setIsProjectsOpen((v) => !v)}
                  className="relative flex items-center gap-1 px-2.5 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none"
                  style={{ color: isProjectActive ? "var(--champagne)" : "rgba(226,232,240,0.85)" }}
                >
                  <span className="relative z-10 hover:text-white transition-colors duration-200">Projects</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${isProjectsOpen ? "rotate-180" : ""}`}
                    style={{ color: isProjectActive ? "var(--champagne)" : "rgba(226,232,240,0.6)" }}
                  />
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                    style={{ width: isProjectActive ? "70%" : "0%", background: "var(--champagne)" }}
                  />
                </button>

                {/* Dropdown Panel - Ultra-Premium Luxury Glass & Card */}
                {isProjectsOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[370px] rounded-3xl overflow-hidden z-50 animate-slide-up bg-white text-slate-900 border border-slate-200/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)]"
                    onMouseEnter={handleProjectsMouseEnter}
                    onMouseLeave={handleProjectsMouseLeave}
                  >
                    {/* Top Executive Accent Bar */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-[#FF7900] via-[#FF9A3D] to-[#F16E00]" />

                    {/* Header */}
                    <div className="px-5 pt-4 pb-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#FF7900] font-outfit">
                          Our Prime Portfolio
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200/70 shadow-2xs">
                        4 Sectors
                      </span>
                    </div>

                    {/* Items */}
                    <div className="p-2.5 space-y-1.5">
                      {projectsDropdown.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeCategory === item.category;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => handleProjectClick(item.category)}
                            className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 group border ${
                              isActive
                                ? "bg-gradient-to-r from-orange-50 to-orange-50/40 border-orange-200/80 shadow-xs"
                                : "border-transparent hover:bg-gradient-to-r hover:from-orange-50/60 hover:to-orange-50/20 hover:border-orange-200/50"
                            }`}
                          >
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isActive
                                  ? "bg-[#FF7900] text-white border border-[#FF7900] shadow-md shadow-orange-500/30"
                                  : "bg-slate-50 text-slate-700 border border-slate-200/70 group-hover:bg-[#FF7900] group-hover:text-white group-hover:border-[#FF7900] group-hover:shadow-md group-hover:shadow-orange-500/25 group-hover:scale-105"
                              }`}
                            >
                              <Icon className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-bold font-outfit text-slate-900 group-hover:text-[#FF7900] transition-colors tracking-tight">
                                  {item.name}
                                </span>
                                {item.tag && (
                                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100/70 text-[#FF7900] border border-orange-200/50">
                                    {item.tag}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11.5px] text-slate-500 group-hover:text-slate-700 transition-colors truncate font-normal mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF7900] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                          </a>
                        );
                      })}
                    </div>

                    {/* Footer CTA */}
                    <div className="px-5 py-3 bg-gradient-to-r from-slate-50 to-orange-50/30 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href="/#portfolio"
                        onClick={() => { if (onSelectCategory) onSelectCategory("All"); setIsProjectsOpen(false); }}
                        className="text-xs font-bold font-outfit text-[#FF7900] hover:text-[#F16E00] transition-all flex items-center gap-1.5 group/cta"
                      >
                        <span className="group-hover/cta:underline decoration-[#FF7900]/40">Explore All Featured Projects</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Inventories Link (Direct Link) */}
              <Link
                href="/inventories"
                className="relative px-2.5 py-2 text-xs font-semibold transition-all duration-200 group whitespace-nowrap text-slate-200 hover:text-white"
              >
                <span className="relative z-10">Inventories</span>
              </Link>

              {/* 4. About Us Dropdown (Ultra-Premium Luxury Glass & Card) */}
              <div
                ref={aboutDropdownRef}
                className="relative"
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
              >
                <button
                  onClick={() => setIsAboutOpen((v) => !v)}
                  className="relative flex items-center gap-1 px-2.5 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none text-slate-200 hover:text-white"
                >
                  <span className="relative z-10">About Us</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 text-slate-400 ${isAboutOpen ? "rotate-180 text-orange-400" : ""}`}
                  />
                </button>

                {/* Dropdown Panel - Ultra-Premium Luxury Glass & Card */}
                {isAboutOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[370px] rounded-3xl overflow-hidden z-50 animate-slide-up bg-white text-slate-900 border border-slate-200/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)]"
                    onMouseEnter={handleAboutMouseEnter}
                    onMouseLeave={handleAboutMouseLeave}
                  >
                    {/* Top Executive Accent Bar */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-[#FF7900] via-[#FF9A3D] to-[#F16E00]" />

                    {/* Header */}
                    <div className="px-5 pt-4 pb-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#FF7900] font-outfit">
                          About DS Group
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200/70 shadow-2xs">
                        Corporate Profile
                      </span>
                    </div>

                    {/* Items */}
                    <div className="p-2.5 space-y-1.5">
                      {aboutDropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsAboutOpen(false)}
                            className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 group border border-transparent hover:bg-gradient-to-r hover:from-orange-50/60 hover:to-orange-50/20 hover:border-orange-200/50"
                          >
                            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-slate-50 text-slate-700 border border-slate-200/70 group-hover:bg-[#FF7900] group-hover:text-white group-hover:border-[#FF7900] group-hover:shadow-md group-hover:shadow-orange-500/25 group-hover:scale-105 transition-all duration-300">
                              <Icon className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-bold font-outfit text-slate-900 group-hover:text-[#FF7900] transition-colors tracking-tight">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100/70 text-[#FF7900] border border-orange-200/50">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11.5px] text-slate-500 group-hover:text-slate-700 transition-colors truncate font-normal mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF7900] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Footer CTA */}
                    <div className="px-5 py-3 bg-gradient-to-r from-slate-50 to-orange-50/30 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href="/about"
                        onClick={() => setIsAboutOpen(false)}
                        className="text-xs font-bold font-outfit text-[#FF7900] hover:text-[#F16E00] transition-all flex items-center gap-1.5 group/cta"
                      >
                        <span className="group-hover/cta:underline decoration-[#FF7900]/40">Explore Complete About Portal</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Other Nav Links: Valuable Properties, Services, Blog */}
              {otherNavLinks.map((link) => {
                const isActive = link.isCategory && activeCategory === link.category;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className="relative px-2.5 py-2 text-xs font-semibold transition-all duration-200 group whitespace-nowrap"
                    style={{
                      color: isActive ? "var(--champagne)" : "rgba(226,232,240,0.85)",
                    }}
                  >
                    <span className="relative z-10 hover:text-white transition-colors duration-200">
                      {link.name}
                    </span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                        style={{ width: "70%", background: "var(--champagne)" }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* FAR RIGHT (DESKTOP): Contact Actions (WhatsApp & Enquire) */}
            <div className="hidden lg:flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all shadow-sm"
                aria-label="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenContactModal}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                style={{
                  background: "#FF7900",
                }}
              >
                <span>Enquire</span>
                <ChevronRight className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* FAR RIGHT (MOBILE / TABLET): Hamburger Menu Button */}
            <div className="flex lg:hidden items-center shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 focus:outline-none flex items-center justify-center hover:bg-slate-800/80 active:scale-95 shadow-sm"
                style={{
                  background: "rgba(31,41,55,0.9)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: isMobileMenuOpen ? "var(--champagne)" : "#e2e8f0",
                }}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ background: "var(--navy-deepest)", borderLeft: "1px solid rgba(255,121,0,0.15)" }}
        >
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={siteConfig.brand.logoUrl}
                alt="DS Group of Companies"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md"
              />
              <div>
                <div className="text-sm font-extrabold text-white font-outfit">DS GROUP</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-[var(--champagne)]">OF COMPANIES</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 px-3 text-slate-400">
              Navigation
            </p>
            <div className="flex flex-col gap-1">

              {/* 1. Mobile Home Link */}
              <a
                href="/#hero"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </a>

              {/* 2. Mobile Projects Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileProjectsOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium"
                  style={{
                    background: isProjectActive ? "rgba(255,121,0,0.1)" : "transparent",
                    color: isProjectActive ? "var(--champagne)" : "rgba(226,232,240,0.8)",
                    border: isProjectActive ? "1px solid rgba(255,121,0,0.2)" : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 opacity-60" />
                    <span>Projects</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 opacity-40 transition-transform duration-200 ${isMobileProjectsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Sub-items */}
                {isMobileProjectsOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-slate-700/50 pl-3">
                    {projectsDropdown.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeCategory === item.category;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => handleProjectClick(item.category)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm"
                          style={{
                            color: isActive ? "var(--champagne)" : "rgba(226,232,240,0.75)",
                            background: isActive ? "rgba(255,121,0,0.08)" : "transparent",
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 opacity-60" />
                          <span className="font-medium">{item.name}</span>
                        </a>
                      );
                    })}
                    <a
                      href="/#portfolio"
                      onClick={() => { if (onSelectCategory) onSelectCategory("All"); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-[var(--champagne)] opacity-80"
                    >
                      View All →
                    </a>
                  </div>
                )}
              </div>

              {/* 3. Mobile Inventories Link */}
              <Link
                href="/inventories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 opacity-60" />
                  <span>Inventories</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>

              {/* 4. Mobile About Us Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileAboutOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 opacity-60" />
                    <span>About Us</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 opacity-40 transition-transform duration-200 ${isMobileAboutOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Sub-items */}
                {isMobileAboutOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-slate-700/50 pl-3">
                    {aboutDropdown.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm text-slate-300 hover:text-[var(--champagne)]"
                        >
                          <Icon className="w-3.5 h-3.5 opacity-60" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                    <Link
                      href="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-[var(--champagne)] opacity-80"
                    >
                      View Complete Profile →
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. Other Regular Links: Valuable Properties, Services, Blog */}
              {otherNavLinks.map((link) => {
                const isActive = link.isCategory && activeCategory === link.category;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap"
                    style={{
                      background: isActive ? "rgba(255,121,0,0.1)" : "transparent",
                      color: isActive ? "var(--champagne)" : "rgba(226,232,240,0.8)",
                      border: isActive ? "1px solid rgba(255,121,0,0.2)" : "1px solid transparent",
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </a>
                );
              })}
            </div>

            {/* Quick Actions within Drawer: Enquire, WhatsApp, Call */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 text-slate-400">
                Direct Contact & Enquiries
              </p>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenContactModal) {
                    onOpenContactModal();
                  }
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:opacity-95 active:scale-98 shadow-md flex items-center justify-center gap-2"
                style={{ background: "#FF7900" }}
              >
                <span>Enquire Now</span>
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </button>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {siteConfig.contact.whatsappFormatted || siteConfig.contact.whatsappNumber}</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[var(--champagne)]" />
                <span>Call: {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
