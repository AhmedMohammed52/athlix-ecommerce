import * as zod from "zod";
import { regex } from "./regex";

export const registerSchema = zod.object({
  firstName: zod
    .string()
    .min(2, "Min Lenght must be at least 2 Characters")
    .max(50, "Max Lenght must be at most 50 Characters"),

  lastName: zod
    .string()
    .min(2, "Min Lenght must be at least 2 Characters")
    .max(50, "Max Lenght must be at most 50 Characters"),

  email: zod
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(regex.email, "Enter valid Email"),

  password: zod
    .string()
    .min(1, "Password is required")
    .regex(
      regex.password,
      "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    ),

  terms: zod.literal(true, {
    errorMap: () => ({
      message: "You must accept the terms.",
    }),
  }),
});
