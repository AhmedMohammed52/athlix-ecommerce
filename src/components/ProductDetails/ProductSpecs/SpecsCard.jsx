export default function SpecsCard({ label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 rounded-2xl border border-border transition hover:border-foreground/40">
      <dt className="text-sm text-muted-foreground">{label}</dt>

      <dd className="text-sm font-semibold">{value}</dd>
    </div>
  );
}
