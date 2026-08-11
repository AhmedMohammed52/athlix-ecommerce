import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";

import RelatedProductsHeader from "./RelatedProductsHeader";
import RelatedProductsSlider from "./RelatedProductsSlider";
import { getRelatedProducts } from "../../../services/apiProducts";

export default function RelatedProducts({ product }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const {
    data: relatedProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["related-products", product?.id],
    queryFn: () => getRelatedProducts(product),
    enabled: !!product?.id && !!product?.category_id,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (isLoading || error || !relatedProducts.length) {
    return null;
  }

  return (
    <div className="py-16 border-t border-border">
      <RelatedProductsHeader scrollPrev={scrollPrev} scrollNext={scrollNext} />

      <RelatedProductsSlider emblaRef={emblaRef} products={relatedProducts} />
    </div>
  );
}
