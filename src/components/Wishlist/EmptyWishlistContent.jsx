import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";

export default function EmptyWishlistContent() {
  return (
    <div className="mt-16 bg-muted/40 border border-border border-dashed rounded-3xl px-6 py-20 text-center flex flex-col items-center justify-center">
      <div className="size-14 bg-background rounded-full flex items-center justify-center">
        <FaRegHeart className="size-6 text-muted-foreground" />
      </div>

      <h2 className="mt-6 font-display font-bold text-xl">
        Save gear you love
      </h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Tap the heart on any product to keep tabs on it here.
      </p>

      <Link
        className=" btn-shine mt-6 inline-flex items-center h-11 px-6 rounded-full bg-foreground text-sm font-semibold text-background"
        to="/shop"
      >
        Browse Products
      </Link>
    </div>
  );
}
