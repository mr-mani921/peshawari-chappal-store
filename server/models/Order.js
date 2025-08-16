import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerInfo: {
      country: {
        type: String,
        required: true,
      },
      townCity: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      coupon: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      note: {
        type: String,
        default: null,
      },
      fullName: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        id: {
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
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          default: "mustard",
        },
        style: {
          type: String,
          default: "classic",
        },
        material: {
          type: String,
          default: "leather",
        },
        sole: {
          type: String,
          default: "rubber",
        },
        customizations: {
          color: {
            name: String,
            label: String,
            hex: String,
            price: Number,
          },
          style: {
            name: String,
            label: String,
            price: Number,
          },
          material: {
            name: String,
            label: String,
            price: Number,
          },
          sole: {
            name: String,
            label: String,
            price: Number,
          },
        },
        customizationPrice: {
          type: Number,
          default: 0,
        },
        basePrice: {
          type: Number,
          required: true,
        },
        originalPrice: {
          type: Number,
          default: 0,
        },
        rating: {
          type: Number,
          default: 0,
        },
        reviewCount: {
          type: Number,
          default: 0,
        },
        cartId: {
          type: String,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },

    totalQuantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
