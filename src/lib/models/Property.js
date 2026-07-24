// lib/models/Property.js
// Mongoose schema for property listings

import mongoose from "mongoose";

const SpecificationSchema = new mongoose.Schema({
  label: String,
  value: String,
});

const ConstructionDetailsSchema = new mongoose.Schema({
  foundation: String,
  structure: String,
  expectedCompletion: String,
});

const PropertySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Residential", "Commercial", "Plots", "Construction", "New Launches"],
      required: true,
    },
    type: { type: String, default: "Flat" },
    location: { type: String, default: "" },
    size: { type: String, default: "" },
    numericSize: { type: Number, default: 0 },
    price: { type: String, default: "" },
    numericPrice: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Available", "Under Construction", "Sold Out", "New Launch", "Ready to Move"],
      default: "Available",
    },
    featured: { type: Boolean, default: false },
    newLaunch: { type: Boolean, default: false },
    possessionDate: { type: String, default: "" },
    images: [{ type: String }],
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    amenities: [{ type: String }],
    specifications: [SpecificationSchema],
    constructionDetails: ConstructionDetailsSchema,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
