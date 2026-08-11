import ProductCard from "../../ui/ProductCard";

export default function RelatedProductsSlider({ emblaRef, products }) {
  return (
    <div
      className="overflow-hidden mt-8 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      ref={emblaRef}
    >
      <div className="flex gap-6">
        {products.map((product) => (
          <div
            className="w-[75%] shrink-0 snap-start sm:w-[45%] lg:w-[24%]"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
