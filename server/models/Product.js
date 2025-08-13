import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    sales: {
      type: Boolean,
      default: false,
    },
    percentage: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    hoverImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    name: {
      type: String,
      default: null, // can be null if not applicable
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    color: {
      type: [String],
      required: true,
      enum: ["black", "brown", "skin"],
    },
    size: {
      type: [String], // array of strings
      required: true,
      enum: ["S", "M", "L", "XL", "XXL"],
    },

    stock: {
      type: Number,
      required: true,
      min: 1,
    },
    minStock: {
      type: Number,
      required: true,
      min: 10,
    },
    supplier: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
