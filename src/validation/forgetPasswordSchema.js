import * as zod from "zod";
import { regex } from "./regex";

export const forgetPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email is required")
    .regex(regex.email, "Enter valid Email"),
});
