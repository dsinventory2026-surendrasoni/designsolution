import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ValuableProperty from "@/lib/models/ValuableProperty";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // Find highest priority property with popupEnabled = true and publishStatus = Published
    const activePopup = await ValuableProperty.findOne({
      popupEnabled: true,
      publishStatus: "Published",
    })
      .sort({ priority: -1, updatedAt: -1 })
      .lean();

    if (!activePopup) {
      return NextResponse.json({ success: true, data: null });
    }

    return NextResponse.json({ success: true, data: activePopup });
  } catch (error) {
    console.error("GET /api/valuable-properties/popup error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
