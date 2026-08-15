import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { shippingSchema } from "../../../validation/shippingSchema";

export default function ShippingForm({
  shippingData,
  setShippingData,
  setCurrentStep,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData,
  });

  const onSubmit = (data) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            autoComplete="email"
            {...register("email")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
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
            autoComplete="tel"
            {...register("phone")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
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
            autoComplete="given-name"
            {...register("firstName")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.firstName && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
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
            autoComplete="family-name"
            {...register("lastName")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.lastName && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
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
            autoComplete="street-address"
            {...register("address")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.address && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.address.message}
            </p>
          )}
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
            autoComplete="address-level2"
            {...register("city")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.city && (
            <p className="mt-1.5 text-xs text-red-500">{errors.city.message}</p>
          )}
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
            autoComplete="postal-code"
            {...register("postalCode")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.postalCode && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.postalCode.message}
            </p>
          )}
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
