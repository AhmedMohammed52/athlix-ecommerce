import AccountAvatar from "./AccountAvatar";
import UserStats from "./UserStats";
import UserWelcome from "./UserWelcome";

export default function AccountHeader({ orderCount = 0 }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border bg-muted/40 p-5">
      <AccountAvatar />

      <UserWelcome />

      <UserStats orderCount={orderCount} />
    </div>
  );
}
