import { Link } from "react-router-dom";
import { LuShieldCheck } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";

export default function EmptyWishlistContent() {
  return (
    <>
      <div className="size-16 bg-muted rounded-full flex items-center justify-center">
        <LuShieldCheck className="size-7 text-muted-foreground" />
      </div>

      <h1 className="mt-6 font-display font-bold text-3xl">
        Your bag is empty
      </h1>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Add gear to your bag and it'll show up here. <br /> Free shipping over
        $120.
      </p>

      <Link
        className=" btn-shine mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background"
        to="/shop"
      >
        Start shopping
        <GoArrowRight className="size-4" />
      </Link>
    </>
  );
}
