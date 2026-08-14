import OrderItem from "./OrderItem";

export default function OrderItems({ order }) {
  return (
    <div className="space-y-3">
      {order.order_items?.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
