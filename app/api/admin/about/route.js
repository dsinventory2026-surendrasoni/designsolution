// app/api/admin/about/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getOrCreateConfig } from "@/lib/getOrCreateConfig";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const config = await getOrCreateConfig();
    return NextResponse.json({
      success: true,
      data: {
        about: config.about,
        owner: config.owner,
        brand: config.brand,
      },
    });
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

    if (body.about) {
      // Update about subdocument in MongoDB
      config.about = {
        ...config.about?.toObject?.() || config.about || {},
        ...body.about,
      };
      // Keep top-level owner name/designation/photo in sync if ownerDetails is updated
      if (body.about.ownerDetails) {
        config.owner = {
          ...config.owner?.toObject?.() || config.owner || {},
          name: body.about.ownerDetails.name || config.owner?.name,
          designation: body.about.ownerDetails.designation || config.owner?.designation,
          photo: body.about.ownerDetails.photo || config.owner?.photo,
          bio: body.about.ownerDetails.bio || config.owner?.bio,
          quote: body.about.ownerDetails.quote || config.owner?.quote,
        };
      }
    }

    if (body.owner) {
      config.owner = { ...config.owner?.toObject?.() || config.owner || {}, ...body.owner };
    }
    if (body.brand) {
      config.brand = { ...config.brand?.toObject?.() || config.brand || {}, ...body.brand };
    }

    config.markModified("about");
    await config.save();

    return NextResponse.json({
      success: true,
      data: {
        about: config.about,
        owner: config.owner,
        brand: config.brand,
      },
    });
  } catch (error) {
    console.error("About PUT error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
