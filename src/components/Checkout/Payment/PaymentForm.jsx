export default function PaymentForm({
  paymentData,
  setPaymentData,
  setCurrentStep,
}) {
  const handleChange = (e) => {
    const { id, value } = e.target;

    setPaymentData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-border p-6 md:p-8"
    >
      <h2 className="font-display text-2xl font-bold">Payment</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="cardNumber"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Card number
          </label>

          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="4242 4242 4242 4242"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="expiry"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Expiry
          </label>

          <input
            id="expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={paymentData.expiry}
            onChange={handleChange}
            placeholder="MM / YY"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="cvc"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            CVC
          </label>

          <input
            id="cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            value={paymentData.cvc}
            onChange={handleChange}
            placeholder="123"
            maxLength={3}
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="nameOnCard"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Name on card
          </label>

          <input
            id="nameOnCard"
            type="text"
            autoComplete="cc-name"
            value={paymentData.nameOnCard}
            onChange={handleChange}
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </button>

        <button
          type="submit"
          className="btn-shine inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm font-semibold text-background"
        >
          Review order
        </button>
      </div>
    </form>
  );
}
