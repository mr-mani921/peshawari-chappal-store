import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Send, TicketCheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setEmail('');
        alert('Thank you for subscribing!');
      }, 1000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-content">
            
            {/* Company Info & Newsletter */}
            <div className="footer-section">
              <div className="footer-brand">
                <h3 className="footer-brand-title">Kaltoor Chappal</h3>
                <p className="footer-brand-subtitle">Premium Traditional Footwear</p>
              </div>
              
              <p className="footer-description">
                Crafting premium custom chappals with traditional techniques and modern designs. 
                Experience the perfect blend of comfort, style, and authenticity.
              </p>
              
              {/* Newsletter Signup */}
              <div className="newsletter-section">
                <h4 className="newsletter-title">Don't miss a thing</h4>
                <p className="newsletter-text">Get exclusive offers and updates</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <div className="newsletter-input-group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                      required
                    />
                    <button 
                      type="submit" 
                      className={`newsletter-btn ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="spinner"></div>
                      ) : (
                        <Send size={18} />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <div className="footer-links">
                <Link to="/about" className="footer-link">About Us</Link>
                <Link to="/shop" className="footer-link">Shop All Products</Link>
                <Link to="/signature-collection" className="footer-link">Signature Collection</Link>
                <Link to="/sale" className="footer-link">Sale Items</Link>
                <Link to="/contact" className="footer-link">Contact Us</Link>
                <Link to="/size-guide" className="footer-link">Size Guide</Link>
              </div>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h3 className="footer-title">Customer Service</h3>
              <div className="footer-links">
                <Link to="/shipping-info" className="footer-link">Shipping Information</Link>
                <Link to="/returns" className="footer-link">Returns & Exchanges</Link>
                <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
                <Link to="/faq" className="footer-link">FAQ</Link>
                <Link to="/track-order" className="footer-link">Track Your Order</Link>
              </div>
            </div>

            {/* Contact & Social */}
            <div className="footer-section">
              <h3 className="footer-title">Get in Touch</h3>
              
              {/* Contact Info */}
              <div className="contact-info">
                <div className="contact-item">
                  <MapPin className="contact-icon" size={18} />
                  <div>
                    <p className="contact-label">Visit Our Store</p>
                    <p className="contact-text">Qissa Khwani Bazaar, Peshawar</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Phone className="contact-icon" size={18} />
                  <div>
                    <p className="contact-label">Call Us</p>
                    <a href="tel:+923335742086" className="contact-link">+92 333 574 2086</a>
                    <a href="tel:+923055102308" className="contact-link">+92 305 510 2308</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Mail className="contact-icon" size={18} />
                  <div>
                    <p className="contact-label">Email Us</p>
                    <a href="mailto:info@kaltoorch appal.com" className="contact-link">info@kaltoorch appal.com</a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4 className="social-title">Follow Us</h4>
               <div style={{color:"white"}} className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
                <a 
                  href="https://www.facebook.com/PeshawariChappalsPK" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Facebook color='white' size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/peshawarichappalspk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram color='white' size={20} />
                </a>
                <a 
                  href="https://www.youtube.com/c/PeshawariChappalPakistan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Youtube color='white' size={20} />
                </a>
              </div>

              </div>

              {/* Google Reviews */}
              <div className="google-reviews">
                <div className="review-header">
                  <img 
                    src="https://lh3.googleusercontent.com/places/AKR5kUjuAEahjx3TpSwMXYO3NCeYC1Y5z50RkYESzlj02zoOMTpO7wDPzQzae-eciZ4KkQV5Op7B5MnZX-mrdkSYqykCelkjCGOhozo=s1600-w300-h300" 
                    alt="Kaltoor Chappal Store" 
                    className="review-logo"
                    loading="lazy"
                  />
                  <div className="review-info">
                    <h4>Kaltoor Chappal</h4>
                    <div className="rating">
                      <div className="stars">★★★★★</div>
                      <span className="rating-text">4.6</span>
                    </div>
                    <p className="review-count">Based on 309+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Kaltoor Chappal. All rights reserved.</p>
            <p className="footer-credit">Designed & Developed by <span className="credit-highlight">The Blue's</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;