export default function UserStats() {
  return (
    <div className="ml-auto hidden md:flex gap-6">
      <div>
        <p className="font-display text-2xl font-bold">12</p>
        <p className=" text-xs text-muted-foreground">Orders</p>
      </div>

      <div>
        <p className="font-display text-2xl font-bold">0</p>
        <p className=" text-xs text-muted-foreground">Saved</p>
      </div>

      <div>
        <p className="font-display text-2xl font-bold">2,480</p>
        <p className=" text-xs text-muted-foreground">Points</p>
      </div>
    </div>
  );
}
