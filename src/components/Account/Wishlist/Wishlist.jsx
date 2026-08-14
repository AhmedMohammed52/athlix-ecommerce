import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "../../../services/apiWishlist";
import { useAuth } from "../../../context/AuthContext";

import EmptyWishlist from "./EmptyWishlist";
import WishlistGrid from "./WishlistGrid";
import Loader from "../../ui/Loader";

export default function Wishlist() {
  const { user } = useAuth();

  const {
    data: wishlistItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: getWishlist,
    enabled: !!user,
  });

  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    setDisplayedItems(wishlistItems);
  }, [wishlistItems]);

  const handleItemRemoved = (productId) => {
    setDisplayedItems((prev) =>
      prev.filter((item) => item.product_id !== productId),
    );
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="py-8">
        <p className="text-sm text-red-500">{error.message}</p>
      </div>
    );
  }

  if (!displayedItems.length) {
    return <EmptyWishlist />;
  }

  return (
    <WishlistGrid
      wishlistItems={displayedItems}
      onItemRemoved={handleItemRemoved}
    />
  );
}
