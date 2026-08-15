import { useEffect, useState } from "react";

import PromoBannerContent from "./PromoBannerContent";
import PromoBannerGallery from "./PromoBannerGallery";

import { getTopSaleProducts } from "../../../services/apiProducts";

export default function PromoBanner() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadSaleProducts() {
      try {
        const data = await getTopSaleProducts(3);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load sale products:", error);
      }
    }

    loadSaleProducts();
  }, []);

  return (
    <section className=" container-athlix py-16">
      <div className="bg-royal text-royal-foreground overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 p-8 md:p-14">
          <PromoBannerContent />

          <PromoBannerGallery products={products} />
        </div>
      </div>
    </section>
  );
}
