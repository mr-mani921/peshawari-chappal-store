import React, { useState } from 'react';
import { Edit3, Tag, Truck, CreditCard } from 'lucide-react';

const OrderSummary: React.FC = () => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [note, setNote] = useState('');
  const [coupon, setCoupon] = useState('');

  const product = {
    name: 'Mustard Smart Zalmi Chappal',
    code: '09274',
    size: 'US 9 / EU 42 / UK 8.5',
    quantity: 1,
    price: 6500,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=200'
  };

  const subtotal = product.price * product.quantity;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Order summary</h2>

      {/* Product Item */}
      <div className="flex items-start space-x-4 mb-8 p-4 bg-gray-50 rounded-xl">
        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
            {product.name} – {product.code}
          </h3>
          <p className="text-xs text-gray-600 mb-2">{product.size}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Qty: {product.quantity}</span>
            <span className="font-bold text-gray-900">Rs.{product.price.toLocaleString()}.00</span>
          </div>
        </div>
      </div>

      {/* Note and Coupon Actions */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <button
          onClick={() => setShowNoteInput(!showNoteInput)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <Edit3 size={16} />
          <span className="text-sm font-medium">Note</span>
        </button>
        
        <button
          onClick={() => setShowCouponInput(!showCouponInput)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <Tag size={16} />
          <span className="text-sm font-medium">Coupon</span>
        </button>
      </div>

      {/* Note Input */}
      {showNoteInput && (
        <div className="mb-6">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note to your order..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            rows={3}
          />
        </div>
      )}

      {/* Coupon Input */}
      {showCouponInput && (
        <div className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Order Totals */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span>Rs.{subtotal.toLocaleString()}.00</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free shipping</span>
        </div>
        
        <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>Rs.{total.toLocaleString()}.00</span>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment information</h3>
        
        <div className="border-2 border-blue-500 rounded-xl p-4 bg-blue-50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold text-gray-900">Cash on delivery</span>
            <Truck size={18} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 ml-8">Pay with cash upon delivery.</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-600 leading-relaxed">
          Your personal data will be used to process your order, support your experience 
          throughout this website, and for other purposes described in our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            privacy policy
          </a>
          .
        </p>
      </div>

      {/* Confirm Order Button */}
      <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
        Confirm Cash on Delivery
      </button>
    </div>
  );
};

export default OrderSummary;