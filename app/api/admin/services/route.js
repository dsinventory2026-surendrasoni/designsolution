// app/api/admin/services/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();
    return NextResponse.json({ success: true, data: config.services });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT - update a specific service by id
export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const config = await getOrCreateConfig();

    if (body.replaceAll) {
      // Replace entire services array
      config.services = body.services;
    } else {
      // Update single service by id
      const idx = config.services.findIndex((s) => s.id === body.id);
      if (idx === -1) {
        return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
      }
      config.services[idx] = { ...config.services[idx].toObject(), ...body };
    }

    config.markModified("services");
    await config.save();
    return NextResponse.json({ success: true, data: config.services });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST - add new service
export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const config = await getOrCreateConfig();

    const newService = {
      id: body.id || `service-${Date.now()}`,
      title: body.title || "New Service",
      iconName: body.iconName || "Building2",
      badge: body.badge || "",
      shortDescription: body.shortDescription || "",
      fullDescription: body.fullDescription || "",
    };

    config.services.push(newService);
    config.markModified("services");
    await config.save();
    return NextResponse.json({ success: true, data: config.services });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE - remove service by id
export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const config = await getOrCreateConfig();

    config.services = config.services.filter((s) => s.id !== id);
    config.markModified("services");
    await config.save();
    return NextResponse.json({ success: true, data: config.services });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
