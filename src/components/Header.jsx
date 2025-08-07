import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { Menu, X, Search, Star, ShoppingCart, User, ChevronDown, Phone, Mail } from 'lucide-react';
import { updateQuantity } from '../store/slices/cartSlice';
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isMobile, setIsMobile] = useState(false);

  // Redux state management
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, isOpen } = useSelector(state => state.cart);
  const wishlistItems = useSelector(state => state.wishlist?.items || []);
  const totalWishlistItems = wishlistItems.length;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  const handleUpdateQuantity = (item, newQuantity) => {
    dispatch(updateQuantity({
      id: item.id,
      selectedOptions: item.selectedOptions,
      quantity: newQuantity
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsShopDropdownOpen(false);
  };

  const isActive = (path) => {
    return activeLink === path;
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    closeMenu();
  };

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  return (
    <div>
      {/* Mobile Overlay */}
      {isMenuOpen && isMobile && (
        <div className="mobile-overlay active" onClick={closeMenu}></div>
      )}
      
      {/* Top Bar - Hidden on mobile */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <Phone size={14} />
              <span>+92 300 1234567</span>
            </div>
            <div className="top-bar-item">
              <Mail size={14} />
              <span>info@kaltoorch appal.com</span>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-item">
              <span>Free Shipping on Orders Over Rs. 2000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link" onClick={() => handleLinkClick('/')}>
              <span className="logo-text-main">Kaltoor</span> 
              <span className="logo-text-accent">Chappal</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/')}
                >
                  Home
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/about')}
                >
                  About
                </Link>
              </li>
              
              <li className="nav-item dropdown">
                <div className="dropdown-wrapper">
                  
                  
                  <button
                    className="dropdown-toggle mobile-only"
                    onClick={toggleShopDropdown}
                    aria-expanded={isShopDropdownOpen}
                  >
                    Shop
                    <ChevronDown
                      size={16}
                      className={`dropdown-icon ${isShopDropdownOpen ? 'rotated' : ''}`}
                    />
                  </button>
                </div>
                
                <ul className={`dropdown-menu ${isShopDropdownOpen ? 'show' : ''}`}>
                  <li>
                    <Link 
                      to="/peshawari-chappal" 
                      className="dropdown-link"
                      onClick={() => handleLinkClick('/peshawari-chappal')}
                    >
                      Peshawari Chappal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/charsadda-chappal" 
                      className="dropdown-link"
                      onClick={() => handleLinkClick('/charsadda-chappal')}
                    >
                      Charsadda Chappal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/quetta-chappal" 
                      className="dropdown-link"
                      onClick={() => handleLinkClick('/quetta-chappal')}
                    >
                      Quetta Chappal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/norozi-chappal" 
                      className="dropdown-link"
                      onClick={() => handleLinkClick('/norozi-chappal')}
                    >
                      Norozi Chappal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/kaptaan-chappal" 
                      className="dropdown-link"
                      onClick={() => handleLinkClick('/kaptaan-chappal')}
                    >
                      Kaptaan Chappal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/zalmi-chappal" 
                      className="dropdown-link"
                      onClick={() => handleLinkClick('/zalmi-chappal')}
                    >
                      Zalmi Chappal
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <Link
                  to="/signature-collection"
                  className={`nav-link ${isActive('/signature-collection') ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/signature-collection')}
                >
                  Signature Collection
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  to="/sale"
                  className={`nav-link ${isActive('/sale') ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/sale')}
                >
                  Sale
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  to="/contact"
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/contact')}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Header Icons */}
          <div className="header-icons">
            {!isMobile && (
              <>
                <Link to="/admin/dashboard">
                  <button className="header-icon" aria-label="Account">
                    <User size={24} />
                  </button>
                </Link>
                
                <button className="header-icon" aria-label="Search">
                  <Search size={24} />
                </button>
              </>
            )}
            
            <Link to="/wishlist">
              <button className="header-icon" aria-label="Wishlist">
                <Star size={24} />
                {totalWishlistItems > 0 && (
                  <span className="badge">{totalWishlistItems}</span>
                )}
              </button>
            </Link>
            
            <Link to="/cart">
              <button className="header-icon" aria-label="Cart">
                <ShoppingCart size={24} />
                {totalQuantity > 0 && (
                  <span className="badge">{totalQuantity}</span>
                )}
              </button>
            </Link>

            {/* Mobile-only icons */}
            {isMobile && (
              <>
                <button className="header-icon mobile-search" aria-label="Search">
                  <Search size={20} />
                </button>
                
                <Link to="/admin/dashboard">
                  <button className="header-icon" aria-label="Account">
                    <User size={20} />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;