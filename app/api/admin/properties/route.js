// app/api/admin/properties/route.js
// Full CRUD for property listings

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/lib/models/Property";
import { isAuthenticated } from "@/lib/auth";
import { propertiesData as staticProps } from "@/data/propertiesData";

async function seedIfEmpty() {
  const count = await Property.countDocuments();
  if (count === 0) {
    const propsToInsert = staticProps.map((p, idx) => ({ ...p, sortOrder: idx }));
    await Property.insertMany(propsToInsert);
  }
}

// GET - all properties (public)
export async function GET(request) {
  try {
    await connectDB();
    await seedIfEmpty();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = category && category !== "All" ? { category } : {};
    const properties = await Property.find(query).sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST - add new property (protected)
export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();

    // Generate unique id if not provided
    if (!body.id) {
      body.id = `ds-${body.category?.toLowerCase().slice(0, 3) || "pro"}-${Date.now()}`;
    }

    // Check duplicate id
    const existing = await Property.findOne({ id: body.id });
    if (existing) {
      body.id = `${body.id}-${Date.now()}`;
    }

    const property = await Property.create(body);
    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT - update property by id (protected)
export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    const property = await Property.findOneAndUpdate(
      { id },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE - remove property by id (protected)
export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const property = await Property.findOneAndDelete({ id });
    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
