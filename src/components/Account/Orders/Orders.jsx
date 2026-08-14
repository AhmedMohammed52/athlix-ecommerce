import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

export default function Orders({ orders = [], isLoading, error }) {
  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="py-8">
        <p className="text-sm text-red-500">{error.message}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-border p-8 text-center">
        <h3 className="font-display text-lg font-bold">No orders yet</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Your orders will appear here after you place your first order.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const totalItems = order.order_items?.reduce(
          (total, item) => total + item.quantity,
          0,
        );

        return (
          <div
            key={order.id}
            className="grid gap-4 rounded-2xl border border-border p-5 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div>
              <div className="flex items-center gap-3">
                <p className="font-semibold">
                  #{order.id.slice(0, 8).toUpperCase()}
                </p>

                <span className="inline-flex h-6 items-center rounded-full bg-emerald/15 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-emerald">
                  {order.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold">
                ${Number(order.total).toFixed(2)}
              </span>

              <Link
                to={`/account/orders/${order.id}`}
                className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                View
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
