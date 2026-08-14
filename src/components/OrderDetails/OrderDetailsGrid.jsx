import OrderDetailsAside from "./OrderDetailsAside/OrderDetailsAside";
import OrderItems from "./OrderItems";

export default function OrderDetailsGrid({ order }) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
      <OrderItems order={order} />

      <OrderDetailsAside order={order} />
    </div>
  );
}
