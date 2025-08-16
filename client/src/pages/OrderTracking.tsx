import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import API from "../utils/api";
import { Danger, Success } from "../utils/Tostify";
import "./OrderTracking.css";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      Danger("Please enter an order number");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await API.get(`/orders/track/${orderNumber.trim()}`);
      setOrder(response.data);
      Success("Order found successfully!");
    } catch (error) {
      console.error("Error tracking order:", error);
      setError(
        "Order not found. Please check your order number and try again."
      );
      Danger("Order not found. Please check your order number and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="status-icon pending" />;
      case "processing":
        return <Package className="status-icon processing" />;
      case "shipped":
        return <Truck className="status-icon shipped" />;
      case "delivered":
        return <CheckCircle className="status-icon delivered" />;
      default:
        return <Clock className="status-icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "processing":
        return "#3b82f6";
      case "shipped":
        return "#8b5cf6";
      case "delivered":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Order Pending";
      case "processing":
        return "Processing Order";
      case "shipped":
        return "Order Shipped";
      case "delivered":
        return "Order Delivered";
      default:
        return "Order Pending";
    }
  };

  const formatCustomizations = (item) => {
    const customizations = [];

    if (item.size) customizations.push(`Size: ${item.size}`);
    if (item.color)
      customizations.push(
        `Color: ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`
      );
    if (item.style && item.style !== "classic") {
      customizations.push(
        `Style: ${item.customizations?.style?.label || item.style}`
      );
    }
    if (item.material && item.material !== "leather") {
      customizations.push(
        `Material: ${item.customizations?.material?.label || item.material}`
      );
    }
    if (item.sole && item.sole !== "rubber") {
      customizations.push(
        `Sole: ${item.customizations?.sole?.label || item.sole}`
      );
    }

    return customizations;
  };

  return (
    <div className="order-tracking-container">
      <div className="order-tracking-content">
        <div className="tracking-header">
          <h1>Track Your Order</h1>
          <p>Enter your order number to track the status of your order</p>
        </div>

        <form onSubmit={handleSearch} className="tracking-form">
          <div className="search-input-group">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter your order number (e.g., ORD-123456)"
              className="search-input"
              required
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <Search size={20} />
              )}
              {loading ? "Searching..." : "Track Order"}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {order && (
          <div className="order-details">
            <div className="order-status">
              <div className="status-header">
                {getStatusIcon(order.orderStatus)}
                <div className="status-info">
                  <h2>{getStatusText(order.orderStatus)}</h2>
                  <p>Order Number: {order.orderNumber}</p>
                </div>
              </div>

              <div className="status-timeline">
                <div className="timeline-item active">
                  <div className="timeline-icon">
                    <Package size={16} />
                  </div>
                  <div className="timeline-content">
                    <h4>Order Placed</h4>
                    <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div
                  className={`timeline-item ${
                    order.orderStatus !== "pending" ? "active" : ""
                  }`}
                >
                  <div className="timeline-icon">
                    <Package size={16} />
                  </div>
                  <div className="timeline-content">
                    <h4>Processing</h4>
                    <p>Order is being prepared</p>
                  </div>
                </div>

                <div
                  className={`timeline-item ${
                    order.orderStatus === "shipped" ||
                    order.orderStatus === "delivered"
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="timeline-icon">
                    <Truck size={16} />
                  </div>
                  <div className="timeline-content">
                    <h4>Shipped</h4>
                    <p>Order is on its way</p>
                  </div>
                </div>

                <div
                  className={`timeline-item ${
                    order.orderStatus === "delivered" ? "active" : ""
                  }`}
                >
                  <div className="timeline-icon">
                    <CheckCircle size={16} />
                  </div>
                  <div className="timeline-content">
                    <h4>Delivered</h4>
                    <p>Order has been delivered</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-info">
              <h3>Order Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Order Date:</span>
                  <span className="value">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Payment Method:</span>
                  <span className="value">
                    {order.paymentMethod === "cash-on-delivery"
                      ? "Cash on Delivery"
                      : order.paymentMethod}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Total Amount:</span>
                  <span className="value">
                    ₹{order.totalAmount?.toFixed(2)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Total Items:</span>
                  <span className="value">{order.totalQuantity}</span>
                </div>
              </div>
            </div>

            <div className="shipping-info">
              <h3>Shipping Information</h3>
              <div className="shipping-details">
                <p>
                  <strong>{order.customerInfo?.fullName}</strong>
                </p>
                <p>{order.customerInfo?.streetAddress}</p>
                <p>
                  {order.customerInfo?.townCity}, {order.customerInfo?.country}
                </p>
                <p>Phone: {order.customerInfo?.phone}</p>
                {order.customerInfo?.email && (
                  <p>Email: {order.customerInfo?.email}</p>
                )}
              </div>
            </div>

            <div className="order-items">
              <h3>Order Items</h3>
              <div className="items-list">
                {order.items?.map((item, index) => {
                  const customizations = formatCustomizations(item);
                  const itemTotal = (item.price || 0) * (item.quantity || 1);

                  return (
                    <div key={`${item.id}-${index}`} className="order-item">
                      <div className="item-image">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop"
                          }
                          alt={item.name || "Product"}
                        />
                        {(item.quantity || 1) > 1 && (
                          <span className="quantity-badge">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">
                          {item.name || "Smart Zalmi Chappal"}
                        </h4>

                        {customizations.length > 0 && (
                          <div className="item-options">
                            {customizations.map((customization, idx) => (
                              <p key={idx} className="item-option">
                                {customization}
                              </p>
                            ))}
                          </div>
                        )}

                        <div className="item-price">
                          ₹{item.price?.toFixed(2)} × {item.quantity || 1} = ₹
                          {itemTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;



