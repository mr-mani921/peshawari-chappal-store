import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ProductsProvider } from "./pages/Contexts/Product";
import { OrdersProvider } from "./pages/Contexts/Order";

createRoot(document.getElementById("root")).render(
  <OrdersProvider>
    <ProductsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProductsProvider>
  </OrdersProvider>
);
