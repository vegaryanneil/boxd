import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { PickupProvider } from "./context/PickupContext";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <CartProvider>
      <PickupProvider>
        <App />
      </PickupProvider>
    </CartProvider>
  </React.StrictMode>
);