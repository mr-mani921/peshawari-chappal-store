// src/context/ordersContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../../utils/api";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const locallUser= JSON.parse(localStorage.getItem("user"));

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchorders = async () => {
       try {
        const res = await API.get("/orders/all");
        //  console.log(res.data)
        
          setOrders(res.data);
         

      } catch (err) {
         console.log(err.message);
      }  
    };

       const fetchordersHistory = async () => {
       try {
        const res = await API.get(`/orders/userOrdersHistory/${locallUser._id}`);
         
           setOrderHistory(res.data);
          // console.log("orderHistory",res.data)
          } catch (err) {
         console.log(err.message);
      }  
    };

    fetchorders();
    fetchordersHistory()
  }, []);

     

  

  return (
    <OrdersContext.Provider value={{ orders,setOrders , orderHistory }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useorders must be used within a ordersProvider");
  }
  return context;
};
