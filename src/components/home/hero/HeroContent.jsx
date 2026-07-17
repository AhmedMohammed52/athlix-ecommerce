import { GoArrowUpRight } from "react-icons/go";
import { IoMdArrowForward } from "react-icons/io";
import { LuSparkles } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function HeroContent() {
  return (
    <div className="relative z-10 animate-fade-up">
      <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-3 py-1 text-xs font-medium">
        <LuSparkles className="size-3.5" />
        Spring '26 collection is live
      </div>

      <h1 className="mt-6 text-5xl font-display font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        Move like
        <br />
        you mean it.
      </h1>

      <p className="mt-6 max-w-lg text-base text-background/70 md:text-lg">
        Precision-engineered footwear, apparel and equipment for athletes who
        refuse to settle. Every stitch tested. Every gram accounted for.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/product"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-background/90 group"
        >
          Shop the collection
          <IoMdArrowForward className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          to="/product"
          className="btn-shine inline-flex h-12 items-center gap-2 rounded-full border border-background/25 px-6 text-sm font-semibold text-background transition group"
        >
          Explore flash sale
          <GoArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid max-w-md grid-cols-3 text-center md:text-start gap-6 border-t border-background/10 pt-8">
        <div>
          <div className="text-3xl font-bold font-display">2M+</div>
          <div className="mt-1 text-xs text-background/60">Athletes</div>
        </div>

        <div>
          <div className="text-3xl font-bold font-display">180+</div>
          <div className="mt-1 text-xs text-background/60">Countries</div>
        </div>

        <div>
          <div className="text-3xl font-bold font-display">4.9★</div>
          <div className="mt-1 text-xs text-background/60">Rated</div>
        </div>
      </div>
    </div>
  );
}