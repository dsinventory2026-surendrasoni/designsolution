// src/lib/models/Blog.js
// Mongoose schema for blog posts
import mongoose from "mongoose";

const ContentSectionSchema = new mongoose.Schema({
  heading: { type: String, default: "" },
  body: { type: String, default: "" },
});

const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: "" },
    category: { type: String, default: "Investment Guides" },
    author: { type: String, default: "Surendra Soni" },
    authorTitle: { type: String, default: "Founder & MD, DS Group of Companies" },
    publishedDate: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    heroImage: { type: String, default: "" },
    tags: [{ type: String }],
    content: [ContentSectionSchema],
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
