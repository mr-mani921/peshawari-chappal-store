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
  const [screenSize, setScreenSize] = useState('desktop');

  // Redux state management
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, isOpen } = useSelector(state => state.cart);
  const wishlistItems = useSelector(state => state.wishlist?.items || []);
  const totalWishlistItems = wishlistItems.length;
  const localStorageUser = JSON.parse(localStorage.getItem('user')) || {};
   
  // Check screen size and set responsive breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 320) {
        setScreenSize('small-phone');
      } else if (width <= 375) {
        setScreenSize('normal-phone');
      } else if (width <= 414) {
        setScreenSize('large-phone');
      } else if (width <= 480) {
        setScreenSize('phablet');
      } else if (width <= 600) {
        setScreenSize('small-tablet');
      } else if (width <= 768) {
        setScreenSize('tablet');
      } else if (width <= 1024) {
        setScreenSize('laptop');
      } else if (width <= 1440) {
        setScreenSize('desktop');
      } else {
        setScreenSize('large-screen');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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
    const isMobileSize = ['small-phone', 'normal-phone', 'large-phone', 'phablet'].includes(screenSize);
    if (isMenuOpen && isMobileSize) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, screenSize]);

  const handleUpdateQuantity = (item, newQuantity) => {
    dispatch(updateQuantity({
      id: item.id,
      selectedOptions: item.selectedOptions,
      quantity: newQuantity
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close dropdown when menu opens/closes
    if (isShopDropdownOpen) {
      setIsShopDropdownOpen(false);
    }
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

  const toggleShopDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isShopDropdownOpen && !event.target.closest('.dropdown')) {
        setIsShopDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isShopDropdownOpen]);

  const isMobileSize = ['small-phone', 'normal-phone', 'large-phone', 'phablet'].includes(screenSize);
  const isTabletSize = ['small-tablet', 'tablet'].includes(screenSize);

  return (
    <div className="w-full">
      {/* Mobile Overlay */}
      {isMenuOpen && isMobileSize && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}
      
      {/* Top Bar - Hidden on mobile and small tablet */}
      {!isMobileSize && !isTabletSize && (
        <div className="bg-gray-800 text-white py-2 px-4 text-sm hidden lg:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>info@kaltoorcchappal.com</span>
              </div>
            </div>
            <div className="flex items-center">
              <span>Free Shipping on Orders Over Rs. 2000</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}>
        <div className={`max-w-7xl mx-auto px-3 ${
          screenSize === 'small-phone' ? 'px-2' : 
          screenSize === 'normal-phone' ? 'px-3' : 
          screenSize === 'large-phone' ? 'px-4' : 
          screenSize === 'phablet' ? 'px-4' :
          screenSize === 'small-tablet' ? 'px-5' :
          screenSize === 'tablet' ? 'px-6' :
          'px-8'
        }`}>
          <div className={`flex items-center justify-between ${
            screenSize === 'small-phone' ? 'h-14' : 
            screenSize === 'normal-phone' ? 'h-16' : 
            screenSize === 'large-phone' ? 'h-16' : 
            screenSize === 'phablet' ? 'h-16' :
            screenSize === 'small-tablet' ? 'h-18' :
            screenSize === 'tablet' ? 'h-20' :
            'h-20'
          }`}>
            
            {/* Mobile Menu Button */}
            {(isMobileSize || isTabletSize) && (
              <button 
                className={`flex items-center justify-center rounded-md transition-colors ${
                  screenSize === 'small-phone' ? 'p-1' : 'p-2'
                } hover:bg-gray-100`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={screenSize === 'small-phone' ? 20 : 24} />
                ) : (
                  <Menu size={screenSize === 'small-phone' ? 20 : 24} />
                )}
              </button>
            )}

            {/* Logo */}
             <div className="logo">
                    <Link to="/" className="logo-link" >
                      <span className="logo-text-main">Kaltoor</span> 
                      <span className="logo-text-accent">Chappal</span>
                    </Link>
                  </div>

            {/* Desktop Navigation */}
            {!isMobileSize && !isTabletSize && (
             <nav className="hidden lg:flex">
  <ul className="flex items-center space-x-8">
    <li>
      <Link 
        style={{
          color: "black", 
          position: "relative", 
          paddingBottom: "4px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "100%";
          }
        }}
        onMouseLeave={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline && !isActive('/')) {
            underline.style.width = "0%";
          }
        }}
        to="/"
        className="font-medium"
        onClick={() => handleLinkClick('/')}
      >
        Home
        <span 
          className="hover-underline"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            backgroundColor: "black",
            width: isActive('/') ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "left"
          }}
        ></span>
      </Link>
    </li>
    
    <li>
      <Link 
        style={{
          color: "black", 
          position: "relative", 
          paddingBottom: "4px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "100%";
          }
        }}
        onMouseLeave={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline && !isActive('/about')) {
            underline.style.width = "0%";
          }
        }}
        to="/about"
        className="font-medium"
        onClick={() => handleLinkClick('/about')}
      >
        About
        <span 
          className="hover-underline"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            backgroundColor: "black",
            width: isActive('/about') ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "left"
          }}
        ></span>
      </Link>
    </li>
    
    <li className="relative dropdown">
      <button
        style={{
          color: "black", 
          position: "relative", 
          paddingBottom: "4px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "100%";
          }
        }}
        onMouseLeave={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "0%";
          }
        }}
        className="flex items-center space-x-1 font-medium"
        onClick={toggleShopDropdown}
        aria-expanded={isShopDropdownOpen}
      >
        <span>Shop</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isShopDropdownOpen ? 'rotate-180' : ''
          }`}
        />
        <span 
          className="hover-underline"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            backgroundColor: "black",
            width: "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "left"
          }}
        ></span>
      </button>
      
      {isShopDropdownOpen && (
        <ul className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <li>
            <Link 
              style={{color:"black"}}  
              to="/peshawari-chappal" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
              onClick={() => handleLinkClick('/peshawari-chappal')}
            >
              Peshawari Chappal
            </Link>
          </li>
          <li>
            <Link 
              style={{color:"black"}}  
              to="/charsadda-chappal" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
              onClick={() => handleLinkClick('/charsadda-chappal')}
            >
              Charsadda Chappal
            </Link>
          </li>
          <li>
            <Link 
              style={{color:"black"}}  
              to="/quetta-chappal" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
              onClick={() => handleLinkClick('/quetta-chappal')}
            >
              Quetta Chappal
            </Link>
          </li>
          <li>
            <Link 
              style={{color:"black"}}  
              to="/norozi-chappal" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
              onClick={() => handleLinkClick('/norozi-chappal')}
            >
              Norozi Chappal
            </Link>
          </li>
          <li>
            <Link 
              style={{color:"black"}}  
              to="/kaptaan-chappal" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
              onClick={() => handleLinkClick('/kaptaan-chappal')}
            >
              Kaptaan Chappal
            </Link>
          </li>
          <li>
            <Link 
              style={{color:"black"}}  
              to="/zalmi-chappal" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
              onClick={() => handleLinkClick('/zalmi-chappal')}
            >
              Zalmi Chappal
            </Link>
          </li>
        </ul>
      )}
    </li>
    
    <li>
      <Link 
        style={{
          color: "black", 
          position: "relative", 
          paddingBottom: "4px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "100%";
          }
        }}
        onMouseLeave={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline && !isActive('/signature-collection')) {
            underline.style.width = "0%";
          }
        }}
        to="/signature-collection"
        className="font-medium"
        onClick={() => handleLinkClick('/signature-collection')}
      >
        Collection
        <span 
          className="hover-underline"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            backgroundColor: "black",
            width: isActive('/signature-collection') ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "left"
          }}
        ></span>
      </Link>
    </li>
    
    <li>
      <Link 
        style={{
          color: "black", 
          position: "relative", 
          paddingBottom: "4px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "100%";
          }
        }}
        onMouseLeave={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline && !isActive('/sale')) {
            underline.style.width = "0%";
          }
        }}
        to="/sale"
        className="font-medium"
        onClick={() => handleLinkClick('/sale')}
      >
        Sale
        <span 
          className="hover-underline"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            backgroundColor: "black",
            width: isActive('/sale') ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "left"
          }}
        ></span>
      </Link>
    </li>
    
    <li>
      <Link 
        style={{
          color: "black", 
          position: "relative", 
          paddingBottom: "4px",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline) {
            underline.style.width = "100%";
          }
        }}
        onMouseLeave={(e) => {
          const underline = e.target.querySelector('.hover-underline');
          if (underline && !isActive('/contact')) {
            underline.style.width = "0%";
          }
        }}
        to="/contact"
        className="font-medium"
        onClick={() => handleLinkClick('/contact')}
      >
        Contact
        <span 
          className="hover-underline"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            backgroundColor: "black",
            width: isActive('/contact') ? "100%" : "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "left"
          }}
        ></span>
      </Link>
    </li>

    {localStorageUser?.role === 'admin' && (
      <li>
        <Link 
          style={{
            color: "black", 
            position: "relative", 
            paddingBottom: "4px",
            overflow: "hidden"
          }}
          onMouseEnter={(e) => {
            const underline = e.target.querySelector('.hover-underline');
            if (underline) {
              underline.style.width = "100%";
            }
          }}
          onMouseLeave={(e) => {
            const underline = e.target.querySelector('.hover-underline');
            if (underline) {
              underline.style.width = "0%";
            }
          }}
          to="/admin/dashboard"
          className="font-medium"
          onClick={() => handleLinkClick('/admin/dashboard')}
        >
          Admin
          <span 
            className="hover-underline"
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              height: "2px",
              backgroundColor: "black",
              width: "0%",
              transition: "width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transformOrigin: "left"
            }}
          ></span>
        </Link>
      </li>
    )}
  </ul>
</nav>
            )}

            {/* Mobile/Tablet Navigation */}
            {(isMobileSize || isTabletSize) && (
              <nav className={`fixed top-0 left-0 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } ${
                screenSize === 'small-phone' ? 'w-64' : 
                screenSize === 'normal-phone' ? 'w-72' : 
                screenSize === 'large-phone' ? 'w-80' : 
                screenSize === 'phablet' ? 'w-80' :
                screenSize === 'small-tablet' ? 'w-96' :
                'w-96'
              }`}>
                
                {/* Mobile Header */}
                <div className={`flex items-center justify-between border-b border-gray-200 ${
                  screenSize === 'small-phone' ? 'p-3' : 'p-4'
                }`}>
                  <Link style={{color:"black"}}  
                    to="/" 
                    className="flex flex-col items-start text-decoration-none"
                    onClick={() => handleLinkClick('/')}
                  >
                    <span className={`font-bold text-orange-600 ${
                      screenSize === 'small-phone' ? 'text-lg' : 'text-xl'
                    }`}>
                      Kaltoor
                    </span>
                    <span className={`font-medium text-amber-700 italic ${
                      screenSize === 'small-phone' ? 'text-sm -mt-1' : 'text-base -mt-1'
                    }`}>
                      Chappal
                    </span>
                  </Link>
                  
                  <button 
                    onClick={closeMenu}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={screenSize === 'small-phone' ? 20 : 24} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className={`${screenSize === 'small-phone' ? 'px-3 py-4' : 'px-4 py-6'} overflow-y-auto max-h-full`}>
                  <ul className="space-y-2">
                    <li>
                      <Link style={{color:"black"}} 
                        to="/"
                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                          isActive('/') 
                            ? 'bg-orange-50 text-orange-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleLinkClick('/')}
                      >
                        Home
                      </Link>
                    </li>
                    
                    <li>
                      <Link style={{color:"black"}} 
                        to="/about"
                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                          isActive('/about') 
                            ? 'bg-orange-50 text-orange-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleLinkClick('/about')}
                      >
                        About
                      </Link>
                    </li>
                    
                    <li>
                      <button
                        className="w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={toggleShopDropdown}
                        aria-expanded={isShopDropdownOpen}
                      >
                        <span>Shop</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isShopDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {isShopDropdownOpen && (
                        <ul className="mt-2 ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                          <li>
                            <Link style={{color:"black"}}  
                              to="/peshawari-chappal" 
                              className="block py-2 px-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleLinkClick('/peshawari-chappal')}
                            >
                              Peshawari Chappal
                            </Link>
                          </li>
                          <li>
                            <Link style={{color:"black"}}  
                              to="/charsadda-chappal" 
                              className="block py-2 px-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleLinkClick('/charsadda-chappal')}
                            >
                              Charsadda Chappal
                            </Link>
                          </li>
                          <li>
                            <Link style={{color:"black"}}  
                              to="/quetta-chappal" 
                              className="block py-2 px-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleLinkClick('/quetta-chappal')}
                            >
                              Quetta Chappal
                            </Link>
                          </li>
                          <li>
                            <Link style={{color:"black"}}  
                              to="/norozi-chappal" 
                              className="block py-2 px-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleLinkClick('/norozi-chappal')}
                            >
                              Norozi Chappal
                            </Link>
                          </li>
                          <li>
                            <Link style={{color:"black"}}  
                              to="/kaptaan-chappal" 
                              className="block py-2 px-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleLinkClick('/kaptaan-chappal')}
                            >
                              Kaptaan Chappal
                            </Link>
                          </li>
                          <li>
                            <Link style={{color:"black"}}  
                              to="/zalmi-chappal" 
                              className="block py-2 px-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleLinkClick('/zalmi-chappal')}
                            >
                              Zalmi Chappal
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    
                    <li>
                      <Link style={{color:"black"}} 
                        to="/signature-collection"
                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                          isActive('/signature-collection') 
                            ? 'bg-orange-50 text-orange-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleLinkClick('/signature-collection')}
                      >
                        Collection
                      </Link>
                    </li>
                    
                    <li>
                      <Link style={{color:"black"}} 
                        to="/sale"
                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                          isActive('/sale') 
                            ? 'bg-orange-50 text-orange-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleLinkClick('/sale')}
                      >
                        Sale
                      </Link>
                    </li>
                    
                    <li>
                      <Link style={{color:"black"}} 
                        to="/contact"
                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                          isActive('/contact') 
                            ? 'bg-orange-50 text-orange-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleLinkClick('/contact')}
                      >
                        Contact
                      </Link>
                    </li>

                    {localStorageUser?.role === 'admin' && (
                      <li>
                        <Link style={{color:"black"}} 
                          to="/admin/dashboard"
                          className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => handleLinkClick('/admin/dashboard')}
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )}

                    {/* Mobile-only additional links */}
                    <li className="pt-4 border-t border-gray-200">
                      <Link style={{color:"black"}} 
                        to="/login"
                        className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => handleLinkClick('/login')}
                      >
                        Login / Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            )}

            {/* Header Icons */}
            <div className={`flex items-center ${
              screenSize === 'small-phone' ? 'space-x-1' : 
              screenSize === 'normal-phone' ? 'space-x-2' : 
              screenSize === 'large-phone' ? 'space-x-2' : 
              screenSize === 'phablet' ? 'space-x-3' :
              screenSize === 'small-tablet' ? 'space-x-3' :
              screenSize === 'tablet' ? 'space-x-4' :
              'space-x-4'
            }`}>
              
              {/* Desktop-only icons */}
              {!isMobileSize && !isTabletSize && (
                <>
                  <Link style={{color:"black"}}  to="/login">
                    <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors" aria-label="Account">
                      <User size={24} />
                    </button>
                  </Link>
                  
                  <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors" aria-label="Search">
                    <Search size={24} />
                  </button>
                </>
              )}
              
              <Link style={{color:"black"}}  to="/wishlist">
                <button className={`relative p-2 text-gray-700 hover:text-orange-600 transition-colors`} aria-label="Wishlist">
                  <Star size={screenSize === 'small-phone' ? 20 : 24} />
                  {totalWishlistItems > 0 && (
                    <span className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full ${
                      screenSize === 'small-phone' ? 'text-xs px-1.5 py-0.5 min-w-[18px] h-[18px]' : 
                      'text-xs px-2 py-1 min-w-[20px] h-[20px]'
                    } flex items-center justify-center`}>
                      {totalWishlistItems}
                    </span>
                  )}
                </button>
              </Link>
              
              <Link style={{color:"black"}}  to="/cart">
                <button className={`relative p-2 text-gray-700 hover:text-orange-600 transition-colors`} aria-label="Cart">
                  <ShoppingCart size={screenSize === 'small-phone' ? 20 : 24} />
                  {totalQuantity > 0 && (
                    <span className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full ${
                      screenSize === 'small-phone' ? 'text-xs px-1.5 py-0.5 min-w-[18px] h-[18px]' : 
                      'text-xs px-2 py-1 min-w-[20px] h-[20px]'
                    } flex items-center justify-center`}>
                      {totalQuantity}
                    </span>
                  )}
                </button>
              </Link>

              {/* Mobile/Tablet-only icons */}
              {(isMobileSize || isTabletSize) && (
                <>
                  <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors" aria-label="Search">
                    <Search size={screenSize === 'small-phone' ? 18 : 20} />
                  </button>
                  
                  <Link style={{color:"black"}}  to="/login">
                    <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors" aria-label="Account">
                      <User size={screenSize === 'small-phone' ? 18 : 20} />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;