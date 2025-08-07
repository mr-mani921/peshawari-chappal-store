import React from 'react';
import ProductCard from '../components/ProductCard';
import "./Home.css"
const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Black Charsadda Gol T Chappal – 092242",
      price: "59.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg",
      rating: 5,
      badge: "SALE",
    },
    {
      id: 2,
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 3,
      name: "Black Smart Zalmi Chappal – 09275",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 4,
      name: "Brown Smart Zalmi Chappal – 09276",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 5,
      name: "Iconic Black Kaptaan Chappal – 092271",
      price: "69.99",
      originalPrice: "107.90",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg",
      badge: "SALE",
      rating: 5
    },
    {
      id: 6,
      name: "Handmade Black Norozi Chappal With Leather Sole – 092306",
      price: "116.18",
      originalPrice: "157.70",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-119-JPG-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 7,
      name: "Suede Traditional Brown Chappal – 09288",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal1-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/Zalmi-chappal-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 8,
      name: "Suede Traditional Camel Chappal – 09290",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 9,
      name: "Premium Leather Chappal – 09291",
      price: "79.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 4
    },
    {
      id: 10,
      name: "Classic Brown Chappal – 09292",
      price: "59.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 11,
      name: "Heritage Collection Chappal – 09293",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    },
    {
      id: 12,
      name: "Royal Black Chappal – 09294",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal4-min-1-jpg-300x300.webp",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2023/11/zalmi-chappal5-min-jpg-300x300.webp",
      badge: "SALE",
      rating: 5
    }
  ];

  return (
    <>
      

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            {/* Product Image */}
            <div className="hero-image">
              <img
                src="https://pakhtunwardrobe.com/cdn/shop/products/PW-Premium-Black-1.jpg?v=1668556447"
                alt="SHIKARI Norozi Chappal"
                className="hero-product-image"
              />
            </div>

            {/* Text Content */}
            <div className="hero-text">
              {/* Logo */}
              <div className="hero-brand">
                <a href="/" className="hero-logo">
                  <span className="hero-logo-text">Kaltoor</span>
                  <span className="hero-logo-badge">Chappal</span>
                </a>
              </div>

              {/* Title */}
              <h1 className="hero-title">SHIKARI</h1>

              {/* Subtitle */}
              <p className="hero-subtitle">Kaltoor Chappal</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section py-5">
          <div className="container">
            <div className="about-content text-center">
              <h2 className="section-title">
                Discover Pakistan's Widest Range of Handmade Peshawari Chappals
              </h2>
              <p className="section-description">
                <strong>Kaltoor Chappal.pk</strong> is Pakistan's trusted source for original handmade Peshawari chappals,
                proudly preserving this timeless craft since 2010. Each pair is crafted with premium leather and traditional
                stitching, reflecting generations of artisan expertise. Our brand stands for quality, heritage, and
                affordability—offering unmatched comfort and durability. Explore our signature Norozi, Kaptaan, and classic
                styles, along with new seasonal arrivals that blend tradition with modern flair. From everyday wear to special
                occasions. <strong>Kaltoor Chappal</strong> delivers authentic designs and nationwide service you can count on.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products py-5">
          <div className="container">
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
              {/* todo */}
            {/* <div className="text-center mt-4">
              <a href="/products" className="btn btn-secondary">
                View All Products
              </a>
            </div> */}
          </div>
        </section>

        {/* WhatsApp Chat Button */}
        <div className="whatsapp-chat">
          <span className="whatsapp-icon">💬</span>
          <span>Hi, Chat with us</span>
        </div>
      </div>
    </>
  );
};

export default Home;