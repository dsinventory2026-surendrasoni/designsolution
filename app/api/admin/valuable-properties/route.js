import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ValuableProperty from "@/lib/models/ValuableProperty";

// GET all valuable properties for admin
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const publishStatus = searchParams.get("publishStatus") || "";
    const id = searchParams.get("id");

    if (id) {
      const item = await ValuableProperty.findById(id);
      if (!item) {
        return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item });
    }

    const filter = {};
    if (search) {
      filter.$or = [
        { projectName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { builderName: { $regex: search, $options: "i" } },
      ];
    }
    if (publishStatus && publishStatus !== "All") {
      filter.publishStatus = publishStatus;
    }

    const properties = await ValuableProperty.find(filter).sort({ priority: -1, createdAt: -1 });

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    console.error("GET /api/admin/valuable-properties error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST create new valuable property
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.projectName) {
      return NextResponse.json({ success: false, message: "Project Name is required" }, { status: 400 });
    }

    // Auto-generate slug if missing
    let slug = body.slug ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") : "";
    if (!slug) {
      slug = body.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }

    // Check slug uniqueness
    const existing = await ValuableProperty.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const property = await ValuableProperty.create({
      ...body,
      slug,
      priority: Number(body.priority) || 0,
    });

    return NextResponse.json({ success: true, message: "Valuable Property created successfully", data: property });
  } catch (error) {
    console.error("POST /api/admin/valuable-properties error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT update existing valuable property
export async function PUT(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    const targetId = id || body._id;
    if (!targetId) {
      return NextResponse.json({ success: false, message: "Property ID required" }, { status: 400 });
    }

    // Format slug if modified
    if (body.slug) {
      body.slug = body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }

    if (body.priority !== undefined) {
      body.priority = Number(body.priority) || 0;
    }

    const updated = await ValuableProperty.findByIdAndUpdate(targetId, body, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Valuable Property updated successfully", data: updated });
  } catch (error) {
    console.error("PUT /api/admin/valuable-properties error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE property
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Property ID required" }, { status: 400 });
    }

    const deleted = await ValuableProperty.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Valuable Property deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/valuable-properties error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
