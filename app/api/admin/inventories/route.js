// app/api/admin/inventories/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import { isAuthenticated } from "@/lib/auth";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// GET — list all or single
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const saleType = searchParams.get("saleType") || "";
    const publishStatus = searchParams.get("publishStatus") || "";

    if (id) {
      const item = await Inventory.findById(id);
      if (!item) return NextResponse.json({ success: false, message: "Inventory not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: item });
    }

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { sector: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "All") filter.category = category;
    if (saleType && saleType !== "All") filter.saleType = saleType;
    if (publishStatus && publishStatus !== "All") filter.publishStatus = publishStatus;

    const items = await Inventory.find(filter).sort({ priority: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: items, inventories: items, total: items.length });
  } catch (error) {
    console.error("GET /api/admin/inventories error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST — create new inventory
export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }

    // Auto-generate slug
    let slug = body.slug ? slugify(body.slug) : slugify(body.title);
    const existing = await Inventory.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const inventory = await Inventory.create({
      ...body,
      slug,
      priority: Number(body.priority) || 0,
    });

    return NextResponse.json({ success: true, message: "Inventory created successfully!", data: inventory });
  } catch (error) {
    console.error("POST /api/admin/inventories error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT — update existing
export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    const targetId = id || body._id;
    if (!targetId) {
      return NextResponse.json({ success: false, message: "Inventory ID required" }, { status: 400 });
    }

    if (body.slug) body.slug = slugify(body.slug);
    if (body.priority !== undefined) body.priority = Number(body.priority) || 0;

    // Remove _id from body to avoid Mongoose error
    delete body._id;

    const updated = await Inventory.findByIdAndUpdate(targetId, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ success: false, message: "Inventory not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Inventory updated successfully!", data: updated });
  } catch (error) {
    console.error("PUT /api/admin/inventories error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

    const deleted = await Inventory.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Inventory deleted successfully!" });
  } catch (error) {
    console.error("DELETE /api/admin/inventories error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
