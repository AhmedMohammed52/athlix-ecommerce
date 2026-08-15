import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { paymentSchema } from "../../../validation/paymentSchema";

export default function PaymentForm({
  paymentData,
  setPaymentData,
  setCurrentStep,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentData,
  });

  const onSubmit = (data) => {
    setPaymentData(data);
    setCurrentStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            placeholder="4242 4242 4242 4242"
            {...register("cardNumber")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.cardNumber && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.cardNumber.message}
            </p>
          )}
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
            placeholder="MM / YY"
            {...register("expiry")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.expiry && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.expiry.message}
            </p>
          )}
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
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={3}
            placeholder="123"
            {...register("cvc")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.cvc && (
            <p className="mt-1.5 text-xs text-red-500">{errors.cvc.message}</p>
          )}
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
            {...register("nameOnCard")}
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
          />

          {errors.nameOnCard && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.nameOnCard.message}
            </p>
          )}
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
