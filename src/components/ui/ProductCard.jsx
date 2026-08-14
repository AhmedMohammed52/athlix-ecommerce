import { Link, useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";

import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, onWishlistRemove }) {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { isInWishlist, toggleWishlist } = useWishlist();

  const primaryImage =
    product.product_images?.find((img) => img.is_primary)?.image_url ||
    product.product_images?.[0]?.image_url ||
    "https://placehold.co/600x600?text=No+Image";

  const isFavorite = isInWishlist(product.id);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to use your wishlist.");
      return;
    }

    const result = await toggleWishlist(product.id);

    if (!result.success) {
      toast.error(result.error?.message || "Something went wrong.");
      return;
    }

    if (result.added) {
      toast.success("Added to wishlist!");
    } else {
      onWishlistRemove?.(product.id);

      toast.success("Removed from wishlist!");
    }
  };

  const handleViewProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/shop/${product.id}`);
  };

  const { addToCart } = useCart();

  return (
    <div className="group relative">
      {/* Product Image */}
      <Link
        className="block overflow-hidden rounded-2xl bg-muted"
        to={`/shop/${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Product Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.is_featured && (
              <span className="inline-flex h-6 items-center rounded-full bg-primary px-2.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            )}

            {product.discount_percent > 0 && (
              <span className="inline-flex h-6 items-center rounded-full bg-background/95 px-2.5 text-[10px] font-bold text-foreground">
                -{product.discount_percent}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-background/95 shadow-elegant transition hover:scale-105 ${
              isFavorite ? "text-red-500" : "text-foreground"
            }`}
          >
            {isFavorite ? (
              <FaHeart className="size-4" />
            ) : (
              <GoHeart className="size-5" />
            )}
          </button>

          {/* Hover Actions */}
          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {/* Add To Bag */}
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!user) {
                  toast.error("Please login to add products to your bag.");
                  return;
                }

                const result = await addToCart({
                  productId: product.id,
                  quantity: 1,
                });

                if (!result.success) {
                  toast.error(
                    result.error?.message || "Failed to add product to bag.",
                  );

                  return;
                }

                toast.success("Added to bag!");
              }}
              className="btn-shine inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
            >
              <LuShoppingBag className="size-4" />
              Add to bag
            </button>

            {/* View Product */}
            <button
              type="button"
              onClick={handleViewProduct}
              aria-label="View product"
              className="flex size-11 items-center justify-center rounded-full bg-background/95 text-foreground shadow-elegant"
            >
              <MdOutlineRemoveRedEye className="size-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          {/* Brand + Name */}
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.brands?.name || "ATHLIX"}
            </p>

            <Link
              to={`/shop/${product.id}`}
              className="story-link mt-1 block truncate text-sm font-semibold text-foreground"
            >
              {product.name}
            </Link>
          </div>

          {/* Rating */}
          <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <FaStar className="size-3.5 text-foreground" />

            <span className="font-medium text-foreground">
              {product.rating ?? 0}
            </span>

            <span>({product.reviews_count ?? 0})</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-foreground">
            ${Number(product.price).toFixed(2)}
          </span>

          {product.old_price != null &&
            Number(product.old_price) > Number(product.price) && (
              <span className="text-sm text-muted-foreground line-through">
                ${Number(product.old_price).toFixed(2)}
              </span>
            )}
        </div>
      </div>
    </div>
  );
}
