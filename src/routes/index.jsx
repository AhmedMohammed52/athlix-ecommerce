import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Bag from "../pages/Bag";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/Login";
import Register from "../pages/Register";
import NewArrivals from "../pages/NewArrivals";
import Sale from "../pages/Sale";
import Jornal from "../pages/Jornal";
import Account from "../pages/Account";
import ForgetPassword from "../pages/ForgetPassword";

import ProtectedRoute from "../routes/ProtectedRoute";
import GuestRoute from "./GuestRoute";
import OrderConfirmation from "../pages/OrderConfirmation";
import OrderDetails from "../pages/OrderDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "shop/:id", element: <ProductDetails /> },
        { path: "new", element: <NewArrivals /> },
        { path: "sale", element: <Sale /> },
        { path: "jornal", element: <Jornal /> },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "bag", element: <Bag /> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "checkout", element: <Checkout /> },
            { path: "account", element: <Account /> },
            { path: "account/orders/:orderId", element: <OrderDetails /> },
            { path: "order-confirmation", element: <OrderConfirmation /> },
          ],
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          element: <GuestRoute />,
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "forgetPassword", element: <ForgetPassword /> },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: "/athlix-ecommerce",
  },
);

export default router;
