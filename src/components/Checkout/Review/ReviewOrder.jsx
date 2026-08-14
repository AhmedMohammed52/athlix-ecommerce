export default function ReviewOrder({
  shippingData,
  paymentData,
  orderTotals,
  setCurrentStep,
  onPlaceOrder,
  isPlacingOrder,
}) {
  const { totalItems, subtotal, shipping, total } = orderTotals;

  const lastFourDigits =
    paymentData?.cardNumber?.replace(/\D/g, "").slice(-4) || "----";

  const handleSubmit = (e) => {
    e.preventDefault();

    onPlaceOrder();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-border p-6 md:p-8"
    >
      <h2 className="font-display text-2xl font-bold">Review & place order</h2>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          You're placing an order for{" "}
          <span className="font-semibold text-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>{" "}
          totaling{" "}
          <span className="font-semibold text-foreground">
            ${total.toFixed(2)}
          </span>
          .
        </p>

        <div className="rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Shipping</h3>

            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Edit
            </button>
          </div>

          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {shippingData.firstName} {shippingData.lastName}
            </p>

            <p>{shippingData.email}</p>

            <p>{shippingData.phone}</p>

            <p>{shippingData.address}</p>

            <p>
              {shippingData.city}, {shippingData.postalCode}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Payment</h3>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Edit
            </button>
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            <p>
              Card ending in{" "}
              <span className="font-medium text-foreground">
                {lastFourDigits}
              </span>
            </p>

            <p className="mt-1">{paymentData.nameOnCard}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>

              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between border-t border-border pt-3">
              <span className="font-semibold">Total</span>

              <span className="font-display text-xl font-bold">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-muted p-5 text-sm text-muted-foreground">
        By placing this order, you agree to ATHLIX's Terms of Service and
        acknowledge our Privacy Policy.
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          disabled={isPlacingOrder}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          ← Back
        </button>

        <button
          type="submit"
          disabled={isPlacingOrder}
          className="inline-flex h-12 items-center rounded-full bg-royal px-8 text-sm font-semibold text-royal-foreground transition-opacity disabled:pointer-events-none disabled:opacity-60"
        >
          {isPlacingOrder
            ? "Placing order..."
            : `Place order · $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}
