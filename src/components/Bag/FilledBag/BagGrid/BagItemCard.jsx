import { FaPlus, FaMinus, FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";

import { useCart } from "../../../../context/CartContext";

export default function BagItemCard({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const product = item.products;

  const primaryImage =
    product?.product_images?.find((img) => img.is_primary)?.image_url ||
    product?.product_images?.[0]?.image_url ||
    "https://placehold.co/600x600?text=No+Image";

  const price = Number(product?.price || 0);

  const quantity = Number(item.quantity || 1);

  const itemTotal = price * quantity;

  const handleDecrease = async () => {
    const result = await updateQuantity(item.id, quantity - 1);

    if (!result.success) {
      toast.error(result.error?.message || "Failed to update quantity.");
    }
  };

  const handleIncrease = async () => {
    const result = await updateQuantity(item.id, quantity + 1);

    if (!result.success) {
      toast.error(result.error?.message || "Failed to update quantity.");
    }
  };

  const handleRemove = async () => {
    const result = await removeFromCart(item.id);

    if (!result.success) {
      toast.error(result.error?.message || "Failed to remove item.");

      return;
    }

    toast.success("Removed from bag!");
  };

  return (
    <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[120px_1fr] gap-4 mb-4 p-4 rounded-2xl border border-border">
      <div className="overflow-hidden rounded-xl bg-muted">
        <img
          src={primaryImage}
          alt={product?.name}
          className="size-full object-cover aspect-square"
        />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs tracking-widest uppercase text-muted-foreground">
              {product?.brands?.name || "ATHLIX"}
            </p>

            <p className="mt-1 truncate font-semibold">{product?.name}</p>

            {(item.product_colors?.name || item.product_sizes?.size) && (
              <p className="mt-1 text-xs text-muted-foreground">
                {item.product_colors?.name &&
                  `Color: ${item.product_colors.name}`}

                {item.product_colors?.name && item.product_sizes?.size && " · "}

                {item.product_sizes?.size && `Size ${item.product_sizes.size}`}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove"
            className="size-8 text-muted-foreground rounded-full flex items-center justify-center hover:bg-muted hover:text-red-500 transition"
          >
            <FaXmark className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-between items-center gap-4">
          <div className="inline-flex h-11 items-center rounded-full border border-border">
            <button
              type="button"
              onClick={handleDecrease}
              className="size-10 flex items-center justify-center hover:bg-muted rounded-l-full"
            >
              <FaMinus className="size-3" />
            </button>

            <span className="w-8 text-center text-sm font-semibold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              className="size-10 flex items-center justify-center hover:bg-muted rounded-r-full"
            >
              <FaPlus className="size-3" />
            </button>
          </div>

          <span className="font-bold">${itemTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
