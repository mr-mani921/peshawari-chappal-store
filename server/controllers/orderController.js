import Order from "../models/Order.js";
import { v4 as uuidv4 } from "uuid"; // for generating unique orderNumber

// Create a new order
export const addOrder = async (req, res) => {
  try {
    const { uid, customerInfo, items, paymentMethod } = req.body;

    // Validate required fields
    if (!uid || !customerInfo || !items || !paymentMethod) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    // Calculate totals from items
    const totalQuantity = items.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    const totalAmount = items.reduce((total, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      return total + itemTotal;
    }, 0);

    // Generate unique order number
    const orderNumber = `ORD-${uuidv4().split("-")[0]}`;

    const newOrder = new Order({
      uid,
      customerInfo,
      items,
      totalAmount,
      totalQuantity,
      paymentMethod,
      orderNumber,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error adding order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // optional: latest first
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deliverOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = "delivered";
    await order.save();

    res.status(200).json({ message: "Order delivered successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const userOrdersHistory = async (req, res) => {
  const uid = req.params.uid;

  try {
    const orders = await Order.find({ uid }); // ✅ object form
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders history:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const trackOrder = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error tracking order:", err);
    res.status(500).json({ message: "Server error" });
  }
};
