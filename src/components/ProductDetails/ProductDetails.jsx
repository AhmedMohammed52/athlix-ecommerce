import { FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ProductHero from "./ProductHero/ProductHero";
import ProductDescription from "./ProductDescription";
import ProductSpecs from "./ProductSpecs/ProductSpecs";
import ProductReviews from "./ProductReviews/ProductReviews";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

import { getProductById } from "../../services/apiProducts";

export default function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container-athlix pt-6 pb-16">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link className="hover:text-foreground" to="/">
          Home
        </Link>

        <FaChevronRight className="size-2.5" />

        <Link className="hover:text-foreground" to="/shop">
          Shop
        </Link>

        <FaChevronRight className="size-2.5" />

        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <ProductHero product={product} />

      <ProductDescription product={product} />

      <ProductSpecs product={product} />

      <ProductReviews product={product} />

      <RelatedProducts product={product} />
    </div>
  );
}
