import SpecsCard from "./SpecsCard";

export default function ProductSpecs({ product }) {
  const specs = [
    {
      label: "Gender",
      value: product.gender,
    },
    {
      label: "Weight",
      value: product.weight ? `${product.weight} g` : null,
    },
    {
      label: "Drop Height",
      value: product.drop_height ? `${product.drop_height} mm` : null,
    },
    {
      label: "Upper Material",
      value: product.upper_material,
    },
    {
      label: "Midsole",
      value: product.midsole,
    },
    {
      label: "Stock",
      value: product.stock,
    },
  ];

  return (
    <div className="py-12 border-t border-border">
      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <h2 className="font-display font-bold text-2xl">
          Additional information
        </h2>

        <dl className="grid sm:grid-cols-2 gap-3">
          {specs
            .filter((spec) => spec.value !== null && spec.value !== undefined)
            .map((spec) => (
              <SpecsCard
                key={spec.label}
                label={spec.label}
                value={spec.value}
              />
            ))}
        </dl>
      </div>
    </div>
  );
}
