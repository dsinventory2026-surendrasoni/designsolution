// app/api/admin/about/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();
    return NextResponse.json({ success: true, data: { owner: config.owner, brand: config.brand } });
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
    if (body.owner) {
      config.owner = { ...config.owner.toObject(), ...body.owner };
    }
    if (body.brand) {
      config.brand = { ...config.brand.toObject(), ...body.brand };
    }
    await config.save();
    return NextResponse.json({ success: true, data: { owner: config.owner, brand: config.brand } });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
