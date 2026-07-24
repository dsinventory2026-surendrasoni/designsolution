// lib/getOrCreateConfig.js
// Shared helper to get or auto-create SiteConfig document

import SiteConfig from "@/lib/models/SiteConfig";
import { siteConfig as staticConfig } from "@/data/siteConfig";

export async function getOrCreateConfig() {
  let config = await SiteConfig.findOne();
  if (!config) {
    config = await SiteConfig.create({
      hero: {
        headline: "Crafting Iconic Spaces & Timeless Luxury",
        subheadline:
          "Pioneering premier residential residences, commercial landmarks, and turnkey architectural construction with 18+ years of uncompromised excellence.",
        eyebrowBadge: "DS GROUP OF COMPANIES",
        primaryBtnText: "Explore Portfolio",
        primaryBtnLink: "#portfolio",
        secondaryBtnText: "Contact Our Experts",
        videoUrl: "/videos/hero-bg.mp4",
        trustBadges: [
          { label: "18+ Years Excellence" },
          { label: "45+ Projects Delivered" },
          { label: "3200+ Happy Families" },
        ],
      },
      brand: {
        name: staticConfig.brand.name,
        shortName: staticConfig.brand.shortName,
        tagline: staticConfig.brand.tagline,
        subtitle: staticConfig.brand.subtitle,
        establishedYear: staticConfig.brand.establishedYear,
        logoText: staticConfig.brand.logoText,
        logoSubtext: staticConfig.brand.logoSubtext,
        logoUrl: staticConfig.brand.logoUrl,
        footerTagline:
          "Transforming land into iconic living spaces and corporate destinations with engineering excellence.",
        copyrightText: "",
      },
      contact: {
        whatsappNumber: staticConfig.contact.whatsappNumber,
        whatsappFormatted: staticConfig.contact.whatsappFormatted,
        whatsappLink: staticConfig.contact.whatsappLink,
        phonePrimary: staticConfig.contact.phonePrimary,
        phoneSecondary: staticConfig.contact.phoneSecondary,
        emailPrimary: staticConfig.contact.emailPrimary,
        emailSales: staticConfig.contact.emailSales,
        addressPlot: staticConfig.contact.address.plot,
        addressTower: staticConfig.contact.address.tower,
        addressFloor: staticConfig.contact.address.floor,
        addressCity: staticConfig.contact.address.city,
        addressState: staticConfig.contact.address.state,
        addressPincode: staticConfig.contact.address.pincode,
        addressCountry: staticConfig.contact.address.country,
        workingHours: staticConfig.contact.workingHours,
        googleMapEmbedUrl: staticConfig.googleMapEmbedUrl || "",
      },
      owner: {
        name: staticConfig.owner.name,
        designation: staticConfig.owner.designation,
        photo: staticConfig.owner.photo,
        bio: staticConfig.owner.bio,
        quote: staticConfig.owner.quote,
        stats: staticConfig.owner.stats,
      },
      socialLinks: {
        instagram: staticConfig.socialLinks.instagram,
        facebook: staticConfig.socialLinks.facebook,
        whatsapp: staticConfig.socialLinks.whatsapp,
        twitter: staticConfig.socialLinks.twitter,
        linkedin: staticConfig.socialLinks.linkedin,
        youtube: staticConfig.socialLinks.youtube,
      },
      services: staticConfig.services,
      testimonials: staticConfig.testimonials,
    });
  }
  return config;
}
