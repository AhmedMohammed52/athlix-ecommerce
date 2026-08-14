import ShopContent from "./ShopContent";
import ShopFilter from "./ShopFilter";
import ShopHeader from "./ShopHeader";
import MobileAside from "./MobileAside";
import MenuOverlay from "../navbar/MenuOverlay";
import useShop from "../../hooks/useShop";
import Loader from "../ui/Loader";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { getBrands } from "../../services/apiBrands";

export default function Shop() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const {
    data: brands = [],
    isLoading: isBrandsLoading,
    error: brandsError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const {
    selectedCategories,
    selectedBrands,
    sortBy,
    currentPage,
    isMobileAsideOpen,

    currentProducts,
    totalPages,
    filteredProducts,

    handleCategoryClick,
    handleBrandClick,

    setSortBy,
    setCurrentPage,
    setIsMobileAsideOpen,
  } = useShop(products);

  if (isLoading || isBrandsLoading) return <Loader fullScreen />;
  if (error) return <p>{error.message}</p>;

  if (brandsError) return <p>{brandsError.message}</p>;

  return (
    <>
      <section className=" border-b border-border bg-muted/50">
        <ShopHeader
          handleCategoryClick={handleCategoryClick}
          productsCount={products?.length || 0}
        />
      </section>

      <ShopFilter
        selectedCategories={selectedCategories}
        handleCategoryClick={handleCategoryClick}
        productsCount={filteredProducts.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
        setIsMobileAsideOpen={setIsMobileAsideOpen}
        selectedBrands={selectedBrands}
        handleBrandClick={handleBrandClick}
      />

      <div className=" container-athlix py-10">
        <ShopContent
          selectedCategories={selectedCategories}
          handleCategoryClick={handleCategoryClick}
          selectedBrands={selectedBrands}
          handleBrandClick={handleBrandClick}
          products={currentProducts}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          brands={brands}
        />
      </div>

      <MobileAside
        isMobileAsideOpen={isMobileAsideOpen}
        setIsMobileAsideOpen={setIsMobileAsideOpen}
        handleCategoryClick={handleCategoryClick}
        selectedCategories={selectedCategories}
        handleBrandClick={handleBrandClick}
        selectedBrands={selectedBrands}
      />

      <MenuOverlay
        isMobileAsideOpen={isMobileAsideOpen}
        setIsMobileAsideOpen={setIsMobileAsideOpen}
      />
    </>
  );
}
