import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';
import { Zap, Palette, Users, Star, Rainbow, Droplets, Sun, Wind } from 'lucide-react';

const ZalmiChappal = () => {
  const products = [
    {
      id: 1,
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 2,
      name: "Black Smart Zalmi Chappal – 09275",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 3,
      name: "Brown Smart Zalmi Chappal – 09276",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 4,
      name: "Suede Traditional Brown Chappal – 09288",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/Zalmi-chappal-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 5,
      name: "Black Round Shape Zalmi Chappal – 09294",
      price: "64.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/12.1-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/12.2-300x300.jpg",
      rating: 5
    },
    {
      id: 6,
      name: "Mustard Round Shape Zalmi Chappal – 09293",
      price: "64.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/11.1-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/11.2-300x300.jpg",
      rating: 5
    }
  ];

  return (

<div className="category-page" style={{width:"118%",marginLeft:"5%"}}>
  {/* Category Header */}
  <section className="category-header">
    <div className="container">
      <div className="category-hero">
        <div className="category-content">
          <h1 className="category-title">Zalmi Chappal</h1>
          <p className="category-description">
            Embrace the spirit of youth and energy with our vibrant Zalmi Chappal collection. These modern 
            interpretations of traditional chappals are perfect for the young at heart, featuring contemporary 
            designs while maintaining the authentic craftsmanship that defines Pakistani footwear.
          </p>
          <div className="category-stats">
            <div className="stat">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">Modern</span>
              <span className="stat-label">Style</span>
            </div>
            <div className="stat">
              <span className="stat-number">Youthful</span>
              <span className="stat-label">Energy</span>
            </div>
          </div>
        </div>
        <div className="category-image">
          <img 
            src="https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg" 
            alt="Zalmi Chappal" 
            className="featured-product-image"
          />
        </div>
      </div>
    </div>
  </section>

  {/* Features Section */}
  <section className="category-features py-5">
    <div className="container">
      <h2 className="section-title text-center mb-4">Zalmi Chappal Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Zap size={30} />
          </div>
          <h3>Dynamic Design</h3>
          <p>Modern styling that appeals to the contemporary fashion-conscious individual.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Palette size={30} />
          </div>
          <h3>Vibrant Colors</h3>
          <p>Available in a range of exciting colors to match your personal style.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Users size={30} />
          </div>
          <h3>Active Comfort</h3>
          <p>Designed for active lifestyles with enhanced comfort and flexibility.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Star size={30} />
          </div>
          <h3>Trendy Appeal</h3>
          <p>Perfect for young professionals and style enthusiasts.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Products Section */}
  <section className="category-products py-5">
    <div className="container">
      <h2 className="section-title text-center mb-4">Our Zalmi Chappal Collection</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>

  {/* Care Instructions */}
  <section className="care-instructions py-5">
    <div className="container">
      <div className="care-content">
        <h2>Care Instructions</h2>
        <div className="care-tips">
          <div className="care-tip">
            <h4 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Rainbow size={30} /> Color Protection
            </h4>
            <p>Use color-specific leather care products to maintain vibrancy.</p>
          </div>
          <div className="care-tip">
            <h4 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Droplets size={30} /> Gentle Cleaning
            </h4>
            <p>Clean regularly with appropriate leather cleaners for different materials.</p>
          </div>
          <div className="care-tip">
            <h4 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Sun size={30} /> UV Protection
            </h4>
            <p>Protect from prolonged sun exposure to prevent color fading.</p>
          </div>
          <div className="care-tip">
            <h4 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Wind size={30} /> Fresh Air
            </h4>
            <p>Allow proper ventilation after wear to maintain freshness.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default ZalmiChappal;