import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const KaptaanChappal = () => {
  const products = [
    {
      id: 1,
      name: "Iconic Black Kaptaan Chappal – 092271",
      price: "69.99",
      originalPrice: "107.90",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 2,
      name: "Completely Hand Stitched Iconic Black Kaptaan Chappal – 092170",
      price: "69.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/Kaptaan-Chappal-092170-300x300.jpeg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/Kaptaan-Chappal-0921700-300x296.jpeg",
      rating: 5
    },
    {
      id: 3,
      name: "Handmade Black Kaptaan Chappal – 092171",
      price: "69.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/kaptaan-chappal-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/8-2-300x300.jpg",
      rating: 5
    }
  ];

  return (
    <div className="category-page" style={{width:"118%"}}>
      {/* Category Header */}
      <section className="category-header">
        <div className="container">
          <div className="category-hero">
            <div className="category-content">
              <h1 className="category-title">Kaptaan Chappal</h1>
              <p className="category-description">
                Step into leadership with our exclusive Kaptaan Chappal collection. Inspired by the confidence and 
                charisma of great leaders, these chappals combine traditional craftsmanship with a bold, distinctive 
                design. Perfect for those who want to make a statement while honoring Pakistani heritage.
              </p>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Leader</span>
                  <span className="stat-label">Style</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Bold</span>
                  <span className="stat-label">Design</span>
                </div>
              </div>
            </div>
            <div className="category-image">
              <img 
                src="https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg" 
                alt="Kaptaan Chappal" 
                className="featured-product-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="category-features py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Kaptaan Chappal Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👑</div>
              <h3>Leadership Style</h3>
              <p>Designed for those who lead with confidence and style.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Bold Statement</h3>
              <p>Make a powerful impression with this distinctive design.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Precision Crafted</h3>
              <p>Every detail is carefully crafted to perfection by master artisans.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Heritage Design</h3>
              <p>Rooted in Pakistani tradition with a modern leadership twist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Our Kaptaan Chappal Collection</h2>
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
                <h4>👔 Professional Care</h4>
                <p>Maintain the leadership look with regular professional cleaning.</p>
              </div>
              <div className="care-tip">
                <h4>🛡️ Protection</h4>
                <p>Use leather protector spray to guard against stains and moisture.</p>
              </div>
              <div className="care-tip">
                <h4>✨ Shine Maintenance</h4>
                <p>Regular polishing keeps the leather looking sharp and professional.</p>
              </div>
              <div className="care-tip">
                <h4>🏆 Quality Storage</h4>
                <p>Store with cedar shoe trees to maintain shape and absorb moisture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KaptaanChappal;