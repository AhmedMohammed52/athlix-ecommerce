import { useState } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";

export default function PasswordInput({
  id,
  name,
  placeholder,
  onChange,
  label,
  register,
  errors,
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <LuLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

        <input
          id={id}
          {...register(id)}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          placeholder={placeholder}
          className="flex h-12 w-full rounded-xl border border-input bg-transparent pl-11 pr-11 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-muted"
        >
          {showPassword ? (
            <LuEyeOff className="size-4" />
          ) : (
            <LuEye className="size-4" />
          )}
        </button>
      </div>

      {errors?.[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
      )}

      {children}
    </div>
  );
}
