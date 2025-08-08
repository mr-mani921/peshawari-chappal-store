import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CharsaddaChappal = () => {
  const products = [
    {
      id: 1,
      name: "Black Charsadda Gol T Chappal – 092242",
      price: "59.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Handmade Mustard Charsadda Chappal with Single Sole – 09240",
      price: "59.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/315761005_6148790171816978_4903640144599590373_n-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2022/09/09240-1-750x750-1-570x570-1-300x300.jpg",
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
              <h1 className="category-title">Charsadda Chappal</h1>
              <p className="category-description">
                Experience the distinctive style of Charsadda Chappals, known for their unique design and superior 
                comfort. These traditional chappals from the Charsadda region feature a characteristic rounded toe 
                and are perfect for both casual and formal occasions.
              </p>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Authentic</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Premium</span>
                  <span className="stat-label">Quality</span>
                </div>
              </div>
            </div>
            <div className="category-image">
              <img 
                src="https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg" 
                alt="Charsadda Chappal" 
                className="featured-product-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="category-features py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Charsadda Chappal Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Distinctive Design</h3>
              <p>Unique rounded toe design that sets Charsadda chappals apart from other styles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏃</div>
              <h3>Superior Comfort</h3>
              <p>Ergonomically designed for maximum comfort during extended wear.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Versatile Style</h3>
              <p>Perfect for both casual outings and formal occasions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Durable Construction</h3>
              <p>Built to last with reinforced stitching and quality materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Our Charsadda Chappal Collection</h2>
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
                <h4>🧽 Regular Cleaning</h4>
                <p>Wipe with a soft, damp cloth to remove dust and dirt.</p>
              </div>
              <div className="care-tip">
                <h4>💧 Water Protection</h4>
                <p>Avoid prolonged exposure to water. If wet, dry naturally.</p>
              </div>
              <div className="care-tip">
                <h4>🌡️ Temperature Care</h4>
                <p>Keep away from extreme heat and direct sunlight.</p>
              </div>
              <div className="care-tip">
                <h4>🔄 Rotation</h4>
                <p>Rotate between pairs to extend the life of your chappals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharsaddaChappal;