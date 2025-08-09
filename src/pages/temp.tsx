import React, { useState } from 'react';
import { Heart, Star, Settings, Palette, Ruler, HelpCircle, Share2, Phone, GitCompare } from 'lucide-react';

const PeshawarChappalCustomizer = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('brown');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCustomizing, setIsCustomizing] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [selectedMaterial, setSelectedMaterial] = useState('leather');
  const [selectedSole, setSelectedSole] = useState('rubber');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [customText, setCustomText] = useState('');
  const [selectedThreadColor, setSelectedThreadColor] = useState('#FFD700');

  // Sample data
  const images = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
  ];

  const colorOptions = [
    { name: 'brown', label: 'Classic Brown', hex: '#8B4513', price: 0 },
    { name: 'black', label: 'Midnight Black', hex: '#2D2D2D', price: 200 },
    { name: 'maroon', label: 'Royal Maroon', hex: '#800000', price: 300 },
    { name: 'tan', label: 'Desert Tan', hex: '#D2B48C', price: 150 }
  ];

  const styleOptions = [
    { name: 'classic', label: 'Classic', price: 0 },
    { name: 'modern', label: 'Modern', price: 500 },
    { name: 'premium', label: 'Premium', price: 1000 }
  ];

  const materialOptions = [
    { name: 'leather', label: 'Genuine Leather', price: 0 },
    { name: 'suede', label: 'Premium Suede', price: 800 }
  ];

  const soleOptions = [
    { name: 'rubber', label: 'Rubber Sole', price: 0 },
    { name: 'leather-sole', label: 'Leather Sole', price: 600 }
  ];

  const sizes = ['6', '7', '8', '9', '10', '11', '12'];
  const productId = 'PC-2024-001';
  const rating = 4.5;
  const reviewCount = 128;

  // Calculate prices
  const basePrice = 8500;
  const colorPrice = colorOptions.find(c => c.name === selectedColor)?.price || 0;
  const stylePrice = styleOptions.find(s => s.name === selectedStyle)?.price || 0;
  const materialPrice = materialOptions.find(m => m.name === selectedMaterial)?.price || 0;
  const solePrice = soleOptions.find(s => s.name === selectedSole)?.price || 0;
  const logoPrice = selectedLogo ? 250 : 0;
  const patternPrice = selectedPattern ? 350 : 0;
  const textPrice = customText ? 600 : 0;
  
  const customizationPrice = colorPrice + stylePrice + materialPrice + solePrice + logoPrice + patternPrice + textPrice;
  const unitPrice = basePrice + customizationPrice;
  const totalPrice = unitPrice * quantity;

  const threadColors = ['#FFD700', '#C0C0C0', '#000000', '#FFFFFF', '#FF0000', '#0000FF'];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Main Container with Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
        
        {/* Left Side - Product Images */}
        <div className="order-1 lg:order-1 max-w-full lg:max-w-[500px]">
          {/* Main Image */}
          <div className="mb-5 border-2 border-gray-200 rounded-xl overflow-hidden relative">
            <img
              src={images[selectedImage]}
              alt="Product Main"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              style={{
                filter: selectedColor === 'black' ? 'brightness(0.7) sepia(1) hue-rotate(200deg)' :
                       selectedColor === 'brown' ? 'sepia(0.8) hue-rotate(20deg)' :
                       selectedColor === 'maroon' ? 'sepia(1) hue-rotate(320deg) saturate(1.5)' :
                       selectedColor === 'tan' ? 'sepia(0.5) brightness(1.1)' : 'none'
              }}
            />
            
            {customizationPrice !== 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                +PKR {customizationPrice}
              </div>
            )}
            
            {/* Wishlist Heart */}
            <button
              onClick={() => setIsInWishlist(!isInWishlist)}
              className="absolute top-2 left-2 bg-white bg-opacity-90 border-none rounded-full w-10 h-10 cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-opacity-100"
            >
              <Heart
                size={20}
                style={{
                  color: isInWishlist ? '#FF6B6B' : '#666',
                  fill: isInWishlist ? '#FF6B6B' : 'none'
                }}
              />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all duration-200 ${
                  selectedImage === index 
                    ? 'border-3 border-red-500' 
                    : 'border-2 border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="order-2 lg:order-2 max-w-full lg:max-w-[600px]">
          {/* Sale Badge */}
          <div className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold mb-4">
            SALE
          </div>

          {/* Product Title & Rating */}
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">
              {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Smart Zalmi Chappal — {productId}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    style={{ 
                      color: i < Math.floor(rating) ? '#FFD700' : '#ddd',
                      fill: i < Math.floor(rating) ? '#FFD700' : 'none'
                    }}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">({reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price Info */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="line-through text-gray-500 text-lg">
                PKR {(10500 * quantity).toLocaleString()}.00
              </span>
              <span className="text-2xl font-bold text-red-500">
                PKR {totalPrice.toLocaleString()}.00
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              Unit price: PKR{unitPrice.toLocaleString()}.00 each
            </div>
            
            {customizationPrice > 0 && (
              <p className="text-gray-600 text-sm">
                Includes PKR{customizationPrice} customization fee per item
              </p>
            )}
            
            {quantity > 1 && (
              <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm font-medium mt-2 border border-green-300">
                Total for {quantity} items: PKR{totalPrice.toLocaleString()}.00
              </div>
            )}
          </div>

          {/* Customization Toggle */}
          <div className="mb-5">
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300 ${
                isCustomizing 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Palette size={16} />
              {isCustomizing ? 'Hide Customization' : 'Customize Product'}
            </button>
          </div>

          {/* Customization Options */}
          {isCustomizing && (
            <div className="bg-gray-50 p-5 rounded-xl mb-5 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2">
                <Settings size={18} />
                Customize Your Peshawar Chappal
              </h3>

              {/* Live Preview Demo */}
              <div className="mb-6 p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <h4 className="text-sm font-semibold mb-3 text-gray-600 flex items-center gap-2">
                  <span className="animate-pulse">👁️</span> Live Preview Demo
                </h4>
                <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                  {/* Chappal Outline */}
                  <div className="relative">
                    <svg width="180" height="120" viewBox="0 0 180 120" className="drop-shadow-lg">
                      <ellipse 
                        cx="90" 
                        cy="60" 
                        rx="85" 
                        ry="55" 
                        fill={
                          selectedColor === 'black' ? '#2D2D2D' : 
                          selectedColor === 'brown' ? '#8B4513' : 
                          selectedColor === 'maroon' ? '#800000' : 
                          selectedColor === 'tan' ? '#D2B48C' : '#8B4513'
                        } 
                        stroke="#654321" 
                        strokeWidth="2"
                      />
                      <ellipse cx="90" cy="45" rx="70" ry="35" fill="none" stroke="#654321" strokeWidth="1" strokeDasharray="3,3"/>
                    </svg>
                    
                    {/* Selected Logo/Icon Overlay */}
                    {selectedLogo && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {selectedLogo === 'peshawar-logo' && <span className="text-2xl font-bold text-white drop-shadow-md">پشاور</span>}
                        {selectedLogo === 'mountain' && <span className="text-2xl">🏔️</span>}
                        {selectedLogo === 'star' && <span className="text-2xl">⭐</span>}
                        {selectedLogo === 'crescent' && <span className="text-2xl">🌙</span>}
                        {selectedLogo === 'tribal' && <span className="text-xl">🔺</span>}
                        {selectedLogo === 'crown' && <span className="text-2xl">👑</span>}
                        {selectedLogo === 'eagle' && <span className="text-2xl">🦅</span>}
                        {selectedLogo === 'flower' && <span className="text-2xl">🌺</span>}
                      </div>
                    )}
                    
                    {/* Custom Text */}
                    {customText && (
                      <div 
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold" 
                        style={{ color: selectedThreadColor }}
                      >
                        {customText}
                      </div>
                    )}
                    
                    {/* Selected Pattern Overlay */}
                    {selectedPattern && (
                      <div className="absolute inset-0 opacity-30">
                        {selectedPattern === 'geometric' && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                            ◇ ◆ ◇ ◆ ◇
                          </div>
                        )}
                        {selectedPattern === 'floral' && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                            🌸 🌿 🌸
                          </div>
                        )}
                        {selectedPattern === 'traditional' && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                            ◆ ◇ ◆
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Preview Text */}
                  <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                    Preview: {selectedColor} • {selectedLogo || 'No Logo'} • {selectedPattern || 'No Pattern'}
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600">Color:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 p-2 sm:p-3 rounded-2xl cursor-pointer text-xs transition-all duration-200 ${
                        selectedColor === color.name 
                          ? 'border-2 border-red-500 bg-red-50' 
                          : 'border border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className="truncate">{color.label}</span>
                      {color.price > 0 && (
                        <span className="text-red-500 font-bold">+PKR{color.price}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo & Icon Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600 flex items-center gap-2">
                  <span>🎨</span> Peshawar Chappals Logos & Icons:
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {[
                    { id: 'peshawar-logo', icon: 'پشاور', label: 'Peshawar Logo', price: 300 },
                    { id: 'mountain', icon: '🏔️', label: 'Mountain', price: 200 },
                    { id: 'star', icon: '⭐', label: 'Star', price: 150 },
                    { id: 'crescent', icon: '🌙', label: 'Crescent', price: 200 },
                    { id: 'tribal', icon: '🔺', label: 'Tribal', price: 250 },
                    { id: 'crown', icon: '👑', label: 'Crown', price: 350 },
                    { id: 'eagle', icon: '🦅', label: 'Eagle', price: 300 },
                    { id: 'flower', icon: '🌺', label: 'Flower', price: 180 }
                  ].map((logo) => (
                    <div
                      key={logo.id}
                      onClick={() => setSelectedLogo(selectedLogo === logo.id ? null : logo.id)}
                      className={`p-3 rounded-lg cursor-pointer text-center transition-all duration-300 ${
                        selectedLogo === logo.id 
                          ? 'border-2 border-red-500 bg-red-50 shadow-md' 
                          : 'border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-2xl mb-1">{logo.icon}</div>
                      <div className="text-xs font-medium">{logo.label}</div>
                      <div className="text-xs text-red-500 font-bold">+PKR{logo.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pattern Templates */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600 flex items-center gap-2">
                  <span>🎭</span> Traditional Patterns:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'geometric', name: 'Geometric', preview: '◇◆◇', price: 400 },
                    { id: 'floral', name: 'Floral Design', preview: '🌸🌿🌸', price: 350 },
                    { id: 'traditional', name: 'Traditional', preview: '◆◇◆', price: 300 },
                    { id: 'paisley', name: 'Paisley', preview: '🌀🌀🌀', price: 450 },
                    { id: 'tribal-pattern', name: 'Tribal Pattern', preview: '▲▼▲', price: 500 },
                    { id: 'border', name: 'Border Design', preview: '═══', price: 250 }
                  ].map((pattern) => (
                    <div
                      key={pattern.id}
                      onClick={() => setSelectedPattern(selectedPattern === pattern.id ? null : pattern.id)}
                      className={`p-3 rounded-lg cursor-pointer text-center transition-all duration-300 ${
                        selectedPattern === pattern.id 
                          ? 'border-2 border-red-500 bg-red-50' 
                          : 'border border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{pattern.preview}</div>
                      <div className="text-xs font-semibold mb-1">{pattern.name}</div>
                      <div className="text-xs text-red-500 font-bold">+PKR{pattern.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embroidery Options */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600 flex items-center gap-2">
                  <span>🧵</span> Embroidery Options:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-gray-300 rounded-lg p-3 bg-white">
                    <label className="text-xs font-medium text-gray-600">Custom Text:</label>
                    <input 
                      type="text" 
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Enter your text (e.g., name, initials)"
                      className="w-full mt-1 p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      maxLength="20"
                    />
                    <div className="text-xs text-red-500 font-bold mt-1">+PKR 600</div>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 bg-white">
                    <label className="text-xs font-medium text-gray-600">Thread Color:</label>
                    <div className="flex gap-2 mt-2">
                      {threadColors.map((color, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedThreadColor(color)}
                          className={`w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform ${
                            selectedThreadColor === color ? 'border-red-500' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600">Material:</h4>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {materialOptions.map((material) => (
                    <option key={material.name} value={material.name}>
                      {material.label} {material.price !== 0 && `(${material.price > 0 ? '+' : ''}PKR${material.price})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sole Selection */}
              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-3 text-gray-600">Sole Type:</h4>
                <select
                  value={selectedSole}
                  onChange={(e) => setSelectedSole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {soleOptions.map((sole) => (
                    <option key={sole.name} value={sole.name}>
                      {sole.label} {sole.price > 0 && `(+PKR${sole.price})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Size Chart Link */}
          <div className="mb-5">
            <button className="border border-gray-300 px-4 py-2 rounded-full cursor-pointer text-sm text-gray-600 hover:border-gray-400 transition-colors duration-200">
              <span className="flex items-center">
                <Ruler className="mr-2" size={16} />  
                Size Chart
              </span>
            </button>
          </div>

          {/* Size Selector */}
          <div className="mb-5">
            <h3 className="text-base font-semibold mb-3 text-gray-700">
              Size: <span className="text-red-500">*</span>
            </h3>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className={`w-full p-3 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
                selectedSize ? 'border border-gray-300' : 'border-2 border-red-500'
              }`}
            >
              <option value="">Choose an option</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {!selectedSize && (
              <p className="text-red-500 text-xs mt-1">Please select a size</p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 text-gray-700">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 bg-white rounded-lg cursor-pointer text-lg font-bold hover:bg-gray-50 transition-colors duration-200"
              >
                -
              </button>
              <span className="px-5 py-2 border border-gray-300 rounded-lg text-base min-w-[60px] text-center bg-gray-50">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 bg-white rounded-lg cursor-pointer text-lg font-bold hover:bg-gray-50 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button 
              className={`flex-1 py-4 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                selectedSize 
                  ? 'bg-gray-800 text-white cursor-pointer hover:bg-gray-700' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              Checkout Now
            </button>

            <button 
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-lg text-base font-semibold transition-all duration-300 ${
                selectedSize 
                  ? 'bg-red-500 text-white cursor-pointer hover:bg-red-600' 
                  : 'bg-red-300 text-white cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex justify-around mb-5 p-4 bg-gray-100 rounded-lg">
            <button className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <GitCompare size={18} />
              <span>Compare</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <HelpCircle size={18} />
              <span>Ask a Question</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>

          {/* WhatsApp Order */}
          <div className="flex items-center justify-center gap-3 p-4 bg-green-500 text-white rounded-lg cursor-pointer text-base font-semibold hover:bg-green-600 transition-colors duration-200">
            <Phone size={18} />
            <span>Order Via WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeshawarChappalCustomizer;