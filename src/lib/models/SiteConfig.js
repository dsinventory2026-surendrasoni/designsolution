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

const TestimonialSchema = new mongoose.Schema({
  id: Number,
  name: String,
  role: String,
  image: String,
  rating: { type: Number, default: 5 },
  propertyPurchased: String,
  text: String,
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
      whatsappNumber: { type: String, default: "7443000070" },
      whatsappFormatted: { type: String, default: "+91 74430 00070" },
      whatsappLink: { type: String, default: "https://wa.me/917443000070" },
      phonePrimary: { type: String, default: "+91 74430 00070" },
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

    // ─── TESTIMONIALS ─────────────────────────────────
    testimonials: [TestimonialSchema],
  },
  { timestamps: true }
);

// Use existing model if already compiled (hot reload protection)
const SiteConfig =
  mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);

export default SiteConfig;
