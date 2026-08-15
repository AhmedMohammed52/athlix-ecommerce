import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function CategoryCard({ data, isLoading }) {
  return (
    <Link
      className="group relative overflow-hidden rounded-3xl bg-foreground"
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

      <div className="absolute inset-x-0 bottom-0 p-5 text-background bg-linear-to-t from-foreground via-foreground/60 to-transparent">
        <p className="tracking-widest text-xs uppercase text-background/70">
          {isLoading ? "Loading..." : `${data.productsCount} Products`}
        </p>

        <div className="flex items-center justify-between mt-1">
          <p className="font-bold text-2xl font-display">{data.name}</p>

          <GoArrowRight className="size-6 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
