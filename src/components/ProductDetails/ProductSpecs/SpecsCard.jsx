export default function SpecsCard({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-border bg-card/50 transition hover:border-foreground/40">
      <dt className="text-xs sm:text-sm text-muted-foreground shrink-0">
        {label}
      </dt>
      <dd
        className="text-xs sm:text-sm font-semibold text-foreground truncate max-w-full text-left sm:text-right"
        title={String(value)}
      >
        {value}
      </dd>
    </div>
  );
}
