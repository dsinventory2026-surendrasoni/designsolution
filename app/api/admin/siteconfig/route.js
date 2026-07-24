// app/api/admin/siteconfig/route.js
// Returns full siteConfig for use by website components

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();

    // Transform to siteConfig shape that matches existing component props
    const siteConfig = {
      brand: {
        name: config.brand.name,
        shortName: config.brand.shortName,
        tagline: config.brand.tagline,
        subtitle: config.brand.subtitle,
        establishedYear: config.brand.establishedYear,
        logoText: config.brand.logoText,
        logoSubtext: config.brand.logoSubtext,
        logoUrl: config.brand.logoUrl,
        footerTagline: config.brand.footerTagline,
      },
      contact: {
        whatsappNumber: config.contact.whatsappNumber,
        whatsappFormatted: config.contact.whatsappFormatted,
        whatsappLink: config.contact.whatsappLink,
        phonePrimary: config.contact.phonePrimary,
        phoneSecondary: config.contact.phoneSecondary,
        emailPrimary: config.contact.emailPrimary,
        emailSales: config.contact.emailSales,
        address: {
          plot: config.contact.addressPlot,
          tower: config.contact.addressTower,
          floor: config.contact.addressFloor,
          fullAddress: `${config.contact.addressPlot}, ${config.contact.addressTower}, ${config.contact.addressFloor}, ${config.contact.addressCity}`,
          city: config.contact.addressCity,
          state: config.contact.addressState,
          pincode: config.contact.addressPincode,
          country: config.contact.addressCountry,
        },
        workingHours: config.contact.workingHours,
      },
      owner: {
        name: config.owner.name,
        designation: config.owner.designation,
        photo: config.owner.photo,
        bio: config.owner.bio,
        quote: config.owner.quote,
        stats: config.owner.stats,
      },
      socialLinks: {
        instagram: config.socialLinks.instagram,
        facebook: config.socialLinks.facebook,
        whatsapp: config.socialLinks.whatsapp,
        twitter: config.socialLinks.twitter,
        linkedin: config.socialLinks.linkedin,
        youtube: config.socialLinks.youtube,
      },
      googleMapEmbedUrl: config.contact.googleMapEmbedUrl,
      services: config.services,
      testimonials: config.testimonials,
      hero: config.hero,
    };

    return NextResponse.json({ success: true, data: siteConfig });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
