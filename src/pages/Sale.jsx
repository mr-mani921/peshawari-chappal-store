import React from 'react';
import ProductCard from '../components/ProductCard';
import './Sale.css';

const Sale = () => {
  const saleProducts = [
    {
      id: 1,
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
      badge: "60% OFF",
      rating: 5,
      discount: 60
    },
    {
      id: 2,
      name: "Black Smart Zalmi Chappal – 09275",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
      badge: "60% OFF",
      rating: 5,
      discount: 60
    },
    {
      id: 3,
      name: "Brown Smart Zalmi Chappal – 09276",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg",
      badge: "60% OFF",
      rating: 5,
      discount: 60
    },
    {
      id: 4,
      name: "Iconic Black Kaptaan Chappal – 092271",
      price: "69.99",
      originalPrice: "107.90",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg",
      badge: "35% OFF",
      rating: 5,
      discount: 35
    },
    {
      id: 5,
      name: "Handmade Black Norozi Chappal With Leather Sole – 092306",
      price: "116.18",
      originalPrice: "157.70",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
      badge: "26% OFF",
      rating: 5,
      discount: 26
    },
    {
      id: 6,
      name: "Suede Traditional Brown Chappal – 09288",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/Zalmi-chappal-min-jpg-300x300.webp",
      badge: "60% OFF",
      rating: 5,
      discount: 60
    }
  ];

  return (
    <div className="sale-page" style={{width:"115%"}}>
      {/* Sale Header */}
      <section className="sale-header">
        <div className="container">
          <div className="sale-hero">
            <div className="sale-content">
              <div className="sale-badge">🔥 MEGA SALE</div>
              <h1 className="sale-title">Up to 60% Off</h1>
              <p className="sale-subtitle">
                Don't miss out on incredible savings on our premium handmade chappals. 
                Limited time offer on selected items from our collection.
              </p>
              <div className="sale-timer">
                <div className="timer-item">
                  <span className="timer-number">15</span>
                  <span className="timer-label">Days</span>
                </div>
                <div className="timer-item">
                  <span className="timer-number">08</span>
                  <span className="timer-label">Hours</span>
                </div>
                <div className="timer-item">
                  <span className="timer-number">23</span>
                  <span className="timer-label">Minutes</span>
                </div>
                <div className="timer-item">
                  <span className="timer-number">45</span>
                  <span className="timer-label">Seconds</span>
                </div>
              </div>
            </div>
            <div className="sale-image">
              <img 
                src="https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg" 
                alt="Sale Products" 
                className="sale-product-image"
              />
              <div className="sale-overlay">
                <span className="sale-percentage">60% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Benefits */}
      <section className="sale-benefits py-4">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <div className="benefit-text">
                <h4>Free Shipping</h4>
                <p>On all sale items</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">↩️</div>
              <div className="benefit-text">
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🛡️</div>
              <div className="benefit-text">
                <h4>Quality Guarantee</h4>
                <p>Same premium quality</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <div className="benefit-text">
                <h4>Limited Time</h4>
                <p>Don't miss out!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="sale-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Sale Products</h2>
          <div className="products-grid">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Terms */}
      <section className="sale-terms py-4">
        <div className="container">
          <div className="terms-content">
            <h3>Sale Terms & Conditions</h3>
            <ul className="terms-list">
              <li>Sale prices are valid for a limited time only</li>
              <li>Discounts cannot be combined with other offers</li>
              <li>All sale items are final sale unless defective</li>
              <li>Free shipping applies to orders over $50</li>
              <li>Sale prices are subject to change without notice</li>
              <li>Limited quantities available</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sale;