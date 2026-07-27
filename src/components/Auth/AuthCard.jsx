export default function AuthCard({ children }) {
  return (
    <div className="animate-scale-in rounded-3xl border border-border/70 bg-background/80 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition sm:p-8">
      {children}
    </div>
  );
}
