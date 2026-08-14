import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getOrderById } from "../../services/accountService";

import OrderDetailsGrid from "./OrderDetailsGrid";
import OrderDetailsHeader from "./OrderDetailsHeader";

import Loader from "../ui/Loader";

export default function OrderDetails() {
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <section className="container-athlix py-10 md:py-14">
        <p className="text-sm text-red-500">{error.message}</p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="container-athlix py-10 md:py-14">
        <p className="text-sm text-muted-foreground">Order not found.</p>
      </section>
    );
  }

  return (
    <section className="container-athlix py-10 md:py-14">
      <OrderDetailsHeader order={order} />

      <OrderDetailsGrid order={order} />
    </section>
  );
}
