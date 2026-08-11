import ProductGrid from "./ProductGrid";

export default function WeeklyPicks({ products }) {
  return (
    <div className="py-10 md:py-14">
      <h2 className="mb-6 text-2xl font-display font-bold">This Week</h2>

      <ProductGrid products={products} />
    </div>
  );
}
