import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../context/AuthContext";
import { getWishlist } from "../../services/apiWishlist";

import WishlistHeader from "./WishlistHeader";
import WishlistContent from "./WishlistContent";

export default function Wishlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: wishlistItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: getWishlist,
    enabled: !!user,
    staleTime: 0,
  });

  const products = wishlistItems.map((item) => item.products).filter(Boolean);

  const handleWishlistRemove = (productId) => {
    queryClient.setQueryData(["wishlist", user?.id], (currentItems = []) => {
      return currentItems.filter((item) => item.product_id !== productId);
    });
  };

  return (
    <section className="container-athlix py-10 md:py-14">
      <WishlistHeader count={products.length} />

      <WishlistContent
        products={products}
        isLoading={isLoading}
        error={error}
        user={user}
        onWishlistRemove={handleWishlistRemove}
      />
    </section>
  );
}
