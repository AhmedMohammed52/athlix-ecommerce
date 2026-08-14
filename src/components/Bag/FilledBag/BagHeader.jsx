export default function BagHeader({ count }) {
  return (
    <>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
        Your Bag
      </h1>

      <p className="text-sm text-muted-foreground mt-2">
        {count} {count === 1 ? "item" : "items"}
      </p>
    </>
  );
}
