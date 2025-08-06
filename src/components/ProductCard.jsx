  import React from 'react';
  import { useDispatch } from 'react-redux';
  import { Heart, Eye, ShoppingCart } from 'lucide-react';
  import { addToCart, openCart } from '../store/slices/cartSlice';
  import { toggleWishlistItem } from '../store/slices/wishlistSlice';
  import { Link } from 'react-router-dom';
  import './ProductCard.css';

  const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { id, name, price, originalPrice, image, hoverImage, badge, rating = 5 } = product;

    const handleAddToCart = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const cartItem = {
        id,
        name,
        price: parseFloat(price),
        image,
        quantity: 1,
        selectedOptions: {
          size: '8', // Default size
          color: 'Default',
        },
      };

      dispatch(addToCart(cartItem));
      dispatch(openCart());
    };
    return (
      <div className="product-card">
        {badge && (
          <div className="product-badge">
            <span>{badge}</span>
          </div>
        )}
        {/* ={`./ProductPage/${product.id}`} */}

        <div   className="product-image-container">
          <Link to='./productInfo'>

            <img src={image} alt={name} className="product-image main-image" style={{
              width: "100%",
              height: " 238px",
              borderRadius: "8px",
              overflow: "hidden",
              border: " 1px solid #e5e7eb"
            }} />
            {hoverImage && (
              <img style={{
                width: "100%",
                height: " 238px",
                borderRadius: "8px",
                overflow: "hidden",
                border: " 1px solid #e5e7eb"
              }} src={hoverImage} alt={name} className="product-image hover-image" />

            )}
          </Link>

          <div className="product-actions">
            <button className="action-btn" aria-label="Add to wishlist">
              <Heart size={16} onClick={handleAddToWishlist} />
            </button>
            <button className="action-btn" aria-label="Quick view">
              <Eye size={16} />
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={26} />
            <span>Add to Cart</span>
          </button>
        </div>

        <div className="product-info">
          <h3 className="product-title">{name}</h3>
          <div className="product-price">
            {originalPrice && (
              <span className="original-price">PKR {originalPrice}</span>
            )}
            <span className="current-price">PKR {price}</span>
          </div>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleWishlistItem({
      id,
      name,
      price,
      image,
      rating,
    }));
  };
  export default ProductCard;