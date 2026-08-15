import * as zod from "zod";

export const addressSchema = zod.object({
  label: zod.enum(["Home", "Work", "Other"], {
    error: "Please select an address type",
  }),

  firstName: zod
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: zod
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  phone: zod
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]{10,20}$/, "Enter a valid phone number"),

  address: zod
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(150, "Address is too long"),

  city: zod
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City is too long"),

  postalCode: zod
    .string()
    .trim()
    .min(3, "Postal code must be at least 3 characters")
    .max(10, "Postal code is too long"),

  isDefault: zod.boolean(),
});
