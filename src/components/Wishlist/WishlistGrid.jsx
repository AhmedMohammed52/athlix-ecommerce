import ProductCard from "../ui/ProductCard";

export default function WishlistGrid({ products, onWishlistRemove }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onWishlistRemove={onWishlistRemove}
        />
      ))}
    </div>
  );
}
