export default function AddresseCard() {
  return (
    <>
      <div className=" border border-border p-5 rounded-2xl">
        <p className="text-muted-foreground tracking-widest text-xs uppercase">
          Home
        </p>

        <p className=" mt-1 font-semibold">
          128 Prospect Ave, Brooklyn, NY 11215
        </p>

        <div className="mt-4 flex gap-2">
          <button className="rounded-full border border-border px-3 py-1.5 text-xs">
            Edit
          </button>

          <button className="rounded-full border border-border px-3 py-1.5 text-xs text-destructive">
            Remove
          </button>
        </div>
      </div>

      <div className=" border border-border p-5 rounded-2xl">
        <p className="text-muted-foreground tracking-widest text-xs uppercase">
          Work
        </p>

        <p className=" mt-1 font-semibold">5 Bryant Park, New York, NY 10018</p>

        <div className="mt-4 flex gap-2">
          <button className="rounded-full border border-border px-3 py-1.5 text-xs">
            Edit
          </button>
          <button className="rounded-full border border-border px-3 py-1.5 text-xs text-destructive">
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
