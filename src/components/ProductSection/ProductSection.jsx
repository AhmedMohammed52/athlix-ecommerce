import SectionHeader from "../ui/SectionHeader";
import ProductGrid from "../ui/ProductGrid";
import ProductGridSkeleton from "../ui/ProductGridSkeleton";

export default function ProductSection({
  eyebrow,
  title,
  linkText,
  products = [],
  buttonLink,
  isLoading = false,
  skeletonCount = 4,
}) {
  return (
    <>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        linkText={linkText}
        buttonLink={buttonLink}
      />

      {isLoading ? (
        <ProductGridSkeleton count={skeletonCount} />
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  );
}
