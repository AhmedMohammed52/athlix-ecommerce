import { useEffect, useState } from "react";

export default function ProductGallery({ product }) {
  const images = [...(product?.product_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const primaryImage =
    images.find((img) => img.is_primary)?.image_url ||
    images[0]?.image_url ||
    "https://placehold.co/600x600?text=No+Image";

  const [selectedImage, setSelectedImage] = useState(primaryImage);

  useEffect(() => {
    setSelectedImage(primaryImage);
  }, [primaryImage]);

  if (!product) return null;

  return (
    <div className="grid gap-4 md:grid-cols-[80px_1fr]">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
        {images.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedImage(item.image_url)}
            className={`size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition duration-300 ${
              selectedImage === item.image_url
                ? "border-foreground"
                : "border-transparent hover:border-border"
            }`}
          >
            <img
              src={item.image_url}
              alt={product.name}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 overflow-hidden rounded-3xl bg-muted md:order-2">
        <div className="aspect-square">
          <img
            src={selectedImage}
            alt={product.name}
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
