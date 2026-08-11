export default function ProductDescription({ product }) {
  return (
    <div className="py-12">
      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <h2 className="text-2xl fontdis font-bold">Description</h2>

        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p> {product.description}</p>
        </div>
      </div>
    </div>
  );
}
