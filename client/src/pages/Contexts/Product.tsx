// src/context/ProductsContext.js
import React, { createContext, useState, useEffect } from "react";
import API from "../../utils/api";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
 

   useEffect(() => {
    const fetchProducts = async () => {
       try {
        const res = await API.get("/products/all");

        // If API returns { products: [...] }
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          throw new Error("Unexpected API response format");
        }

      } catch (err) {
        console.log(err.message);
      }  
    };

    fetchProducts();
  }, []);

  // Log whenever products change
  // useEffect(() => {
  //   console.log("Fetched products:", products);
  // }, [products]);

  return (
    <ProductsContext.Provider value={{ products,setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
