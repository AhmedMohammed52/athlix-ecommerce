import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

export default function AuthHeader() {
  return (
    <div className="relative z-10 flex items-center justify-between px-5 pt-6 lg:px-10 lg:pt-8">
      <Link
        className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground lg:hidden"
        to="/"
      >
        <span className="flex items-center justify-center size-8 rounded-lg bg-foreground text-background">
          <span className="text-sm font-black">A</span>
        </span>
        ATHLIX
      </Link>

      <Link
        className="ml-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur transition hover:border-foreground/30 hover:text-foreground"
        to="/"
      >
        <GoArrowLeft className="size-3.5" />
        Back to home
      </Link>
    </div>
  );
}
