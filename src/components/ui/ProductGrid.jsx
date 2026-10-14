import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
      {products.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
}
