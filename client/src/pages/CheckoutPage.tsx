import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Edit, Tag } from 'lucide-react';
import './CheckoutPage.css';
import API from '../utils/api';

const CheckoutPage = () => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);
  const initialState={
    fullName: '',
    phone: '',
    email: '',
    townCity: '',
    streetAddress: '',
    country: 'Pakistan',
    note: '',
    coupon: ''
  }
  const [formData, setFormData] = useState(initialState);
    const localStorageUser = JSON.parse(localStorage.getItem('user'));


  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const orderData = {
      uid: localStorageUser?._id,
      customerInfo: formData,
      paymentMethod,
      items,
      totalAmount: totalAmount || 0,
      totalQuantity: totalQuantity || 0,
      orderDate: new Date().toISOString(),
      orderNumber: 'ORD-' + Date.now()
    };
    
    console.log('Order submitted:', orderData);
    try {
     const res= await API.post('/orders/add', orderData);
     console.log('Order response:', res.data);
     
     setFormData(initialState); 
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert('Failed to place order. Please try again later.');
    }

    alert('Order placed successfully!');
    // Handle form submission here
  };

  // Format customization details for display
  const formatCustomizations = (item) => {
    const customizations = [];
    
    if (item.size) customizations.push(`Size: ${item.size}`);
    if (item.color) customizations.push(`Color: ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`);
    if (item.style && item.style !== 'classic') {
      customizations.push(`Style: ${item.customizations?.style?.label || item.style}`);
    }
    if (item.material && item.material !== 'leather') {
      customizations.push(`Material: ${item.customizations?.material?.label || item.material}`);
    }
    if (item.sole && item.sole !== 'rubber') {
      customizations.push(`Sole: ${item.customizations?.sole?.label || item.sole}`);
    }
    
    return customizations;
  };

  // Default values for empty cart
  const safeItems = items || [];
  const safeTotalAmount = totalAmount || 0;
  const safeTotalQuantity = totalQuantity || 0;

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Left Side - Billing & Shipping */}
        <div className="billing-shipping">
          <h2 className="section-title">Billing & Shipping</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Optional"
              />
            </div>

            <div className="form-group">
              <label htmlFor="townCity" className="form-label">
                Town / City <span className="required">*</span>
              </label>
              <input
                type="text"
                id="townCity"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="streetAddress" className="form-label">
              Street address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              className="form-input"
              placeholder="House number and street name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country / Region <span className="required">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Afghanistan">Afghanistan</option>
            </select>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="order-summary">
          <h2 className="section-title">Order summary</h2>
          
          {/* Product Items */}
          {safeItems.length > 0 ? (
            safeItems.map((item, index) => {
              const customizations = formatCustomizations(item);
              const itemTotal = (item.price || 0) * (item.quantity || 1);
              
              return (
                <div key={`${item.id}-${index}`} className="product-item">
                  <div className="product-image">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop'} 
                      alt={item.name || 'Product'}
                    />
                    {(item.quantity || 1) > 1 && (
                      <span className="quantity-badge">{item.quantity}</span>
                    )}
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">
                      {item.name || 'Smart Zalmi Chappal — 09274'}
                    </h3>
                    
                    {customizations.length > 0 && (
                      <div className="product-options">
                        {customizations.map((customization, idx) => (
                          <p key={idx} className="product-size">
                            {customization}
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {(item.quantity || 1) > 1 && (
                      <p className="product-quantity">×{item.quantity}</p>
                    )}
                  </div>
                  <div className="product-price">₹{itemTotal.toFixed(2)}</div>
                </div>
              );
            })
          ) : (
            <div className="product-item">
              <div className="product-image">
                <img 
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop" 
                  alt="Mustard Smart Zalmi Chappal"
                />
              </div>
              <div className="product-details">
                <h3 className="product-name">Mustard Smart Zalmi Chappal — 09274</h3>
                <p className="product-size">US 9 / EU 42 / UK 8.5</p>
                <p className="product-quantity">×1</p>
              </div>
              <div className="product-price">₹6,500.00</div>
            </div>
          )}

          {/* Note and Coupon */}
          <div className="order-options">
            <div className="option-item">
              <Edit size={16} />
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Note"
                className="option-input"
              />
            </div>
            <div className="option-item">
              <Tag size={16} />
              <input
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleInputChange}
                placeholder="Coupon"
                className="option-input"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{safeTotalAmount > 0 ? safeTotalAmount.toFixed(2) : '6,500.00'}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span className="free-shipping">Free shipping</span>
            </div>
            <div className="price-row total-row">
              <span>Total</span>
              <span>₹{safeTotalAmount > 0 ? safeTotalAmount.toFixed(2) : '6,500.00'}</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className="payment-section">
            <h3 className="payment-title">Payment information</h3>
            
            <div className="payment-option">
              <input
                type="radio"
                id="cash-on-delivery"
                name="payment"
                value="cash-on-delivery"
                checked={paymentMethod === 'cash-on-delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="payment-radio"
              />
              <label htmlFor="cash-on-delivery" className="payment-label">
                <span className="payment-icon">💰</span>
                Cash on delivery
              </label>
            </div>

            <p className="payment-description">
              Pay with cash upon delivery.
            </p>

            <div className="privacy-notice">
              <p>
                Your personal data will be used to process your order, support 
                your experience throughout this website, and for other purposes 
                described in our <a href="#" className="privacy-link">privacy policy</a>.
              </p>
            </div>

            <button type="submit" className="confirm-button">
              Confirm Cash on Delivery
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;