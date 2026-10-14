import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function CategoryCard({ data, isLoading }) {
  return (
    <Link
      className="group relative overflow-hidden rounded-2xl bg-foreground sm:rounded-3xl"
      to={data.path}
    >
      <div className="aspect-3/4 overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          loading="lazy"
          className="size-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground via-foreground/60 to-transparent p-3 text-background sm:p-5">
        <p className="text-[10px] uppercase tracking-wider text-background/70 sm:text-xs sm:tracking-widest">
          {isLoading ? "Loading..." : `${data.productsCount} Products`}
        </p>

        <div className="mt-1 flex items-center justify-between gap-1">
          <p className="truncate font-display text-lg font-bold sm:text-2xl">
            {data.name}
          </p>

          <GoArrowRight className="size-4 shrink-0 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:size-6 sm:-translate-x-2" />
        </div>
      </div>
    </Link>
  );
}
