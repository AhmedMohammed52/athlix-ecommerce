import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import WishlistProvider from "./context/WishlistContext.jsx";
import CartProvider from "./context/CartContext";
import Preloader from "./components/Preloader/Preloader.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Preloader>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Preloader>
  </React.StrictMode>,
);
