import { LuSearchX } from "react-icons/lu";
import ProductCard from "../ui/ProductCard";

export default function ShopGrid({
  products,
  totalPages,
  setCurrentPage,
  currentPage,
  onClearFilters,
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-125 flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
          <LuSearchX className="size-7 text-muted-foreground" />
        </div>

        <h2 className="font-display text-2xl font-bold">No products found</h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          We couldn't find any products matching your current filters. Try
          removing some filters or exploring other categories.
        </p>

        <button
          type="button"
          onClick={onClearFilters}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-85"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition ${
                currentPage === index + 1
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
