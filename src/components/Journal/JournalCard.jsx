import { FiClock } from "react-icons/fi";
import { IoCalendarNumber } from "react-icons/io5";

export default function JournalCard({ data }) {
  return (
    <article className="group">
      <div className="aspect-4/3 overflow-hidden rounded-2xl bg-muted">
        <img
          src={data.image}
          alt={data.category}
          className="object-cover size-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-[13px] font-semibold uppercase tracking-widest text-royal">
        {data.category}
      </p>

      <h3 className="mt-2 font-display text-[21px] font-bold leading-snug">
        {data.title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">{data.description}</p>

      <div className=" flex gap-6 items-center text-muted-foreground text-xs mt-3">
        <div className="flex items-center gap-1.5">
          <FiClock className="size-3.5" />
          {data.readTime}
        </div>

        <div className="flex items-center gap-1.5">
          <IoCalendarNumber className="size-3.5" />
          {data.date}
        </div>
      </div>
    </article>
  );
}
