import ProductCard from "../ui/ProductCard";

export default function WishlistGrid({ products, onWishlistRemove }) {
  return (
    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
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
