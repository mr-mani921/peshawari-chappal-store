 import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid'; // for generating unique orderNumber

// Create a new order
export const addOrder = async (req, res) => {
  try {
    const {
      uid,
      customerInfo,
      items,
      totalAmount,
      totalQuantity,
      paymentMethod
    } = req.body;

    // Validate required fields
    if (
      !uid ||
      !customerInfo ||
      !items ||
      totalAmount === undefined ||
      totalQuantity === undefined ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    // Generate unique order number
    const orderNumber = `ORD-${uuidv4().split('-')[0]}`;

    const newOrder = new Order({
      uid,
      customerInfo,
      items,
      totalAmount,
      totalQuantity,
      paymentMethod,
      orderNumber
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error('Error adding order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // optional: latest first
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deliverOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = 'delivered';
    await order.save();

    res.status(200).json({ message: 'Order delivered successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const userOrdersHistory = async (req, res) => {
  const  uid = req.params.uid;

  try {
    const orders = await Order.find({ uid }); // ✅ object form
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
  
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders history:", err);
    res.status(500).json({ message: 'Server error' });
  }
};



