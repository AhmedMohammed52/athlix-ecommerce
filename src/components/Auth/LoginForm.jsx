import { Link } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";
import EmailInput from "../ui/EmailInput";
import PrimaryButton from "../ui/PrimaryButton";

export default function LoginForm({ onSubmit, register, errors }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <EmailInput register={register} errors={errors} />

      <div className=" flex items-center justify-between mb-1.5">
        <label
          htmlFor="password"
          className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs"
        >
          Password
        </label>

        <Link
          className="text-xs font-medium text-royal hover:underline"
          to="/forgetPassword"
        >
          Forgot?
        </Link>
      </div>

      <PasswordInput
        id="password"
        placeholder="••••••••"
        register={register}
        errors={errors}
        name="password"
      />

      <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <input type="checkbox" className="size-4 rounded border-border" />
        Keep me signed in
      </label>

      <PrimaryButton text={"Sign in"} />
    </form>
  );
}
