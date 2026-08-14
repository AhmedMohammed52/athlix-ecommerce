import { useQuery } from "@tanstack/react-query";

import { getNewArrivals } from "../../services/apiProducts";

import NewArrivalsHeader from "./NewArrivalsHeader";
import WeeklyPicks from "./WeeklyPicks";
import FeaturedProducts from "./FeaturedProducts";
import Loader from "../ui/Loader";

export default function NewArrivals() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: () => getNewArrivals(12),
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <section className="container-athlix pt-10 md:pt-16">
      <NewArrivalsHeader />

      <WeeklyPicks products={products.slice(0, 4)} />

      <FeaturedProducts products={products.slice(4, 8)} />
    </section>
  );
}
