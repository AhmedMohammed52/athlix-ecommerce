import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getCart,
  addToCart as addToCartApi,
  updateCartItemQuantity,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
} from "../services/apiCart";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const items = await getCart();

      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      loadCart();
    }
  }, [authLoading, loadCart]);

  // Add product
  const addToCart = useCallback(
    async ({ productId, colorId = null, sizeId = null, quantity = 1 }) => {
      if (!user) {
        return {
          success: false,
          requiresAuth: true,
        };
      }

      try {
        setLoading(true);

        const item = await addToCartApi({
          productId,
          colorId,
          sizeId,
          quantity,
        });

        // Reload because the API can either
        // create a new item or update an existing one.
        const items = await getCart();

        setCartItems(items);

        return {
          success: true,
          item,
        };
      } catch (error) {
        console.error("Add to cart error:", error);

        return {
          success: false,
          error,
        };
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  // Update quantity
  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        setLoading(true);

        // Optimistic update
        setCartItems((prev) =>
          prev
            .map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    quantity,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );

        if (quantity <= 0) {
          await removeFromCartApi(itemId);
        } else {
          await updateCartItemQuantity(itemId, quantity);
        }

        return {
          success: true,
        };
      } catch (error) {
        console.error("Update cart quantity error:", error);

        await loadCart();

        return {
          success: false,
          error,
        };
      } finally {
        setLoading(false);
      }
    },
    [loadCart],
  );

  // Remove item
  const removeFromCart = useCallback(
    async (itemId) => {
      try {
        setLoading(true);

        // Remove immediately from UI
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));

        await removeFromCartApi(itemId);

        return {
          success: true,
        };
      } catch (error) {
        console.error("Remove cart item error:", error);

        await loadCart();

        return {
          success: false,
          error,
        };
      } finally {
        setLoading(false);
      }
    },
    [loadCart],
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      setLoading(true);

      setCartItems([]);

      await clearCartApi();

      return {
        success: true,
      };
    } catch (error) {
      console.error("Clear cart error:", error);

      await loadCart();

      return {
        success: false,
        error,
      };
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  // Total quantity
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0,
    );
  }, [cartItems]);

  // Subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.products?.price || 0);
      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal >= 120 || subtotal === 0 ? 0 : 10;

  const total = subtotal + shipping;

  const value = {
    cartItems,
    cartCount,

    subtotal,
    shipping,
    total,

    loading,

    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,

    loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
