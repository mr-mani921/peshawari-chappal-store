import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, Grid, List } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);

  const products = [
    {
      id: 1,
      name: "Black Charsadda Gol T Chappal – 092242",
      price: "59.99",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg",
      category: "charsadda",
      rating: 5
    },
    {
      id: 2,
      name: "Mustard Smart Zalmi Chappal – 09274",
      price: "69.99",
      originalPrice: "174.30",
      image: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg",
      hoverImage: "https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg",
      category: "zalmi",
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
      category: "zalmi",
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
      category: "zalmi",
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
      category: "kaptaan",
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
      category: "norozi",
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
      category: "zalmi",
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
      category: "zalmi",
      badge: "SALE",
      rating: 5
    }
  ];

  return (
    <div className="shop" style={{width:"118%"}}>
      {/* Page Header */}
      <section className="shop-header">
        <div className="container">
          <h1 className="page-title">Shop All Products</h1>
          <p className="page-subtitle">Discover our complete collection of handmade traditional chappals</p>
        </div>
      </section>

      <div className="container">
        <div className="shop-content">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">
                <Filter size={20} />
                Filters
              </h3>
              
              {/* Categories */}
              <div className="filter-group">
                <h4>Categories</h4>
                <div className="filter-options">
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Peshawari Chappal</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Norozi Chappal</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Kaptaan Chappal</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Zalmi Chappal</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Charsadda Chappal</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Quetta Chappal</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-display">
                    PKR{priceRange[0]} - PKR{priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="filter-group">
                <h4>Colors</h4>
                <div className="color-options">
                  <div className="color-option" style={{backgroundColor: '#000'}} title="Black"></div>
                  <div className="color-option" style={{backgroundColor: '#8B4513'}} title="Brown"></div>
                  <div className="color-option" style={{backgroundColor: '#DAA520'}} title="Mustard"></div>
                  <div className="color-option" style={{backgroundColor: '#F5DEB3'}} title="Camel"></div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="shop-main">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="toolbar-left">
                <span className="results-count">Showing {products.length} products</span>
              </div>
              
              <div className="toolbar-right">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Best Rating</option>
                </select>
                
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`products-container ${viewMode}`}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn">Previous</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Next</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;