import { Link } from "react-router-dom";

export default function PromoBannerGallery({ products }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((product) => {
        const primaryImage =
          product.product_images?.find((image) => image.is_primary) ||
          product.product_images?.[0];

        return (
          <Link
            className="group bg-royal-foreground/10 overflow-hidden rounded-2xl"
            to={`/shop/${product.id}`}
            key={product.id}
          >
            <div className="overflow-hidden aspect-square">
              <img
                src={primaryImage?.image_url}
                alt={product.name}
                className="group-hover:scale-105 duration-500 transition size-full object-cover"
                loading="lazy"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
