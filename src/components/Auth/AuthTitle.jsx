export default function AuthTitle({ badge, title, description }) {
  return (
    <div className="mb-6 text-center sm:text-left">
      <p className="text-xs text-royal font-semibold tracking-[0.2em] uppercase">
        {badge}
      </p>

      <h1 className=" mt-2 font-display font-bold text-3xl sm:text-4xl tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
