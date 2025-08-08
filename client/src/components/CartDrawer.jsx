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
    dispatch(updateQuantity({
      id: item.id,
      selectedOptions: item.selectedOptions,
      quantity: newQuantity
    }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      id: item.id,
      selectedOptions: item.selectedOptions
    }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="cart-overlay" 
          onClick={() => dispatch(closeCart())}
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
            onClick={() => dispatch(closeCart())}
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
                        ${item.price.toFixed(2)}
                      </div>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="cart-item-total">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total: <strong>${totalAmount.toFixed(2)}</strong></span>
                  </div>
                  
                  <div className="cart-actions">
                    <button 
                      className="btn btn-secondary cart-clear-btn"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                    <Link to ='./CheckoutPage'>
                    <button className="btn btn-primary cart-checkout-btn">
                      Checkout
                    </button></Link>
                  
                     
                    
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