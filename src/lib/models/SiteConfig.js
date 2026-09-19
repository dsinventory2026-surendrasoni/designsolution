// lib/models/SiteConfig.js
// Mongoose schema for all website section configs

import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  label: String,
  value: String,
});

const ServiceSchema = new mongoose.Schema({
  id: String,
  title: String,
  iconName: String,
  badge: String,
  shortDescription: String,
  fullDescription: String,
});

const AchievementSchema = new mongoose.Schema({
  title: String,
  year: String,
  description: String,
});

const EmployeeSchema = new mongoose.Schema({
  id: String,
  name: String,
  designation: String,
  department: { type: String, default: "Leadership" },
  photo: String,
  bio: String,
  experience: String,
  phone: String,
  email: String,
  linkedin: String,
  skills: [String],
  projects: [String],
  certifications: [String],
  priority: { type: Number, default: 1 },
});


const SiteConfigSchema = new mongoose.Schema(
  {
    // ─── HERO ───────────────────────────────────────
    hero: {
      headline: { type: String, default: "Crafting Iconic Spaces & Timeless Luxury" },
      subheadline: { type: String, default: "Pioneering premier residential residences, commercial landmarks, and turnkey architectural construction with 18+ years of uncompromised excellence." },
      eyebrowBadge: { type: String, default: "DS GROUP OF COMPANIES" },
      primaryBtnText: { type: String, default: "Explore Portfolio" },
      primaryBtnLink: { type: String, default: "#portfolio" },
      secondaryBtnText: { type: String, default: "Contact Our Experts" },
      videoUrl: { type: String, default: "/videos/hero-bg.mp4" },
      trustBadges: [{ label: String }],
    },

    // ─── BRAND ──────────────────────────────────────
    brand: {
      name: { type: String, default: "DS Group of Companies" },
      shortName: { type: String, default: "DS Group" },
      tagline: { type: String, default: "Engineering Excellence, Building Timeless Luxury" },
      subtitle: { type: String, default: "Premier Real Estate Development, Construction & Architectural Solutions" },
      establishedYear: { type: Number, default: 2008 },
      logoText: { type: String, default: "DS GROUP" },
      logoSubtext: { type: String, default: "OF COMPANIES" },
      logoUrl: { type: String, default: "/images/logo.png" },
      footerTagline: { type: String, default: "Transforming land into iconic living spaces and corporate destinations with engineering excellence." },
      copyrightText: { type: String, default: "" },
    },

    // ─── CONTACT ────────────────────────────────────
    contact: {
      whatsappNumber: { type: String, default: "7743000070" },
      whatsappFormatted: { type: String, default: "+91 77430 00070" },
      whatsappLink: { type: String, default: "https://wa.me/917743000070" },
      phonePrimary: { type: String, default: "+91 77430 00070" },
      phoneSecondary: { type: String, default: "+91 98123 45678" },
      emailPrimary: { type: String, default: "info@dsgroupofcompanies.com" },
      emailSales: { type: String, default: "sales@dsgroupofcompanies.com" },
      addressPlot: { type: String, default: "Plot Sector 85" },
      addressTower: { type: String, default: "Tower 7" },
      addressFloor: { type: String, default: "3rd Floor" },
      addressCity: { type: String, default: "Gurugram" },
      addressState: { type: String, default: "Haryana" },
      addressPincode: { type: String, default: "122004" },
      addressCountry: { type: String, default: "India" },
      workingHours: { type: String, default: "Mon - Sat: 9:00 AM - 7:30 PM | Sun: By Appointment" },
      googleMapEmbedUrl: { type: String, default: "" },
    },

    // ─── OWNER / ABOUT ───────────────────────────────
    owner: {
      name: { type: String, default: "Surendra Soni" },
      designation: { type: String, default: "Founder & Managing Director" },
      photo: { type: String, default: "" },
      bio: { type: String, default: "" },
      quote: { type: String, default: "" },
      stats: [StatSchema],
    },

    // ─── SOCIAL LINKS ────────────────────────────────
    socialLinks: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },

    // ─── SERVICES ────────────────────────────────────
    services: [ServiceSchema],

    // ─── ABOUT US PAGE (3 DROP-DOWNS & SEO KEYWORDS) ─
    about: {
      companyDetails: {
        story: { type: String, default: "" },
        mission: { type: String, default: "" },
        vision: { type: String, default: "" },
        establishedYear: { type: Number, default: 2008 },
        headquarters: { type: String, default: "Sector 85, Gurugram, Haryana" },
        reraRegistration: { type: String, default: "HRERA-PKL-GGM-1234-2024" },
        cinNumber: { type: String, default: "U70109HR2014PTC053210" },
        highlights: [{ title: String, description: String }],
        coreValues: [{ title: String, description: String }],
        images: [String],
        seoKeywords: [String],
        metaTitle: { type: String, default: "About DS Group of Companies | Real Estate Developer Sector 85 Gurgaon" },
        metaDescription: { type: String, default: "Discover DS Group of Companies — Premier real estate developer, construction firm & property consultants in Sector 85 Gurugram. Founded by Surendra Soni." },
      },
      ownerDetails: {
        name: { type: String, default: "Surendra Soni" },
        designation: { type: String, default: "Founder & Managing Director" },
        photo: { type: String, default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
        bio: { type: String, default: "" },
        quote: { type: String, default: "" },
        experienceYears: { type: String, default: "18+ Years" },
        phone: { type: String, default: "+91 77430 00070" },
        email: { type: String, default: "surendra@dsgroupofcompanies.com" },
        whatsapp: { type: String, default: "+91 77430 00070" },
        linkedin: { type: String, default: "https://linkedin.com/in/surendra-soni" },
        achievements: [AchievementSchema],
      },
      employees: [EmployeeSchema],
    },

  },
  { timestamps: true }
);

// Use existing model if already compiled (hot reload protection)
const SiteConfig =
  mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);

export default SiteConfig;
