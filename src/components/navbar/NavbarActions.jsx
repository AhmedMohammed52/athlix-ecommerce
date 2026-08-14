import { FaRegHeart } from "react-icons/fa6";
import { FiSearch, FiUser } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";

import { useWishlist } from "../../context/WishlistContext";

import { useCart } from "../../context/CartContext";

export default function NavbarActions({ isSearchOpen, setIsSearchOpen }) {
  const { wishlistProductIds } = useWishlist();

  const wishlistCount = wishlistProductIds.length;

  const { cartCount } = useCart();

  return (
    <>
      <div className="flex items-center gap-1 ml-auto md:ml-2">
        {/* Search */}
        <button
          className="size-11 inline-flex items-center justify-center rounded-full text-foreground transition hover:bg-muted"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FiSearch className="size-5" />
        </button>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative hidden size-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted sm:inline-flex"
        >
          <FaRegHeart className="size-5" />

          {wishlistCount > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </Link>

        {/* Account */}
        <Link
          to="/account"
          className="relative hidden size-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted sm:inline-flex"
        >
          <FiUser className="size-5" />
        </Link>

        {/* Bag */}
        <Link
          to="/bag"
          className="relative inline-flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
        >
          <LuShoppingBag className="size-5" />

          {cartCount > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}
