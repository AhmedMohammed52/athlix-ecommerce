export default function AddresseCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  const fullAddress = [address.address, address.city, address.postal_code]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`relative rounded-2xl border p-5 transition ${
        address.is_default ? "border-foreground" : "border-border"
      }`}
    >
      {address.is_default && (
        <span className="absolute right-4 top-4 rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
          Default
        </span>
      )}

      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {address.label}
      </p>

      <p className="mt-3 font-semibold">
        {address.first_name} {address.last_name}
      </p>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {fullAddress}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">{address.phone}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-muted"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(address)}
          className="rounded-full border border-border px-3 py-1.5 text-xs text-destructive transition hover:bg-muted"
        >
          Remove
        </button>

        {!address.is_default && (
          <button
            type="button"
            onClick={() => onSetDefault(address.id)}
            className="rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-muted"
          >
            Set default
          </button>
        )}
      </div>
    </div>
  );
}
