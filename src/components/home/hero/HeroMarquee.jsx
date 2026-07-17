const marqueeItems = [
  "ATHLIX",
  "VANTAGE",
  "NORTHPOINT",
  "MERIDIAN",
  "KINETIC",
  "HALO SPORT",
  "RIDGELINE",
  "ORBIT",
];

export default function HeroMarquee() {
  return (
    <div className="overflow-hidden border-t border-background/10 py-4">
      <div className="flex gap-16 animate-marquee whitespace-nowrap text-sm font-medium text-background/50">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item,index) => (
          <span className=" tracking-widest" key={index}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
