import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { LuShieldCheck } from "react-icons/lu";

import { useCart } from "../../../../context/CartContext";

export default function CartSummary() {
  const { subtotal, shipping, total } = useCart();

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="bg-muted/40 rounded-3xl p-6 border border-border">
        <h2 className="font-display font-bold text-xl">Order summary</h2>

        <dl className="mt-6 text-sm space-y-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>

            <dd className="font-medium">${subtotal.toFixed(2)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Shipping</dt>

            <dd className="font-medium">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Estimated tax</dt>

            <dd className="text-muted-foreground">Calculated at checkout</dd>
          </div>
        </dl>

        <div className="my-6 h-px bg-border" />

        <dl className="flex items-center justify-between">
          <dt className="font-semibold">Total</dt>

          <dd className="font-display text-2xl font-bold">
            ${total.toFixed(2)}
          </dd>
        </dl>

        <Link
          className="btn-shine mt-6 inline-flex bg-foreground gap-2 px-6 h-13 w-full text-center items-center justify-center text-background rounded-full text-sm font-semibold transition hover:opacity-90"
          to="/checkout"
        >
          Secure checkout
          <GoArrowRight className="size-4" />
        </Link>

        <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
          <LuShieldCheck className="size-3.5" />
          256-bit SSL · 30-day returns
        </p>
      </div>
    </aside>
  );
}
