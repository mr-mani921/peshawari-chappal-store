import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { closeCart, updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import './CartDrawer.css';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, isOpen } = useSelector(state => state.cart);

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    
    dispatch(updateQuantity({
      id: item.id,
      selectedOptions: item.selectedOptions,
      quantity: newQuantity
    }));
  };

  const handleRemoveItem = (item) => {
    // Show confirmation before deleting
    if (window.confirm(`Are you sure you want to remove "${item.name}" from your cart?`)) {
      dispatch(removeFromCart({
        id: item.id,
        selectedOptions: item.selectedOptions
      }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="cart-overlay" 
          onClick={handleCloseCart}
        />
      )}
      
      {/* Cart Drawer */}
      <div className={`cart-drawer ${isOpen ? 'cart-drawer-open' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} />
            <span>Shopping Cart ({totalQuantity})</span>
          </div>
          <button 
            className="cart-close-btn"
            onClick={handleCloseCart}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="cart-item-options">
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <span key={key} className="cart-option">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="cart-item-price">
                        PKR{item.price.toFixed(2)}
                      </div>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="cart-item-right">
                      <div className="cart-item-total">
                        PKR{item.totalPrice.toFixed(2)}
                      </div>
                      
                      {/* Delete Button - Positioned on the right */}
                      <button
                        className="delete-item-btn"
                        onClick={() => handleRemoveItem(item)}
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove item from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total: <strong>PKR{totalAmount.toFixed(2)}</strong></span>
                  </div>
                  
                  <div className="cart-actions">
                    <button 
                      className="btn btn-secondary cart-clear-btn"
                      onClick={handleClearCart}
                      aria-label="Clear entire cart"
                    >
                      Clear Cart
                    </button>
                    
                    <Link to="/CheckoutPage" className="checkout-link">
                      <button 
                        className="btn btn-primary cart-checkout-btn"
                        onClick={handleCloseCart}
                      >
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;