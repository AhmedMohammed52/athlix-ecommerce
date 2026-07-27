export default function FormInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  readOnly,
}) {
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
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`
          flex h-12 w-full rounded-xl px-3 text-sm shadow-sm transition-all duration-300
          placeholder:text-muted-foreground

          ${
            readOnly
              ? `
                border border-input
                bg-muted/40
                text-muted-foreground
                cursor-default
              `
              : `
                border-2 border-primary/30
                bg-background
                text-foreground
                focus:outline-none
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              `
          }
        `}
      />
    </div>
  );
}
