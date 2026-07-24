// app/api/admin/testimonials/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();
    return NextResponse.json({ success: true, data: config.testimonials });
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

    const idx = config.testimonials.findIndex((t) => t.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    config.testimonials[idx] = { ...config.testimonials[idx].toObject(), ...body };
    config.markModified("testimonials");
    await config.save();
    return NextResponse.json({ success: true, data: config.testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const config = await getOrCreateConfig();

    const maxId = config.testimonials.reduce((max, t) => Math.max(max, t.id || 0), 0);
    const newTestimonial = {
      id: maxId + 1,
      name: body.name || "New Client",
      role: body.role || "",
      image: body.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: body.rating || 5,
      propertyPurchased: body.propertyPurchased || "",
      text: body.text || "",
    };

    config.testimonials.push(newTestimonial);
    config.markModified("testimonials");
    await config.save();
    return NextResponse.json({ success: true, data: config.testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));
    const config = await getOrCreateConfig();

    config.testimonials = config.testimonials.filter((t) => t.id !== id);
    config.markModified("testimonials");
    await config.save();
    return NextResponse.json({ success: true, data: config.testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
