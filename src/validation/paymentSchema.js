import * as zod from "zod";

export const paymentSchema = zod.object({
  cardNumber: zod
    .string()
    .trim()
    .min(1, "Card number is required")
    .regex(
      /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
      "Enter a valid 16-digit card number",
    ),

  expiry: zod
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/, "Use MM / YY format"),

  cvc: zod
    .string()
    .trim()
    .regex(/^\d{3}$/, "CVC must be 3 digits"),

  nameOnCard: zod
    .string()
    .trim()
    .min(2, "Cardholder name is required")
    .max(100, "Cardholder name is too long"),
});
