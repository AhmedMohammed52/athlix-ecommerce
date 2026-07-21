import { FaRegHeart } from "react-icons/fa6";
import { FiSearch, FiUser } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function NavbarActions({isSearchOpen, setIsSearchOpen}) {
  return (
    <>
      <div className="flex items-center gap-1 ml-auto md:ml-2">
        <button
          className="size-11 inline-flex items-center justify-center rounded-full text-foreground transition hover:bg-muted"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FiSearch className="size-5" />
        </button>

        <Link
          to="/wishlist"
          className="relative hidden size-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted sm:inline-flex"
        >
          <FaRegHeart className="size-5" />
        </Link>

        <Link
          to="/profile"
          className="relative hidden size-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted sm:inline-flex"
        >
          <FiUser className="size-5" />
        </Link>

        <Link
          to="/bag"
          className="relative inline-flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
        >
          <LuShoppingBag className="size-5" />
        </Link>
      </div>
    </>
  );
}
