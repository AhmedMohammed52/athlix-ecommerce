import { FiFacebook, FiMinus, FiTwitter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import { IoMdLink } from "react-icons/io";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export default function ProductActions({
  product,
  selectedColorId,
  selectedSizeId,
}) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { addToCart } = useCart();

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      setIsAddingToCart(true);

      const result = await addToCart({
        productId: product.id,
        colorId: selectedColorId ?? null,
        sizeId: selectedSizeId ?? null,
        quantity,
      });

      if (!result?.success) {
        if (result?.requiresAuth) {
          toast.error("Please login first");
          return;
        }

        throw result?.error || new Error("Failed to add product to bag");
      }

      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Product added to bag");
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(error?.message || "Failed to add product to bag");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (isUpdatingWishlist) return;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      setIsUpdatingWishlist(true);

      let result;

      if (isFavorite) {
        result = await removeFromWishlist(product.id);
      } else {
        result = await addToWishlist(product.id);
      }

      if (!result?.success) {
        if (result?.requiresAuth) {
          toast.error("Please login first");
          return;
        }

        throw result?.error || new Error("Failed to update wishlist");
      }

      await queryClient.invalidateQueries({
        queryKey: ["wishlist", user.id],
      });

      if (isFavorite) {
        toast.success("Removed from wishlist");
      } else {
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);

      toast.error(error?.message || "Failed to update wishlist");
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  return (
    <>
      <div className="mt-8 flex gap-3">
        <div className="inline-flex h-14 items-center rounded-full border border-border">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="flex size-14 items-center justify-center rounded-full hover:bg-muted"
          >
            <FiMinus className="size-4" />
          </button>

          <span className="w-8 text-center text-sm font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="flex size-14 items-center justify-center rounded-full hover:bg-muted"
          >
            <GoPlus className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="btn-shine inline-flex h-14 flex-1 items-center justify-center rounded-full bg-foreground text-base font-semibold text-background transition disabled:pointer-events-none disabled:opacity-60"
        >
          {isAddingToCart
            ? "Adding..."
            : `Add to bag · $${(Number(product.price) * quantity).toFixed(2)}`}
        </button>

        <button
          type="button"
          onClick={handleWishlistToggle}
          disabled={isUpdatingWishlist}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className="flex size-14 items-center justify-center rounded-full border border-border transition hover:bg-muted disabled:pointer-events-none disabled:opacity-60"
        >
          {isFavorite ? (
            <FaHeart className="size-5 text-red-500" />
          ) : (
            <FaRegHeart className="size-5" />
          )}
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <LuShare2 className="size-3.5" />
          Share
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
          >
            <FiTwitter className="size-4" />
          </button>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
          >
            <FiFacebook className="size-4" />
          </button>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
          >
            <IoMdLink className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
}
