import React, { createContext, useState, useContext } from "react";

// 1. Create context
const UserOrderDetailContext = createContext(null);

// 2. Provider
export const UserOrderDetailProvider = ({ children }) => {
  const [userOrder, setUserOrder] = useState({}); // starts as empty object

  // 3. Add/Update method
  const addOrUpdateOrder = (newOrder) => {
    setUserOrder((prev) => ({
      ...prev,      // keep previous properties
      ...newOrder,  // overwrite/add new properties
    }));
   console.log(userOrder)

  };

  return (
    <UserOrderDetailContext.Provider
      value={{ userOrder, setUserOrder, addOrUpdateOrder }}
    >
      {children}
    </UserOrderDetailContext.Provider>
  );
};

// 4. Custom hook
export const useUserOrderDetail = () => {
  const context = useContext(UserOrderDetailContext);
  if (!context) {
    throw new Error(
      "useUserOrderDetail must be used within a UserOrderDetailProvider"
    );
  }
  return context;
};
