import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-hot-toast";

import { useWishlist } from "../../../context/WishlistContext";

export default function WishlistCard({ item, onItemRemoved }) {
  const product = item.products;

  const { toggleWishlist } = useWishlist();

  const primaryImage =
    product?.product_images?.find((img) => img.is_primary)?.image_url ||
    product?.product_images?.[0]?.image_url ||
    "https://placehold.co/600x600?text=No+Image";

  const handleRemove = async () => {
    const result = await toggleWishlist(product.id);

    if (!result.success) {
      toast.error(result.error?.message || "Failed to remove from wishlist.");

      return;
    }

    // Remove from Wishlist page immediately
    onItemRemoved(product.id);

    toast.success("Removed from wishlist!");
  };

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition hover:border-foreground/30">
      {/* Image */}
      <Link
        to={`/shop/${product.id}`}
        className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted"
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {product.brands?.name || "ATHLIX"}
        </p>

        <Link
          to={`/shop/${product.id}`}
          className="story-link mt-1 block truncate text-sm font-semibold text-foreground"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">
            ${Number(product.price).toFixed(2)}
          </span>

          {product.old_price != null &&
            Number(product.old_price) > Number(product.price) && (
              <span className="text-xs text-muted-foreground line-through">
                ${Number(product.old_price).toFixed(2)}
              </span>
            )}
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={handleRemove}
        aria-label="Remove from wishlist"
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-red-500 transition hover:scale-105 hover:bg-red-50"
      >
        <FaHeart className="size-4" />
      </button>
    </div>
  );
}
