import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../context/AuthContext";
import { getWishlist } from "../../services/apiWishlist";

import WishlistHeader from "./WishlistHeader";
import WishlistContent from "./WishlistContent";

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
    staleTime: 0,
  });

  const products = wishlistItems.map((item) => item.products).filter(Boolean);

  return (
    <section className="container-athlix py-10 md:py-14">
      <WishlistHeader count={products.length} />

      <WishlistContent
        products={products}
        isLoading={isLoading}
        error={error}
        user={user}
      />
    </section>
  );
}
