import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the Product type
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  sales: number;
  rating: number;
  reviews: number;
  description: string;
}

// 2. Define the context type
interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

// 3. Create the context with null as default and add type
const ProductContext = createContext<ProductContextType | null>(null);

// 4. Custom hook with error handling
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// 5. Initial product list
const initialProducts: Product[] = [ /* your products here (same as you had) */ 
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

// 6. Provider with children props typed
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      sales: 0,
      rating: 0,
      reviews: 0,
      status: product.stock > 10 ? 'Active' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock'),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    const status = updatedProduct.stock > 10 ? 'Active' : (updatedProduct.stock > 0 ? 'Low Stock' : 'Out of Stock');
    setProducts(products.map((p) => p.id === updatedProduct.id ? { ...updatedProduct, status } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
