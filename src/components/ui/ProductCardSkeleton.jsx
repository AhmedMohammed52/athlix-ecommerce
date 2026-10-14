export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <div className="absolute left-3 top-3 h-6 w-20 rounded-full bg-foreground/10" />

        <div className="absolute right-3 top-3 size-10 rounded-full bg-foreground/10" />

        <div className="absolute inset-x-3 bottom-3 h-11 rounded-full bg-foreground/10" />
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="h-3 w-20 rounded bg-muted" />

            <div className="mt-3 h-4 w-4/5 rounded bg-muted" />
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <div className="size-3.5 rounded-full bg-muted" />
            <div className="h-3 w-5 rounded bg-muted" />
            <div className="h-3 w-8 rounded bg-muted" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-5 w-16 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
