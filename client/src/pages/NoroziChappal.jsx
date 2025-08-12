import React from 'react';
import ProductCard from '../components/ProductCard';
import { Shield, Mountain, Briefcase, Zap, Droplets, Wind, Wrench, Package } from 'lucide-react';

import './CategoryPage.css';

const NoroziChappal = () => {
  const products = [
    {
      id: 1,
      name: "Handmade Black Norozi Chappal With Leather Sole – 092306",
      price: "116.18",
      originalPrice: "157.70",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 2,
      name: "Midnight Black Printed Leather Quetta Norozi Chappal – 092376",
      price: "64.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal2-14-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-29-jpg-300x300.webp",
      rating: 5
    },
    {
      id: 3,
      name: "Handmade Black Patent Leather Chappal with Single Sole – 092337",
      price: "64.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/092337-300x300.jpeg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/092337-6-1080x1080-1-300x300.png",
      rating: 5
    },
    {
      id: 4,
      name: "Hand Stitched Brown Quetta Shikari Chappal with Double Sole – 092165",
      price: "69.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/092165-2-535x535-1-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/092165-1-535x535-1-300x300.jpg",
      rating: 5
    }
  ];

  return (
   <div className="category-page">
  {/* Category Header */}
  <section className="category-header" style={{width:"115%", marginLeft:"6%"}}>
    <div className="container">
      <div className="category-hero">
        <div className="category-content">
          <h1 className="category-title">Quetta Chappal</h1>
          <p className="category-description">
            Discover the rugged elegance of Quetta Chappals, designed for durability and style. These robust 
            chappals are perfect for those who appreciate traditional craftsmanship combined with modern comfort. 
            Each pair is built to withstand daily wear while maintaining their distinctive appearance.
          </p>
          <div className="category-stats">
            <div className="stat">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">Durable</span>
              <span className="stat-label">Design</span>
            </div>
            <div className="stat">
              <span className="stat-number">Premium</span>
              <span className="stat-label">Leather</span>
            </div>
          </div>
        </div>
        <div className="category-image">
          <img 
            src="https://www.peshawarichappals.pk/wp-content/uploads/2022/09/norozi-chappal103-min-jpg-300x300.webp" 
            alt="Quetta Chappal" 
            className="featured-product-image"
          />
        </div>
      </div>
    </div>
  </section>

  {/* Features Section */}
  <section style={{marginLeft:"5%"}} className="category-features py-5">
    <div className="container">
      <h2 className="section-title text-center mb-4">Quetta Chappal Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"><Shield size={24} /></div>
          <h3>Robust Construction</h3>
          <p>Built with reinforced stitching and durable materials for long-lasting wear.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Mountain size={24} /></div>
          <h3>Weather Resistant</h3>
          <p>Designed to withstand various weather conditions while maintaining comfort.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Briefcase size={24} /></div>
          <h3>Versatile Appeal</h3>
          <p>Suitable for both casual and semi-formal occasions with timeless style.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Zap size={24} /></div>
          <h3>Enhanced Grip</h3>
          <p>Superior sole design provides excellent traction and stability.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Products Section */}
  <section style={{marginLeft:"5%"}} className="category-products py-5">
    <div className="container">
      <h2 className="section-title text-center mb-4">Our Quetta Chappal Collection</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>

  {/* Care Instructions */}
  <section style={{marginLeft:"5%"}} className="care-instructions py-5">
    <div className="container">
      <div className="care-content">
        <h2>Care Instructions</h2>
        <div className="care-tips">
          <div className="care-tip">
            <h4><Droplets size={20} /> Deep Cleaning</h4>
            <p>Use leather cleaner for thorough cleaning when needed.</p>
          </div>
          <div className="care-tip">
            <h4><Wind size={20} /> Air Circulation</h4>
            <p>Allow proper air circulation after wear to prevent moisture buildup.</p>
          </div>
          <div className="care-tip">
            <h4><Wrench size={20} /> Maintenance</h4>
            <p>Regular conditioning keeps the leather supple and prevents cracking.</p>
          </div>
          <div className="care-tip">
            <h4><Package size={20} /> Storage</h4>
            <p>Store in a breathable bag or box to maintain shape and quality.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default NoroziChappal;