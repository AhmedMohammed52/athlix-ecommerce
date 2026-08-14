import BagItemCard from "./BagItemCard";

export default function BagItems({ cartItems }) {
  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <BagItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
