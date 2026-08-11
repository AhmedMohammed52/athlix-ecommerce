import { useQuery } from "@tanstack/react-query";
import { getNewArrivals } from "../../../services/apiProducts";

import ProductSection from "../../ProductSection/ProductSection";

export default function NewArrivals() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: () => getNewArrivals(4),
  });

  if (isLoading) {
    return (
      <section className="container-athlix py-16">
        <p>Loading...</p>
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
        eyebrow="Just dropped"
        title="New arrivals"
        linkText="See all"
        buttonLink="/shop"
        products={products}
      />
    </section>
  );
}
