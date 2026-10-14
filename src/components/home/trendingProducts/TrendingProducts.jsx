import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts } from "../../../services/apiProducts";

import ProductSection from "../../ProductSection/ProductSection";

export default function TrendingProducts() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "trending"],
    queryFn: () => getTrendingProducts(4),
  });

  if (error) {
    return (
      <section className="container-athlix py-16">
        <p className="text-sm text-muted-foreground">
          Failed to load trending products. {error.message}
        </p>
      </section>
    );
  }

  return (
    <section className="container-athlix py-16">
      <ProductSection
        eyebrow="Trending Now"
        title="What athletes are wearing"
        linkText="Shop Trending"
        buttonLink="/shop"
        products={products}
        isLoading={isLoading}
        skeletonCount={4}
      />
    </section>
  );
}
