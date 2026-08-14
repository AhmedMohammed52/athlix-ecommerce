import { useEffect, useMemo, useState } from "react";

import { getCart, clearCart } from "../../services/cartService";
import CheckoutHeader from "./CheckoutHeader/CheckoutHeader";
import OrderSummary from "./OrderSummary/OrderSummary";
import Shipping from "./Shipping/ShippingForm";
import Payment from "./Payment/PaymentForm";
import Review from "./Review/ReviewOrder";

import { createOrder } from "../../services/orderService";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../ui/Loader";

export default function Checkout() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [cartError, setCartError] = useState(null);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [shippingData, setShippingData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });

  useEffect(() => {
    async function loadCart() {
      try {
        setIsLoadingCart(true);
        setCartError(null);

        const data = await getCart();

        setCartItems(data);
      } catch (error) {
        setCartError(error);
      } finally {
        setIsLoadingCart(false);
      }
    }

    loadCart();
  }, []);

  const orderTotals = useMemo(() => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    const subtotal = cartItems.reduce((total, item) => {
      const price = Number(item.products?.price || 0);

      return total + price * item.quantity;
    }, 0);

    const shipping = subtotal >= 120 ? 0 : 10;

    const total = subtotal + shipping;

    return {
      totalItems,
      subtotal,
      shipping,
      total,
    };
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    try {
      setIsPlacingOrder(true);

      const result = await createOrder({
        shippingData,
        cartItems,
      });

      try {
        await clearCart();
      } catch {
        // Order was already created successfully.
        // Cart clearing failure should not make the order look failed.
      }

      toast.success("Your order has been placed successfully.");

      navigate("/order-confirmation", {
        state: {
          order: result.order,
        },
      });
    } catch (error) {
      toast.error(
        error?.message || "Something went wrong while placing your order.",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoadingCart) {
    return <Loader fullScreen />;
  }

  if (cartError) {
    return (
      <section className="container-athlix py-10 md:py-14">
        <p className="text-sm text-destructive">Failed to load your cart.</p>
      </section>
    );
  }

  if (!cartItems.length) {
    return (
      <section className="container-athlix py-10 md:py-14">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="container-athlix py-10 md:py-14">
      <CheckoutHeader currentStep={currentStep} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="animate-fade-in">
          {currentStep === 1 && (
            <Shipping
              shippingData={shippingData}
              setShippingData={setShippingData}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 2 && (
            <Payment
              paymentData={paymentData}
              setPaymentData={setPaymentData}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 3 && (
            <Review
              cartItems={cartItems}
              shippingData={shippingData}
              paymentData={paymentData}
              orderTotals={orderTotals}
              setCurrentStep={setCurrentStep}
              onPlaceOrder={handlePlaceOrder}
              isPlacingOrder={isPlacingOrder}
            />
          )}
        </div>

        <OrderSummary cartItems={cartItems} />
      </div>
    </section>
  );
}
