import AuthCard from "./AuthCard";
import AuthDivider from "./AuthDivider";
import AuthFooter from "./AuthFooter";
import AuthTitle from "./AuthTitle";
import GoogleButton from "./GoogleButton";
import LoginForm from "./LoginForm";

import { loginSchema } from "../../validation/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data) {
    console.log(data);
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
      />
    </AuthCard>
  );
}
