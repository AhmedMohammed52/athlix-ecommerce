export default function Settings() {
  return (
    <div className=" space-y-3 p-6 rounded-3xl border border-border">
      <div className=" flex items-center justify-between px-4 py-3 rounded-xl bg-muted/40">
        <span className="text-sm">Language</span>

        <span className="font-semibold text-sm">English (US)</span>
      </div>

      <div className=" flex items-center justify-between px-4 py-3 rounded-xl bg-muted/40">
        <span className="text-sm">Currency</span>

        <span className="font-semibold text-sm">USD</span>
      </div>

      <div className=" flex items-center justify-between px-4 py-3 rounded-xl bg-muted/40">
        <span className="text-sm">Units</span>

        <span className="font-semibold text-sm">Metric</span>
      </div>
    </div>
  );
}
