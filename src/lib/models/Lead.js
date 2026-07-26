import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      default: "Residential",
      trim: true,
    },
    budget: {
      type: String,
      default: "Not Specified",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "Contacted", "In Progress", "Closed"],
    },
    source: {
      type: String,
      default: "Website Enquire Form",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
