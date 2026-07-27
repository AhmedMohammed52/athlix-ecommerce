import * as zod from "zod";
import { regex } from "./regex";

export const profileSchema = zod.object({
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

  phone: zod.number().min(12, "Phone is required"),
});
