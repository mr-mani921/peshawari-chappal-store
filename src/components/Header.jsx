import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { Menu, X, Search, Star, ShoppingCart, User, ChevronDown, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  // Mock data for cart and wishlist
  const totalQuantity = 0;
  const totalItems = 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <style jsx>{`
        /* Top Bar Styles */
        .top-bar {
          background: linear-gradient(135deg, #DA3F3F 0%, #B91C1C 100%);
          color: white;
          padding: 8px 0;
          font-size: 13px;
          position: relative;
          overflow: hidden;
          width: 115%;
          margin: 0;
          box-sizing: border-box;
        }

        .top-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .top-bar-content {
          max-width: 100%;
          margin: 0;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .top-bar-left, .top-bar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .top-bar-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
        }

        /* Header Styles */
        .header {
          background: white;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          margin: 0;
          box-sizing: border-box;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.12);
        }

        .header-content {
              max-width: 1460px;
    margin: 0;
    display: flex
;
    align-items: center;
    justify-content: space-between;
    height: 28%;
    transition: height 0.3s ease;
    box-sizing: border-box;
    width: 122%;
    backgroundColor:"red";
        }

        .header.scrolled .header-content {
          height: 70px;
        }

        /* Logo Styles */
        .logo {
          flex-shrink: 0;
          z-index: 1001;
        }

        .logo-img {
          height: 45px;
          width: auto;
          transition: height 0.3s ease;
          cursor: pointer;
        }

        .header.scrolled .logo-img {
          height: 40px;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background-color 0.3s ease;
          z-index: 1001;
        }

        .mobile-menu-btn:hover {
          background-color: #f3f4f6;
        }

        /* Navigation Styles */
        .nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 35px;
          align-items: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          text-decoration: none;
          color: #1f2937;
          font-weight: 600;
          font-size: 15px;
          padding: 12px 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #DA3F3F, #B91C1C);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #DA3F3F;
        }

        /* Dropdown Styles */
        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          padding: 12px 0;
          min-width: 20px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          border: 1px solid #e5e7eb;
        }
      


        .dropdown:hover .dropdown-menu,
        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .dropdown-menu li {
          list-style: none;
        }

        .dropdown-menu a {
          display: block;
          padding: 12px 20px;
          color: #374151;
          text-decoration: none;
          font-size: 20;
          transition: all 0.3s ease;
          border-radius: 8px;
         
          margin: 0 8px;
        }

        .dropdown-menu a:hover {
          background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
          color: #DA3F3F;
          transform: translateX(4px);
        }

        /* Header Icons */
        .header-icons {
         display: flex;
    align-items: flex-end;
    justify-content: center;
          gap: 12px;
          
        }

        .header-icon {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-icon:hover {
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          transform: translateY(-2px);
        }

        .header-icon svg {
          transition: all 0.3s ease;
        }

        .header-icon:hover svg {
          color: #DA3F3F;
        }

        .badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: linear-gradient(135deg, #DA3F3F, #B91C1C);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(218, 63, 63, 0.3);
        }

        /* Tablet Styles */
        @media (max-width: 1200px) {
          .nav-list {
            gap: 25px;
          }
          
          .header-content {
            padding: 0 20px;
            max-width: 100%;
          }
          
          .top-bar-content {
            padding: 0 20px;
            max-width: 100%;
          }
        }

        /* Large Mobile/Small Tablet */
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex;
            order: -1;
            position: relative;
            z-index: 1002;
          }

          .nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
            padding: 120px 0 40px;
            overflow-y: auto;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
          }

          .nav-open {
            transform: translateX(0);
          }

          .nav-list {
            flex-direction: column;
            gap: 0;
            width: 100%;
            padding: 0 25px;
            max-width: none;
          }

          .nav-item {
            width: 100%;
            border-bottom: 1px solid rgba(229, 231, 235, 0.6);
            background: white;
            margin-bottom: 8px;
            border-radius: 12px;
            nav-item :30px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .nav-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }

          .nav-link {
            padding: 22px 20px;
            font-size: 17px;
            font-weight: 600;
            color: #1f2937;
            border-radius: 12px;
            transition: all 0.3s ease;
          }

          .nav-link:hover,
          .nav-link.active {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            color: #DA3F3F;
            transform: translateX(8px);
          }

          .nav-link::after {
            display: none;
          }

          .dropdown-menu {
            position: static;
            box-shadow: none;
            background: linear-gradient(135deg, #f9fafb, #f3f4f6);
            margin: 0;
            transform: none;
            opacity: 1;
            visibility: visible;
            border-radius: 8px;
            border: none;
            padding: 0;
            margin: 8px 20px 0;
            max-height: 0;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .dropdown-menu.show {
            max-height: 400px;
            padding: 12px 0;
          }

          .dropdown-menu a {
            margin: 0 8px;
            border-radius: 8px;
            padding: 16px 16px;
            border-bottom: none;
            font-size: 15px;
            color: #4b5563;
            background: white;
            margin-bottom: 4px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
          }

          .dropdown-menu a:hover {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            color: #DA3F3F;
            transform: translateX(4px);
          }

          .dropdown-menu a:last-child {
            margin-bottom: 0;
          }

          .top-bar-content {
            padding: 0 16px;
          }

          .header-content {
            padding: 0 16px;
            height: 75px;
          }

          .header.scrolled .header-content {
            height: 65px;
          }

          .logo-img {
            height: 42px;
          }

          .header.scrolled .logo-img {
            height: 38px;
          }
        }

        /* Standard Mobile Phones */
        @media (max-width: 768px) {
          .top-bar {
            font-size: 11px;
            padding: 5px 0;
          }

          .top-bar-content {
            flex-direction: column;
            gap: 6px;
            text-align: center;
            padding: 0 12px;
          }

          .top-bar-left, .top-bar-right {
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .top-bar-item {
            gap: 4px;
            font-size: 10px;
          }

          .header-content {
            height: 65px;
            padding: 0 12px;
            position: relative;
          }

          .header.scrolled .header-content {
            height: 55px;
          }

          .logo {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1001;
          }

          .logo-img {
            height: 36px;
          }

          .header.scrolled .logo-img {
            height: 32px;
          }

          .mobile-menu-btn {
            position: relative;
            z-index: 1002;
            padding: 8px;
            margin-right: auto;
          }

          .header-icons {
            gap: 6px;
            margin-left: auto;
            z-index: 1001;
          }

          .header-icon {
            padding: 7px;
            min-width: 42px;
            min-height: 42px;
          }

          .header-icon svg {
            width: 20px;
            height: 20px;
          }

          .badge {
            width: 17px;
            height: 17px;
            font-size: 9px;
            top: 1px;
            right: 1px;
          }

          .nav {
            padding: 100px 0 30px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
          }

          .nav-list {
            padding: 0 16px;
          }

          .nav-item {
            margin-bottom: 6px;
          }

          .nav-link {
            font-size: 16px;
            padding: 20px 18px;
          }

          .dropdown-menu {
            margin: 6px 18px 0;
          }

          .dropdown-menu a {
            font-size: 10px;
            padding: 14px 14px;
            margin: 0 6px 3px;
          }

          .dropdown-toggle {
            padding: 20px 18px;
            font-size: 10px;
          }
        }

        /* Small Mobile Phones */
        @media (max-width: 480px) {
          .top-bar {
            padding: 4px 0;
            font-size: 10px;
          }

          .top-bar-content {
            padding: 0 8px;
            gap: 4px;
          }

          .top-bar-left, .top-bar-right {
            gap: 8px;
            font-size: 9px;
          }

          .top-bar-item {
            gap: 2px;
          }

          .top-bar-item svg {
            width: 12px;
            height: 12px;
          }

          .header-content {
            height: 60px;
            padding: 0 8px;
          }

          .header.scrolled .header-content {
            height: 50px;
          }

          .logo-img {
            height: 32px;
          }

          .header.scrolled .logo-img {
            height: 28px;
          }

          .mobile-menu-btn {
            padding: 6px;
            min-width: 40px;
            min-height: 40px;
          }

          .mobile-menu-btn svg {
            width: 22px;
            height: 22px;
          }

          .header-icons {
            gap: 4px;
          }

          .header-icon {
            padding: 6px;
            min-width: 38px;
            min-height: 38px;
            border-radius: 10px;
          }

          .header-icon svg {
            width: 18px;
            height: 18px;
          }

          .badge {
            width: 16px;
            height: 16px;
            font-size: 8px;
            top: 0;
            right: 0;
          }

          .nav {
            padding: 80px 0 25px;
          }

          .nav-list {
            padding: 0 12px;
          }

          .nav-item {
            margin-bottom: 5px;
          }

          .nav-link {
            font-size: 15px;
            padding: 18px 16px;
          }

          .dropdown-menu {
            margin: 5px 16px 0;
          }

          .dropdown-menu a {
            font-size: 13px;
            padding: 12px 12px;
            margin: 0 4px 2px;
          }

          .dropdown-toggle {
            padding: 18px 16px;
            font-size: 15px;
          }
        }

        /* Extra Small Mobile Phones */
        @media (max-width: 360px) {
          .top-bar {
            padding: 3px 0;
            font-size: 9px;
          }

          .top-bar-content {
            padding: 0 6px;
            gap: 3px;
          }

          .top-bar-left, .top-bar-right {
            gap: 6px;
            font-size: 8px;
          }

          .top-bar-item svg {
            width: 10px;
            height: 10px;
          }

          .header-content {
            height: 55px;
            padding: 0 6px;
          }

          .header.scrolled .header-content {
            height: 45px;
          }

          .logo-img {
            height: 28px;
          }

          .header.scrolled .logo-img {
            height: 24px;
          }

          .mobile-menu-btn {
            padding: 4px;
            min-width: 36px;
            min-height: 36px;
          }

          .mobile-menu-btn svg {
            width: 20px;
            height: 20px;
          }

          .header-icons {
            gap: 2px;
          }

          .header-icon {
            padding: 4px;
            min-width: 34px;
            min-height: 34px;
            border-radius: 8px;
          }

          .header-icon svg {
            width: 16px;
            height: 16px;
          }

          .badge {
            width: 14px;
            height: 14px;
            font-size: 7px;
            border-width: 1px;
          }

          .nav {
            padding: 70px 0 20px;
          }

          .nav-list {
            padding: 0 8px;
          }

          .nav-item {
            margin-bottom: 4px;
          }

          .nav-link {
            font-size: 14px;
            padding: 16px 14px;
          }

          .dropdown-menu {
            margin: 4px 14px 0;
          }

          .dropdown-menu a {
            font-size: 12px;
            padding: 10px 10px;
            margin: 0 3px 2px;
          }

          .dropdown-toggle {
            padding: 16px 14px;
            font-size: 14px;
          }
        }

        /* iPhone SE and smaller devices */
        @media (max-width: 320px) {
          .top-bar {
            display: none; /* Hide top bar on very small screens */
          }

          .header-content {
            height: 50px;
            padding: 0 4px;
          }

          .header.scrolled .header-content {
            height: 42px;
          }

          .logo-img {
            height: 24px;
          }

          .header.scrolled .logo-img {
            height: 20px;
          }

          .mobile-menu-btn {
            padding: 3px;
            min-width: 32px;
            min-height: 32px;
          }

          .mobile-menu-btn svg {
            width: 18px;
            height: 18px;
          }

          .header-icons {
            gap: 1px;
          }

          .header-icon {
            padding: 3px;
            min-width: 30px;
            min-height: 30px;
            border-radius: 6px;
          }

          .header-icon svg {
            width: 14px;
            height: 14px;
          }

          .badge {
            width: 12px;
            height: 12px;
            font-size: 6px;
          }

          .nav {
            padding: 60px 0 15px;
          }

          .nav-list {
            padding: 0 6px;
          }

          .nav-item {
            margin-bottom: 3px;
          }

          .nav-link {
            font-size: 13px;
            padding: 14px 12px;
          }

          .dropdown-menu {
            margin: 3px 12px 0;
          }

          .dropdown-menu a {
            font-size: 11px;
            padding: 8px 8px;
            margin: 0 2px 1px;
          }

          .dropdown-toggle {
            padding: 14px 12px;
            font-size: 13px;
          }
        }

        /* Landscape Mobile Orientation */
        @media (max-width: 768px) and (orientation: landscape) {
          .header-content {
            height: 50px;
          }

          .header.scrolled .header-content {
            height: 45px;
          }

          .logo-img {
            height: 28px;
          }

          .header.scrolled .logo-img {
            height: 24px;
          }

          .nav {
            padding: 60px 0 20px;
          }

          .nav-link {
            padding: 12px 16px;
            font-size: 14px;
          }

          .dropdown-toggle {
            padding: 12px 16px;
            font-size: 14px;
          }

          .top-bar {
            padding: 3px 0;
            font-size: 9px;
          }
        }

        /* High DPI/Retina Display Optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .logo-img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          .badge {
            font-weight: 800;
          }
        }

        /* Focus and Accessibility Improvements */
        .header-icon:focus,
        .mobile-menu-btn:focus,
        .nav-link:focus,
        .dropdown-menu a:focus {
          outline: 2px solid #DA3F3F;
          outline-offset: 2px;
        }

        /* Reduced Motion for Accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .nav {
            transition: transform 0.01ms;
          }

          .dropdown-menu {
            transition: all 0.01ms;
          }
        }

        /* Enhanced Performance Optimizations */
        .nav {
          will-change: transform;
          -webkit-overflow-scrolling: touch;
        }

        .header {
          will-change: background-color, box-shadow;
        }

        .mobile-overlay {
          will-change: opacity;
        }

        /* iOS Safari Specific Fixes */
        @supports (-webkit-touch-callout: none) {
          .header {
            position: -webkit-sticky;
            position: sticky;
          }

          .nav {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }

          .header-content {
            min-height: 50px;
          }
        }

        /* Android Specific Optimizations */
        @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-color-index: 0) {
          .header-icon {
            -webkit-tap-highlight-color: rgba(218, 63, 63, 0.1);
          }

          .nav-link {
            -webkit-tap-highlight-color: rgba(218, 63, 63, 0.1);
          }
        }

        /* Overlay for mobile menu */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Dropdown toggle for mobile */
        .dropdown-toggle {
          display: none;
        }

        @media (max-width: 1024px) {
          .dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            background: none;
            border: none;
            font: inherit;
            color: inherit;
            cursor: pointer;
            padding: 20px 0;
            font-size: 18px;
            font-weight: 600;
          }

          .dropdown .nav-link {
            display: none;
          }
        }
      `}</style>

      {/* Top Bar */}

      {/* Mobile Overlay */}


      {/* Main Header */}
      <div >
        <header className={`header w-full   ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-content">
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="logo mx-8 ">
              <a href="/" className='text-black flex gap-1 items-center '>
                <span className='text-black'>Kaltoor</span> <span className='text-white bg-black rounded-md px-2'>Chappal</span>
              </a>
            </div>

            {/* Navigation */}
            <nav className={`nav  ${isMenuOpen ? 'nav-open' : ''}`}>
              <ul style={{ fontSize: "35px" }} className="nav-list">
                <li className="nav-item">
                  <a
                    href="/"
                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/')}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/about"
                    className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/about')}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="/"
                    className={`nav-link ${isActive('/shop') ? 'active' : ''}`}
                  >
                    Shop <ChevronDown size={16} />
                  </a>
                  <button
                    className="dropdown-toggle"
                    onClick={toggleShopDropdown}
                  >
                    Shop
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isShopDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>
                  <ul className={`dropdown-menu ${isShopDropdownOpen ? 'show' : ''}`}>
                    <li><a style={{fontSize:"15px",height:"4rem",width:"12rem"}} href="/peshawari-chappal" onClick={() => handleLinkClick('/peshawari-chappal')}>Peshawari Chappal</a></li>
                    <li><a style={{fontSize:"15px",height:"4rem",width:"12rem"}} href="/charsadda-chappal" onClick={() => handleLinkClick('/charsadda-chappal')}>Charsadda Chappal</a></li>
                    <li><a style={{fontSize:"15px",height:"4rem",width:"12rem"}} href="/quetta-chappal" onClick={() => handleLinkClick('/quetta-chappal')}>Quetta Chappal</a></li>
                    <li><a style={{fontSize:"15px",height:"4rem",width:"12rem"}} href="/norozi-chappal" onClick={() => handleLinkClick('/norozi-chappal')}>Norozi Chappal</a></li>
                    <li><a style={{fontSize:"15px",height:"4rem",width:"12rem"}} href="/kaptaan-chappal" onClick={() => handleLinkClick('/kaptaan-chappal')}>Kaptaan Chappal</a></li>
                    <li><a style={{fontSize:"15px",height:"4rem",width:"12rem"}} href="/zalmi-chappal" onClick={() => handleLinkClick('/zalmi-chappal')}>Zalmi Chappal</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    href="/signature-collection"
                    className={`nav-link ${isActive('/signature-collection') ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/signature-collection')}
                  >
                    <span style={{ width: "138px" }} >Signature Collection</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="sale"
                    className={`nav-link ${isActive('/sale') ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/sale')}
                  >
                    Sale
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/contact"
                    className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/contact')}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Header Icons */}
            <div style={{  display: "flex", justifyContent:"flex-end", color: "black", marginRight:"7.5rem" }} className="header-icons " >
              <Link to="./admin/dashboard">
                <button className="header-icon" aria-label="Account">
                  <User style={{ color: "black" }} backgroundColor='blue' size={24} />
                </button>
              </Link>
              <button className="header-icon" aria-label="Search">
                <Search backgroundColor='blue' size={24} />
              </button>
              <Link to="./wishlist">
                <button className="header-icon" aria-label="Wishlist">
                  <Star style={{ color: "black" }} backgroundColor='blue' size={24} />
                  <span className="badge">{totalItems}</span>
                </button></Link>
              <Link to={"./cartDrawer"}>
                <button style={{ color: "black" }} className="header-icon" aria-label="Cart">
                  <ShoppingCart backgroundColor='blue' size={24} />
                  <span className="badge">{totalQuantity}</span>
                </button></Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;