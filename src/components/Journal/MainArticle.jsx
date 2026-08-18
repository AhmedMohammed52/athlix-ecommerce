import { FiClock } from "react-icons/fi";
import { runningImage } from "../../assets/index";
import { IoCalendarNumber } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function MainArticle() {
  return (
    <article className=" group grid gap-8 md:grid-cols-2 overflow-hidden border border-border rounded-3xl">
      <div className=" aspect-4/3 md:aspect-auto overflow-hidden">
        <img
          src={runningImage}
          alt="Sport Image"
          className=" object-cover size-full transition-transform duration-700  group-hover:scale-105"
        />
      </div>

      <div className=" p-8 md:p-14">
        <span className="  inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 text-xs font-semibold uppercase tracking-widest text-royal">
          Athlete story
        </span>

        <h2 className=" font-display font-bold text-4xl md:text-6xl my-3">
          Chasing 2:05 — inside the Aero Runner Pro build
        </h2>

        <p className=" max-w-sm text-xl text-muted-foreground mt-4">
          How our race team engineered the plate, foam and fit that took the
          podium in Berlin.
        </p>

        <div className=" flex gap-6 items-center text-muted-foreground text-sm mt-6">
          <div className="flex items-center gap-1.5">
            <FiClock className="size-3.5" />8 min read
          </div>

          <div className="flex items-center gap-1.5">
            <IoCalendarNumber className="size-3.5" />
            Jul 18, 2026
          </div>
        </div>

        <Link
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-foreground story-link"
          to="/shop"
        >
          Read the story
          <GoArrowRight className=" size-3.5" />
        </Link>
      </div>
    </article>
  );
}
