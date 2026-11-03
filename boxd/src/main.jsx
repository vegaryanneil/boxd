
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { PickUpProvider } from "./context/PickUpContext";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <CartProvider>
      <PickUpProvider>
        <App />
      </PickUpProvider>
    </CartProvider>
  </React.StrictMode>
);
