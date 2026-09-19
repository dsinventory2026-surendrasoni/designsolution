// app/api/admin/upload/route.js
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized. Please login again." }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    let fileName = "";
    let buffer;

    if (contentType.includes("application/json")) {
      // Base64 payload from canvas crop
      const body = await request.json();
      const { base64Data, filename = "image.jpg" } = body;

      if (!base64Data) {
        return NextResponse.json({ success: false, message: "No image data provided" }, { status: 400 });
      }

      // Extract raw base64 string
      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      const dataString = matches ? matches[2] : base64Data;
      buffer = Buffer.from(dataString, "base64");

      const ext = matches ? (matches[1].includes("png") ? ".png" : matches[1].includes("webp") ? ".webp" : ".jpg") : (path.extname(filename) || ".jpg");
      const cleanName = path.basename(filename || "upload", path.extname(filename || "")).replace(/[^a-zA-Z0-9_-]/g, "") || "upload";
      fileName = `${cleanName}-${Date.now()}${ext}`;
    } else {
      // FormData upload
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);

      const rawExt = file.name ? path.extname(file.name) : "";
      const ext = rawExt ? rawExt.toLowerCase() : ".jpg";
      const cleanName = file.name ? path.basename(file.name, rawExt).replace(/[^a-zA-Z0-9_-]/g, "") : "upload";
      fileName = `${cleanName || "upload"}-${Date.now()}${ext}`;
    }

    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
