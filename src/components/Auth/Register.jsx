import AuthCard from "./AuthCard";
import AuthDivider from "./AuthDivider";
import AuthFooter from "./AuthFooter";
import AuthTitle from "./AuthTitle";
import GoogleButton from "./GoogleButton";
import RegisterBenefits from "./RegisterBenefits";
import RegisterForm from "./RegisterForm";

import { registerSchema } from "../../validation/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUp } from "../../services/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/account";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(formData) {
    try {
      setIsLoading(true);

      await signUp(formData);

      reset();

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard>
      <AuthTitle
        badge="Join ATHLIX"
        title="Create your account"
        description="Get 10% off your first order plus early access to drops."
      />

      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isLoading={isLoading}
      />

      <AuthDivider />

      <GoogleButton text="Sign Up with Google" />

      <RegisterBenefits />

      <AuthFooter text="Already a member?" link="Sign in" to="/login" />
    </AuthCard>
  );
}
