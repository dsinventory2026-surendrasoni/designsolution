import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ValuableProperty from "@/lib/models/ValuableProperty";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }

    const property = await ValuableProperty.findOne({
      slug: slug.toLowerCase(),
      publishStatus: "Published",
    }).lean();

    if (!property) {
      return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("GET /api/valuable-properties/[slug] error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
