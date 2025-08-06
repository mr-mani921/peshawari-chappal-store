import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, Share2, MessageCircle, HelpCircle, ShoppingCart, Zap, Palette, Settings } from 'lucide-react';
import { addToCart, openCart } from '../store/slices/cartSlice';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';

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
    { name: 'classic', label: 'Classic Peshawari', price: 0 },
    { name: 'modern', label: 'Modern Slim', price: 500 },
    { name: 'embroidered', label: 'Hand Embroidered', price: 1200 },
    { name: 'beaded', label: 'Beaded Design', price: 800 }
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

  // Product images
  const images = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop'
  ];

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
          text: `Check out this amazing chappal for ₹${unitPrice.toLocaleString()}!`,
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
      {/* Left Side - Product Images */}
      <div style={{ flex: '1', maxWidth: '500px' }}>
        {/* Main Image */}
        <div style={{ 
          marginBottom: '20px',
          border: '2px solid #f0f0f0',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img
            src={images[selectedImage]}
            alt="Product Main"
            style={{ 
              width: '100%', 
              height: '400px', 
              objectFit: 'cover',
              filter: selectedColor === 'black' ? 'brightness(0.7) sepia(1) hue-rotate(200deg)' :
                     selectedColor === 'brown' ? 'sepia(0.8) hue-rotate(20deg)' :
                     selectedColor === 'maroon' ? 'sepia(1) hue-rotate(320deg) saturate(1.5)' :
                     selectedColor === 'tan' ? 'sepia(0.5) brightness(1.1)' : 'none'
            }}
          />
          {customizationPrice !== 0 && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#FF6B6B',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              +₹{customizationPrice}
            </div>
          )}
          
          {/* Wishlist Heart */}
          <button
            onClick={handleWishlistToggle}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
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
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'cover',
                border: selectedImage === index ? '3px solid #FF6B6B' : '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
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
      <div style={{ flex: '1', maxWidth: '600px' }}>
        {/* Sale Badge */}
        <div style={{ 
          display: 'inline-block',
          background: '#FF6B6B',
          color: 'white',
          padding: '5px 15px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          SALE
        </div>

        {/* Product Title & Rating */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            margin: '0 0 10px 0',
            color: '#333'
          }}>
            {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Smart Zalmi Chappal — {productId}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex' }}>
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
            <span style={{ color: '#666', fontSize: '14px' }}>({reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price Info */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
            <span style={{ 
              textDecoration: 'line-through', 
              color: '#999',
              fontSize: '18px'
            }}>
              ₹{(10500 * quantity).toLocaleString()}.00
            </span>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#FF6B6B'
            }}>
              ₹{totalPrice.toLocaleString()}.00
            </span>
          </div>
          
          {/* Unit price display */}
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            Unit price: ₹{unitPrice.toLocaleString()}.00 each
          </div>
          
          {customizationPrice > 0 && (
            <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
              Includes ₹{customizationPrice} customization fee per item
            </p>
          )}
          
          {quantity > 1 && (
            <div style={{ 
              backgroundColor: '#e8f5e8', 
              color: '#2d5f2d', 
              padding: '8px 12px', 
              borderRadius: '6px', 
              fontSize: '14px',
              fontWeight: '500',
              marginTop: '8px',
              border: '1px solid #c3d9c3'
            }}>
              Total for {quantity} items: ₹{totalPrice.toLocaleString()}.00
            </div>
          )}
        </div>

        {/* Customization Toggle */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isCustomizing ? '#FF6B6B' : '#f8f8f8',
              color: isCustomizing ? 'white' : '#333',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <Palette size={16} />
            {isCustomizing ? 'Hide Customization' : 'Customize Product'}
          </button>
        </div>

        {/* Customization Options */}
        {isCustomizing && (
          <div style={{ 
            background: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '15px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Settings size={18} />
              Customize Your Chappal
            </h3>

            {/* Color Selection */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>
                Color:
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {colorOptions.map((color) => (
                  <div
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      border: selectedColor === color.name ? '2px solid #FF6B6B' : '1px solid #ddd',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      background: selectedColor === color.name ? '#fff5f5' : 'white',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: '1px solid #ccc'
                    }}></div>
                    <span>{color.label}</span>
                    {color.price > 0 && <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>+₹{color.price}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>
                Style:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {styleOptions.map((style) => (
                  <div
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    style={{
                      padding: '12px',
                      border: selectedStyle === style.name ? '2px solid #FF6B6B' : '1px solid #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedStyle === style.name ? '#fff5f5' : 'white',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{style.label}</div>
                    {style.price > 0 && (
                      <div style={{ color: '#FF6B6B', fontWeight: 'bold' }}>+₹{style.price}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>
                Material:
              </h4>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                {materialOptions.map((material) => (
                  <option key={material.name} value={material.name}>
                    {material.label} {material.price !== 0 && `(${material.price > 0 ? '+' : ''}₹${material.price})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sole Selection */}
            <div style={{ marginBottom: '10px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>
                Sole Type:
              </h4>
              <select
                value={selectedSole}
                onChange={(e) => setSelectedSole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                {soleOptions.map((sole) => (
                  <option key={sole.name} value={sole.name}>
                    {sole.label} {sole.price > 0 && `(+₹${sole.price})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Size Chart Link */}
        <div style={{ marginBottom: '20px' }}>
          <button style={{
            background: 'none',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#666'
          }}>
            📏 Size Chart
          </button>
        </div>

        {/* Size Selector */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
            Size: <span style={{ color: '#FF6B6B' }}>*</span>
          </h3>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: selectedSize ? '1px solid #ddd' : '2px solid #FF6B6B',
              borderRadius: '6px',
              fontSize: '16px',
              background: 'white'
            }}
          >
            <option value="">Choose an option</option>
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {!selectedSize && (
            <p style={{ color: '#FF6B6B', fontSize: '12px', margin: '5px 0 0 0' }}>
              Please select a size
            </p>
          )}
        </div>

        {/* Quantity Selector */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
            Quantity
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={decrementQuantity}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              -
            </button>
            <span style={{ 
              padding: '10px 20px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <button 
            onClick={handleAddToCart}
            disabled={!selectedSize}
            style={{
              flex: '1',
              padding: '15px',
              background: selectedSize ? '#333' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: selectedSize ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <ShoppingCart size={18} />
            Add to cart
          </button>

          <button 
            onClick={handleBuyNow}
            disabled={!selectedSize}
            style={{
              flex: '1',
              padding: '15px',
              background: selectedSize ? '#FF6B6B' : '#ffb3b3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: selectedSize ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease'
            }}
          >
            Buy Now
          </button>
        </div>

        {/* Secondary Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          marginBottom: '20px',
          padding: '15px',
          background: '#f8f8f8',
          borderRadius: '8px'
        }}>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            <span style={{ fontSize: '18px' }}>🔄</span>
            <span>Compare</span>
          </button>

          <button style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            <HelpCircle size={18} />
            <span>Ask a Question</span>
          </button>

          <button 
            onClick={handleShare}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {/* WhatsApp Order */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '15px',
          background: '#25D366',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          <span style={{ fontSize: '20px' }}>📱</span>
          <span>Order Via WhatsApp</span>
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
      id: '001',
      name: 'Classic Brown Zalmi Chappal',
      price: 5500,
      originalPrice: 7500,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: '002',
      name: 'Traditional Leather Sandal',
      price: 4800,
      originalPrice: 6500,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop',
      rating: 4.5
    },
    {
      id: '003',
      name: 'Embroidered Quetta Chappal',
      price: 7200,
      originalPrice: 9500,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: '004',
      name: 'Modern Slim Fit Chappal',
      price: 6800,
      originalPrice: 8500,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      rating: 4.6
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
                📦 Shipping
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
                🔄 Hassle-Free Exchanges
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
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#FF6B6B'
                  }}>
                    ₹{product.price.toLocaleString()}
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