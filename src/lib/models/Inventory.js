// src/lib/models/Inventory.js
import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },

    // ─── Category & Type ─────────────────────────────────────────
    category: {
      type: String,
      enum: ["Residential", "Commercial", "Plots"],
      default: "Residential",
    },
    saleType: {
      type: String,
      enum: ["Sale", "Rent", "Lease"],
      default: "Sale",
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "Independent House", "Office", "Shop", "Showroom", "Plot", "Warehouse", "Builder Floor"],
      default: "Apartment",
    },

    // ─── Location ────────────────────────────────────────────────
    location: { type: String, default: "" },
    sector: { type: String, default: "" },
    city: { type: String, default: "Gurugram" },
    state: { type: String, default: "Haryana" },

    // ─── Pricing ─────────────────────────────────────────────────
    price: { type: String, default: "" },           // "₹45 Lakh"
    pricePerSqft: { type: String, default: "" },    // "₹5,500/sqft"
    negotiable: { type: Boolean, default: false },

    // ─── Property Details ─────────────────────────────────────────
    area: { type: String, default: "" },            // "1200 sqft"
    bedrooms: { type: String, default: "" },        // "3 BHK"
    bathrooms: { type: String, default: "" },
    facing: { type: String, default: "" },          // "East"
    floor: { type: String, default: "" },
    totalFloors: { type: String, default: "" },
    parking: { type: String, default: "" },
    furnishing: {
      type: String,
      enum: ["Unfurnished", "Semi-Furnished", "Fully Furnished", "Not Applicable"],
      default: "Unfurnished",
    },

    // ─── Status ──────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["Available", "Sold", "Under Construction", "Coming Soon", "Negotiation"],
      default: "Available",
    },
    possession: { type: String, default: "" },       // "Ready to Move" / "Dec 2025"

    // ─── Media ───────────────────────────────────────────────────
    thumbnail: { type: String, default: "" },
    images: [{ type: String }],                      // Multiple images

    // ─── Description ─────────────────────────────────────────────
    shortDesc: { type: String, default: "" },
    fullDesc: { type: String, default: "" },
    amenities: [{ type: String }],
    highlights: [{ type: String }],

    // ─── Legal & Contact ─────────────────────────────────────────
    reraNumber: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },

    // ─── Admin Controls ──────────────────────────────────────────
    featured: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    publishStatus: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },

    // ─── SEO ─────────────────────────────────────────────────────
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
  },
  { timestamps: true }
);

const Inventory =
  mongoose.models.Inventory ||
  mongoose.model("Inventory", InventorySchema, "inventories");

export default Inventory;
