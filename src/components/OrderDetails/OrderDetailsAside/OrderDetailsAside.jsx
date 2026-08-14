import OrderInfo from "./OrderInfo";
import OrderSummary from "./OrderSummary";

export default function OrderDetailsAside({ order }) {
  return (
    <aside className="space-y-4">
      <OrderSummary order={order} />

      <OrderInfo order={order} />
    </aside>
  );
}
