import { FaStar } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

export default function ProductMeta({ product }) {
  return (
    <div>
      <p className="tracking-[0.2em] text-xs font-semibold text-royal uppercase">
        {product.brands?.name}
      </p>

      <h1 className="font-display font-bold text-3xl md:text-5xl my-3 tracking-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`size-4 ${
                star <= Math.round(product.rating || 0)
                  ? "text-yellow-400"
                  : "text-muted"
              }`}
            />
          ))}
        </div>

        <span className="text-sm text-muted-foreground">
          {product.rating || 0} · {product.reviews_count || 0} reviews
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-3xl font-bold font-display">
          ${Number(product.price).toFixed(2)}
        </span>

        {product.old_price && (
          <span className="line-through text-muted-foreground text-lg">
            ${Number(product.old_price).toFixed(2)}
          </span>
        )}

        {product.discount_percent > 0 && (
          <span className="inline-flex items-center py-0.5 px-2 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
            {product.discount_percent}% OFF
          </span>
        )}
      </div>

      {/* Stock */}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <span className="inline-flex px-2.5 py-1 items-center bg-emerald/10 text-emerald gap-1.5 rounded-full font-semibold">
          <IoMdCheckmark className="size-3.5" />

          {product.stock > 0
            ? `In stock — ${product.stock} available`
            : "Out of stock"}
        </span>

        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <FiPackage className="size-3.5" />
          {product.categories?.name}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
        {product.description}
      </p>
    </div>
  );
}
