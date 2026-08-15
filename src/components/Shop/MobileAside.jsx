import { HiXMark } from "react-icons/hi2";
import sportsData from "../../data/sportsData";

export default function MobileAside({
  handleCategoryClick,
  selectedCategories,
  handleBrandClick,
  selectedBrands,
  isMobileAsideOpen,
  setIsMobileAsideOpen,
  brands = [],
}) {
  return (
    <div className="h-full flex flex-col">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-background border-r border-border shadow-lg transition-transform duration-300 ease-in-out p-6
          ${isMobileAsideOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="close menu"
          onClick={() => setIsMobileAsideOpen(false)}
        >
          <HiXMark className="size-5" />
        </button>

        <h3 className="text-xl font-display font-bold mb-6">Filters</h3>

        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground tracking-widest">
              Sport
            </p>

            <div className="flex flex-wrap gap-2">
              {sportsData.map((sport) => (
                <button
                  key={sport.name}
                  type="button"
                  onClick={() => {
                    handleCategoryClick(sport.name);
                    setIsMobileAsideOpen(false);
                  }}
                  className={`inline-flex items-center justify-center h-9 rounded-full px-4 border text-xs font-medium transition ${
                    selectedCategories.includes(sport.name)
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-foreground border-border hover:border-foreground"
                  }`}
                >
                  {sport.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground tracking-widest">
              Brand
            </p>

            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand.id || brand.name}
                  type="button"
                  onClick={() => {
                    handleBrandClick(brand.name);
                    setIsMobileAsideOpen(false);
                  }}
                  className={`inline-flex items-center justify-center h-9 rounded-full px-4 border text-xs font-medium transition ${
                    selectedBrands.some(
                      (selectedBrand) =>
                        selectedBrand.toLowerCase() ===
                        brand.name.toLowerCase(),
                    )
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-foreground border-border hover:border-foreground"
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
