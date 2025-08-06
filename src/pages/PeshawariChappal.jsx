import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const PeshawariChappal = () => {
  const products = [
    {
      id: 1,
      name: "Handmade Classic Black Peshawari Chappal – 09242",
      price: "59.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/peshawari-chappal-min-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/9-10-300x300.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Handmade Signature Brown Peshawari Chappal – 09217",
      price: "59.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/11-4-jpg-scaled-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2021/12/9-9-300x300.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Traditional Black Peshawari Chappal – 09243",
      price: "64.99",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5
    },
    {
      id: 4,
      name: "Premium Brown Peshawari Chappal – 09244",
      price: "69.99",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5
    }
  ];

  return (
    <div className="category-page">
      {/* Category Header */}
      <section className="category-header" style={{width:"115%"}}>
        <div className="container">
          <div className="category-hero">
            <div className="category-content">
              <h1 className="category-title">Peshawari Chappal</h1>
              <p className="category-description">
                Discover our authentic collection of traditional Peshawari Chappals, handcrafted by skilled artisans 
                using time-honored techniques. Each pair represents the rich heritage and cultural significance of 
                this iconic Pakistani footwear.
              </p>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Handmade</span>
                </div>
                <div className="stat">
                  <span className="stat-number">2010</span>
                  <span className="stat-label">Since</span>
                </div>
              </div>
            </div>
            <div className="category-image">
              <img 
                src="https://www.peshawarichappals.pk/wp-content/uploads/2021/12/peshawari-chappal-min-jpg-300x300.webp" 
                alt="Peshawari Chappal" 
                className="featured-product-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="category-features py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Why Choose Our Peshawari Chappals?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏺</div>
              <h3>Traditional Craftsmanship</h3>
              <p>Each pair is handcrafted using traditional techniques passed down through generations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Premium Leather</h3>
              <p>Made from the finest quality leather for durability and comfort.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Authentic Design</h3>
              <p>Original Peshawari design that represents true Pakistani heritage.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Comfort & Style</h3>
              <p>Perfect blend of traditional style and modern comfort for everyday wear.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Our Peshawari Chappal Collection</h2>
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
                <h4>🧽 Cleaning</h4>
                <p>Clean with a damp cloth and mild soap. Avoid soaking in water.</p>
              </div>
              <div className="care-tip">
                <h4>🌞 Drying</h4>
                <p>Air dry in shade. Avoid direct sunlight and heat sources.</p>
              </div>
              <div className="care-tip">
                <h4>🛡️ Storage</h4>
                <p>Store in a cool, dry place. Use shoe trees to maintain shape.</p>
              </div>
              <div className="care-tip">
                <h4>✨ Conditioning</h4>
                <p>Apply leather conditioner occasionally to keep leather supple.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PeshawariChappal;