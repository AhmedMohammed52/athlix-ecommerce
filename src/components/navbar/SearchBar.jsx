import { FiSearch } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";

export default function SearchBar({ isSearchOpen, setIsSearchOpen }) {
  return (
    <div
      className={`overflow-hidden border-border/60 transition-all duration-300 ease-out ${isSearchOpen ? "border-t opacity-100 max-h-24" : "opacity-0 max-h-0"}`}
    >
      <div className="min-h-0">
        <div className="container-athlix flex items-center gap-3 py-4">
          <FiSearch className="size-5 text-muted-foreground" />

          <input
            placeholder="Search shoes, apparel, brands…"
            className="flex w-full rounded-md border-input py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 flex-1 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
          />

          <button
            className="inline-flex items-center justify-center size-9 rounded-full text-muted-foreground transition hover:bg-muted"
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
          >
            <HiXMark className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
