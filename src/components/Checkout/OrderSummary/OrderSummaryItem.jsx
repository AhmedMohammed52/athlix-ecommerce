export default function OrderSummaryItem({ item }) {
  const product = item.products;

  const primaryImage =
    product?.product_images?.find((image) => image.is_primary)?.image_url ||
    product?.product_images?.[0]?.image_url ||
    "https://placehold.co/100x100?text=No+Image";

  const itemTotal = Number(product?.price || 0) * item.quantity;

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-14 shrink-0 overflow-visible">
        <div className="size-full overflow-hidden rounded-xl bg-muted">
          <img
            src={primaryImage}
            alt={product?.name || "Product"}
            className="size-full object-cover"
          />
        </div>

        <span className="absolute -right-2 -top-2 z-10 grid size-6 place-items-center rounded-full bg-foreground text-[10px] font-bold leading-none text-background shadow-md ring-2 ring-background">
          {item.quantity}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {product?.name || "Product"}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {item.product_colors?.name || "Default"}
          {" / "}
          {item.product_sizes?.size || "One size"}
        </p>
      </div>

      <span className="shrink-0 text-sm font-semibold">
        ${itemTotal.toFixed(2)}
      </span>
    </div>
  );
}
