import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../../context/AuthContext";
import { getWishlist } from "../../../services/apiWishlist";

export default function UserStats({ orderCount = 0 }) {
  const { user } = useAuth();

  const { data: wishlistItems = [] } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: getWishlist,
    enabled: !!user,
  });

  const savedCount = wishlistItems.length;

  return (
    <div className="ml-auto hidden gap-6 md:flex">
      <div>
        <p className="font-display text-2xl font-bold">{orderCount}</p>
        <p className="text-xs text-muted-foreground">Orders</p>
      </div>

      <div>
        <p className="font-display text-2xl font-bold">{savedCount}</p>
        <p className="text-xs text-muted-foreground">Saved</p>
      </div>

      <div>
        <p className="font-display text-2xl font-bold">0</p>
        <p className="text-xs text-muted-foreground">Points</p>
      </div>
    </div>
  );
}
