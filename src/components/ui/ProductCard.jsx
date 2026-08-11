import { Link, useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";

export default function ProductCard({ product }) {
  const primaryImage =
    product.product_images?.find((img) => img.is_primary)?.image_url ||
    product.product_images?.[0]?.image_url ||
    "https://placehold.co/600x600?text=No+Image";

  const navigate = useNavigate();

  return (
    <div className="group relative">
      <Link
        className="bg-muted rounded-2xl block overflow-hidden"
        to={`/shop/${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden ">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className=" size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className=" absolute left-3 top-3 flex flex-col gap-1.5">
            {product.is_featured && (
              <span className="inline-flex h-6 items-center rounded-full bg-primary px-2.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            )}

            {product.discount_percent && (
              <span className="inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-bold text-foreground bg-background/95">
                {product.discount_percent}%
              </span>
            )}
          </div>

          <button
            aria-label="Toggle wishlist"
            className=" absolute top-3 right-3 size-10 rounded-full bg-background/95 text-foreground shadow-elegant transition flex items-center justify-center hover:scale-105"
          >
            <GoHeart className="size-4" />
          </button>

          <div className=" absolute inset-x-3 bottom-3 flex gap-2 translate-y-4 transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ">
            <button className="btn-shine h-11 inline-flex flex-1 items-center justify-center rounded-full gap-2 bg-foreground text-sm font-semibold text-background transition hover:opacity-90">
              <LuShoppingBag className="size-4" />
              Add to bag
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/shop/${product.id}`);
              }}
              className="size-11 bg-background/95 rounded-full flex items-center justify-center text-foreground shadow-elegant"
            >
              <MdOutlineRemoveRedEye className="size-4" />
            </button>
          </div>
        </div>
      </Link>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.brands?.name}
            </p>

            <Link
              to={`/shop/${product.id}`}
              className="mt-1 text-sm truncate block font-semibold story-link text-foreground"
            >
              {product.name}
            </Link>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FaStar className="size-3.5 text-foreground" />

            <span className="font-medium text-foreground">
              {product.rating}
            </span>
            <span>({product.reviews_count})</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-foreground font-bold text-base">
            ${product.price}
          </span>

          {product.old_price != null && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.old_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
