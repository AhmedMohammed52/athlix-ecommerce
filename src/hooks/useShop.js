import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PRODUCTS_PER_PAGE = 6;

export default function useShop(products = []) {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileAsideOpen, setIsMobileAsideOpen] = useState(false);

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }

    setCurrentPage(1);
  }, [category]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((item) => item !== categoryName);
      }

      return [...prev, categoryName];
    });

    setCurrentPage(1);
  };

  const handleBrandClick = (brandName) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandName)) {
        return prev.filter((item) => item !== brandName);
      }

      return [...prev, brandName];
    });

    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categories?.name);

    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brands?.name);

    return categoryMatch && brandMatch;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "newest":
      sortedProducts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      break;

    case "price-low":
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
      break;

    case "price-high":
      sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
      break;

    case "rating":
      sortedProducts.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0),
      );
      break;

    default:
      break;
  }

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  return {
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
  };
}
