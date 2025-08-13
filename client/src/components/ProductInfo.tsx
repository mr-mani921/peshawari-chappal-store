import React, { useState } from 'react';
import { Star, Heart, Share2, MessageCircle, HelpCircle, ShoppingCart, Zap } from 'lucide-react';
import { useProducts } from '../pages/Contexts/ProductContext';
import { useParams } from 'react-router-dom';
 
const ProductInfo: React.FC = () => {
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const rating = 4.8;
  const reviewCount = 2847;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="space-y-8">
      {/* Product Title & Rating */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Premium Cotton T-Shirt
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${
                  i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">{rating}</span>
          <span className="text-gray-500">({reviewCount.toLocaleString()} reviews)</span>
        </div>
      </div>

      {/* Price Info */}
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-gray-900">$29.99</span>
          <span className="text-xl text-gray-500 line-through">$49.99</span>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
            40% OFF
          </span>
        </div>
        <p className="text-green-600 font-medium">Free shipping on orders over $50</p>
      </div>

      {/* Size Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Size</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Size Guide
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all duration-200 ${
                selectedSize === size
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decrementQuantity}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              -
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              +
            </button>
          </div>
          <span className="text-gray-500">Only 12 left in stock</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
          
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
            <Zap size={20} />
            <span>Buy Now</span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isSaved
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart size={18} className={isSaved ? 'fill-current' : ''} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-all duration-200 flex-1">
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-200 flex-1">
            <HelpCircle size={18} />
            <span>FAQ</span>
          </button>
        </div>
      </div>

      {/* Product Features */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Product Features</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>100% Premium Cotton</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Machine Washable</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Comfortable Fit</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>30-Day Return Policy</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;