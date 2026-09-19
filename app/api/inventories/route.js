import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const saleType = searchParams.get("saleType");
    const propertyType = searchParams.get("propertyType");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // If specific slug requested
    if (slug) {
      const item = await Inventory.findOne({ slug, publishStatus: "Published" }).lean();
      if (!item) {
        return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, inventory: item });
    }

    const query = { publishStatus: "Published" };

    if (category && category !== "All") {
      query.category = category;
    }
    if (saleType && saleType !== "All") {
      query.saleType = saleType;
    }
    if (propertyType && propertyType !== "All") {
      query.propertyType = propertyType;
    }
    if (featured === "true") {
      query.featured = true;
    }
    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { title: { $regex: term, $options: "i" } },
        { location: { $regex: term, $options: "i" } },
        { sector: { $regex: term, $options: "i" } },
        { city: { $regex: term, $options: "i" } },
        { propertyType: { $regex: term, $options: "i" } },
        { shortDesc: { $regex: term, $options: "i" } },
      ];
    }

    const inventories = await Inventory.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, inventories });
  } catch (error) {
    console.error("Public Inventories GET Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch inventories" },
      { status: 500 }
    );
  }
}
