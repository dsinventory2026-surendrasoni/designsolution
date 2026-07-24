// app/api/admin/hero/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteConfig from "@/lib/models/SiteConfig";
import { isAuthenticated } from "@/lib/auth";
import { siteConfig as staticConfig } from "@/data/siteConfig";

async function getOrCreateConfig() {
  let config = await SiteConfig.findOne();
  if (!config) {
    config = await SiteConfig.create({
      hero: {
        headline: "Crafting Iconic Spaces & Timeless Luxury",
        subheadline: "Pioneering premier residential residences, commercial landmarks, and turnkey architectural construction with 18+ years of uncompromised excellence.",
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
      brand: staticConfig.brand,
      contact: {
        ...staticConfig.contact,
        addressPlot: staticConfig.contact.address.plot,
        addressTower: staticConfig.contact.address.tower,
        addressFloor: staticConfig.contact.address.floor,
        addressCity: staticConfig.contact.address.city,
        addressState: staticConfig.contact.address.state,
        addressPincode: staticConfig.contact.address.pincode,
        addressCountry: staticConfig.contact.address.country,
      },
      owner: staticConfig.owner,
      socialLinks: staticConfig.socialLinks,
      services: staticConfig.services,
      testimonials: staticConfig.testimonials,
    });
  }
  return config;
}

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();
    return NextResponse.json({ success: true, data: config.hero });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const config = await getOrCreateConfig();
    config.hero = { ...config.hero.toObject(), ...body };
    await config.save();
    return NextResponse.json({ success: true, data: config.hero });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
