import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import './Wishlist.css';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Handmade Black Norozi Chappal With Leather Sole - 092306",
      image:  "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
      originalPrice: 9500.00,
      currentPrice: 6999.00,
      dateAdded: "July 10, 2025",
      productId: "092306"
    },
    {
      id: 2,
      name: "Black Peshawari Chappal With Triple Gear — 092115",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      originalPrice: 5500.00,
      currentPrice: 4500.00,
      dateAdded: "July 9, 2025",
      productId: "092115"
    },
    {
      id: 3,
      name: "Handmade Black Kaptaan Chappal - 092171",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      originalPrice: 6500.00,
      currentPrice: 5500.00,
      dateAdded: "July 9, 2025",
      productId: "092171"
    },
    {
      id: 4,
      name: "Mustard Smart Zalmi Chappal — 09274",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      originalPrice: 10500.00,
      currentPrice: 6500.00,
      dateAdded: "July 8, 2025",
      productId: "09274"
    },
    {
      id: 5,
      name: "Black Charsadda Gol T Chappal - 092242",
      image:  "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
      originalPrice: 6000.00,
      currentPrice: 4999.00,
      dateAdded: "July 6, 2025",
      productId: "092242"
    }
  ]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSelectOptions = (item) => {
    console.log('Select options for:', item.name);
    // Handle navigation to product page or size selection
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="wishlist-title">Wishlist</h1>
        <div className="wishlist-count">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <Heart size={48} className="empty-heart" />
          <h2>Your wishlist is empty</h2>
          <p>Save items you love to buy them later</p>
          <Link to ='/'>
          <button className="continue-shopping-btn">
            Continue Shopping
          </button>
          </Link>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <button 
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
                title="Remove from wishlist"
              >
                <X size={16} />
              </button>

              <div className="item-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  loading="lazy"
                />
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                
                <div className="price-container">
                  <span className="original-price">
                    {formatPrice(item.originalPrice)}
                  </span>
                  <span className="current-price">
                    {formatPrice(item.currentPrice)}
                  </span>
                </div>

                <div className="item-meta">
                  <span className="date-added">{item.dateAdded}</span>
                </div>
              </div>

              <div className="item-actions">
                <button 
                  className="select-options-btn"
                  onClick={() => handleSelectOptions(item)}
                >
                  Select options
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="wishlist-actions">
          <button className="clear-wishlist-btn">
            Clear Wishlist
          </button>
          <button className="share-wishlist-btn">
            Share Wishlist
          </button>
        </div>
      )}

      {/* WhatsApp Chat Button */}
      <div className="whatsapp-chat">
        <span className="whatsapp-icon">💬</span>
        <span>Hi, Chat with us</span>
      </div>
    </div>
  );
};

export default Wishlist;