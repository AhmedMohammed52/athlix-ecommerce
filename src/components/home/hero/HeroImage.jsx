import heroImageSrc from "../../../assets/hero-athlete-WloSZga-.jpg";

export default function HeroImage() {
  return (
    <div className="relative">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-background/10 md:aspect-3/4">
        <img
          src={heroImageSrc}
          alt="Hero Image"
          width="1600"
          height="1200"
          className="size-full object-cover"
        />

        <div className=" absolute bottom-0 inset-x-0 bg-linear-to-t from-foreground/60 to-transparent p-6">
          <p className="text-xs uppercase tracking-widest text-background/70">
            Featured
          </p>
          <p className="mt-1 font-display text-xl font-semibold">
            Aero Runner Pro — Carbon Series
          </p>
        </div>
      </div>

      <div className="absolute -left-6 top-8 hidden rounded-2xl border border-background/15 bg-foreground/60 p-4 backdrop-blur md:block">
        <p className="text-[10px] uppercase tracking-widest text-background/60">
          Cushion return
        </p>
        <p className="font-display text-2xl font-bold">92%</p>
      </div>

      <div className="absolute -right-4 bottom-24 hidden rounded-2xl border border-background/15 bg-foreground/60 p-4 backdrop-blur md:block">
        <p className="text-[10px] uppercase tracking-widest text-background/60">
          Weight
        </p>
        <p className="font-display text-2xl font-bold">248g</p>
      </div>
    </div>
  );
}
