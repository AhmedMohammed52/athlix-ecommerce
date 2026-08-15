import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts } from "../../../services/apiProducts";

import ProductSection from "../../ProductSection/ProductSection";
import Loader from "../../ui/Loader";

export default function TrendingProducts() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "trending"],
    queryFn: () => getTrendingProducts(4),
  });

  if (isLoading) {
    return (
      <section className="container-athlix py-16">
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-athlix py-16">
        <p>{error.message}</p>
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
      />
    </section>
  );
}
