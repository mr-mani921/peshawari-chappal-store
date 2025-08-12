import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';
import { AlignEndHorizontal, BrushCleaning, CalendarSync, DatabaseBackup, Hop, Layers, Signature, SunSnow } from 'lucide-react';

const PeshawariChappal = () => {
  const products = [
    {
      id: 1,
      name: "Black Charsadda Gol T Chappal – 092242",
      price: "59.99",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg",
      rating: 5,
      badge: "SALE",
    },
    {
      id: 2,
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 3,
      name: "Black Smart Zalmi Chappal – 09275",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 4,
      name: "Brown Smart Zalmi Chappal – 09276",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 5,
      name: "Iconic Black Kaptaan Chappal – 092271",
      price: "69.99",
      originalPrice: "107.90",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 6,
      name: "Handmade Black Norozi Chappal With Leather Sole – 092306",
      price: "116.18",
      originalPrice: "157.70",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 7,
      name: "Suede Traditional Brown Chappal – 09288",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/Zalmi-chappal-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 8,
      name: "Suede Traditional Camel Chappal – 09290",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 9,
      name: "Premium Leather Chappal – 09291",
      price: "79.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 4,
    },
    {
      id: 10,
      name: "Classic Brown Chappal – 09292",
      price: "59.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 11,
      name: "Heritage Collection Chappal – 09293",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5,
    },
    {
      id: 12,
      name: "Royal Black Chappal – 09294",
      price: "69.99",
      originalPrice: "174.30",
      image:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage:
        "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5,
    },
  ];

  return (
    <div className="category-page" style={{marginLeft:"4%"}}>
      {/* Category Header */}
      <section className="category-header" style={{ width: "115%" }}>
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
              <div className="feature-icon"><AlignEndHorizontal /></div>
              <h3>Traditional Craftsmanship</h3>
              <p>Each pair is handcrafted using traditional techniques passed down through generations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><CalendarSync /></div>
              <h3>Premium Leather</h3>
              <p>Made from the finest quality leather for durability and comfort.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Signature /></div>
              <h3>Authentic Design</h3>
              <p>Original Peshawari design that represents true Pakistani heritage.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Layers /></div>
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
              <span>
                <BrushCleaning /> Cleaning</span>                <p>Clean with a damp cloth and mild soap. Avoid soaking in water.</p>
              </div>
              <div className="care-tip">
                <span><Hop /> Drying</span>
                <p>Air dry in shade. Avoid direct sunlight and heat sources.</p>
              </div>
              <div className="care-tip">
                <span><DatabaseBackup /> Storage</span>
                <p>Store in a cool, dry place. Use shoe trees to maintain shape.</p>
              </div>
              <div className="care-tip">
                <span>
                  <SunSnow /> Conditioning
                </span>
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