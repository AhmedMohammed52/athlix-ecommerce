import { useEffect } from "react";

export default function ProductVariants({
  product,
  selectedColorId,
  selectedSizeId,
  onColorChange,
  onSizeChange,
}) {
  const colors = product?.product_colors || [];
  const sizes = product?.product_sizes || [];

  useEffect(() => {
    if (!selectedColorId && colors.length) {
      onColorChange(colors[0].id);
    }
  }, [colors, selectedColorId, onColorChange]);

  useEffect(() => {
    const availableSize = sizes.find((size) => Number(size.stock || 0) > 0);

    if (!selectedSizeId && availableSize) {
      onSizeChange(availableSize.id);
    }
  }, [sizes, selectedSizeId, onSizeChange]);

  return (
    <div className="mt-8">
      {colors.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Color</p>

            <p className="text-xs text-muted-foreground">
              {colors.find((color) => color.id === selectedColorId)?.name ||
                "Select color"}
            </p>
          </div>

          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => onColorChange(color.id)}
                aria-label={`Select ${color.name}`}
                className={`flex size-10 items-center justify-center rounded-full border-2 transition ${
                  selectedColorId === color.id
                    ? "border-foreground"
                    : "border-transparent"
                }`}
              >
                <span
                  className="size-7 rounded-full border border-border"
                  style={{
                    backgroundColor: color.hex_code,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold">Size</p>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {sizes.map((size) => {
              const isOutOfStock = Number(size.stock || 0) <= 0;

              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => onSizeChange(size.id)}
                  className={`h-12 rounded-xl border px-4 text-sm font-medium transition-all duration-200 ${
                    selectedSizeId === size.id
                      ? "border-foreground bg-foreground text-background"
                      : isOutOfStock
                        ? "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50"
                        : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:shadow-sm"
                  }`}
                >
                  {size.size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
