import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
  {
    id: 1,
    name: 'Traditional Classic',
    category: 'Traditional',
    price: 89.99,
    stock: 45,
    status: 'Active',
    image: 'Premium handcrafted leather chappal with traditional embroidery',
    sales: 234,
    rating: 4.8,
    reviews: 124,
    description: "Handcrafted with premium leather and traditional patterns",
  },
  {
    id: 2,
    name: 'Modern Comfort',
    category: 'Modern',
    price: 79.99,
    stock: 32,
    status: 'Active',
    image: 'Modern minimalist chappal with ergonomic design',
    sales: 189,
    rating: 4.7,
    reviews: 98,
    description: "Contemporary design with maximum comfort",
  },
  {
    id: 3,
    name: 'Casual Walker',
    category: 'Casual',
    price: 59.99,
    stock: 28,
    status: 'Active',
    image: 'Casual everyday chappal with breathable materials',
    sales: 156,
    rating: 4.6,
    reviews: 156,
    description: "Perfect for everyday wear and casual outings",
  },
  {
    id: 4,
    name: 'Formal Elite',
    category: 'Formal',
    price: 129.99,
    stock: 15,
    status: 'Low Stock',
    image: 'Elegant formal chappal with premium finish',
    sales: 98,
    rating: 4.9,
    reviews: 87,
    description: "Sophisticated design for formal occasions",
  },
  {
    id: 5,
    name: 'Heritage Collection',
    category: 'Traditional',
    price: 149.99,
    stock: 0,
    status: 'Out of Stock',
    image: 'Heritage style chappal with intricate traditional artwork',
    sales: 203,
    rating: 4.9,
    reviews: 203,
    description: "Authentic traditional craftsmanship with heritage designs",
  },
  {
    id: 6,
    name: "Sport Comfort",
    category: "Casual",
    price: 69.99,
    stock: 78,
    status: 'Active',
    image: "Athletic style chappal with sport comfort technology",
    sales: 142,
    rating: 4.5,
    reviews: 142,
    description: "Athletic design with enhanced comfort features",
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      sales: 0,
      rating: 0,
      reviews: 0,
      status: product.stock > 10 ? 'Active' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    const status = updatedProduct.stock > 10 ? 'Active' : (updatedProduct.stock > 0 ? 'Low Stock' : 'Out of Stock');
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? { ...updatedProduct, status } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};