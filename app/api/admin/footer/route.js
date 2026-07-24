// app/api/admin/footer/route.js
// Footer = brand info + contact details

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();
    return NextResponse.json({
      success: true,
      data: {
        brand: config.brand,
        contact: config.contact,
        socialLinks: config.socialLinks,
      },
    });
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

    if (body.brand) {
      config.brand = { ...config.brand.toObject(), ...body.brand };
      config.markModified("brand");
    }
    if (body.contact) {
      config.contact = { ...config.contact.toObject(), ...body.contact };
      config.markModified("contact");
    }
    if (body.socialLinks) {
      config.socialLinks = { ...config.socialLinks.toObject(), ...body.socialLinks };
      config.markModified("socialLinks");
    }

    await config.save();
    return NextResponse.json({
      success: true,
      data: { brand: config.brand, contact: config.contact, socialLinks: config.socialLinks },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
