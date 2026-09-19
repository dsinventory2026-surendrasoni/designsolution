"use client";

import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { propertyCategories as staticPropertyCategories } from "@/data/propertiesData";
import { Building, MapPin, PhoneCall, Mail, MessageSquare, ArrowUp, Sparkles } from "lucide-react";

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
    <footer className="bg-[#111827] text-slate-400 border-t border-[#374151] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#374151]">

          {/* Col 1: Brand Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-orange-400 flex items-center justify-center text-white shadow-lg">
                <Building className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-outfit">
                  {siteConfig.brand.name}
                </span>
                <span className="text-[10px] tracking-widest text-orange-400 font-semibold uppercase">
                  {siteConfig.brand.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {siteConfig.brand.subtitle}. Premier real estate developer & property finder in Sector 85 Gurgaon offering luxury apartments, Grade-A commercial spaces, freehold plots, and turnkey construction.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ({siteConfig.contact.whatsappNumber})</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="/#hero" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="/inventories" className="hover:text-orange-400 transition-colors">Inventories</a></li>
              <li><a href="/valuable-properties" className="hover:text-orange-400 transition-colors">Valuable Properties</a></li>
              <li><a href="/#portfolio" className="hover:text-orange-400 transition-colors">Featured Projects</a></li>
              <li><a href="/#services" className="hover:text-orange-400 transition-colors">Our Services</a></li>
              <li><a href="/blog" className="hover:text-orange-400 transition-colors">Research &amp; Blog</a></li>
              <li><a href="/reviews" className="hover:text-orange-400 transition-colors">Client Reviews</a></li>
              <li><a href="/about" className="hover:text-orange-400 transition-colors">About DS Group</a></li>
              <li><a href="/about#team" className="hover:text-orange-400 transition-colors">Our Team</a></li>
              <li><a href="/enquire" className="hover:text-orange-400 transition-colors">Enquire Now</a></li>
            </ul>
          </div>

          {/* Col 3: Sector 85 Landmark Projects & Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Top Projects & Guides</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="/blog/godrej-air-sector-85-gurgaon-review-2026" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Godrej Air Sector 85 Review</span>
                </a>
              </li>
              <li>
                <a href="/blog/2-bhk-and-3-bhk-flats-in-sector-85-gurgaon-godrej-air-ss-the-leaf-ss-linden-pyramid-heights-more" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Sector 85 Luxury Flats Guide</span>
                </a>
              </li>
              <li>
                <a href="/blog/vatika-horizon-82-sector-82a-gurgaon-premium-residential-plots-investment-opportunity" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Vatika Horizon 82 Plots</span>
                </a>
              </li>
              <li>
                <a href="/blog/best-sectors-to-invest-in-gurgaon-in-2026" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Top Gurgaon Sectors 2026</span>
                </a>
              </li>
              {propertyCategories.filter(c => c !== "All").map((cat) => (
                <li key={cat}>
                  <a
                    href="/#portfolio"
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{cat} Properties Gurgaon</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Corporate Head Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Corporate Head Office</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {siteConfig?.contact?.address?.plot
                    ? `${siteConfig.contact.address.plot}, ${siteConfig.contact.address.tower}, ${siteConfig.contact.address.floor}, ${siteConfig.contact.address.city}, Haryana - ${siteConfig.contact.address.pincode}`
                    : `${siteConfig?.contact?.addressPlot || "Plot Sector 85"}, ${siteConfig?.contact?.addressTower || "Tower 7"}, ${siteConfig?.contact?.addressFloor || "3rd Floor"}, ${siteConfig?.contact?.addressCity || "Gurugram"}, Haryana - ${siteConfig?.contact?.addressPincode || "122004"}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-slate-300 font-semibold">{siteConfig.contact.phonePrimary}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-slate-300">{siteConfig.contact.emailPrimary}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-2">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1F2937] border border-[#374151] text-slate-400 hover:text-white transition-colors text-xs"
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
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-red-500 transition-colors"
                title="YouTube"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Areas We Serve & Real Estate Services Strip */}
        <div className="py-6 border-b border-[#374151]/80 text-[11px] text-slate-400 leading-relaxed">
          <span className="font-bold text-slate-300 uppercase tracking-wider block mb-1">Areas We Serve Across Gurgaon:</span>
          <p>
            DS Group of Companies serves property buyers, sellers, and investors across Gurgaon including Sector 82, Sector 82A, Sector 83, Sector 84, Sector 85, Sector 86, Sector 89, Sector 90, Sector 92, Sector 93, Sector 95, New Gurgaon, and Dwarka Expressway. As a trusted property dealer and real estate consultant in Gurgaon, we offer residential flats, luxury apartments, commercial office spaces, SCO plots, DDJAY residential plots, and new launch projects with verified HRERA titles.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {siteConfig.brand.name}. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <a href="/#hero" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/#hero" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="/#hero" className="hover:text-slate-300 transition-colors">HRERA Disclosures</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#1F2937] border border-[#374151] text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors shadow"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
