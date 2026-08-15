import * as zod from "zod";
import { regex } from "./regex";

export const shippingSchema = zod.object({
  email: zod
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(regex.email, "Enter a valid email"),

  phone: zod
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]{10,20}$/, "Enter a valid phone number"),

  firstName: zod
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastName: zod
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

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
    .min(3, "Postal code is required")
    .max(10, "Postal code is too long"),
});
