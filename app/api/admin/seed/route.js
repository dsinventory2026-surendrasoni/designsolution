// app/api/admin/seed/route.js
// Seeds MongoDB with initial static data from siteConfig.js and propertiesData.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteConfig from "@/lib/models/SiteConfig";
import Property from "@/lib/models/Property";
import { isAuthenticated } from "@/lib/auth";
import { siteConfig } from "@/data/siteConfig";
import { propertiesData } from "@/data/propertiesData";

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Seed SiteConfig
    const existing = await SiteConfig.findOne();
    if (!existing) {
      await SiteConfig.create({
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
          name: siteConfig.brand.name,
          shortName: siteConfig.brand.shortName,
          tagline: siteConfig.brand.tagline,
          subtitle: siteConfig.brand.subtitle,
          establishedYear: siteConfig.brand.establishedYear,
          logoText: siteConfig.brand.logoText,
          logoSubtext: siteConfig.brand.logoSubtext,
          logoUrl: siteConfig.brand.logoUrl,
          footerTagline:
            "Transforming land into iconic living spaces and corporate destinations with engineering excellence.",
          copyrightText: "",
        },
        contact: {
          whatsappNumber: siteConfig.contact.whatsappNumber,
          whatsappFormatted: siteConfig.contact.whatsappFormatted,
          whatsappLink: siteConfig.contact.whatsappLink,
          phonePrimary: siteConfig.contact.phonePrimary,
          phoneSecondary: siteConfig.contact.phoneSecondary,
          emailPrimary: siteConfig.contact.emailPrimary,
          emailSales: siteConfig.contact.emailSales,
          addressPlot: siteConfig.contact.address.plot,
          addressTower: siteConfig.contact.address.tower,
          addressFloor: siteConfig.contact.address.floor,
          addressCity: siteConfig.contact.address.city,
          addressState: siteConfig.contact.address.state,
          addressPincode: siteConfig.contact.address.pincode,
          addressCountry: siteConfig.contact.address.country,
          workingHours: siteConfig.contact.workingHours,
          googleMapEmbedUrl: siteConfig.googleMapEmbedUrl,
        },
        owner: {
          name: siteConfig.owner.name,
          designation: siteConfig.owner.designation,
          photo: siteConfig.owner.photo,
          bio: siteConfig.owner.bio,
          quote: siteConfig.owner.quote,
          stats: siteConfig.owner.stats,
        },
        socialLinks: {
          instagram: siteConfig.socialLinks.instagram,
          facebook: siteConfig.socialLinks.facebook,
          whatsapp: siteConfig.socialLinks.whatsapp,
          twitter: siteConfig.socialLinks.twitter,
          linkedin: siteConfig.socialLinks.linkedin,
          youtube: siteConfig.socialLinks.youtube,
        },
        services: siteConfig.services,
        testimonials: siteConfig.testimonials,
      });
    }

    // Seed Properties
    const propCount = await Property.countDocuments();
    if (propCount === 0) {
      const propsToInsert = propertiesData.map((p, idx) => ({
        ...p,
        sortOrder: idx,
      }));
      await Property.insertMany(propsToInsert);
    }

    return NextResponse.json({
      success: true,
      message: "Data seeded successfully to MongoDB",
      seeded: { siteConfig: !existing, properties: propCount === 0 },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Check seed status
export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const siteConfigCount = await SiteConfig.countDocuments();
    const propertyCount = await Property.countDocuments();
    return NextResponse.json({
      success: true,
      siteConfigSeeded: siteConfigCount > 0,
      propertiesSeeded: propertyCount > 0,
      counts: { siteConfig: siteConfigCount, properties: propertyCount },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
