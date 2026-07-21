import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function PromoBannerContent() {
  return (
    <div>
      <span className="inline-flex items-center gap-2 px-3 py-1 bg-royal-foreground/15 rounded-full text-xs font-semibold uppercase tracking-widest">
        Flash sale · 24h
      </span>

      <h3 className="mt-6 text-4xl font-bold leading-tight md:text-[50px]">
        Up to −40% on select performance styles
      </h3>

      <p className="mt-4 max-w-md text-sm text-royal-foreground/80">
        Members-only pricing on trainers, tights and outerwear. Ends midnight.
      </p>

      <Link
        to="/sale"
        className="mt-8 inline-flex h-12 px-6 items-center gap-2 rounded-full bg-royal-foreground text-sm font-semibold text-royal transition hover:opacity-90"
      >
        Shop the sale
        <GoArrowRight className="size-4" />
      </Link>
    </div>
  );
}
