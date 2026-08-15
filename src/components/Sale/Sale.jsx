import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SaleBanner from "./SaleBanner";
import SaleProducts from "./SaleProducts";
import Loader from "../ui/Loader";

import { getSaleProducts } from "../../services/apiProducts";

export default function Sale() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSaleProducts() {
      try {
        const data = await getSaleProducts(4);

        setProducts(data);
      } catch (error) {
        toast.error(error.message || "Failed to load sale products.");
      } finally {
        setIsLoading(false);
      }
    }

    loadSaleProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container-athlix flex min-h-96 items-center justify-center pt-10 md:pt-16">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container-athlix pt-10 md:pt-16">
      <SaleBanner />

      <SaleProducts products={products} />
    </div>
  );
}
