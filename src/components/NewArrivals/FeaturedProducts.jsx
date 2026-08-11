import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { GoArrowRight } from "react-icons/go";

export default function FeaturedProducts({ products }) {
  return (
    <div className="py-10 md:py-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display font-bold text-xl md:text-2xl">
          Also new to the shop
        </h2>

        <Link
          className="flex items-center gap-2 text-sm font-medium text-royal story-link"
          to="/shop"
        >
          View everything
          <GoArrowRight className="size-3.5" />
        </Link>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
