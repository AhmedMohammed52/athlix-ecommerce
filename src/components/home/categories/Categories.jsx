import { useQuery } from "@tanstack/react-query";

import SectionHeader from "../../ui/SectionHeader";
import sportsData from "../../../data/sportsData";
import CategoryCard from "./CategoryCard";
import { getProducts } from "../../../services/apiProducts";

export default function Categories() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categories = sportsData.map((sport) => {
    const productsCount = products.filter(
      (product) =>
        product.categories?.name?.trim().toLowerCase() ===
        sport.name.trim().toLowerCase(),
    ).length;

    return {
      ...sport,
      productsCount,
    };
  });

  return (
    <section className="container-athlix py-16">
      <SectionHeader
        eyebrow="Shop by sport"
        title="Find your discipline"
        linkText="All Categories"
        buttonLink="/shop"
      />

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {categories.map((sport) => (
          <CategoryCard data={sport} key={sport.name} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
