import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [wishlistId, setWishlistId] = useState(null);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrCreateWishlist = useCallback(async () => {
    if (!user) return null;

    const { data: wishlist, error: fetchError } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (wishlist) {
      return wishlist.id;
    }

    const { data: newWishlist, error: createError } = await supabase
      .from("wishlists")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    if (createError) throw createError;

    return newWishlist.id;
  }, [user]);

  const loadWishlist = useCallback(async () => {
    if (!user) {
      setWishlistId(null);
      setWishlistProductIds([]);
      return;
    }

    try {
      setLoading(true);

      const id = await getOrCreateWishlist();

      if (!id) {
        setWishlistId(null);
        setWishlistProductIds([]);
        return;
      }

      setWishlistId(id);

      const { data, error } = await supabase
        .from("wishlist_items")
        .select("product_id")
        .eq("wishlist_id", id);

      if (error) throw error;

      const productIds = data?.map((item) => item.product_id) ?? [];

      setWishlistProductIds(productIds);
    } catch (error) {
      console.error("Failed to load wishlist:", error);

      setWishlistId(null);
      setWishlistProductIds([]);
    } finally {
      setLoading(false);
    }
  }, [user, getOrCreateWishlist]);

  useEffect(() => {
    if (!authLoading) {
      loadWishlist();
    }
  }, [authLoading, loadWishlist]);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlistProductIds.includes(productId);
    },
    [wishlistProductIds],
  );

  const wishlistCount = wishlistProductIds.length;

  const addToWishlist = useCallback(
    async (productId) => {
      if (!user) {
        return {
          success: false,
          requiresAuth: true,
        };
      }

      try {
        setLoading(true);

        const id = wishlistId || (await getOrCreateWishlist());

        if (!id) {
          throw new Error("Could not create wishlist.");
        }

        if (!wishlistId) {
          setWishlistId(id);
        }

        if (wishlistProductIds.includes(productId)) {
          return {
            success: true,
            added: true,
            alreadyExists: true,
          };
        }

        const { error } = await supabase.from("wishlist_items").insert({
          wishlist_id: id,
          product_id: productId,
        });

        if (error) throw error;

        setWishlistProductIds((prev) => {
          if (prev.includes(productId)) {
            return prev;
          }

          return [...prev, productId];
        });

        return {
          success: true,
          added: true,
        };
      } catch (error) {
        console.error("Add wishlist error:", error);

        return {
          success: false,
          error,
        };
      } finally {
        setLoading(false);
      }
    },
    [user, wishlistId, wishlistProductIds, getOrCreateWishlist],
  );

  const removeFromWishlist = useCallback(
    async (productId) => {
      if (!user) {
        return {
          success: false,
          requiresAuth: true,
        };
      }

      try {
        setLoading(true);

        const id = wishlistId || (await getOrCreateWishlist());

        if (!id) {
          return {
            success: true,
            removed: false,
          };
        }

        const { error } = await supabase
          .from("wishlist_items")
          .delete()
          .eq("wishlist_id", id)
          .eq("product_id", productId);

        if (error) throw error;

        setWishlistProductIds((prev) => prev.filter((id) => id !== productId));

        return {
          success: true,
          removed: true,
        };
      } catch (error) {
        console.error("Remove wishlist error:", error);

        return {
          success: false,
          error,
        };
      } finally {
        setLoading(false);
      }
    },
    [user, wishlistId, getOrCreateWishlist],
  );

  const toggleWishlist = useCallback(
    async (productId) => {
      if (!user) {
        return {
          success: false,
          requiresAuth: true,
        };
      }

      const alreadyExists = wishlistProductIds.includes(productId);

      if (alreadyExists) {
        return removeFromWishlist(productId);
      }

      return addToWishlist(productId);
    },
    [user, wishlistProductIds, addToWishlist, removeFromWishlist],
  );

  const value = {
    wishlistId,
    wishlistProductIds,
    wishlistCount,

    loading,

    isInWishlist,

    addToWishlist,
    removeFromWishlist,
    toggleWishlist,

    loadWishlist,
    getOrCreateWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
