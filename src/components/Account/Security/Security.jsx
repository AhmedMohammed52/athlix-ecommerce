import SecurityInputGroup from "./SecurityInputGroup";
import TwoFactorCard from "./TwoFactorCard";

export default function Security() {
  return (
    <div className="space-y-4 rounded-3xl border border-border p-6 md:p-8">
      <SecurityInputGroup />

      <TwoFactorCard />

      <button className="mt-2 btn-shine inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background">
        Update password
      </button>
    </div>
  );
}
