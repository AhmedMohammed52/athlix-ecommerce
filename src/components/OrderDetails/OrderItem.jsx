import { Link } from "react-router-dom";

export default function OrderItem({ item }) {
  const product = item.products;

  const primaryImage =
    product?.product_images?.find((image) => image.is_primary)?.image_url ||
    product?.product_images?.[0]?.image_url ||
    "";

  return (
    <Link
      to={`/shop/${item.product_id}`}
      className="flex items-center gap-4 rounded-2xl border border-border p-4 transition hover:bg-muted/40"
    >
      <img
        src={primaryImage}
        alt={product?.name || "Product"}
        className="size-20 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{product?.name || "Product"}</p>

        <p className="text-xs text-muted-foreground">
          {product.categories?.name || "Category"}
          {" · "}
          {item.product_sizes?.size ? `Size ${item.product_sizes.size} · ` : ""}
          Qty {item.quantity}
        </p>
      </div>

      <span className="font-display text-lg font-bold">
        ${(Number(item.price) * item.quantity).toFixed(2)}
      </span>
    </Link>
  );
}
