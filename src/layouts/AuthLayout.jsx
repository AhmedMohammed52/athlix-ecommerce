import { Outlet } from "react-router-dom";
import AuthShowcase from "../components/Auth/AuthShowcase";
import AuthHeader from "../components/Auth/AuthHeader";

export default function AuthLayout() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-foreground text-foreground lg:grid lg:grid-cols-2">
      <AuthShowcase />

      <div className="relative flex min-h-dvh flex-col bg-background lg:min-h-0">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-105 -translate-x-1/2 rounded-full bg-royal/20 blur-[120px] lg:hidden"></div>

        <AuthHeader />

        <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 lg:px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
