import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id:{
      type: Number,
      required: true,
    },
    status:{
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    category:{
      type: String,
      required: true,
    },
    image: {
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
        type: String,
        required: true
       },
     size: {
        type: String,
        required: true,
    },
    
    stock:{
      type: Number,
      required: true,
      min: 1,
    },
    minStock: {
      type: Number,
      required: true,
      min: 10,
    },
    supplier:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
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
