import { LuSlidersHorizontal } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

import SortDropdown from "./SortDropdown";
import sortOptions from "../../data/sortOptions";

export default function ShopFilter({
  selectedCategories,
  productsCount,
  sortBy,
  setSortBy,
  setCurrentPage,
  setIsMobileAsideOpen,
  selectedBrands,
  searchQuery,
  clearSearch,
  clearCategory,
  clearBrand,
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const searchMatchesCategory = selectedCategories.some(
    (category) => category.trim().toLowerCase() === normalizedSearch,
  );

  const searchMatchesBrand = selectedBrands.some(
    (brand) => brand.trim().toLowerCase() === normalizedSearch,
  );

  const showSearchFilter =
    Boolean(searchQuery) && !searchMatchesCategory && !searchMatchesBrand;

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    showSearchFilter;

  const selectedFilters = [
    ...selectedCategories.map((item) => ({
      type: "category",
      value: item,
    })),

    ...selectedBrands.map((item) => ({
      type: "brand",
      value: item,
    })),

    ...(showSearchFilter
      ? [
          {
            type: "search",
            value: searchQuery,
          },
        ]
      : []),
  ];

  const handleRemoveFilter = (filter) => {
    switch (filter.type) {
      case "category":
        clearCategory(filter.value);
        break;

      case "brand":
        clearBrand(filter.value);
        break;

      case "search":
        clearSearch();
        break;

      default:
        break;
    }
  };

  return (
    <div className="sticky top-16 md:top-20 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-athlix flex items-center gap-3 py-3">
        <button
          type="button"
          onClick={() => setIsMobileAsideOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition hover:bg-muted lg:hidden"
        >
          <LuSlidersHorizontal className="size-4" />
          Filters
        </button>

        <div className="hidden flex-wrap items-center gap-2 lg:flex">
          {!hasFilters && (
            <span className="text-sm text-muted-foreground">
              {productsCount} results
            </span>
          )}

          {selectedFilters.map((filter) => (
            <button
              key={`${filter.type}-${filter.value}`}
              type="button"
              onClick={() => handleRemoveFilter(filter)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground pl-3 pr-2 text-xs font-medium text-background transition hover:opacity-80"
            >
              <span>{filter.value}</span>

              <FaXmark className="size-3.5" />
            </button>
          ))}
        </div>

        <div ref={sortRef} className="relative ml-auto flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Sort
          </span>

          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex h-10 w-45 items-center justify-between whitespace-nowrap rounded-full border border-input bg-transparent px-3 text-sm shadow-sm transition hover:bg-muted"
          >
            <span className="font-medium">
              {sortOptions.find((item) => item.value === sortBy)?.label}
            </span>

            <IoIosArrowDown
              className={`size-4 opacity-50 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <SortDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
              setIsSortOpen={setIsSortOpen}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
