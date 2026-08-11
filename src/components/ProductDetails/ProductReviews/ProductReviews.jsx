import { FaStar } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

export default function ProductReviews({ product }) {
  const rating = Number(product.rating || 0);
  const reviewsCount = product.reviews_count || 0;

  return (
    <div className="py-12 border-t border-border">
      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        <div>
          <h2 className="text-2xl font-display font-bold">Customer reviews</h2>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(rating)
                      ? "text-yellow-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} · {reviewsCount.toLocaleString()} reviews
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ReviewCard />
        </div>
      </div>
    </div>
  );
}
