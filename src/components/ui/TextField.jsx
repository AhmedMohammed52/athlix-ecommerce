export default function TextField({ register, id, name }) {
  return (
    <input
      type="text"
      {...register(name)}
      className="flex w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 rounded-xl"
      id={id}
    />
  );
}
