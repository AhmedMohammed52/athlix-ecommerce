import { LuHeart } from "react-icons/lu";

export default function EmptyWishlist() {
  return (
    <div className=" flex flex-col items-center justify-center bg-muted/40 py-16 text-center border border-dashed rounded-3xl">
      <LuHeart className=" size-6 text-muted-foreground" />

      <p className="mt-4 text-sm text-muted-foreground">Nothing saved yet.</p>
    </div>
  );
}
