import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroMarquee from "./HeroMarquee";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="container-athlix grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16 lg:items-center py-16">
        <HeroContent />

        <HeroImage />
      </div>

      <HeroMarquee />
    </section>
  );
}
