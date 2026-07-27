import AuthCard from "./AuthCard";
import AuthFooter from "./AuthFooter";
import AuthTitle from "./AuthTitle";
import ForgetForm from "./ForgetForm";

import { forgetPasswordSchema } from "../../validation/forgetPasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function onSubmit(formData) {
    try {
      await resetPassword(formData.email);

      toast.success("Password reset link sent.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AuthCard>
      <AuthTitle
        badge="Password reset"
        title="Forgot your password?"
        description="Enter your email and we'll send you a link to reset it."
      />

      <ForgetForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />

      <AuthFooter text="Remembered it?" link="Back to sign in" to="/login" />
    </AuthCard>
  );
}
