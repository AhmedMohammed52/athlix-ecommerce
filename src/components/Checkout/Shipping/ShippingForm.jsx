export default function ShippingForm({
  shippingData,
  setShippingData,
  setCurrentStep,
}) {
  const handleChange = (e) => {
    const { id, value } = e.target;

    setShippingData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-border p-6 md:p-8"
    >
      <h2 className="font-display text-2xl font-bold">Shipping address</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={shippingData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Phone
          </label>

          <input
            id="phone"
            type="tel"
            value={shippingData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            First name
          </label>

          <input
            id="firstName"
            type="text"
            value={shippingData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Last name
          </label>

          <input
            id="lastName"
            type="text"
            value={shippingData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            value={shippingData.address}
            onChange={handleChange}
            autoComplete="street-address"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            City
          </label>

          <input
            id="city"
            type="text"
            value={shippingData.city}
            onChange={handleChange}
            autoComplete="address-level2"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            ZIP / Postal code
          </label>

          <input
            id="postalCode"
            type="text"
            value={shippingData.postalCode}
            onChange={handleChange}
            autoComplete="postal-code"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="btn-shine inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm font-semibold text-background"
        >
          Continue to payment
        </button>
      </div>
    </form>
  );
}
