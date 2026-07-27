export default function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-border"></span>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        or continue with
      </span>
      <span className="h-px flex-1 bg-border"></span>
    </div>
  );
}
