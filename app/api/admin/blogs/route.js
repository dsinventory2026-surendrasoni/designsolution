// app/api/admin/blogs/route.js
// Full CRUD for blog posts with DB persistence and static fallback seeding

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { isAuthenticated } from "@/lib/auth";
import { blogPosts as staticPosts } from "@/data/blogData";

async function seedIfEmpty() {
  const count = await Blog.countDocuments();
  if (count === 0) {
    const postsToInsert = staticPosts.map((p, idx) => ({
      id: String(p.id || `blog-${Date.now()}-${idx}`),
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      category: p.category,
      author: p.author || "Surendra Soni",
      authorTitle: p.authorTitle || "Founder & MD, DS Group of Companies",
      publishedDate: p.publishedDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: p.readTime || "5 min read",
      heroImage: p.heroImage || "",
      tags: p.tags || [],
      content: p.content || [],
      sortOrder: idx,
      isPublished: true,
    }));
    await Blog.insertMany(postsToInsert);
  }
}

// GET - all blogs (public, can filter by category or slug)
export async function GET(request) {
  try {
    await connectDB();
    await seedIfEmpty();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
    }

    const query = category && category !== "All" ? { category } : {};
    const blogs = await Blog.find(query).sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("GET /api/admin/blogs error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST - add new blog (protected)
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

    // Auto-generate slug if missing
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Ensure unique slug
    let finalSlug = body.slug;
    let count = 1;
    while (await Blog.findOne({ slug: finalSlug })) {
      finalSlug = `${body.slug}-${count++}`;
    }
    body.slug = finalSlug;

    if (!body.id) {
      body.id = `blog-${Date.now()}`;
    }

    if (!body.publishedDate) {
      body.publishedDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    const blog = await Blog.create(body);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/blogs error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT - update blog by id or slug (protected)
export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slugParam = searchParams.get("slug");
    const body = await request.json();

    const filter = id ? { id } : { slug: slugParam };
    const blog = await Blog.findOneAndUpdate(
      filter,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("PUT /api/admin/blogs error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE - remove blog by id (protected)
export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slugParam = searchParams.get("slug");

    const filter = id ? { id } : { slug: slugParam };
    const blog = await Blog.findOneAndDelete(filter);

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/blogs error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
