import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="container-athlix py-10 sm:py-12 text-center">
        <h2 className="text-2xl font-bold tracking-[0.2em]">ATHLIX</h2>

        <p className="mt-3 text-sm text-background/65">
          Push your limits. Define your strength.
        </p>

        <FooterBottom />
      </div>
    </footer>
  );
}
