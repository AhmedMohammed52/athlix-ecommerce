import OrderSummaryItem from "./OrderSummaryItem";
import OrderSummaryTotals from "./OrderSummaryTotals";

export default function OrderSummary({ cartItems = [] }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-3xl border border-border bg-muted/40 p-6">
        <h2 className="font-display text-lg font-bold">Order</h2>

        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <OrderSummaryItem key={item.id} item={item} />
          ))}
        </div>

        <OrderSummaryTotals cartItems={cartItems} />
      </div>
    </aside>
  );
}
