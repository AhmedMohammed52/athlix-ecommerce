import * as zod from "zod";
import { regex } from "./regex";

export const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email is required")
    .regex(regex.email, "Enter valid Email"),

  password: zod
    .string()
    .min(1, "Password is required")
    .regex(
      regex.password,
      "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
});
