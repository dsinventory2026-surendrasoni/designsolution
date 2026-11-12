import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inventory from "@/lib/models/Inventory";
import { inventoriesData as fallbackInventories } from "@/data/inventoriesData";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const saleType = searchParams.get("saleType");
    const propertyType = searchParams.get("propertyType");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    // If specific slug requested
    if (slug) {
      let item = null;
      try {
        await connectDB();
        item = await Inventory.findOne({ slug, publishStatus: "Published" }).lean();
      } catch (e) {
        console.error("DB error finding slug:", e);
      }

      if (!item) {
        item = fallbackInventories.find((inv) => inv.slug === slug);
      }

      if (!item) {
        return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, inventory: item });
    }

    let inventories = [];
    try {
      await connectDB();
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

      inventories = await Inventory.find(query)
        .sort({ priority: -1, createdAt: -1 })
        .limit(limit)
        .lean();
    } catch (e) {
      console.error("DB error querying inventories:", e);
    }

    if (!inventories || inventories.length === 0) {
      inventories = fallbackInventories.filter((item) => {
        const matchCategory = !category || category === "All" || item.category === category;
        const matchSaleType = !saleType || saleType === "All" || item.saleType === saleType;
        const matchPropertyType = !propertyType || propertyType === "All" || item.propertyType === propertyType;
        const matchFeatured = featured !== "true" || item.featured === true;

        let matchSearch = true;
        if (search && search.trim()) {
          const t = search.trim().toLowerCase();
          matchSearch =
            item.title?.toLowerCase().includes(t) ||
            item.location?.toLowerCase().includes(t) ||
            item.sector?.toLowerCase().includes(t) ||
            item.city?.toLowerCase().includes(t) ||
            item.propertyType?.toLowerCase().includes(t) ||
            item.shortDesc?.toLowerCase().includes(t);
        }

        return matchCategory && matchSaleType && matchPropertyType && matchFeatured && matchSearch;
      }).slice(0, limit);
    }

    return NextResponse.json({ success: true, inventories, total: inventories.length });
  } catch (error) {
    console.error("Public Inventories GET Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch inventories" },
      { status: 500 }
    );
  }
}
