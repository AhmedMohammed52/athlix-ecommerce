import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Bag from "../pages/Bag";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/Login";
import Register from "../pages/Register";

// import ProtectedRoute from "../routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "bag", element: <Bag /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <Profile /> },
      { path: "/shop/:productId", element: <ProductDetails />}

      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     { path: "cart", element: <Cart /> },
      //     { path: "wishlist", element: <Wishlist /> },
      //     { path: "checkout", element: <Checkout /> },
      //     { path: "profile", element: <Profile /> },
      //   ],
      // },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
