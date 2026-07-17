import { Link } from "react-router-dom";

import sportsData from "./sportsData";

export default function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-180 -translate-x-1/2 pt-3 animate-fade-in opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-x-1/2">
      <div className="rounded-3xl border border-border bg-popover p-6 shadow-lift">
        <div className="grid grid-cols-4 gap-4">
          {sportsData.map((sport) => (
            <Link
              to={sport.path}
              className="overflow-hidden rounded-2xl group/card bg-muted"
            >
              <div className="overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
              </div>

              <div className="p-3">
                <p className="text-sm font-semibold">{sport.name}</p>
                <p className="text-xs text-muted-foreground">
                  {sport.products}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
