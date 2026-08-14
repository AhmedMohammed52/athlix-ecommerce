import { FiCheck } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container-athlix py-24 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>

        <Link to="/shop" className="mt-6 inline-flex">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-athlix flex flex-col items-center justify-center py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-emerald text-emerald-foreground">
        <FiCheck className="size-7" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-royal">
        Order confirmed
      </p>

      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Thanks {order.first_name}! — you're in.
      </h1>

      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Order{" "}
        <span className="font-semibold text-foreground">
          #{order.id.slice(0, 8).toUpperCase()}
        </span>{" "}
        confirmed.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          to="/account"
          className="btn-shine inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background"
        >
          View orders
        </Link>

        <Link
          to="/shop"
          className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
