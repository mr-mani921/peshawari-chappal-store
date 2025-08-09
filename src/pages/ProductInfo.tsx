import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, Share2, MessageCircle, HelpCircle, ShoppingCart, Zap, Palette, Settings, Truck, ChartCandlestick } from 'lucide-react';
import { addToCart, openCart } from '../store/slices/cartSlice';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';
import { Link } from 'react-router-dom';

import { GitCompare, Ruler, Phone } from 'lucide-react';
const ProductInfo = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Customization states
  const [selectedColor, setSelectedColor] = useState('mustard');
  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [selectedMaterial, setSelectedMaterial] = useState('leather');
  const [selectedSole, setSelectedSole] = useState('rubber');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const productId = '09274';
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const rating = 4.8;
  const reviewCount = 2847;

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some(item => item.id === productId);

  // Customization options
  const colorOptions = [
    { name: 'mustard', label: 'Mustard Yellow', hex: '#FFDB58', price: 0 },
    { name: 'brown', label: 'Classic Brown', hex: '#8B4513', price: 0 },
    { name: 'black', label: 'Midnight Black', hex: '#2C2C2C', price: 200 },
    { name: 'tan', label: 'Desert Tan', hex: '#D2B48C', price: 150 },
    { name: 'maroon', label: 'Deep Maroon', hex: '#800000', price: 300 }
  ];

  const styleOptions = [
    { name: 'classic', label: 'Norozi Chappals', price: 250 },
    { name: 'modern', label: 'Zardari Chappals', price: 500 },
    { name: 'embroidered', label: 'Kaptaan Chappals', price: 1200 },
    { name: 'beaded', label: 'Peshawari Chappals ', price: 800 }
  ];

  const materialOptions = [
    { name: 'leather', label: 'Premium Leather', price: 0 },
    { name: 'suede', label: 'Soft Suede', price: 700 },
    { name: 'canvas', label: 'Durable Canvas', price: -500 },
    { name: 'velvet', label: 'Luxury Velvet', price: 1000 }
  ];

  const soleOptions = [
    { name: 'rubber', label: 'Rubber Sole', price: 0 },
    { name: 'leather', label: 'Leather Sole', price: 400 },
    { name: 'cushioned', label: 'Cushioned Comfort', price: 600 },
    { name: 'anti-slip', label: 'Anti-Slip Grip', price: 350 }
  ];

  // Product images based on style
  const getImagesForStyle = (style) => {
    const imageMap = {
      'classic': [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/Zalmi-chappal-min-jpg-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp"
      ],
      'modern': [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg"
      ],
      'embroidered': [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      ],
      'beaded': [
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg",
      ]
    };

    return imageMap[style] || imageMap['classic'];
  };

  // Get current images based on selected style
  const images = getImagesForStyle(selectedStyle);

  // Reset selected image when style changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedStyle]);

  // Calculate customization price
  const getCustomizationPrice = () => {
    const colorPrice = colorOptions.find(c => c.name === selectedColor)?.price || 0;
    const stylePrice = styleOptions.find(s => s.name === selectedStyle)?.price || 0;
    const materialPrice = materialOptions.find(m => m.name === selectedMaterial)?.price || 0;
    const solePrice = soleOptions.find(s => s.name === selectedSole)?.price || 0;

    return colorPrice + stylePrice + materialPrice + solePrice;
  };

  const basePrice = 6500;
  const customizationPrice = getCustomizationPrice();
  const unitPrice = basePrice + customizationPrice;
  const totalPrice = unitPrice * quantity;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Create product object for cart/wishlist
  const createProductObject = () => ({
    id: productId,
    name: `${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Smart Zalmi Chappal — ${productId}`,
    price: unitPrice,
    originalPrice: 10500,
    image: images[selectedImage],
    size: selectedSize,
    color: selectedColor,
    style: selectedStyle,
    material: selectedMaterial,
    sole: selectedSole,
    customizations: {
      color: colorOptions.find(c => c.name === selectedColor),
      style: styleOptions.find(s => s.name === selectedStyle),
      material: materialOptions.find(m => m.name === selectedMaterial),
      sole: soleOptions.find(s => s.name === selectedSole)
    },
    customizationPrice,
    basePrice,
    rating,
    reviewCount
  });

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }

    const product = createProductObject();

    dispatch(addToCart({
      ...product,
      quantity,
      cartId: `${productId}-${selectedSize}-${selectedColor}-${selectedStyle}-${selectedMaterial}-${selectedSole}` // Unique ID for cart item with variations
    }));

    // Show success message (you can replace this with a toast notification)
    alert(`Added ${quantity} item(s) to cart!`);
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }

    handleAddToCart();
    dispatch(openCart());
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    const product = createProductObject();
    dispatch(toggleWishlistItem(product));
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Smart Zalmi Chappal`,
          text: `Check out this amazing chappal for PKR ${unitPrice.toLocaleString()}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Product link copied to clipboard!');
      });
    }
  };

  return (
    <div style={{
      display: 'flex',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      gap: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Main Container with Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto p-4">

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
              onClick={handleWishlistToggle}
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
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all duration-200 ${selectedImage === index
                    ? 'border-3 border-red-500'
                    : 'border-2 border-gray-300 hover:border-gray-400'
                  }`}
                style={{
                  filter: selectedColor === 'black' ? 'brightness(0.7) sepia(1) hue-rotate(200deg)' :
                    selectedColor === 'brown' ? 'sepia(0.8) hue-rotate(20deg)' :
                      selectedColor === 'maroon' ? 'sepia(1) hue-rotate(320deg) saturate(1.5)' :
                        selectedColor === 'tan' ? 'sepia(0.5) brightness(1.1)' : 'none'
                }}
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

            {/* Unit price display */}
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
              className={`flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300 ${isCustomizing
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
                Customize Your Chappal
              </h3>

              {/* Color Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600">Color:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 p-2 sm:p-3 rounded-2xl cursor-pointer text-xs transition-all duration-200 ${selectedColor === color.name
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

              {/* Style Selection */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold mb-3 text-gray-600">Style:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {styleOptions.map((style) => (
                    <div
                      key={style.name}
                      onClick={() => setSelectedStyle(style.name)}
                      className={`p-3 rounded-lg cursor-pointer text-center text-xs transition-all duration-300 ${selectedStyle === style.name
                          ? 'border-2 border-red-500 bg-red-50'
                          : 'border border-gray-300 bg-white hover:border-gray-400'
                        }`}
                    >
                      <div className="font-semibold mb-1">{style.label}</div>
                      {style.price > 0 && (
                        <div className="text-red-500 font-bold">+PKR{style.price}</div>
                      )}
                    </div>
                  ))}
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
              className={`w-full p-3 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-red-500 ${selectedSize ? 'border border-gray-300' : 'border-2 border-red-500'
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
                onClick={decrementQuantity}
                className="w-10 h-10 border border-gray-300 bg-white rounded-lg cursor-pointer text-lg font-bold hover:bg-gray-50 transition-colors duration-200"
              >
                -
              </button>
              <span className="px-5 py-2 border border-gray-300 rounded-lg text-base min-w-[60px] text-center bg-gray-50">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 border border-gray-300 bg-white rounded-lg cursor-pointer text-lg font-bold hover:bg-gray-50 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              className={`flex-1 py-4 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${selectedSize
                  ? 'bg-gray-800 text-bluck cursor-pointer hover:bg-gray-700'
                  : 'bg-gray-400 text-bluck cursor-not-allowed'
                }`}
            >
              <Link to="./CheckoutPage" className="text-white">CheckoutPage</Link>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-lg text-base font-semibold transition-all duration-300 ${selectedSize
                  ? 'bg-red-500 text-bluck cursor-pointer hover:bg-red-600'
                  : 'bg-red-300 text-white cursor-not-allowed'
                }`}
            >
              Add to cart
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

            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
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

// Additional component for product details tabs
const ProductDetailsSection = () => {
  const [activeTab, setActiveTab] = useState('details');

  const customerReviews = [
    {
      name: "Zaheer Khan Burki",
      time: "a month ago",
      rating: 5,
      review: "I'm thrilled to receive my Peshawar Chappals parcel today! The product exceeds my expectations with its exceptional quality. Highly recommended!"
    },
    {
      name: "Bahawal Sher",
      time: "2 months ago",
      rating: 5,
      review: "Article is very soft and clean. Price is very reasonable. Highly recommend."
    },
    {
      name: "Faisal Siddiqui",
      time: "3 months ago",
      rating: 5,
      review: "I ordered from uk with hesitation what will be the quality is price too high i am so pleased with excellent quality and service packing was excellent every detail was there i am highly impressed and recommend without any hesitation"
    },
    {
      name: "Muhammad Mushtaq",
      time: "4 months ago",
      rating: 5,
      review: "Good Quality, economical prices"
    },
    {
      name: "Yameen Khan",
      time: "4 months ago",
      rating: 5,
      review: "Sir mashallah very beautiful thing, this picture is very beautiful real ma mashallah my experience is very good, I am with you also inshallah on your website, I am very thankful to you for ordering it."
    },
    {
      name: "Researchbuzz",
      time: "4 months ago",
      rating: 5,
      review: "I am fond of Peshawri Chappals for years, I have tried many brands and many designs but i have never seen such an amazing Chappals in my life. It is pure stunning art. normally when brands become popular they increase their profit, I reccommend Peshawri Chappals not to do so. Currently their Prices are low compare to their art and quality . Eid ul Fitar 2025...."
    }
  ];

  const relatedProducts = [
    {
      id: '1',
      name: "Black Charsadda Gol T Chappal – 092242",
      price: 5999,
      originalPrice: 7999,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
      badge: null,
      rating: 5
    },
    {
      id: '2',
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: '3',
      name: "Black Smart Zalmi Chappal – 09275",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: '4',
      name: "Brown Smart Zalmi Chappal – 09276",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: '5',
      name: "Iconic Black Kaptaan Chappal – 092271",
      price: 6999,
      originalPrice: 10790,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: '6',
      name: "Handmade Black Norozi Chappal With Leather Sole – 092306",
      price: 11618,
      originalPrice: 15770,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '7',
      name: "Suede Traditional Brown Chappal – 09288",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '8',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '9',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 7999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 4
    },
    {
      id: '10',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 5999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '11',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '12',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '13',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: '14',
      name: "Suede Traditional Camel Chappal – 09290",
      price: 6999,
      originalPrice: 17430,
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    }
  ];


  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 20px' }}>
      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #f0f0f0',
        marginBottom: '30px'
      }}>
        {[
          { key: 'details', label: 'Product Details' },
          { key: 'shipping', label: 'Shipping & Exchanges' },
          { key: 'questions', label: 'Questions' },
          { key: 'reviews', label: 'Customer Reviews' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '15px 25px',
              border: 'none',
              background: 'none',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: "0px",
              cursor: 'pointer',
              color: activeTab === tab.key ? '#FF6B6B' : '#666',
              borderBottom: activeTab === tab.key ? '3px solid #FF6B6B' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '300px' }}>
        {/* Product Details Tab */}
        {activeTab === 'details' && (
          <div style={{ lineHeight: '1.6', color: '#555' }}>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
              Feel the transformation of the old era with a modernistic touch with our Midnight Black Printed Leather Quetta Norozi Chappal. The textured leather goes hand in hand with the intricate designing and simple shape of this sturdy yet comfortable chappal made with the best materials available.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
              Features:
            </h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Textured leather top</li>
              <li style={{ marginBottom: '8px' }}>Original Tyre Sole for durability and strength</li>
              <li style={{ marginBottom: '8px' }}>Adjustable Strap</li>
              <li style={{ marginBottom: '8px' }}>Metal buckle for good looks and better grip</li>
            </ul>

            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <p style={{ margin: '0', fontSize: '14px' }}>
                <strong>Order now on our website or Call/WhatsApp us at:</strong>{' '}
                <span style={{ color: '#25D366', fontWeight: 'bold' }}>+92333 574 2086</span>
              </p>
            </div>
          </div>
        )}

        {/* Shipping & Exchanges Tab */}
        {activeTab === 'shipping' && (
          <div style={{ lineHeight: '1.6', color: '#555' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                <span style={{ display: "flex", alignItems: "center" }}> <Truck style={{ marginRight: "1rem" }} /> Shipping</span>
              </h3>
              <p style={{ marginBottom: '10px' }}>
                <strong>Expected Delivery Time:</strong> 3-5 business days. Please note that delivery times may vary depending on your location.
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                For full shipping terms, please see our shipping policy.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ChartCandlestick style={{ marginRight: "1rem" }} /> Hassle-Free Exchanges
                </span>
              </h3>
              <p>
                Enjoy a seamless return and exchange process with Peshawari Chappals Pakistan - your satisfaction is our priority, making hassle-free returns and exchanges a breeze!
              </p>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>❓</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
              Question & Answer
            </h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>0 Questions</p>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '30px' }}>
              There are no questions found.
            </p>

            <button style={{
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Ask a Question
            </button>
          </div>
        )}

        {/* Customer Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            {/* Reviews Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#333' }}>
                  What Our Customers Say
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF6B6B' }}>4.6</span>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        style={{
                          color: i < 4 ? '#FFD700' : '#ddd',
                          fill: i < 4 ? '#FFD700' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: '#666', fontSize: '14px' }}>Based on 311 reviews</span>
                </div>
                <p style={{ fontSize: '12px', color: '#999', margin: '5px 0 0 0' }}>powered by Google</p>
              </div>
            </div>

            {/* Reviews List */}
            <div style={{ display: 'grid', gap: '20px' }}>
              {customerReviews.map((review, index) => (
                <div key={index} style={{
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0', color: '#333' }}>
                        {review.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>{review.time}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          style={{
                            color: i < review.rating ? '#FFD700' : '#ddd',
                            fill: i < review.rating ? '#FFD700' : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.5', margin: '0' }}>
                    {review.review}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button style={{
                background: 'none',
                border: '2px solid #FF6B6B',
                color: '#FF6B6B',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                More reviews
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid #f0f0f0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#333', textAlign: 'center' }}>
          Related Products
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {relatedProducts.map((product) => (
            <div key={product.id} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'white',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <button style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Heart size={16} style={{ color: '#666' }} />
                </button>
              </div>

              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0', color: '#333' }}>
                  {product.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        style={{
                          color: i < Math.floor(product.rating) ? '#FFD700' : '#ddd',
                          fill: i < Math.floor(product.rating) ? '#FFD700' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', color: '#666' }}>({product.rating})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontSize: '12px'
                  }}>
                    PKR{product.originalPrice.toLocaleString()}
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#FF6B6B'
                  }}>
                    PKR{product.price.toLocaleString()}
                  </span>
                </div>

                <button style={{
                  width: '100%',
                  padding: '8px',
                  background: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Product Component that includes both product info and details
const MainProductPage = () => {
  return (
    <div>
      <ProductInfo />
      <ProductDetailsSection />
    </div>
  );
};

export default MainProductPage;