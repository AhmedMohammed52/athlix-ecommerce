import { FaGoogle } from "react-icons/fa";

export default function GoogleButton({ text }) {
  return (
    <button
      type="button"
      className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md active:translate-y-0"
    >
      <FaGoogle className="size-3 text-destructive/80 transition-transform group-hover:scale-110" />

      {text}
    </button>
  );
}
