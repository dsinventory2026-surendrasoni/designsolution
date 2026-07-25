import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ValuableProperty from "@/lib/models/ValuableProperty";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const excludeSlug = searchParams.get("exclude") || "";
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const filter = { publishStatus: "Published" };
    if (excludeSlug) {
      filter.slug = { $ne: excludeSlug };
    }

    const properties = await ValuableProperty.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    console.error("GET /api/valuable-properties error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
