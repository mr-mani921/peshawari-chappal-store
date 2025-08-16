import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="order-confirmation-container">
        <div className="order-confirmation-content">
          <CheckCircle className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>
            Your order has been confirmed. You will receive an email
            confirmation shortly.
          </p>
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              <Home size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="order-confirmation-container">
      <div className="order-confirmation-content">
        <div className="success-header">
          <CheckCircle className="success-icon" />
          <h1>Order Confirmed!</h1>
          <p>
            Thank you for your order. We've received your order and will begin
            processing it right away.
          </p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Order Number:</span>
                <span className="value">{orderData.orderNumber}</span>
              </div>
              <div className="info-item">
                <span className="label">Order Date:</span>
                <span className="value">
                  {new Date(orderData.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Payment Method:</span>
                <span className="value">
                  {orderData.paymentMethod === "cash-on-delivery"
                    ? "Cash on Delivery"
                    : orderData.paymentMethod}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Total Amount:</span>
                <span className="value">
                  ₹{orderData.totalAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="shipping-info">
            <h2>Shipping Information</h2>
            <div className="shipping-details">
              <p>
                <strong>{orderData.customerInfo?.fullName}</strong>
              </p>
              <p>{orderData.customerInfo?.streetAddress}</p>
              <p>
                {orderData.customerInfo?.townCity},{" "}
                {orderData.customerInfo?.country}
              </p>
              <p>Phone: {orderData.customerInfo?.phone}</p>
              {orderData.customerInfo?.email && (
                <p>Email: {orderData.customerInfo?.email}</p>
              )}
            </div>
          </div>

          <div className="order-items">
            <h2>Order Items</h2>
            <div className="items-list">
              {orderData.items?.map((item, index) => {
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
                        <span className="quantity-badge">{item.quantity}</span>
                      )}
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">
                        {item.name || "Smart Zalmi Chappal"}
                      </h3>

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

        <div className="next-steps">
          <h2>What's Next?</h2>
          <div className="steps-grid">
            <div className="step">
              <Package className="step-icon" />
              <h3>Order Processing</h3>
              <p>
                We'll review your order and prepare it for shipping within 1-2
                business days.
              </p>
            </div>
            <div className="step">
              <Truck className="step-icon" />
              <h3>Shipping</h3>
              <p>
                Your order will be shipped via our trusted delivery partners and
                you'll receive tracking information.
              </p>
            </div>
            <div className="step">
              <CheckCircle className="step-icon" />
              <h3>Delivery</h3>
              <p>
                Your order will be delivered to your doorstep. Pay with cash
                upon delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn btn-secondary">
            <ShoppingBag size={16} />
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;



