import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PRODUCTS_PER_PAGE = 6;

const normalizeValue = (value = "") => {
  return value.trim().toLowerCase();
};

const uniqueValues = (values = []) => {
  const map = new Map();

  values.forEach((value) => {
    const trimmed = value?.trim();

    if (!trimmed) return;

    const normalized = normalizeValue(trimmed);

    if (!map.has(normalized)) {
      map.set(normalized, trimmed);
    }
  });

  return [...map.values()];
};

const parseFilterParam = (value = "") => {
  if (!value) return [];

  return uniqueValues(
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
};

export default function useShop(products = []) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim() || "";
  const categoryQuery = searchParams.get("category")?.trim() || "";
  const brandQuery = searchParams.get("brand")?.trim() || "";

  const categoriesFromUrl = useMemo(
    () => parseFilterParam(categoryQuery),
    [categoryQuery],
  );

  const brandsFromUrl = useMemo(
    () => parseFilterParam(brandQuery),
    [brandQuery],
  );

  const [selectedCategories, setSelectedCategories] =
    useState(categoriesFromUrl);

  const [selectedBrands, setSelectedBrands] = useState(brandsFromUrl);

  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileAsideOpen, setIsMobileAsideOpen] = useState(false);

  const lastSearchSyncRef = useRef("");

  const updateUrl = (changes = {}) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
      ) {
        nextParams.set(key, String(value));
      } else {
        nextParams.delete(key);
      }
    });

    setSearchParams(nextParams);
  };

  useEffect(() => {
    setSelectedCategories(categoriesFromUrl);
    setSelectedBrands(brandsFromUrl);
    setCurrentPage(1);
  }, [categoriesFromUrl, brandsFromUrl]);

  const handleCategoryClick = (categoryName) => {
    const normalizedCategory = normalizeValue(categoryName);

    const exists = selectedCategories.some(
      (category) => normalizeValue(category) === normalizedCategory,
    );

    const nextCategories = exists
      ? selectedCategories.filter(
          (category) => normalizeValue(category) !== normalizedCategory,
        )
      : uniqueValues([...selectedCategories, categoryName]);

    setSelectedCategories(nextCategories);

    updateUrl({
      category: nextCategories.length > 0 ? nextCategories.join(",") : null,
    });

    setCurrentPage(1);
  };

  const handleBrandClick = (brandName) => {
    const normalizedBrand = normalizeValue(brandName);

    const exists = selectedBrands.some(
      (brand) => normalizeValue(brand) === normalizedBrand,
    );

    const nextBrands = exists
      ? selectedBrands.filter(
          (brand) => normalizeValue(brand) !== normalizedBrand,
        )
      : uniqueValues([...selectedBrands, brandName]);

    setSelectedBrands(nextBrands);

    updateUrl({
      brand: nextBrands.length > 0 ? nextBrands.join(",") : null,
    });

    setCurrentPage(1);
  };

  useEffect(() => {
    if (!searchQuery || products.length === 0) {
      lastSearchSyncRef.current = "";
      return;
    }

    if (lastSearchSyncRef.current === searchQuery) {
      return;
    }

    const normalizedSearch = normalizeValue(searchQuery);

    const matchingCategory = products.find(
      (product) =>
        normalizeValue(product.categories?.name) === normalizedSearch,
    )?.categories?.name;

    const matchingBrand = products.find(
      (product) => normalizeValue(product.brands?.name) === normalizedSearch,
    )?.brands?.name;

    if (matchingBrand) {
      const alreadySelected = brandsFromUrl.some(
        (brand) => normalizeValue(brand) === normalizeValue(matchingBrand),
      );

      if (!alreadySelected) {
        updateUrl({
          brand: uniqueValues([...brandsFromUrl, matchingBrand]).join(","),
        });
      }
    }

    if (matchingCategory) {
      const alreadySelected = categoriesFromUrl.some(
        (category) =>
          normalizeValue(category) === normalizeValue(matchingCategory),
      );

      if (!alreadySelected) {
        updateUrl({
          category: uniqueValues([...categoriesFromUrl, matchingCategory]).join(
            ",",
          ),
        });
      }
    }

    lastSearchSyncRef.current = searchQuery;
    setCurrentPage(1);
  }, [searchQuery, products, brandsFromUrl, categoriesFromUrl]);

  const clearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete("search");

    setSearchParams(nextParams);

    lastSearchSyncRef.current = "";

    setCurrentPage(1);
  };

  const clearCategory = (categoryName = null) => {
    let nextCategories;

    if (categoryName) {
      const normalizedCategory = normalizeValue(categoryName);

      nextCategories = selectedCategories.filter(
        (category) => normalizeValue(category) !== normalizedCategory,
      );
    } else {
      nextCategories = [];
    }

    nextCategories = uniqueValues(nextCategories);

    setSelectedCategories(nextCategories);

    const nextParams = new URLSearchParams(searchParams);

    if (nextCategories.length > 0) {
      nextParams.set("category", nextCategories.join(","));
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);

    setCurrentPage(1);
  };

  const clearBrand = (brandName = null) => {
    let nextBrands;

    if (brandName) {
      const normalizedBrand = normalizeValue(brandName);

      nextBrands = selectedBrands.filter(
        (brand) => normalizeValue(brand) !== normalizedBrand,
      );
    } else {
      nextBrands = [];
    }

    nextBrands = uniqueValues(nextBrands);

    const normalizedSearch = normalizeValue(searchQuery);

    const removedBrandMatchesSearch =
      brandName && normalizedSearch === normalizeValue(brandName);

    const nextParams = new URLSearchParams(searchParams);

    if (nextBrands.length > 0) {
      nextParams.set("brand", nextBrands.join(","));
    } else {
      nextParams.delete("brand");
    }

    if (removedBrandMatchesSearch) {
      nextParams.delete("search");
      lastSearchSyncRef.current = "";
    }

    setSelectedBrands(nextBrands);
    setSearchParams(nextParams);

    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setCurrentPage(1);
    lastSearchSyncRef.current = "";

    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeValue(searchQuery);

    return products.filter((product) => {
      const productName = normalizeValue(product.name);

      const brandName = normalizeValue(product.brands?.name);

      const categoryName = normalizeValue(product.categories?.name);

      const searchMatch =
        !normalizedSearch ||
        productName.includes(normalizedSearch) ||
        brandName.includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (category) => normalizeValue(category) === categoryName,
        );

      const brandMatch =
        selectedBrands.length === 0 ||
        selectedBrands.some((brand) => normalizeValue(brand) === brandName);

      return searchMatch && categoryMatch && brandMatch;
    });
  }, [products, searchQuery, selectedCategories, selectedBrands]);

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;

      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "rating":
        result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;

      default:
        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (totalPages === 0) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return {
    searchQuery,

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

    clearSearch,
    clearCategory,
    clearBrand,
    clearAllFilters,

    setSortBy,
    setCurrentPage,
    setIsMobileAsideOpen,
  };
}
