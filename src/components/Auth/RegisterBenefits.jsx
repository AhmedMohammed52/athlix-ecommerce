import { IoCheckmark } from "react-icons/io5";

export default function RegisterBenefits() {
  return (
    <ul className="mt-6 grid gap-2 rounded-2xl bg-muted/60 p-4 text-xs text-muted-foreground">
      <li className="flex items-center gap-2">
        <span className=" flex items-center justify-center size-4 rounded-full bg-emerald text-emerald-foreground">
          <IoCheckmark className="size-3" />
        </span>
        Free shipping over $80
      </li>

      <li className="flex items-center gap-2">
        <span className=" flex items-center justify-center size-4 rounded-full bg-emerald text-emerald-foreground">
          <IoCheckmark className="size-3" />
        </span>
        Early access to drops
      </li>

      <li className="flex items-center gap-2">
        <span className=" flex items-center justify-center size-4 rounded-full bg-emerald text-emerald-foreground">
          <IoCheckmark className="size-3" />
        </span>
        Members-only pricing
      </li>
    </ul>
  );
}
