import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import sportsData from "../../data/sportsData";
import { getProducts } from "../../services/apiProducts";

export default function MegaMenu() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categories = useMemo(() => {
    return sportsData.map((sport) => {
      const count = products.filter(
        (product) =>
          product.categories?.name?.trim().toLowerCase() ===
          sport.name.trim().toLowerCase(),
      ).length;

      return {
        ...sport,
        products: count,
      };
    });
  }, [products]);

  return (
    <div className="absolute left-1/2 top-full z-50 w-180 -translate-x-1/2 pt-3 opacity-0 invisible animate-fade-in group-hover:visible group-hover:opacity-100 group-hover:-translate-x-1/2">
      <div className="rounded-3xl border border-border bg-popover p-6 shadow-lift">
        <div className="grid grid-cols-4 gap-4">
          {categories.map((sport) => (
            <Link
              key={sport.name}
              to={sport.path}
              className="group/card overflow-hidden rounded-2xl bg-muted"
            >
              <div className="overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
              </div>

              <div className="p-3">
                <p className="text-sm font-semibold">{sport.name}</p>

                <p className="text-xs text-muted-foreground">
                  {sport.products}{" "}
                  {sport.products === 1 ? "Product" : "Products"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
