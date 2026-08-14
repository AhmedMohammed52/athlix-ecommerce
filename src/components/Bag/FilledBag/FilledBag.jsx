import BagGrid from "./BagGrid/BagGrid";
import BagHeader from "./BagHeader";

import { useCart } from "../../../context/CartContext";

export default function FilledBag() {
  const { cartItems, cartCount } = useCart();

  return (
    <div className="container-athlix py-10 md:py-14">
      <BagHeader count={cartCount} />

      <BagGrid cartItems={cartItems} />
    </div>
  );
}
