import EmptyWishlistContent from "./EmptyWishlistContent";
import WishlistGrid from "./WishlistGrid";
import Loader from "../ui/Loader";

export default function WishlistContent({
  products,
  isLoading,
  error,
  user,
  onWishlistRemove,
}) {
  if (!user) {
    return <EmptyWishlistContent />;
  }

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="mt-16 text-center text-sm text-destructive">
        {error.message}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyWishlistContent />;
  }

  return (
    <WishlistGrid products={products} onWishlistRemove={onWishlistRemove} />
  );
}
