export default function PrimaryButton({ text, icon: Icon, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-2 btn-shine inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
    >
      {Icon && <Icon className="size-4" />} {text}
    </button>
  );
}
