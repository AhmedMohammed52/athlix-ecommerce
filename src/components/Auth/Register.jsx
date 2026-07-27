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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data) {
    console.log(data);
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
      />

      <AuthDivider />

      <GoogleButton text="Sign Up with Google" />

      <RegisterBenefits />

      <AuthFooter text="Already a member?" link="Sign in" to="/login" />
    </AuthCard>
  );
}
