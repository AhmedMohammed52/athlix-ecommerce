import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  {
    label,
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    readOnly = false,
    disabled = false,
    error,
    autoComplete,
    ...props
  },
  ref,
) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>

      <input
        id={id}
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        autoComplete={autoComplete}
        {...props}
        className={`flex h-12 w-full rounded-xl px-3 text-sm transition-all duration-300 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60 ${
          error
            ? "border-2 border-red-500 bg-background text-foreground focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
            : readOnly
              ? "cursor-default border border-input bg-muted/40 text-muted-foreground"
              : "border-2 border-primary/30 bg-background text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
        }`}
      />

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default FormInput;
