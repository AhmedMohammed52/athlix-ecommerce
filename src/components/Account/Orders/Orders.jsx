export default function Orders() {
  return (
    <div className="space-y-3">
      <div className="grid gap-4 rounded-2xl border border-border p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className=" flex items-center gap-3">
            <p className=" font-semibold">#ATX-49231</p>

            <span className="inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald/15 text-emerald">
              Delivered
            </span>
          </div>

          <p className=" text-muted-foreground text-xs mt-1">
            Mar 12, 2026 · 2 items
          </p>
        </div>

        <div className=" flex items-center gap-3">
          <span className=" font-display font-bold text-lg">$287</span>

          <button className=" inline-flex items-center h-11 border border-border rounded-full px-4 text-sm font-medium hover:bg-muted">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
