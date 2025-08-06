import React from 'react';
import ProductCard from '../components/ProductCard';
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
    <div className="category-page" style={{width:"118%"}}>
      {/* Category Header */}
      <section className="category-header">
        <div className="container">
          <div className="category-hero">
            <div className="category-content">
              <h1 className="category-title">Norozi Chappal</h1>
              <p className="category-description">
                Explore our premium collection of Norozi Chappals, featuring the iconic closed-toe design that has 
                been a symbol of Pakistani tradition for generations. These sophisticated chappals offer unmatched 
                comfort and style, perfect for both traditional and contemporary settings.
              </p>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Iconic</span>
                  <span className="stat-label">Design</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Premium</span>
                  <span className="stat-label">Comfort</span>
                </div>
              </div>
            </div>
            <div className="category-image">
              <img 
                src="https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp" 
                alt="Norozi Chappal" 
                className="featured-product-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="category-features py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Norozi Chappal Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👑</div>
              <h3>Iconic Closed-Toe Design</h3>
              <p>The signature closed-toe style that defines the classic Norozi chappal.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>Formal & Casual</h3>
              <p>Versatile design suitable for both formal events and casual wear.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Premium Materials</h3>
              <p>Crafted from the finest leather with attention to every detail.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💫</div>
              <h3>Timeless Appeal</h3>
              <p>Classic design that never goes out of style, perfect for any generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Our Norozi Chappal Collection</h2>
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
                <h4>✨ Polish Regularly</h4>
                <p>Use quality leather polish to maintain the shine and appearance.</p>
              </div>
              <div className="care-tip">
                <h4>🧴 Condition Monthly</h4>
                <p>Apply leather conditioner monthly to keep the material supple.</p>
              </div>
              <div className="care-tip">
                <h4>🌡️ Avoid Extremes</h4>
                <p>Keep away from extreme temperatures and direct heat sources.</p>
              </div>
              <div className="care-tip">
                <h4>🔄 Rest Between Wears</h4>
                <p>Allow 24 hours between wears to let the leather breathe and recover.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoroziChappal;