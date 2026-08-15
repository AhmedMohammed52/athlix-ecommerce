import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { searchProducts } from "../../services/apiProducts";

export default function SearchBar({ isSearchOpen, setIsSearchOpen }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const search = query.trim();

    if (!search) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);

        const data = await searchProducts(search);

        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query, isSearchOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleClose() {
    setIsSearchOpen(false);
    setQuery("");
    setResults([]);
  }

  return (
    <div
      className={`overflow-visible border-border/60 transition-all duration-300 ease-out ${
        isSearchOpen
          ? "max-h-125 border-t opacity-100"
          : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <div className="container-athlix relative">
        <div className="flex items-center gap-3 py-4">
          <FiSearch className="size-5 shrink-0 text-muted-foreground" />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shoes, apparel, brands…"
            className="flex h-11 flex-1 rounded-md border-0 bg-transparent px-0 py-1 text-base shadow-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 md:text-sm"
          />

          <button
            type="button"
            aria-label="Close search"
            onClick={handleClose}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
          >
            <HiXMark className="size-4" />
          </button>
        </div>

        {query.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 border-t border-border/60 bg-background shadow-xl">
            <div className="container-athlix py-3">
              {isLoading ? (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  {results.map((product) => {
                    const primaryImage =
                      product.product_images?.find(
                        (image) => image.is_primary,
                      ) || product.product_images?.[0];

                    return (
                      <Link
                        key={product.id}
                        to={`/shop/${product.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 px-4 py-3 transition hover:bg-muted"
                      >
                        <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                          {primaryImage?.image_url && (
                            <img
                              src={primaryImage.image_url}
                              alt={product.name}
                              className="size-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {product.brands?.name || "ATHLIX"}
                            {product.categories?.name &&
                              ` · ${product.categories.name}`}
                          </p>
                        </div>

                        <span className="ml-auto shrink-0 text-sm font-semibold">
                          ${product.price}
                        </span>
                      </Link>
                    );
                  })}

                  <Link
                    to={`/shop?search=${encodeURIComponent(query.trim())}`}
                    onClick={handleClose}
                    className="flex h-12 items-center justify-center border-t border-border text-sm font-semibold transition hover:bg-muted"
                  >
                    View all results
                  </Link>
                </div>
              ) : (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No products found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
