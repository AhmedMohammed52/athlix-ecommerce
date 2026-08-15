import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AddressTypeSelect from "./AddressTypeSelect";

import { addressSchema } from "../../../validation/addressSchema";

const initialForm = {
  label: "Home",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  isDefault: false,
};

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "mb-2 block text-xs font-medium text-muted-foreground";

export default function AddressModal({
  open,
  address,
  onClose,
  onSubmit,
  isSaving,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: initialForm,
    mode: "onSubmit",
  });

  const selectedLabel = watch("label");

  useEffect(() => {
    if (!open) return;

    if (address) {
      reset({
        label: address.label || "Home",
        firstName: address.first_name || "",
        lastName: address.last_name || "",
        phone: address.phone || "",
        address: address.address || "",
        city: address.city || "",
        postalCode: address.postal_code || "",
        isDefault: Boolean(address.is_default),
      });
    } else {
      reset(initialForm);
    }
  }, [open, address, reset]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  function handleFormSubmit(data) {
    onSubmit(data);
  }

  return (
    <div
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          flex
          max-h-[90vh]
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-background
          shadow-2xl
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* =========================
            Header
        ========================= */}

        <div className="shrink-0 border-b border-border px-6 py-5 md:px-7">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {address ? "Edit address" : "New address"}
              </p>

              <h2 className="mt-1.5 font-display text-2xl font-bold">
                {address ? "Update your address" : "Add a new address"}
              </h2>

              <p className="mt-1.5 max-w-md text-xs leading-5 text-muted-foreground">
                {address
                  ? "Update your saved delivery information."
                  : "Save your delivery information for a faster checkout."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              aria-label="Close"
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-full
                border border-border
                text-lg
                text-muted-foreground
                transition
                hover:bg-muted
                hover:text-foreground
                disabled:opacity-50
              "
            >
              ×
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            className="px-6 py-6 md:px-7 md:py-7"
          >
            <section>
              <h3 className="text-sm font-semibold">Address details</h3>

              <div className="mt-4">
                <label className={labelClass}>Address type</label>

                <AddressTypeSelect
                  value={selectedLabel}
                  onChange={(value) => {
                    setValue("label", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  error={errors.label?.message}
                  disabled={isSaving}
                />
              </div>
            </section>

            <div className="my-7 h-px bg-border" />

            <section>
              <h3 className="text-sm font-semibold">Personal information</h3>

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    disabled={isSaving}
                    {...register("firstName")}
                    className={`
                      ${inputClass}
                      ${
                        errors.firstName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    `}
                  />

                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    disabled={isSaving}
                    {...register("lastName")}
                    className={`
                      ${inputClass}
                      ${
                        errors.lastName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    `}
                  />

                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+20 10 1234 5678"
                    disabled={isSaving}
                    {...register("phone")}
                    className={`
                      ${inputClass}
                      ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    `}
                  />

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <div className="my-7 h-px bg-border" />
            <section>
              <h3 className="text-sm font-semibold">Shipping address</h3>

              <div className="mt-4 space-y-5">
                <div>
                  <label htmlFor="address" className={labelClass}>
                    Street address
                  </label>

                  <input
                    id="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Street name, building number, apartment"
                    disabled={isSaving}
                    {...register("address")}
                    className={`
                      ${inputClass}
                      ${
                        errors.address
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    `}
                  />

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className={labelClass}>
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Qena"
                      disabled={isSaving}
                      {...register("city")}
                      className={`
                        ${inputClass}
                        ${
                          errors.city
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }
                      `}
                    />

                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className={labelClass}>
                      Postal code
                    </label>

                    <input
                      id="postalCode"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="83511"
                      disabled={isSaving}
                      {...register("postalCode")}
                      className={`
                        ${inputClass}
                        ${
                          errors.postalCode
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }
                      `}
                    />

                    {errors.postalCode && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="my-7 h-px bg-border" />

            <label
              className="
                flex cursor-pointer
                items-start gap-3
                rounded-2xl
                border border-border
                bg-muted/20
                p-4
                transition
                hover:bg-muted/40
              "
            >
              <input
                type="checkbox"
                {...register("isDefault")}
                disabled={isSaving}
                className="mt-0.5 size-4 shrink-0 accent-current"
              />

              <span className="min-w-0">
                <span className="block text-sm font-semibold">
                  Make this my default address
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  This address will be selected automatically during checkout.
                </span>
              </span>
            </label>

            <div
              className="
                mt-7
                flex
                flex-col-reverse
                gap-3
                border-t
                border-border
                pt-6
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="
                  h-11
                  rounded-full
                  border border-border
                  px-6
                  text-sm font-medium
                  transition
                  hover:bg-muted
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="
                  btn-shine
                  h-11
                  rounded-full
                  bg-foreground
                  px-7
                  text-sm font-semibold
                  text-background
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSaving
                  ? "Saving..."
                  : address
                    ? "Save changes"
                    : "Add address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
