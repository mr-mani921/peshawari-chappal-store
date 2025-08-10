  import mongoose from "mongoose";

  const orderSchema = new mongoose.Schema({
    uid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerInfo:{
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
      note:{
        type: String,
        default: null, 
      },
      fullName:{
        type: String,
        required: true,
      }
    },
    items: [
      {
        id: {
          type:Number ,
          required: true,
        },
        image:{
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
        selectedOptions:{
          color: {
            type: String,
            default: "", 
          },
          size:{
            type: String,
            required: true
          }
        },
        totalPrice: {
          type: Number,
          required: true,
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending","delivered"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    orderNumber:{
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod:{
      type: String,
      required: true,
    },
    
    totalQuantity:{
      type: Number,
      required: true,
    }
  }, {
    timestamps: true,
  });

  const Order = mongoose.model("Order", orderSchema);
  export default Order;
