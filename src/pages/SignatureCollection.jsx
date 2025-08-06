import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const SignatureCollection = () => {
  const products = [
    {
      id: 1,
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
      badge: "SIGNATURE",
      rating: 5
    },
    {
      id: 2,
      name: "Black Smart Zalmi Chappal – 09275",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
      badge: "SIGNATURE",
      rating: 5
    },
    {
      id: 3,
      name: "Handmade Black Norozi Chappal With Leather Sole – 092306",
      price: "116.18",
      originalPrice: "157.70",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
      badge: "SIGNATURE",
      rating: 5
    },
    {
      id: 4,
      name: "Black Round Shape Zalmi Chappal – 09294",
      price: "64.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/12.1-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/12.2-300x300.jpg",
      badge: "SIGNATURE",
      rating: 5
    }
  ];

  return (
    <div className="category-page"  style={{width:"118%"}}>
      {/* Category Header */}
      <section className="category-header">
        <div className="container">
          <div className="category-hero">
            <div className="category-content">
              <h1 className="category-title">Signature Collection</h1>
              <p className="category-description">
                Discover our most exclusive and refined chappals in the Signature Collection. These premium pieces 
                represent the pinnacle of our craftsmanship, featuring the finest materials, exceptional attention 
                to detail, and designs that embody the very best of Pakistani traditional footwear artistry.
              </p>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Exclusive</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Premium</span>
                  <span className="stat-label">Quality</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Master</span>
                  <span className="stat-label">Crafted</span>
                </div>
              </div>
            </div>
            <div className="category-image">
              <img 
                src="https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp" 
                alt="Signature Collection" 
                className="featured-product-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="category-features py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Signature Collection Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Premium Materials</h3>
              <p>Only the finest leather and materials are selected for our signature pieces.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Exclusive Designs</h3>
              <p>Unique designs available only in our signature collection.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🎨</div>
              <h3>Master Artisans</h3>
              <p>Crafted by our most skilled and experienced artisans.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Limited Edition</h3>
              <p>Exclusive pieces with limited availability for discerning customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Our Signature Collection</h2>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Exclusivity Section */}
      <section className="exclusivity py-5">
        <div className="container">
          <div className="exclusivity-content">
            <h2>What Makes Our Signature Collection Special?</h2>
            <div className="exclusivity-features">
              <div className="exclusivity-feature">
                <h4>🔍 Meticulous Selection</h4>
                <p>Each piece is carefully selected based on exceptional quality and unique design elements.</p>
              </div>
              <div className="exclusivity-feature">
                <h4>⏰ Extended Crafting Time</h4>
                <p>Our signature pieces require additional time and attention to achieve perfection.</p>
              </div>
              <div className="exclusivity-feature">
                <h4>📜 Certificate of Authenticity</h4>
                <p>Every signature piece comes with a certificate guaranteeing its authenticity and quality.</p>
              </div>
              <div className="exclusivity-feature">
                <h4>🎁 Premium Packaging</h4>
                <p>Beautifully packaged in our exclusive signature collection boxes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Instructions */}
      <section  className="care-instructions py-5"  style={{width:"98%"}}>
        <div className="container">
          <div className="care-content">
            <h2>Premium Care Instructions</h2>
            <div className="care-tips">
              <div className="care-tip">
                <h4>🌟 Premium Products</h4>
                <p>Use only premium leather care products for signature pieces.</p>
              </div>
              <div className="care-tip">
                <h4>🧤 Gentle Handling</h4>
                <p>Handle with extra care to preserve the premium finish and details.</p>
              </div>
              <div className="care-tip">
                <h4>🏛️ Museum Storage</h4>
                <p>Store in the original packaging or premium storage solutions.</p>
              </div>
              <div className="care-tip">
                <h4>👨‍🔧 Professional Service</h4>
                <p>Consider professional cleaning and maintenance for best results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignatureCollection;