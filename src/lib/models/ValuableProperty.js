import mongoose from "mongoose";

const SpecificationSchema = new mongoose.Schema({
  label: { type: String, default: "" },
  value: { type: String, default: "" },
});

const ValuablePropertySchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    thumbnail: { type: String, default: "" },
    heroBanner: { type: String, default: "" },
    gallery: [{ type: String }],
    propertyType: { type: String, default: "Apartment" },
    location: { type: String, default: "" },
    price: { type: String, default: "" },
    offerPrice: { type: String, default: "" },
    area: { type: String, default: "" },
    bedrooms: { type: String, default: "" },
    bathrooms: { type: String, default: "" },
    parking: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Available", "Under Construction", "Ready to Move", "Upcoming", "Sold Out"],
      default: "Available",
    },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    amenities: [{ type: String }],
    features: [{ type: String }],
    specifications: [SpecificationSchema],
    googleMap: { type: String, default: "" },
    builderName: { type: String, default: "" },
    reraNumber: { type: String, default: "" },
    possessionDate: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    popupEnabled: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    publishStatus: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Published",
    },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
  },
  { timestamps: true }
);

const ValuableProperty =
  mongoose.models.ValuableProperty ||
  mongoose.model("ValuableProperty", ValuablePropertySchema, "valuable_properties");

export default ValuableProperty;
