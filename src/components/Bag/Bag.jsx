import { useCart } from "../../context/CartContext";

import EmptyBag from "./EmptyBag";
import FilledBag from "./FilledBag/FilledBag";

import Loader from "../ui/Loader";

export default function Bag() {
  const { cartItems, loading } = useCart();

  if (loading && !cartItems.length) {
    return <Loader fullScreen />;
  }

  if (!cartItems.length) {
    return (
      <div className="container-athlix py-24 text-center flex flex-col items-center justify-center">
        <EmptyBag />
      </div>
    );
  }

  return <FilledBag />;
}
