import { useState } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";

export default function SecurityPasswordInput({
  id,
  label,
  placeholder,
  autoComplete,
  register,
  error,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>

      <div className="relative">
        <LuLock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          {...register(id)}
          className={`flex h-12 w-full rounded-xl border bg-transparent pl-11 pr-11 text-sm shadow-sm transition focus:outline-none focus:ring-1 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-input focus:border-foreground focus:ring-ring"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        />

        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {showPassword ? (
            <LuEyeOff className="size-4" />
          ) : (
            <LuEye className="size-4" />
          )}
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
