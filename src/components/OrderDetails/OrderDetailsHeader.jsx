import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function OrderDetailsHeader({ order }) {
  const totalItems = order.order_items?.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const orderDate = new Date(order.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Link
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        to="/account"
      >
        <HiOutlineArrowLeft className="size-4" />
        Back to orders
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </h1>

        <span className="inline-flex h-6 items-center rounded-full bg-emerald/15 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-emerald">
          {order.status}
        </span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        Placed {orderDate} · {totalItems} {totalItems === 1 ? "item" : "items"}
      </p>
    </>
  );
}
