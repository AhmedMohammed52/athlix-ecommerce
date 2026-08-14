import WishlistCard from "./WishlistCard";

export default function WishlistGrid({ wishlistItems, onItemRemoved }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {wishlistItems.map((item) => (
        <WishlistCard key={item.id} item={item} onItemRemoved={onItemRemoved} />
      ))}
    </div>
  );
}
