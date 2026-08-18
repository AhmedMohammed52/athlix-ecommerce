import SpecsCard from "./SpecsCard";

export default function ProductSpecs({ product }) {
  const specs = [
    {
      label: "Weight",
      value: product.weight ? `${product.weight} g` : null,
    },
    {
      label: "Drop",
      value: product.drop_height ? `${product.drop_height} mm` : null,
    },
    {
      label: "Upper",
      value: product.upper_material,
    },
    {
      label: "Midsole",
      value: product.midsole,
    },
    {
      label: "Category",
      value: product.categories?.name,
    },
    {
      label: "Sport",
      value: product.sport,
    },
    {
      label: "Brand",
      value: product.brands?.name,
    },
    {
      label: "Gender",
      value: product.gender,
    },
  ];

  return (
    <div className="py-12 border-t border-border">
      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <h2 className="font-display font-bold text-2xl">
          Additional information
        </h2>

        <dl className="grid gap-3 sm:grid-cols-2">
          {specs
            .filter(
              (spec) =>
                spec.value !== null &&
                spec.value !== undefined &&
                spec.value !== "",
            )
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
