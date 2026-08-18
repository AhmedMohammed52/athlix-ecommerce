import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center animate-fade-up">
        <p className="text-sm font-medium tracking-[0.2em] text-royal uppercase">
          Error 404
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          OFF THE TRACK
        </h1>

        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          The page you're chasing doesn't exist. Let's get you back in the game.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            className="btn-shine inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
            to="/"
          >
            Back home
          </Link>

          <Link
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
            to="/shop"
          >
            Shop products
          </Link>
        </div>
      </div>
    </div>
  );
}
