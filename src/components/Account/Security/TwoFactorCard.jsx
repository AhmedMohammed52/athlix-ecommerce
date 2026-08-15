export default function TwoFactorCard() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 px-4 py-4">
      <div>
        <p className="text-sm font-semibold">Two-factor authentication</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Add an extra layer of security to your account.
        </p>
      </div>

      <button
        type="button"
        className="rounded-full border border-border px-4 py-2 text-xs font-semibold transition hover:bg-muted"
      >
        Set up
      </button>
    </div>
  );
}
