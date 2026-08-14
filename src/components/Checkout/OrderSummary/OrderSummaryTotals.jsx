import { LuShieldCheck } from "react-icons/lu";

export default function OrderSummaryTotals({ cartItems }) {
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.products?.price || 0);

    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal >= 120 ? 0 : 10;

  const total = subtotal + shipping;

  return (
    <>
      <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>

          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="font-semibold">Total</span>

          <span className="font-display text-xl font-bold">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <LuShieldCheck className="size-3.5" />
        Secure & encrypted
      </p>
    </>
  );
}
