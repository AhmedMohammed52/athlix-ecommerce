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
}) {
  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-10">
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
      />
    </div>
  );
}
