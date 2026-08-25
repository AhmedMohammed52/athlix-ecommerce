import ShopAside from "./ShopAside";
import ShopGrid from "./ShopGrid";

export default function ShopContent({
  selectedCategories,
  handleCategoryClick,
  products,
  handleBrandClick,
  selectedBrands,
  totalPages,
  setCurrentPage,
  currentPage,
  brands,
  clearAllFilters,
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <ShopAside
        selectedCategories={selectedCategories}
        handleCategoryClick={handleCategoryClick}
        handleBrandClick={handleBrandClick}
        selectedBrands={selectedBrands}
        brands={brands}
      />

      <ShopGrid
        products={products}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        onClearFilters={clearAllFilters}
      />
    </div>
  );
}
