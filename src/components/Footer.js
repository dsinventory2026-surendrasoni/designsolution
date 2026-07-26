"use client";

import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { propertyCategories as staticPropertyCategories } from "@/data/propertiesData";
import { Building, MapPin, PhoneCall, Mail, MessageSquare, ArrowUp } from "lucide-react";

export default function Footer({ onSelectCategory, onOpenContactModal, siteConfig: propSiteConfig, propertiesData: propPropertiesData }) {
  const siteConfig = propSiteConfig || staticSiteConfig;
  // Derive unique categories from propertiesData if available, else use static
  const propertyCategories = propPropertiesData
    ? ["All", ...Array.from(new Set(propPropertiesData.map((p) => p.category)))]
    : staticPropertyCategories;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (cat) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-500 flex items-center justify-center text-white shadow-lg">
                <Building className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-outfit">
                  {siteConfig.brand.name}
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase">
                  {siteConfig.brand.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {siteConfig.brand.subtitle}. Transforming land into iconic living spaces and corporate destinations with engineering excellence.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (7743000070)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Company Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="/#hero" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-blue-400 transition-colors">Our Services</a></li>
              <li><a href="/#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="/#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a></li>
              <li><button onClick={onOpenContactModal} className="hover:text-blue-400 transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Col 3: Properties (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Properties & Projects</h4>
            <ul className="space-y-2 text-xs font-medium">
              {propertyCategories.filter(c => c !== "All").map((cat) => (
                <li key={cat}>
                  <a
                    href="/#portfolio"
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{cat} Properties</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Corporate Head Office</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {siteConfig.contact.address.plot}, {siteConfig.contact.address.tower}, {siteConfig.contact.address.floor}, {siteConfig.contact.address.city}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300 font-semibold">{siteConfig.contact.phonePrimary}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">{siteConfig.contact.emailPrimary}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-2">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-pink-500 transition-colors"
                title="Instagram"
              >
                Instagram
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 transition-colors"
                title="Facebook"
              >
                Facebook
              </a>
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                title="X / Twitter"
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.brand.name}. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-slate-400 transition-colors">RERA Disclosures</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-colors shadow"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
