import { useState } from "react";

import ProductMeta from "./ProductMeta";
import ProductVariants from "./ProductVariants";
import ProductActions from "./ProductActions";
import ProductBenefits from "./ProductBenefits";

export default function ProductInfo({ product }) {
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <ProductMeta product={product} />

      <ProductVariants
        product={product}
        selectedColorId={selectedColorId}
        selectedSizeId={selectedSizeId}
        onColorChange={setSelectedColorId}
        onSizeChange={setSelectedSizeId}
      />

      <ProductActions
        product={product}
        selectedColorId={selectedColorId}
        selectedSizeId={selectedSizeId}
      />

      <ProductBenefits product={product} />
    </div>
  );
}
