import BagItems from "./BagItems";
import CartSummary from "./CartSummary";

export default function BagGrid({ cartItems }) {
  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] mt-10 gap-10">
      <BagItems cartItems={cartItems} />

      <CartSummary />
    </div>
  );
}
