import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex gap-2 items-center shrink-0">
      <span className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
        <span className="size-8 flex items-center justify-center rounded-lg bg-foreground text-background">
          <span className="text-sm font-black">A</span>
        </span>
        ATHLIX
      </span>
    </Link>
  );
}
