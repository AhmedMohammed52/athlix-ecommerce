import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center animate-fade-up">
        <p className="text-sm font-medium tracking-[0.2em] text-royal uppercase">
          Error 500
        </p>

        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          SOMETHING WENT WRONG
        </h1>

        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          We encountered an unexpected issue. Please try refreshing or head back
          home.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="btn-shine inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
          >
            Try again
          </button>

          <Link
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
            to="/"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
