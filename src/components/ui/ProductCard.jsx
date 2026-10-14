import { Link, useNavigate } from "react-router-dom";

import { FaStar, FaHeart } from "react-icons/fa";
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
  const { addToCart } = useCart();

  const primaryImage =
    product.product_images?.find((img) => img.is_primary)?.image_url ||
    product.product_images?.[0]?.image_url ||
    "https://placehold.co/600x600?text=No+Image";

  const isFavorite = isInWishlist(product.id);

  const hasDiscount =
    product.old_price != null &&
    Number(product.old_price) > Number(product.price);

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

  const handleAddToCart = async (e) => {
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
      toast.error(result.error?.message || "Failed to add product to bag.");
      return;
    }

    toast.success("Added to bag!");
  };

  const handleViewProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/shop/${product.id}`);
  };

  return (
    <div className="group relative min-w-0">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl bg-muted sm:rounded-2xl">
        <Link to={`/shop/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={primaryImage}
              alt={product.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out sm:group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Product Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5 sm:left-3 sm:top-3">
          {product.is_featured && (
            <span className="inline-flex h-5 items-center rounded-full bg-primary px-2 text-[9px] font-semibold uppercase tracking-wide text-white sm:h-6 sm:px-2.5 sm:text-[10px]">
              Featured
            </span>
          )}

          {product.discount_percent > 0 && (
            <span className="inline-flex h-5 items-center rounded-full bg-background/95 px-2 text-[9px] font-bold text-foreground sm:h-6 sm:px-2.5 sm:text-[10px]">
              -{product.discount_percent}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/95 shadow-elegant transition sm:right-3 sm:top-3 sm:size-10 sm:hover:scale-105 ${
            isFavorite ? "text-red-500" : "text-foreground"
          }`}
        >
          {isFavorite ? (
            <FaHeart className="size-3.5 sm:size-4" />
          ) : (
            <GoHeart className="size-4 sm:size-5" />
          )}
        </button>

        {/* Hover Actions — Desktop only */}
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-shine inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
          >
            <LuShoppingBag className="size-4" />
            Add to bag
          </button>

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

      {/* Product Information */}
      <div className="min-w-0 pt-3 sm:pt-4">
        {/* Brand + Rating */}
        <div className="flex min-w-0 items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
            {product.brands?.name || "ATHLIX"}
          </p>

          <div className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground sm:text-xs">
            <FaStar className="size-3.5 text-foreground" />

            <span className="font-medium text-foreground">
              {product.rating ?? 0}
            </span>

            <span>({product.reviews_count ?? 0})</span>
          </div>
        </div>

        {/* Product Name */}
        <Link
          to={`/shop/${product.id}`}
          className="story-link mt-1 block truncate text-xs font-semibold text-foreground sm:text-sm"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-bold text-foreground sm:text-base">
            ${Number(product.price).toFixed(2)}
          </span>

          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through sm:text-sm">
              ${Number(product.old_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Add to Bag */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-border text-xs font-semibold text-foreground transition hover:bg-muted sm:hidden"
      >
        <LuShoppingBag className="size-3.5" />
        Add to bag
      </button>
    </div>
  );
}
