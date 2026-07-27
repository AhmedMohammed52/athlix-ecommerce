import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";

export default function LoginForm({ onSubmit, register, errors }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div>
        <label
          htmlFor="email"
          className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 text-xs"
        >
          Email
        </label>

        <div className="relative">
          <FiMail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            {...register("email")}
            type="email"
            id="email"
            className="flex w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 rounded-xl pl-11"
            placeholder="you@example.com"
          />
        </div>

        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className=" flex items-center justify-between mb-1">
        <label
          htmlFor="password"
          className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 text-xs"
        >
          Password
        </label>

        <Link className="text-xs font-medium text-royal hover:underline" to="/">
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

      <button
        type="submit"
        className="mt-2 btn-shine inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
      >
        Sign in
      </button>
    </form>
  );
}
