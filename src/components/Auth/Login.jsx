import AuthCard from "./AuthCard";
import AuthDivider from "./AuthDivider";
import AuthFooter from "./AuthFooter";
import AuthTitle from "./AuthTitle";
import GoogleButton from "./GoogleButton";
import LoginForm from "./LoginForm";

import { loginSchema } from "../../validation/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/account" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(formData) {
    try {
      await signIn(formData);

      toast.success("Welcome back 👋");

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AuthCard>
      <AuthTitle
        badge="Welcome Back"
        title="Sign in to ATHLIX"
        description="Access member pricing, early drops, and your order history."
      />

      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />

      <AuthDivider />

      <GoogleButton text="Continue with Google" />

      <AuthFooter
        text="New to ATHLIX?"
        link="Create an account"
        to="/register"
        state={{ from: location.state?.from || location }}
      />
    </AuthCard>
  );
}
