export default function OrderSummary({ order }) {
  return (
    <div className="rounded-3xl border border-border p-6">
      <h2 className="font-display text-lg font-bold">Summary</h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>

          <dd className="font-medium">${Number(order.subtotal).toFixed(2)}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Shipping</dt>

          <dd className="font-medium">
            {Number(order.shipping) === 0
              ? "Free"
              : `$${Number(order.shipping).toFixed(2)}`}
          </dd>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold">Total</span>

          <span className="font-display text-xl font-bold">
            ${Number(order.total).toFixed(2)}
          </span>
        </div>
      </dl>
    </div>
  );
}
