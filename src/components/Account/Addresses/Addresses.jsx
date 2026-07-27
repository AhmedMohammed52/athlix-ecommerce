import AddresseCard from "./AddresseCard";

export default function Addresses() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AddresseCard />

      <button className="flex items-center justify-center rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground hover:border-foreground hover:text-foreground">
        + Add new address
      </button>
    </div>
  );
}
