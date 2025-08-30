import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Filter, Search, Star } from 'lucide-react';
import { Button } from './Contexts/btn';
import { useProducts } from './Contexts/ProductContext';
console.log("")

const Products = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Traditional', name: 'Traditional' },
    { id: 'Modern', name: 'Modern' },
    { id: 'Casual', name: 'Casual' },
    { id: 'Formal', name: 'Formal' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-70', name: 'Under PKR70' },
    { id: '70-100', name: 'PKR70 - PKR100' },
    { id: '100-150', name: 'PKR100 - PKR150' },
    { id: '150+', name: 'Above PKR150' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = product.price >= parseFloat(min) && product.price <= parseFloat(max);
      } else {
        matchesPrice = product.price >= parseFloat(min);
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <>
      <Helmet>
        <title>Products - ChappalCraft</title>
        <meta name="description" content="Browse our collection of premium custom chappals. Traditional, modern, casual, and formal designs available for customization." />
      </Helmet>

      {/* Header */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover our extensive collection of premium chappals, each designed with care and crafted to perfection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium">Filters:</span>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden product-card group"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                    alt={product.name}
                    src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-sm font-semibold text-gray-800">
                    PKR{product.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium capitalize">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 h-12 overflow-hidden">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="space-x-2">
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm">Customize</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};


export default Products;