import sportsData from "../../data/sportsData";

export default function ShopAside({
  selectedCategories,
  handleCategoryClick,
  handleBrandClick,
  selectedBrands,
  brands,
}) {
  return (
    <div className=" hidden lg:block">
      <div className="sticky top-40">
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
              Sport
            </p>

            <div className=" flex flex-wrap gap-2">
              {sportsData.map((sport) => (
                <button
                  key={sport.name}
                  onClick={() => handleCategoryClick(sport.name)}
                  className={`inline-flex items-center justify-center h-9 rounded-full px-4 border text-xs font-medium transition
      ${
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
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
              Brand
            </p>

            <div className=" flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => handleBrandClick(brand.name)}
                  className={`inline-flex items-center justify-center h-9 rounded-full px-4 border text-xs font-medium transition
      ${
        selectedBrands.includes(brand.name)
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
